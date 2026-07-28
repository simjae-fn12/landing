import fs from "node:fs/promises";

const targetUrl = "https://sleep-well-creatives.com/?ref=lapaninja";
const outputDir = "reference-captures/sleep-well-creatives/original";
const endpoint = await fetch(`http://127.0.0.1:9223/json/new?${encodeURIComponent(targetUrl)}`, { method: "PUT" }).then(response => response.json());
const socket = new WebSocket(endpoint.webSocketDebuggerUrl);
const pending = new Map();
let requestId = 0;

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const handlers = pending.get(message.id);
  pending.delete(message.id);
  message.error ? handlers.reject(new Error(message.error.message)) : handlers.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++requestId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = expression => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }).then(result => result.result.value);
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await wait(7000);
await evaluate(`(() => {
  const target = [...document.querySelectorAll("a,button,div")].find(element =>
    element.children.length === 0 && element.textContent.trim() === "Enter Site"
  );
  if (target) target.click();
  return Boolean(target);
})()`);
await wait(4000);
await evaluate("scrollTo(0, 0)");
await wait(1500);

const layout = await evaluate(`(() => {
  const candidates = [...document.querySelectorAll("section, main > div, body > div")];
  const sections = candidates.map((element, index) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      index,
      tag: element.tagName,
      id: element.id,
      className: typeof element.className === "string" ? element.className.slice(0, 180) : "",
      top: Math.round(rect.top + scrollY),
      height: Math.round(rect.height),
      width: Math.round(rect.width),
      position: style.position,
      zIndex: style.zIndex,
      overflow: style.overflow,
      transform: style.transform,
      text: element.innerText?.replace(/\\s+/g, " ").slice(0, 160) || ""
    };
  }).filter(item => item.height > 120 && item.width > innerWidth * .5);
  const layered = [...document.querySelectorAll("*")].map(element => {
    const style = getComputedStyle(element);
    if (!["sticky","fixed","absolute"].includes(style.position) && style.zIndex === "auto" && style.overflow !== "hidden" && style.overflow !== "clip") return null;
    const rect = element.getBoundingClientRect();
    if (rect.width < 100 || rect.height < 40) return null;
    return {
      tag: element.tagName,
      id: element.id,
      className: typeof element.className === "string" ? element.className.slice(0, 160) : "",
      position: style.position,
      zIndex: style.zIndex,
      overflow: style.overflow,
      top: Math.round(rect.top + scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
  }).filter(Boolean).slice(0, 1000);
  return {
    title: document.title,
    url: location.href,
    viewport: { width: innerWidth, height: innerHeight },
    documentHeight: document.documentElement.scrollHeight,
    sections,
    layered,
    canvases: [...document.querySelectorAll("canvas")].map(canvas => {
      const rect = canvas.getBoundingClientRect();
      return { className: canvas.className, width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(rect.top + scrollY) };
    }),
    videos: [...document.querySelectorAll("video")].map(video => ({ src: video.currentSrc, duration: video.duration, loop: video.loop, autoplay: video.autoplay }))
  };
})()`);

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(`${outputDir}/layout.json`, JSON.stringify(layout, null, 2));
const scrollDistance = Math.max(1, layout.documentHeight - 1080);
const timeline = [];

for (let frame = 0; frame <= 100; frame += 1) {
  const scrollY = Math.round(scrollDistance * frame / 100);
  await evaluate(`scrollTo(0, ${scrollY})`);
  await wait(140);
  timeline.push(await evaluate(`(() => ({
    frame: ${frame},
    scrollY: Math.round(scrollY),
    visibleText: [...document.querySelectorAll("body *")].filter(element => {
      if (element.children.length) return false;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return element.textContent.trim() && rect.bottom > 0 && rect.top < innerHeight &&
        rect.right > 0 && rect.left < innerWidth && style.visibility !== "hidden" && Number(style.opacity) > .04;
    }).map(element => {
      const rect = element.getBoundingClientRect();
      return { text: element.textContent.trim().replace(/\\s+/g, " ").slice(0, 100), x:Math.round(rect.x), y:Math.round(rect.y), width:Math.round(rect.width), height:Math.round(rect.height), opacity:getComputedStyle(element).opacity };
    }).slice(0, 50)
  }))()`));
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 82, fromSurface: true, captureBeyondViewport: false });
  await fs.writeFile(`${outputDir}/frame-${String(frame).padStart(3, "0")}.jpg`, Buffer.from(shot.data, "base64"));
}

await fs.writeFile(`${outputDir}/timeline.json`, JSON.stringify(timeline, null, 2));
socket.close();
console.log(JSON.stringify({ title: layout.title, documentHeight: layout.documentHeight, sections: layout.sections.length, layered: layout.layered.length, canvases: layout.canvases, videos: layout.videos }, null, 2));
