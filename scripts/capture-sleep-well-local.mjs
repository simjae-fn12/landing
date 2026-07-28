import fs from "node:fs/promises";

const endpoint = await fetch("http://127.0.0.1:9223/json/new?http://127.0.0.1:3100/concepts/sleep-well", { method: "PUT" }).then(r => r.json());
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
  const task = pending.get(message.id);
  pending.delete(message.id);
  message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++requestId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = expression => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }).then(r => r.result.value);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await wait(2500);
const metrics = await evaluate(`({height:document.documentElement.scrollHeight, canvases:document.querySelectorAll("canvas").length, sticky:[...document.querySelectorAll("*")].filter(e=>getComputedStyle(e).position==="sticky").length})`);
await fs.mkdir("reference-captures/sleep-well-creatives/local", { recursive: true });
for (const progress of [0, .08, .15, .24, .34, .46, .58, .68, .78, .88, .96, 1]) {
  await evaluate(`scrollTo(0, (document.documentElement.scrollHeight-innerHeight)*${progress})`);
  await wait(450);
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 86, fromSurface: true, captureBeyondViewport: false });
  await fs.writeFile(`reference-captures/sleep-well-creatives/local/${String(Math.round(progress * 100)).padStart(3, "0")}.jpg`, Buffer.from(shot.data, "base64"));
}
console.log(JSON.stringify(metrics));
socket.close();
