import fs from "node:fs/promises";

const endpoint = await fetch("http://127.0.0.1:9223/json/new?https://mercury.com/command", {
  method: "PUT"
}).then(response => response.json());
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
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++requestId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = expression => send("Runtime.evaluate", {
  expression,
  awaitPromise: true,
  returnByValue: true
}).then(result => result.result.value);
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  mobile: false
});
await wait(5000);

const pageData = await evaluate(`(() => ({
  title: document.title,
  height: document.documentElement.scrollHeight,
  viewport: innerHeight,
  sections: [...document.querySelectorAll("main section")].map((section, index) => ({
    index,
    top: Math.round(section.getBoundingClientRect().top + scrollY),
    height: Math.round(section.getBoundingClientRect().height),
    text: section.innerText.replace(/\\s+/g, " ").slice(0, 180)
  }))
}))()`);

await fs.mkdir("reference-captures/mercury-command", { recursive: true });
await fs.writeFile(
  "reference-captures/mercury-command/layout.json",
  JSON.stringify(pageData, null, 2)
);

const heroDistance = pageData.sections[0]?.top || 6228;
const timeline = [];
for (let frame = 0; frame <= 100; frame += 1) {
  const progress = frame / 100;
  await evaluate(`scrollTo(0, ${Math.round(heroDistance * progress)})`);
  await wait(90);
  timeline.push(await evaluate(`(() => ({
    frame: ${frame},
    scrollY: Math.round(scrollY),
    visibleText: [...document.querySelectorAll("body *")]
      .filter(element => {
        if (element.children.length) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return element.textContent.trim() && style.visibility !== "hidden" &&
          Number(style.opacity) > .05 && rect.bottom > 76 && rect.top < innerHeight &&
          rect.right > 0 && rect.left < innerWidth;
      })
      .map(element => ({
        text: element.textContent.trim().replace(/\\s+/g, " ").slice(0, 100),
        tag: element.tagName,
        opacity: Number(getComputedStyle(element).opacity).toFixed(2),
        x: Math.round(element.getBoundingClientRect().x),
        y: Math.round(element.getBoundingClientRect().y),
        width: Math.round(element.getBoundingClientRect().width),
        height: Math.round(element.getBoundingClientRect().height)
      }))
      .filter((item, index, list) => list.findIndex(other => other.text === item.text) === index)
      .slice(0, 40),
    canvases: [...document.querySelectorAll("canvas")].map(canvas => {
      const rect = canvas.getBoundingClientRect();
      return {x:Math.round(rect.x),y:Math.round(rect.y),width:Math.round(rect.width),height:Math.round(rect.height)};
    }),
    svgs: [...document.querySelectorAll("svg")].filter(svg => {
      const rect = svg.getBoundingClientRect();
      return rect.width > 300 && rect.height > 100 && rect.bottom > 0 && rect.top < innerHeight;
    }).map(svg => {
      const rect = svg.getBoundingClientRect();
      return {x:Math.round(rect.x),y:Math.round(rect.y),width:Math.round(rect.width),height:Math.round(rect.height)};
    }).slice(0, 12)
  }))()`));
  const capture = await send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 82,
    fromSurface: true,
    captureBeyondViewport: false
  });
  await fs.writeFile(
    `reference-captures/mercury-command/full-${String(frame).padStart(3, "0")}.jpg`,
    Buffer.from(capture.data, "base64")
  );
}
await fs.writeFile(
  "reference-captures/mercury-command/timeline.json",
  JSON.stringify(timeline, null, 2)
);

socket.close();
console.log(JSON.stringify(pageData, null, 2));
