import {mkdir, writeFile} from "node:fs/promises";

const baseUrl = process.env.SHOPIFY_MIRROR_URL || "http://127.0.0.1:3100/editions/spring2026";
const cdpBase = process.env.CDP_URL || "http://127.0.0.1:9223";
const outputRoot = process.env.SHOPIFY_QA_OUTPUT || ".qa/shopify-s26/runtime";
const blockExternalNetwork = process.env.SHOPIFY_ALLOW_NETWORK !== "1";
const scrollRatios = process.env.SHOPIFY_PROBE_HERO === "1"
  ? [.05, 0]
  : Array.from({length:21}, (_, index) => index / 20);

await mkdir(outputRoot, {recursive:true});

async function createSession(url) {
  const endpoint = await fetch(`${cdpBase}/json/new?${encodeURIComponent(url)}`, {method:"PUT"}).then(response => {
    if (!response.ok) throw new Error(`CDP target creation failed: ${response.status}`);
    return response.json();
  });
  const socket = new WebSocket(endpoint.webSocketDebuggerUrl);
  const pending = new Map();
  const listeners = new Map();
  let nextId = 0;
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, {once:true});
    socket.addEventListener("error", reject, {once:true});
  });
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const task = pending.get(message.id);
      pending.delete(message.id);
      message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result);
      return;
    }
    for (const listener of listeners.get(message.method) || []) listener(message.params || {});
  });
  const send = (method, params={}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  const on = (method, listener) => {
    if (!listeners.has(method)) listeners.set(method, []);
    listeners.get(method).push(listener);
  };
  return {send, on, close:async() => {
    await send("Page.close").catch(() => {});
    socket.close();
  }};
}

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function verifyViewport(name, metrics) {
  const session = await createSession("about:blank");
  const failures = [];
  const externalRequests = new Set();
  const pointcloudRequests = new Set();
  const textureRequests = [];
  const loaderRequests = [];
  const badResponses = [];
  const consoleErrors = [];
  const exceptions = [];
  const frames = [];
  const requestUrls = new Map();

  session.on("Network.requestWillBeSent", ({requestId, request}) => {
    requestUrls.set(requestId, request.url);
    if (request.url.includes("/pointclouds/") || /\.(?:mdpc|bin)(?:[?.]|$)/i.test(request.url)) {
      pointcloudRequests.add(request.url);
    }
    if (/heroforest|\.(?:hdr|ktx2)(?:[?.]|$)/i.test(request.url)) textureRequests.push({phase:"request", url:request.url});
    if (/3acfda59|2284f613|basis[_-]transcoder|ktx2-loader/i.test(request.url)) {
      loaderRequests.push({phase:"request", url:request.url});
    }
    const url = new URL(request.url);
    if (!["127.0.0.1", "localhost"].includes(url.hostname) && !["data:", "blob:"].includes(url.protocol)) {
      externalRequests.add(request.url);
    }
  });
  session.on("Network.responseReceived", ({response}) => {
    if (response.status >= 400) badResponses.push({status:response.status, url:response.url});
    if (/heroforest|\.(?:hdr|ktx2)(?:[?.]|$)/i.test(response.url)) {
      textureRequests.push({
        phase:"response",
        url:response.url,
        status:response.status,
        mimeType:response.mimeType,
        encodedDataLength:response.encodedDataLength,
        headers:response.headers
      });
    }
    if (/3acfda59|2284f613|basis[_-]transcoder|ktx2-loader/i.test(response.url)) {
      loaderRequests.push({phase:"response", url:response.url, status:response.status, mimeType:response.mimeType});
    }
  });
  session.on("Network.loadingFailed", event => {
    if (!event.canceled) failures.push({
      url:requestUrls.get(event.requestId) || "",
      errorText:event.errorText,
      blockedReason:event.blockedReason
    });
  });
  session.on("Runtime.consoleAPICalled", ({type, args}) => {
    if (type === "error") consoleErrors.push(args.map(argument => argument.value ?? argument.description ?? "").join(" "));
  });
  session.on("Runtime.exceptionThrown", ({exceptionDetails}) => {
    exceptions.push({
      description:exceptionDetails.exception?.description || exceptionDetails.text,
      url:exceptionDetails.url,
      lineNumber:exceptionDetails.lineNumber,
      columnNumber:exceptionDetails.columnNumber
    });
  });

  await session.send("Runtime.enable");
  await session.send("Page.enable");
  await session.send("Network.enable");
  await session.send("Network.setCacheDisabled", {cacheDisabled:true});
  await session.send("Network.clearBrowserCache");
  await session.send("Log.enable");
  if (blockExternalNetwork) await session.send("Network.setBlockedURLs", {urls:["https://*"]});
  await session.send("Emulation.setDeviceMetricsOverride", metrics);
  if (metrics.mobile) {
    await session.send("Emulation.setTouchEmulationEnabled", {enabled:true, maxTouchPoints:5});
  }
  await session.send("Page.navigate", {url:baseUrl});
  await wait(15000);

  const interactionResults = [];
  const initialHref = (await session.send("Runtime.evaluate", {
    expression:"location.href",
    returnByValue:true
  })).result.value;
  await session.send("Input.dispatchMouseEvent", {type:"mouseMoved", x:metrics.width * .5, y:metrics.height * .45});
  await session.send("Input.dispatchMouseEvent", {type:"mousePressed", x:metrics.width * .5, y:metrics.height * .45, button:"left", clickCount:1});
  await session.send("Input.dispatchMouseEvent", {type:"mouseReleased", x:metrics.width * .5, y:metrics.height * .45, button:"left", clickCount:1});
  await session.send("Input.dispatchMouseEvent", {type:"mouseWheel", x:metrics.width * .5, y:metrics.height * .5, deltaX:0, deltaY:180});
  await session.send("Input.dispatchKeyEvent", {type:"keyDown", key:"Tab", code:"Tab", windowsVirtualKeyCode:9});
  await session.send("Input.dispatchKeyEvent", {type:"keyUp", key:"Tab", code:"Tab", windowsVirtualKeyCode:9});
  await session.send("Input.dispatchKeyEvent", {type:"keyDown", key:"Escape", code:"Escape", windowsVirtualKeyCode:27});
  await session.send("Input.dispatchKeyEvent", {type:"keyUp", key:"Escape", code:"Escape", windowsVirtualKeyCode:27});
  if (metrics.mobile) {
    await session.send("Input.dispatchTouchEvent", {type:"touchStart", touchPoints:[{x:metrics.width * .5, y:metrics.height * .65, id:1}]});
    await session.send("Input.dispatchTouchEvent", {type:"touchMove", touchPoints:[{x:metrics.width * .5, y:metrics.height * .45, id:1}]});
    await session.send("Input.dispatchTouchEvent", {type:"touchEnd", touchPoints:[]});
  }
  await wait(500);
  const interactionState = (await session.send("Runtime.evaluate", {
    expression:"({href:location.href, scrollY, activeTag:document.activeElement?.tagName || null, canvasCount:document.querySelectorAll('canvas').length})",
    returnByValue:true
  })).result.value;
  interactionResults.push({
    pointer:true,
    click:true,
    wheel:true,
    keyboard:true,
    touch:metrics.mobile,
    navigationStable:interactionState.href === initialHref,
    ...interactionState
  });

  for (const ratio of scrollRatios) {
    const evaluation = await session.send("Runtime.evaluate", {
      expression:`(() => {
        const root = document.documentElement;
        const max = Math.max(0, root.scrollHeight - innerHeight);
        scrollTo(0, max * ${ratio});
        return {
          ratio:${ratio},
          scrollY,
          height:root.scrollHeight,
          title:document.title,
          href:location.href,
          canvasCount:document.querySelectorAll("canvas").length,
          canvasState:[...document.querySelectorAll("canvas")].map(canvas => {
            const rect = canvas.getBoundingClientRect();
            const style = getComputedStyle(canvas);
            return {width:canvas.width, height:canvas.height, rect:[rect.x, rect.y, rect.width, rect.height], opacity:style.opacity, visibility:style.visibility};
          }),
          heroConfig:(() => {
            const seen = new WeakSet();
            const visit = (value, depth=0) => {
              if (!value || typeof value !== "object" || depth > 12 || seen.has(value)) return null;
              seen.add(value);
              if (
                value.pointcloud?.sources?.some(source => String(source?.src).includes("forest-1024-v3-moretrees")) &&
                value.camera
              ) {
                return {camera:value.camera, environment:value.environment, pointcloud:value.pointcloud, model:value.model};
              }
              for (const child of Object.values(value)) {
                const found = visit(child, depth + 1);
                if (found) return found;
              }
              return null;
            };
            return visit(window.__reactRouterContext);
          })(),
          renderedSceneConfigs:(() => {
            const results = [];
            const objectSeen = new WeakSet();
            const fiberSeen = new Set();
            const inspectObject = (value, depth=0) => {
              if (!value || typeof value !== "object" || depth > 5 || objectSeen.has(value)) return;
              objectSeen.add(value);
              if (value.pointcloud?.sources && value.camera) {
                results.push({
                  camera:value.camera,
                  environment:value.environment,
                  videoLightVolume:value.videoLightVolume,
                  foregroundVideoLightVolume:value.foregroundVideoLightVolume,
                  sources:value.pointcloud.sources,
                  position:value.pointcloud.position,
                  rotation:value.pointcloud.rotation,
                  scale:value.pointcloud.scale,
                  pointSize:value.pointcloud.pointSize
                });
                return;
              }
              for (const child of Object.values(value)) inspectObject(child, depth + 1);
            };
            const walkFiber = fiber => {
              if (!fiber || fiberSeen.has(fiber) || fiberSeen.size > 5000) return;
              fiberSeen.add(fiber);
              inspectObject(fiber.memoizedProps);
              walkFiber(fiber.child);
              walkFiber(fiber.sibling);
            };
            for (const canvas of document.querySelectorAll("canvas")) {
              const key = Object.keys(canvas).find(name => name.startsWith("__reactFiber$"));
              if (key) {
                let root = canvas[key];
                while (root.return) root = root.return;
                walkFiber(root);
              }
            }
            return results.slice(0, 20);
          })(),
          renderedThreeObjects:(() => {
            const results = [];
            const fiberSeen = new Set();
            const serializeVector = value => value && [value.x, value.y, value.z];
            const walkFiber = fiber => {
              if (!fiber || fiberSeen.has(fiber) || fiberSeen.size > 10000) return;
              fiberSeen.add(fiber);
              const object = fiber.stateNode;
              if (object?.isObject3D && (object.isPoints || object.isMesh)) {
                const uniforms = object.material?.uniforms || {};
                const selectedUniforms = {};
                for (const name of ["uOpacity", "uPointSize", "uProgress", "uTransition", "uReveal", "uScale"]) {
                  if (name in uniforms) selectedUniforms[name] = uniforms[name]?.value;
                }
                results.push({
                  type:object.type,
                  name:object.name,
                  position:serializeVector(object.position),
                  rotation:serializeVector(object.rotation),
                  scale:serializeVector(object.scale),
                  visible:object.visible,
                  material:object.material?.type,
                  uniforms:selectedUniforms
                });
              }
              walkFiber(fiber.child);
              walkFiber(fiber.sibling);
            };
            for (const canvas of document.querySelectorAll("canvas")) {
              const key = Object.keys(canvas).find(name => name.startsWith("__reactFiber$"));
              if (!key) continue;
              let root = canvas[key];
              while (root.return) root = root.return;
              walkFiber(root);
            }
            return results.slice(0, 100);
          })(),
          heroMediaConfigs:(() => {
            const results = [];
            const seen = new WeakSet();
            const visit = (value, depth=0) => {
              if (!value || typeof value !== "object" || depth > 14 || seen.has(value)) return;
              seen.add(value);
              const serialized = (() => {
                try { return JSON.stringify(value); } catch { return ""; }
              })();
              if (serialized.includes("heroforest") && serialized.length < 20000) {
                results.push(value);
                return;
              }
              for (const child of Object.values(value)) visit(child, depth + 1);
            };
            visit(window.__reactRouterContext);
            return results.slice(0, 10);
          })(),
          componentNames:(() => {
            const names = new Set();
            const seen = new Set();
            const walk = fiber => {
              if (!fiber || seen.has(fiber) || seen.size > 10000) return;
              seen.add(fiber);
              const type = fiber.type;
              const name = typeof type === "function" ? type.name : "";
              if (name) names.add(name);
              walk(fiber.child);
              walk(fiber.sibling);
            };
            for (const canvas of document.querySelectorAll("canvas")) {
              const key = Object.keys(canvas).find(name => name.startsWith("__reactFiber$"));
              if (!key) continue;
              let root = canvas[key];
              while (root.return) root = root.return;
              walk(root);
            }
            return [...names].sort();
          })(),
          sceneComponentProps:(() => {
            const results = [];
            const seen = new Set();
            const walk = fiber => {
              if (!fiber || seen.has(fiber) || seen.size > 10000) return;
              seen.add(fiber);
              const name = typeof fiber.type === "function" ? fiber.type.name : "";
              const source = typeof fiber.type === "function" ? Function.prototype.toString.call(fiber.type) : "";
              if (
                name === "xt" ||
                source.includes("foregroundVideoLightVolumeRef") ||
                source.includes("externalLoadFadeRef")
              ) {
                const props = fiber.memoizedProps || {};
                results.push({
                  name,
                  propKeys:Object.keys(props),
                  presetId:props.preset?.id,
                  presetKeys:props.preset ? Object.keys(props.preset) : [],
                  videoLightVolume:props.videoLightVolume ?? props.preset?.videoLightVolume ?? null,
                  foregroundVideoLightVolume:props.foregroundVideoLightVolume ?? props.preset?.foregroundVideoLightVolume ?? null,
                  sourceUrl:props.sourceUrl,
                  ktx2Url:props.ktx2Url
                });
              }
              walk(fiber.child);
              walk(fiber.sibling);
            };
            for (const canvas of document.querySelectorAll("canvas")) {
              const key = Object.keys(canvas).find(name => name.startsWith("__reactFiber$"));
              if (!key) continue;
              let root = canvas[key];
              while (root.return) root = root.return;
              walk(root);
            }
            return results;
          })(),
          text:(document.body?.innerText || "").slice(0, 3000)
        };
      })()`,
      returnByValue:true
    });
    await wait(700);
    const state = evaluation.result.value;
    const has500 = /\b500\b|internal server error|application error/i.test(state.text);
    frames.push({...state, has500});
    if (has500) failures.push({ratio, errorText:"500/error page text detected", url:state.href});
    if ([0, .25, .5, .75, 1].includes(ratio)) {
      const screenshot = await session.send("Page.captureScreenshot", {format:"png", fromSurface:true});
      await writeFile(`${outputRoot}/${name}-${String(ratio).replace(".", "_")}.png`, Buffer.from(screenshot.data, "base64"));
    }
  }

  const report = {
    name,
    metrics,
    baseUrl,
    documentHeight:Math.max(...frames.map(frame => frame.height)),
    frames,
    interactionResults,
    externalRequests:[...externalRequests],
    pointcloudRequests:[...pointcloudRequests],
    textureRequests,
    loaderRequests,
    badResponses,
    failures,
    consoleErrors:[...new Set(consoleErrors)],
    exceptions:[...new Set(exceptions)]
  };
  await writeFile(`${outputRoot}/${name}.json`, JSON.stringify(report, null, 2), "utf8");
  await session.close();
  return report;
}

const viewportDefinitions = [
  ["desktop", {width:1440, height:900, deviceScaleFactor:1, mobile:false}],
  ["mobile", {width:390, height:844, deviceScaleFactor:2, mobile:true}]
];
const selectedViewports = process.env.SHOPIFY_RUNTIME_VIEWPORT
  ? viewportDefinitions.filter(([name]) => name === process.env.SHOPIFY_RUNTIME_VIEWPORT)
  : viewportDefinitions;
const reports = [];
for (const [name, metrics] of selectedViewports) reports.push(await verifyViewport(name, metrics));

const summary = reports.map(report => ({
  name:report.name,
  documentHeight:report.documentHeight,
  canvasCounts:[...new Set(report.frames.map(frame => frame.canvasCount))],
  errorPages:report.frames.filter(frame => frame.has500).length,
  externalRequests:report.externalRequests.length,
  badResponses:report.badResponses.length,
  failedRequests:report.failures.length,
  consoleErrors:report.consoleErrors.length,
  exceptions:report.exceptions.length
}));
console.log(JSON.stringify(summary, null, 2));

if (summary.some(result =>
  result.errorPages ||
  result.externalRequests ||
  result.badResponses ||
  result.failedRequests ||
  result.consoleErrors ||
  result.exceptions
)) process.exitCode = 1;
