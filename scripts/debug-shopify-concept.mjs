const url="http://127.0.0.1:3100/concepts/active-theory";
const endpoint=await fetch(`http://127.0.0.1:9223/json/new?${encodeURIComponent(url)}`,{method:"PUT"}).then(r=>r.json());
const socket=new WebSocket(endpoint.webSocketDebuggerUrl);
const pending=new Map();let nextId=0;const events=[];
await new Promise((resolve,reject)=>{socket.addEventListener("open",resolve,{once:true});socket.addEventListener("error",reject,{once:true})});
socket.addEventListener("message",event=>{
  const message=JSON.parse(event.data);
  if(message.method==="Runtime.exceptionThrown"||message.method==="Log.entryAdded"||message.method==="Runtime.consoleAPICalled")events.push(message);
  if(!message.id||!pending.has(message.id))return;
  const task=pending.get(message.id);pending.delete(message.id);
  message.error?task.reject(new Error(message.error.message)):task.resolve(message.result);
});
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))});
await send("Runtime.enable");await send("Log.enable");await new Promise(resolve=>setTimeout(resolve,9000));
const state=await send("Runtime.evaluate",{expression:`(()=>{const d=document.querySelector("iframe")?.contentDocument;return{count:d?.querySelector("#loaderCount")?.textContent,done:d?.querySelector(".loader")?.classList.contains("done"),scripts:[...d?.scripts||[]].map(s=>s.src)}})()`,returnByValue:true});
console.log(JSON.stringify(state.result.value,null,2));
for(const event of events)console.log(JSON.stringify(event.params));
await send("Page.close").catch(()=>{});
socket.close();
