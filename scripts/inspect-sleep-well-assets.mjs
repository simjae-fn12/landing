const endpoint = await fetch("http://127.0.0.1:9223/json/new?https%3A%2F%2Fsleep-well-creatives.com%2F", { method: "PUT" }).then(r => r.json());
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
await send("Page.enable");
await send("Network.enable");
await new Promise(resolve => setTimeout(resolve, 10000));
await evaluate(`(() => {
  const target=[...document.querySelectorAll("a,button,div")].find(e=>/enter site/i.test(e.textContent||""));
  if(target) target.click();
})()`);
await new Promise(resolve => setTimeout(resolve, 8000));
const result = await evaluate(`({
  resources: performance.getEntriesByType("resource").map(e=>({name:e.name,type:e.initiatorType,size:e.transferSize})),
  scripts:[...document.scripts].map(s=>s.src).filter(Boolean),
  canvas:[...document.querySelectorAll("canvas")].map(c=>({class:c.className,width:c.width,height:c.height}))
})`);
console.log(JSON.stringify(result, null, 2));
socket.close();
