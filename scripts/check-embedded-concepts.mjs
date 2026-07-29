const routes = [
  ["active-theory", "http://127.0.0.1:3100/concepts/active-theory"],
  ["lusion", "http://127.0.0.1:3100/concepts/lusion"]
];

for (const [name, url] of routes) {
  const endpoint = await fetch(`http://127.0.0.1:9223/json/new?${encodeURIComponent(url)}`, { method: "PUT" }).then(response => response.json());
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
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await new Promise(resolve => setTimeout(resolve, 6000));
  const result = await send("Runtime.evaluate", {
    expression: `(() => {
      const frame = document.querySelector("iframe");
      const doc = frame?.contentDocument;
      return {
        route: location.pathname,
        frameLoaded: Boolean(doc?.body),
        frameTitle: doc?.title || "",
        canvases: doc?.querySelectorAll("canvas").length || 0,
        webgl: Boolean(doc?.querySelector("canvas")?.getContext("webgl2")),
        loaderDone: doc?.querySelector(".loader")?.classList.contains("done") ?? null,
        scrollHeight: doc?.documentElement?.scrollHeight || 0,
        bodyText: (doc?.body?.innerText || "").slice(0, 120)
      };
    })()`,
    returnByValue: true
  });
  console.log(name, JSON.stringify(result.result.value));
  await send("Page.close").catch(() => {});
  socket.close();
}
