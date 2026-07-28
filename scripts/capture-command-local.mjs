import fs from "node:fs/promises";

const endpoint = await fetch("http://127.0.0.1:9223/json/new?http://127.0.0.1:3100/concepts/mercury-command", { method: "PUT" }).then(response => response.json());
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
const evaluate = expression => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await wait(2500);
await fs.mkdir("reference-captures/mercury-command/local", { recursive: true });
for (const progress of [0, .1, .16, .23, .35, .45, .55, .73, .92]) {
  await evaluate(`scrollTo(0, ${Math.round((5.77 * 1080 - 1080) * progress)})`);
  await wait(350);
  const capture = await send("Page.captureScreenshot", { format: "jpeg", quality: 88, fromSurface: true, captureBeyondViewport: false });
  await fs.writeFile(`reference-captures/mercury-command/local/${String(Math.round(progress * 100)).padStart(2, "0")}.jpg`, Buffer.from(capture.data, "base64"));
}
socket.close();
