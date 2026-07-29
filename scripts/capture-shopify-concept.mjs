import {mkdir, writeFile} from "node:fs/promises";

const url = "http://127.0.0.1:3100/concepts/active-theory";
const endpoint = await fetch(`http://127.0.0.1:9223/json/new?${encodeURIComponent(url)}`, {method:"PUT"}).then(r=>r.json());
const socket = new WebSocket(endpoint.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 0;
await new Promise((resolve,reject)=>{
  socket.addEventListener("open",resolve,{once:true});
  socket.addEventListener("error",reject,{once:true});
});
socket.addEventListener("message",event=>{
  const message=JSON.parse(event.data);
  if(!message.id||!pending.has(message.id))return;
  const task=pending.get(message.id);pending.delete(message.id);
  message.error?task.reject(new Error(message.error.message)):task.resolve(message.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
  const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));
});
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await new Promise(resolve=>setTimeout(resolve,8000));
await mkdir(".qa/shopify-s26",{recursive:true});
for(const [name,ratio] of [["hero",0],["ai",.27],["media",.43],["headless",.58],["compliance",.72],["finale",.96]]){
  await send("Runtime.evaluate",{expression:`document.querySelector("iframe").contentWindow.scrollTo(0,(document.querySelector("iframe").contentDocument.documentElement.scrollHeight-innerHeight)*${ratio})`});
  await new Promise(resolve=>setTimeout(resolve,1400));
  const shot=await send("Page.captureScreenshot",{format:"png",fromSurface:true});
  await writeFile(`.qa/shopify-s26/${name}.png`,Buffer.from(shot.data,"base64"));
}
await send("Page.close").catch(()=>{});
socket.close();
console.log("captured .qa/shopify-s26");
