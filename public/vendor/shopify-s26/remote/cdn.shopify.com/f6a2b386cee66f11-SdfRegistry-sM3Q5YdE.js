import{j as X}from"./jsx-runtime-u17CrQMm.js";import{r as C}from"./chunk-QUQL4437-BD29ZypC.js";import{t as T,ad as Gt,ae as qe,S as le,h as Ht,l as lt,m as z,aW as Bt,C as ct,ac as jt,be as Wt,v as b,G as Yt,aU as qt,b8 as Ve,Z as ie,N as Q,Y as Vt,cN as $t,cO as Kt,bu as Ae,aa as ye,x as se,e as ut,z as Jt,u as oe,e5 as Zt,d as Xt,W as Qt,bQ as en,y as dt,w as tn,Q as nn,bJ as on}from"./TierResolver-y-fGWbnF.js";import{e as $e,u as Ke}from"./constants-xV0ws6Hx.js";import{S as rn}from"./SceneDataContext-DuAaqaMN.js";import{u as an}from"./useStickyMountGate-DtwlF7FI.js";import{r as Je}from"./reportError-CJPDlOyT.js";import{u as Ze}from"./useAssetLoadingStore-BQ9V8Ec_.js";import{g as ft,w as ht,P as sn,d as ln,c as cn,e as un,b as dn,a as fn}from"./sectionModels-CRO2BpnI.js";import{c as hn,s as pn,e as mn,a as yn}from"./FluidField-OmmkFHf7.js";import{s as pt}from"./sharedZeroTexture-BkFIhg0y.js";import{A as Sn,S as vn,b as gn,a as wn,D as bn,B as ee,M as xn,T as Cn,d as Tn,C as Mn,e as Fn,O as An,f as Dn,g as Pn,s as _n}from"./AssetSdf-okzHBKiM.js";import{P as Oe,e as En}from"./presets-EmxEXVgb.js";function On(){const t=globalThis.navigator?.connection;return{visibilityState:globalThis.document?.visibilityState,...t?{networkEffectiveType:t.effectiveType,networkSaveData:t.saveData,networkDownlink:t.downlink}:{}}}function mt(t){const e=performance.now()-t;return Math.max(0,Math.round(e))}function k(t,e){return Object.assign(t,{assetTelemetry:e}),t}function Rn(t){const e=t?.assetTelemetry;return e&&typeof e=="object"?e:{}}const Ln=64,Nn=1024,zn=.25;function De(t){return!t||!Number.isFinite(t)?1:1+(Math.max(1,Nn/t)-1)*zn}const hr={source512:De(512),source256:De(256)},Un=5,In=.01;function kn(t){return 1-Math.pow(1-T.clamp(t,0,1),3)}function Gn(t,e,n){if(n.reducedMotion)return 1;const o=T.clamp(t,0,1);if(n.offscreen||o>=1)return o;const r=Math.min(Math.max(e,0),1/30);return Math.min(1,o+r/Math.max(n.durationSeconds,1e-6))}const Hn={256:256,512:512,1024:1024,full:1024,center:512},Bn={3:"512",2:"512",1:"256",0:"256"};function yt(t,e){if(t.length===0)throw new Error("resolveCloudAsset: sources must not be empty");const n=Bn[e],o=Hn[n],r=jn(t,o);return{asset:r.src,textureSize:r.resolution,preferredResolution:n}}function jn(t,e){let n,o,r;for(const i of t)i.resolution===e?n=i:i.resolution>e&&(!o||i.resolution<o.resolution)&&(o=i),(!r||i.resolution>r.resolution)&&(r=i);return n??o??r}const Ce=new WeakMap;class Wn extends Gt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,n,o,r){const i=new qe(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,a=>{this.parse(a,n,r)},o,r)}parse(e,n,o=()=>{}){this.decodeDracoFile(e,n,null,null,le,o).catch(o)}decodeDracoFile(e,n,o,r,i=Ht,a=()=>{}){const s={attributeIDs:o||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!o,vertexColorSpace:i};return this.decodeGeometry(e,s).then(n).catch(a)}decodeGeometry(e,n){const o=JSON.stringify(n);if(Ce.has(e)){const l=Ce.get(e);if(l.key===o)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const i=this.workerNextTaskID++,a=e.byteLength,s=this._getWorker(i,a).then(l=>(r=l,new Promise((c,u)=>{r._callbacks[i]={resolve:c,reject:u},r.postMessage({type:"decode",id:i,taskConfig:n,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return s.catch(()=>!0).then(()=>{r&&i&&this._releaseTask(r,i)}),Ce.set(e,{key:o,promise:s}),s}_createGeometry(e){const n=new lt;e.index&&n.setIndex(new z(e.index.array,1));for(let o=0;o<e.attributes.length;o++){const{name:r,array:i,itemSize:a,stride:s,vertexColorSpace:l}=e.attributes[o];let c;if(a===s)c=new z(i,a);else{const u=new Bt(i,s);c=new Wt(u,a,0)}r==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(i instanceof Float32Array)),n.setAttribute(r,c)}return n}_assignVertexColorSpace(e,n){if(n!==le)return;const o=new ct;for(let r=0,i=e.count;r<i;r++)o.fromBufferAttribute(e,r),jt.colorSpaceToWorking(o,le),e.setXYZ(r,o.r,o.g,o.b)}_loadLibrary(e,n){const o=new qe(this.manager);return o.setPath(this.decoderPath),o.setResponseType(n),o.setWithCredentials(this.withCredentials),new Promise((r,i)=>{o.load(e,r,void 0,i)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",n=[];return e?n.push(this._loadLibrary("draco_decoder.js","text")):(n.push(this._loadLibrary("draco_wasm_wrapper.js","text")),n.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(n).then(o=>{const r=o[0];e||(this.decoderConfig.wasmBinary=o[1]);const i=Yn.toString(),a=["/* draco decoder */",r,"","/* worker */",i.substring(i.indexOf("{")+1,i.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,n){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(i){const a=i.data;switch(a.type){case"decode":r._callbacks[a.id].resolve(a);break;case"error":r._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,i){return r._taskLoad>i._taskLoad?-1:1});const o=this.workerPool[this.workerPool.length-1];return o._taskCosts[e]=n,o._taskLoad+=n,o})}_releaseTask(e,n){e._taskLoad-=e._taskCosts[n],delete e._callbacks[n],delete e._taskCosts[n]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function Yn(){let t,e;onmessage=function(a){const s=a.data;switch(s.type){case"init":t=s.decoderConfig,e=new Promise(function(u){t.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(t)});break;case"decode":const l=s.buffer,c=s.taskConfig;e.then(u=>{const h=u.draco,d=new h.Decoder;try{const m=n(h,d,new Int8Array(l),c),g=m.attributes.map(p=>p.array.buffer);m.index&&g.push(m.index.array.buffer),self.postMessage({type:"decode",id:s.id,geometry:m},g)}catch(m){console.error(m),self.postMessage({type:"error",id:s.id,error:m.message})}finally{h.destroy(d)}});break}};function n(a,s,l,c){const u=c.attributeIDs,h=c.attributeTypes;let d,m;const g=s.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,m=s.DecodeArrayToMesh(l,l.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,m=s.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!m.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+m.error_msg());const p={index:null,attributes:[]};for(const f in u){const F=self[h[f]];let x,S;if(c.useUniqueIDs)S=u[f],x=s.GetAttributeByUniqueId(d,S);else{if(S=s.GetAttributeId(d,a[u[f]]),S===-1)continue;x=s.GetAttribute(d,S)}const w=r(a,s,d,f,F,x);f==="color"&&(w.vertexColorSpace=c.vertexColorSpace),p.attributes.push(w)}return g===a.TRIANGULAR_MESH&&(p.index=o(a,s,d)),a.destroy(d),p}function o(a,s,l){const u=l.num_faces()*3,h=u*4,d=a._malloc(h);s.GetTrianglesUInt32Array(l,h,d);const m=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:m,itemSize:1}}function r(a,s,l,c,u,h){const d=l.num_points(),m=h.num_components(),g=i(a,u),p=m*u.BYTES_PER_ELEMENT,f=Math.ceil(p/4)*4,F=f/u.BYTES_PER_ELEMENT,x=d*p,S=d*f,w=a._malloc(x);s.GetAttributeDataArrayForAllPoints(l,h,g,x,w);const R=new u(a.HEAPF32.buffer,w,x/u.BYTES_PER_ELEMENT);let E;if(p===f)E=R.slice();else{E=new u(S/u.BYTES_PER_ELEMENT);let O=0;for(let A=0,W=R.length;A<W;A++){for(let Y=0;Y<m;Y++)E[O+Y]=R[A*m+Y];O+=F}}return a._free(w),{name:c,count:d,itemSize:m,array:E,stride:F}}function i(a,s){switch(s){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}const St=8e3,qn=[250,1e3];function vt(t){return t.reason??new DOMException("The operation was aborted.","AbortError")}function Vn(t){if(t?.aborted)throw vt(t)}function $n(t,e){return new Promise((n,o)=>{const r=()=>{clearTimeout(i),o(vt(e))},i=setTimeout(()=>{e?.removeEventListener("abort",r),n()},t);e?.addEventListener("abort",r,{once:!0})})}async function Kn(t,e={}){const{signal:n,retryDelaysMs:o=qn}=e;for(let r=0;;r++){Vn(n);try{return await t()}catch(i){if(n?.aborted||r>=o.length)throw i;await $n(o[r],n)}}}function gt(t,e={}){const{timeoutMs:n=St,retryDelaysMs:o}=e;return Kn(async()=>{const r=new AbortController,i=setTimeout(()=>r.abort(new DOMException("fetch timeout","TimeoutError")),n);try{return await fetch(t,{signal:r.signal})}finally{clearTimeout(i)}},{retryDelaysMs:o})}const wt='const U="DecompressionStream is unavailable for deflate streams";let M=null;const N="/vendor/shopify-s26/remote/cdn.jsdelivr.net/c2004f24ebc95241-index.web.js",p=self;p.onmessage=async e=>{const{id:o}=e.data;try{const n="buffer"in e.data?await R(e.data.buffer):B(e.data);p.postMessage({id:o,result:n},[n.positions.buffer,n.colors.buffer])}catch(n){p.postMessage({id:o,error:n instanceof Error?n.message:String(n)})}};function B(e){return{positions:q(e.posBytes,e.meta),colors:D(e.y,e.cb,e.cr,e.meta),count:e.meta.N,bounds:{min:[e.meta.bbox[0],e.meta.bbox[1],e.meta.bbox[2]],max:[e.meta.bbox[3],e.meta.bbox[4],e.meta.bbox[5]]}}}async function R(e){const o=new Uint8Array(e),n=new DataView(o.buffer,o.byteOffset,4).getUint32(0,!0),t=JSON.parse(new TextDecoder().decode(o.slice(4,4+n)));if(!t.format?.startsWith("mdpc-"))throw new Error(`Unsupported MDPC format: ${t.format}`);let r=4+n;const s=o.slice(r,r+t.posLen);r+=t.posLen;const c=o.slice(r,r+t.yLen);r+=t.yLen;const i=o.slice(r,r+t.cbLen);r+=t.cbLen;const f=o.slice(r,r+t.crLen),[d,w,h,l]=await Promise.all([u(s,t.codec),u(c,t.codec),u(i,t.codec),u(f,t.codec)]);return B({meta:t,posBytes:d,y:w,cb:h,cr:l})}async function u(e,o){const n=o==="deflate"?"deflate":"br",t=globalThis.DecompressionStream;if(t)try{const c=new Uint8Array(e.byteLength);c.set(e);const i=new Blob([c.buffer]).stream().pipeThrough(new t(n));return new Uint8Array(await new Response(i).arrayBuffer())}catch(c){if(n==="deflate")throw c}else if(n==="deflate")throw new Error(U);M??=import(N).then(async c=>{const i=await(c.default??c);if(typeof i?.decompress!="function")throw new Error("brotli-wasm did not expose decompress()");return i});const s=(await M).decompress(e);return s instanceof Uint8Array?s:new Uint8Array(s)}function q(e,o){const[n,t,r,s,c,i]=o.bbox,f=(1<<o.qpPos)-1,d=(s-n)/f,w=(c-t)/f,h=(i-r)/f,l=new Float32Array(o.N*3);let m=0n,E=0;for(let b=0;b<o.N;b+=1){let y=0n,g=0n;for(;;){const a=e[E++]??0;if(y|=BigInt(a&127)<<g,!(a&128))break;g+=7n}m+=y;let S=0,L=0,A=0;for(let a=0;a<o.qpPos;a+=1)m>>BigInt(a*3)&1n&&(S|=1<<a),m>>BigInt(a*3+1)&1n&&(L|=1<<a),m>>BigInt(a*3+2)&1n&&(A|=1<<a);l[b*3]=n+S*d,l[b*3+1]=t+L*w,l[b*3+2]=r+A*h}return l}function D(e,o,n,t){const r=new Float32Array(t.N*3);for(let s=0;s<t.N;s+=1){const c=e[s]??0,i=(o[Math.min(o.length-1,Math.floor(s/t.chromaSub))]??128)-128,f=(n[Math.min(n.length-1,Math.floor(s/t.chromaSub))]??128)-128;r[s*3]=x((c+1.402*f)/255),r[s*3+1]=x((c-.344136*i-.714136*f)/255),r[s*3+2]=x((c+1.772*i)/255)}return r}function x(e){return e<0?0:e>1?1:e}\n',Xe=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",wt],{type:"text/javascript;charset=utf-8"});function Jn(t){let e;try{if(e=Xe&&(self.URL||self.webkitURL).createObjectURL(Xe),!e)throw"";const n=new Worker(e,{type:"module",name:t?.name});return n.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),n}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(wt),{type:"module",name:t?.name})}}const Zn="DecompressionStream is unavailable for deflate streams",Re="Unsupported MDPC deflate stream: DecompressionStream('deflate') is unavailable in this browser";let ce=null,bt=1;const G=new Map,xt=1e4;let re=null;async function Ct(t,e={}){const n=await gt(t);if(!n.ok)throw k(new Error(`Failed to fetch ${t}: ${n.status}`),{assetUrl:t,phase:"mdpc-fetch"});let o;try{o=await n.arrayBuffer()}catch(h){throw k(h instanceof Error?h:new Error(String(h)),{assetUrl:t,phase:"mdpc-read"})}const r=o.byteLength,{meta:i,metaLen:a}=Qn(o,t);eo(i,t);const s=await to(o,i,a),l=s?await ro(s,t):await oo(o,t);return{...e.orientAsConverted??t.includes("/converted/")?Xn(l):l,byteSize:r,hasColors:!0}}function Xn(t){const e=new Float32Array(t.positions);for(let n=0;n<t.count;n++){const o=n*3;e[o+1]=-e[o+1],e[o+2]=-e[o+2]}return{...t,positions:e,bounds:{min:[t.bounds.min[0],-t.bounds.max[1],-t.bounds.max[2]],max:[t.bounds.max[0],-t.bounds.min[1],-t.bounds.min[2]]}}}function Tt(){return globalThis.DecompressionStream}function Qn(t,e){try{const n=new Uint8Array(t),o=new DataView(n.buffer,n.byteOffset,4).getUint32(0,!0),r=JSON.parse(new TextDecoder().decode(n.slice(4,4+o)));if(!r.format?.startsWith("mdpc-"))throw new Error(`Unsupported MDPC format: ${r.format}`);return{meta:r,metaLen:o}}catch(n){throw k(n instanceof Error?n:new Error(String(n)),{assetUrl:e,phase:"mdpc-parse"})}}function eo(t,e){if(t.codec!=="deflate")return;const n=Tt();if(!re||re.Ctor!==n)try{if(!n)throw new Error("missing constructor");new n("deflate"),re={Ctor:n,supported:!0}}catch{re={Ctor:n,supported:!1}}if(!re.supported)throw k(new Error(Re),{assetUrl:e,phase:"mdpc-unsupported-decompression-stream",decodeKind:"mdpc-native-preflight",mdpcFormat:t.format,mdpcCodec:t.codec,decompressionFormat:"deflate"})}async function to(t,e,n){const o=Tt();if(!o)return null;try{const r=new Uint8Array(t),i=e.codec==="deflate"?"deflate":"br";let a=4+n;const s=r.slice(a,a+e.posLen);a+=e.posLen;const l=r.slice(a,a+e.yLen);a+=e.yLen;const c=r.slice(a,a+e.cbLen);a+=e.cbLen;const u=r.slice(a,a+e.crLen),[h,d,m,g]=await Promise.all([pe(s,o,i),pe(l,o,i),pe(c,o,i),pe(u,o,i)]);return{meta:e,posBytes:h,y:d,cb:m,cr:g}}catch{return null}}async function pe(t,e,n){const o=new Uint8Array(t.byteLength);o.set(t);const r=new Blob([o.buffer]).stream().pipeThrough(new e(n));return new Uint8Array(await new Response(r).arrayBuffer())}function Se(t,e){return{assetUrl:t.url,phase:e,decodeKind:t.decodeKind,mdpcElapsedMs:mt(t.startedAt)}}function no(t,e){return t===Zn?k(new Error(Re),{...Se(e,"mdpc-unsupported-decompression-stream"),mdpcCodec:"deflate",decompressionFormat:"deflate"}):k(new Error(t),{...Se(e,"mdpc-decode")})}function Mt(t){for(const e of G.values())e.reject(t(e));G.clear()}function Ft(){ce?.terminate(),ce=null}function At(t,e){return t*(e+1)}function Dt(t,e){return setTimeout(()=>{G.has(t)&&(Ft(),Mt(n=>k(new Error(`MDPC worker decode timeout after ${e}ms`),{...Se(n,"mdpc-decode-timeout"),mdpcTimeoutMs:e})))},e)}function Pt(t,e,n,o,r,i){G.set(t,{resolve:a=>{clearTimeout(e),n(a)},reject:a=>{clearTimeout(e),o(a)},url:r,decodeKind:i,startedAt:performance.now()})}function oo(t,e){const n=bt++,o=_t();return new Promise((r,i)=>{const a=At(xt,G.size),s=Dt(n,a);Pt(n,s,r,i,e,"mdpc-worker"),o.postMessage({id:n,buffer:t},[t])})}function ro(t,e){const n=bt++,o=_t();return new Promise((r,i)=>{const a=At(xt,G.size),s=Dt(n,a);Pt(n,s,r,i,e,"mdpc-native-streams-worker"),o.postMessage({id:n,...t},[t.posBytes.buffer,t.y.buffer,t.cb.buffer,t.cr.buffer])})}function _t(){if(ce)return ce;const t=new Jn;return t.onmessage=e=>{const n=G.get(e.data.id);if(n){if(G.delete(e.data.id),e.data.error){n.reject(no(e.data.error,n));return}n.resolve(e.data.result)}},t.onerror=e=>{const n=e.filename?`${e.filename}:${e.lineno??"?"}:${e.colno??"?"}`:"unknown location",o=e.message||`MDPC worker failed at ${n}`;Mt(r=>k(new Error(o),{...Se(r,"mdpc-worker-error"),workerLocation:n})),Ft()},ce=t,t}const me=10,ao=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"];let J=null;const ae=new Map,Te=new Map;async function io(t,e={}){if(ae.has(t)){const r=Te.get(t);return e.orientAsConverted!==void 0&&r!==void 0&&e.orientAsConverted!==r&&`${t}${r}${e.orientAsConverted}`,ae.get(t)}Te.set(t,e.orientAsConverted);const n=/^(https?|blob):/.test(t)||t.startsWith("/vendor/shopify-s26/remote/"),o=(async()=>{if(n)return so(t,e.orientAsConverted);try{return await Ct(`/pointclouds/${t}.mdpc`,{orientAsConverted:e.orientAsConverted})}catch{}const r=`/pointclouds/${t}.bin`;if(await lo(r))return uo(r);throw new Error(`Pointcloud not found: ${t} (no .mdpc or .bin)`)})();return ae.set(t,o),o.catch(()=>{ae.get(t)===o&&(ae.delete(t),Te.delete(t))}),o}const Me=/\.(mdpc|bin)(?=[?#]|$)/;async function so(t,e){const n=Me.test(t)?[t.replace(Me,".bin"),t.replace(Me,".mdpc")]:[t];let o;for(let r=0;r<n.length;r++)try{return await Ct(n[r],{orientAsConverted:e})}catch(i){o=i}throw o instanceof Error?o:new Error(`Failed to load pointcloud: ${t}`)}async function lo(t){try{const e=await fetch(t,{method:"HEAD",signal:AbortSignal.timeout(St)});return e.ok?!(e.headers.get("content-type")??"").startsWith("text/html"):!1}catch{return!1}}function co(){return J||(J=new Wn,J.setDecoderPath("/draco/"),J.setDecoderConfig({type:"wasm"}),J.preload()),J}async function uo(t){const e=await gt(t);if(!e.ok)throw new Error(`Failed to fetch ${t}: ${e.status}`);const n=await e.arrayBuffer(),o=new TextDecoder,r=parseInt(o.decode(n.slice(0,me)),10);if(!Number.isFinite(r)||r<=0)throw new Error(`Invalid point cloud header: ${t}`);const i=JSON.parse(o.decode(n.slice(me,me+r))),a={},s={};if(Array.isArray(i.attributes))for(let c=0;c<i.attributes.length;c++){const[u,h]=i.attributes[c];a[u]=c,s[u]=ao[h]??"Float32Array"}else if(i.format==="draco-pointcloud"&&i.attributes)a.position=0,a.color=1,s.position="Float32Array",s.color="Float32Array";else throw new Error(`Unsupported point cloud metadata: ${t}`);const l=await co().decodeGeometry(n.slice(me+r),{attributeIDs:a,attributeTypes:s,useUniqueIDs:!0});return{...fo(l,ho(i.bounds)),byteSize:n.byteLength}}function fo(t,e){const n=t.getAttribute("position")??t.getAttribute("positions");if(!n)throw new Error("Point cloud has no position attribute");const o=n.array instanceof Float32Array?n.array:new Float32Array(n.array),r=o.length/3,i=t.getAttribute("color")??t.getAttribute("colors");let a=new Float32Array(r*3),s=!1;if(i){const l=i.array,c=i.array instanceof Uint8Array?1/255:i.array instanceof Uint16Array?1/65535:1;a=new Float32Array(l.length);for(let u=0;u<l.length;u++)a[u]=(l[u]??0)*c;s=yo(a)}return s||a.fill(1),t.dispose(),{positions:o,colors:a,count:r,hasColors:s,bounds:e}}function ho(t){if(!t||typeof t!="object")return;const e=t;if(!(!Qe(e.min)||!Qe(e.max)))return{min:e.min,max:e.max}}function Qe(t){return Array.isArray(t)&&t.length===3&&t.every(e=>typeof e=="number"&&Number.isFinite(e))}function po(t,e){const n=Math.random();if(!t.cdf||e<=0||Math.random()>e)return Math.floor(n*t.count);let o=0,r=t.cdf.length-1;for(;o<r;){const i=o+r>>1;t.cdf[i]<n?o=i+1:r=i}return o}function mo(t,e){const n=new Float32Array(t.positions),o=t.bounds?new b(...t.bounds.min):new b(1/0,1/0,1/0),r=t.bounds?new b(...t.bounds.max):new b(-1/0,-1/0,-1/0);if(!t.bounds)for(let l=0;l<t.count;l++){const c=n[l*3],u=n[l*3+1],h=n[l*3+2];c<o.x&&(o.x=c),c>r.x&&(r.x=c),u<o.y&&(o.y=u),u>r.y&&(r.y=u),h<o.z&&(o.z=h),h>r.z&&(r.z=h)}const i=new b().subVectors(r,o),a=new b().addVectors(o,r).multiplyScalar(.5),s=e*2/(Math.max(i.x,i.y,i.z)||1);for(let l=0;l<t.count;l++)n[l*3]=(n[l*3]-a.x)*s,n[l*3+1]=(n[l*3+1]-a.y)*s,n[l*3+2]=(n[l*3+2]-a.z)*s;return n}function yo(t){let e=-1/0,n=1/0;for(let o=0;o<t.length;o++){const r=t[o];if(!Number.isFinite(r))return!1;r<n&&(n=r),r>e&&(e=r)}return n>=0&&e<=1.5}const et={off:0,dots:1,xLines:2,yLines:3,zLines:4,floorGrid:5,sphere:6,ripple:7,spokes:8,spiral:10},So=new Set(["xLines","yLines","zLines","floorGrid"]),vo=2.5,Et=Math.PI*2;function Le(t){return et[t]??et.off}function Ot(t,e){return`${t.layout}:${t.gridSize}:${t.layoutRadius}:${t.layoutThickness}:${t.layoutPreserveY}:${t.layoutTwist}:${t.layoutAmplitude}:${t.layoutFrequency}:${t.layoutSpokes}:${t.layoutRadialSpacing}:${t.layoutTurns}:${t.layoutHeight}:${e}`}function Rt(t,e,n){const o=new Float32Array(e*3),r=n.layout;if(r==="off"||r==="dots")return o;const i=Math.max(Math.abs(n.gridSize),1e-4);return So.has(r)?(go(o,t,e,r,i),o):(wo(o,t,e,n,i),o)}function go(t,e,n,o,r){for(let i=0;i<n;i++){const a=i*3,s=e[a]??0,l=e[a+1]??0,c=e[a+2]??0,u=te(s,r),h=te(l,r),d=te(c,r);if(o==="xLines")t[a]=s,t[a+1]=h,t[a+2]=d;else if(o==="yLines")t[a]=u,t[a+1]=l,t[a+2]=d;else if(o==="zLines")t[a]=u,t[a+1]=h,t[a+2]=c;else{const m=(l-h)**2+(c-d)**2,g=(s-u)**2+(l-h)**2;t[a]=g<m?u:s,t[a+1]=h,t[a+2]=g<m?c:d}}}function wo(t,e,n,o,r){const i=Mo(e,n),a=new b,s=new b;for(let l=0;l<n;l++){const c=l*3;a.set(e[c]??0,e[c+1]??0,e[c+2]??0).sub(i.center).multiplyScalar(i.scale),o.layout==="sphere"?bo(s,a,o):o.layout==="ripple"?xo(s,a,o,r):o.layout==="spokes"?Co(s,a,o):To(s,a,o),s.divideScalar(i.scale).add(i.center),t[c]=s.x,t[c+1]=s.y,t[c+2]=s.z}}function bo(t,e,n){const o=e.length(),r=Math.max(n.layoutRadius??4.5,.001),i=T.clamp(n.layoutThickness??.9,0,1),a=T.clamp(n.layoutPreserveY??.35,0,1),s=o>1e-4?t.copy(e).divideScalar(o):t.set(0,1,0);t.copy(s).multiplyScalar(T.lerp(r,o,i)),t.y=T.lerp(t.y,e.y,a),Ao(t,t.y*(n.layoutTwist??0))}function xo(t,e,n,o){const r=Math.hypot(e.x,e.z),i=te(r,o),a=Math.atan2(e.z,e.x)+e.y*(n.layoutTwist??0),s=Math.sin(i*(n.layoutFrequency??11.5))*(n.layoutAmplitude??.16);t.set(Math.cos(a)*i,e.y+s,Math.sin(a)*i)}function Co(t,e,n){const o=Math.max(n.layoutSpokes??24,3),r=Et/o,i=Math.atan2(e.z,e.x)+e.y*(n.layoutTwist??0),a=te(i,r),s=n.layoutRadialSpacing??0;let l=Math.hypot(e.x,e.z);s>1e-4&&(l=te(l,s)),t.set(Math.cos(a)*l,e.y,Math.sin(a)*l)}function To(t,e,n){const o=T.clamp(e.y/5+.5,0,1),r=Math.max(n.layoutRadius??2.5,.001),i=Math.max(n.layoutHeight??5,.001),a=n.layoutTurns??3,s=o*a*Et+Math.hypot(e.x,e.z)*(n.layoutTwist??0);t.set(Math.cos(s)*r,(o-.5)*i,Math.sin(s)*r)}function Mo(t,e){const n=Fo(t,e,.001),o=n.getCenter(new b),r=n.getSize(new b),i=Math.max(r.x,r.y,r.z,1e-4);return{center:o,scale:vo*2/i}}function Fo(t,e,n){const o=new Yt,r=new b;for(let i=0;i<e;i++){const a=i*3;r.set(t[a]??0,t[a+1]??0,t[a+2]??0),o.expandByPoint(r)}return o.min.set(Math.floor(o.min.x/n)*n-n,Math.floor(o.min.y/n)*n-n,Math.floor(o.min.z/n)*n-n),o.max.set(Math.ceil(o.max.x/n)*n+n,Math.ceil(o.max.y/n)*n+n,Math.ceil(o.max.z/n)*n+n),o}function te(t,e){return Math.round(t/e)*e}function Ao(t,e){const n=Math.cos(e),o=Math.sin(e),r=t.x*n-t.z*o,i=t.x*o+t.z*n;t.x=r,t.z=i}const Do=`uniform float uTime;
uniform float uPointSize;
uniform float uDistanceSizeInfluence;
uniform float uDistanceSizeNear;
uniform float uDistanceSizeFar;
uniform float uDistanceSizeMax;
uniform float uPointSizeScale;
uniform float uDensityFillJitter;
uniform float uDensityFillPass;
uniform float uDensityFillPointSizeScale;
uniform float uMaxPointSize;
uniform float uSimplePoints;
uniform float uOpacity;
uniform float uExposure;
uniform float uTransparentPoints;
uniform vec3 uRandomize;
uniform float uCamFadeNear;
uniform float uCamFadeFar;
uniform float uCamFadeEnabled;
uniform float uDPR;
// Adaptive render scale (1 = full). gl_PointSize and uMaxPointSize are both in
// render-target device pixels; uDPR already carries renderScale into the point
// size, so the max-size ceiling is scaled here too to stay invariant on the
// upsampled quad (clamped near points pixelate with the scene, not balloon).
uniform float uRenderScale;
uniform float uFlowEnabled;
uniform float uFlowType;
uniform float uFlowStrength;
uniform float uFlowSpeed;
uniform float uFlowScale;
uniform float uFlowGridLayout;
uniform float uFlowGridEnabled;
uniform float uFlowGridSize;
uniform float uFlowGridStrength;
uniform vec3 uFlowGridMix;
uniform vec3 uFlowGridRotation;
uniform float uFlowConveyorEnabled;
uniform float uFlowConveyorSpeed;
uniform float uFlowConveyorDepth;
uniform vec3 uFlowConveyorAxis;
uniform float uFlowConveyorDistanceNear;
uniform float uFlowConveyorDistanceFar;
uniform float uFlowRandomnessExponent;
uniform float uFlowDistanceNear;
uniform float uFlowDistanceFar;
uniform sampler2D uFluidVelocity;
uniform float uFluidInfluence;
uniform float uTransitionYOffset;
uniform float uTransitionProgress;
uniform float uTransitionRestProgress;
uniform float uTransitionPow;
uniform float uIntroColorMix;
uniform float uSelectiveAmount;
uniform vec3 uSelectiveAdj[__POINTCLOUD_COLOR_CORRECTION_RANGE_COUNT__];
uniform float uAnchorHighlightOpacity;
uniform float uAnchorHighlightScale;
uniform vec3 uAnchorGlowPositions[8];
uniform float uAnchorGlowRadius;
uniform float uAnchorGlowStrength;
uniform float uAnchorGlowPulse[8];
uniform float uAnchorGlowStrumStrength;
const int SDF_SHAPE_COUNT = __SDF_SHAPE_COUNT__;
uniform int uSdfShapeCount;
uniform float uSdfShapeType[SDF_SHAPE_COUNT];
uniform float uSdfShapeStrength[SDF_SHAPE_COUNT];
uniform float uSdfShapeFalloff[SDF_SHAPE_COUNT];
uniform float uSdfShapeGradient[SDF_SHAPE_COUNT];
uniform float uSdfShapePolarity[SDF_SHAPE_COUNT];
uniform vec4 uSdfShapeParams[SDF_SHAPE_COUNT];
uniform vec4 uSdfShapeBounds[SDF_SHAPE_COUNT];
uniform mat4 uSdfShapeInverseMatrices[SDF_SHAPE_COUNT];

attribute float aSize;
attribute vec4 aRandom;
attribute float aAnchorHighlight;
attribute vec3 aLayoutTarget;

varying vec3 vCloudColor;
varying float vSplatSize;
varying vec3 vWorldPosition;
varying float vAnchorGlow;
varying float vProjectedPointSize;
varying float vCameraFade;
varying float vSparkleSeed;

const float ANCHOR_PROJECTED_POINT_SIZE = 2.0;
const float CONVEYOR_SPEED_SCALE = 0.6;

float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}

#if POINTCLOUD_USE_FLOW
float valueNoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z
  );
}

vec3 curlNoise(vec3 p) {
  float e = 0.1;
  float n1 = valueNoise(p + vec3(0.0, e, 0.0));
  float n2 = valueNoise(p - vec3(0.0, e, 0.0));
  float a = (n1 - n2) / (2.0 * e);
  n1 = valueNoise(p + vec3(0.0, 0.0, e));
  n2 = valueNoise(p - vec3(0.0, 0.0, e));
  float b = (n1 - n2) / (2.0 * e);
  n1 = valueNoise(p + vec3(e, 0.0, 0.0));
  n2 = valueNoise(p - vec3(e, 0.0, 0.0));
  float c = (n1 - n2) / (2.0 * e);
  return normalize(vec3(a - b, b - c, c - a));
}

float applyFlow(inout vec3 pos, float distanceToCamera) {
  if (uFlowEnabled < 0.5 || uFlowStrength <= 0.0) return 1.0;
  float flowMask = smoothstep(uFlowDistanceFar, uFlowDistanceNear, distanceToCamera);
  if (flowMask <= 0.0001) return 1.0;
  float t = uTime * uFlowSpeed;
  float s = max(uFlowScale, 0.0001);
  float strength = uFlowStrength * flowMask;
  if (uFlowType < 2.5) {
    vec3 curl = curlNoise(pos * s + vec3(t * 0.08, t * 0.05, -t * 0.04));
    pos += curl * strength * 0.16 * (0.45 + aRandom.w);
    return 1.0;
  } else {
    float sparseMask = pow(aRandom.x, max(uFlowRandomnessExponent, 1.0));
    float rise = fract(t * 0.04 + pow(aRandom.y, 10.0) * 20.0);
    float lifeScale = smoothstep(0.0, 0.08, rise) * (1.0 - smoothstep(0.82, 1.0, rise));
    pos.y += rise * sparseMask * strength * 7.0 * mix(0.4, 1.2, aRandom.z);
    pos.y += sin(t + aRandom.x * 20.0) * sparseMask * strength * 0.08 * aRandom.w;
    return lifeScale;
  }
}
#endif

#if POINTCLOUD_USE_FLOW_LAYOUT
vec3 rotateX(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

vec3 rotateY(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

vec3 rotateZ(vec3 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec3(p.x * c - p.y * s, p.x * s + p.y * c, p.z);
}

vec3 rotateGrid(vec3 p, vec3 rotation) {
  p = rotateX(p, rotation.x);
  p = rotateY(p, rotation.y);
  return rotateZ(p, rotation.z);
}

vec3 rotateGridInverse(vec3 p, vec3 rotation) {
  p = rotateZ(p, -rotation.z);
  p = rotateY(p, -rotation.y);
  return rotateX(p, -rotation.x);
}

vec3 applyFlowLayout(vec3 pos, float mask) {
  if (
    uFlowGridEnabled < 0.5 ||
    uFlowGridLayout < 0.5 ||
    uFlowGridStrength <= 0.0 ||
    mask <= 0.0
  ) {
    return pos;
  }
  vec3 target = aLayoutTarget;
  if (uFlowGridLayout < 1.5) {
    float gridSize = max(uFlowGridSize, 0.0001);
    vec3 gridPos = rotateGridInverse(pos, uFlowGridRotation);
    vec3 snapped = floor(gridPos / gridSize + 0.5) * gridSize;
    vec3 gridMix = clamp(uFlowGridMix, vec3(0.0), vec3(1.0));
    return rotateGrid(mix(gridPos, snapped, gridMix), uFlowGridRotation);
  }
  return mix(pos, target, clamp(uFlowGridStrength, 0.0, 1.0));
}
#endif

#if POINTCLOUD_USE_CONVEYOR
float conveyorFlowOffset(vec4 mv, float mask, out float life) {
  life = 1.0;
  if (uFlowConveyorEnabled < 0.5 || mask <= 0.0) {
    return 0.0;
  }
  float speed = uFlowConveyorSpeed * CONVEYOR_SPEED_SCALE;
  if (abs(speed) <= 0.0001) {
    return 0.0;
  }
  float depth = max(uFlowConveyorDepth, 0.001);
  float distanceToCamera = max(-mv.z, 0.001);
  float flowMask = smoothstep(
    uFlowConveyorDistanceFar,
    uFlowConveyorDistanceNear,
    distanceToCamera
  );
  if (flowMask <= 0.0001) {
    return 0.0;
  }
  float direction = speed >= 0.0 ? 1.0 : -1.0;
  float phase = fract(aRandom.x + uTime * abs(speed) / depth);
  life = 1.0 - smoothstep(0.25, 0.5, abs(phase - 0.5));
  return (phase - 0.5) * depth * direction * flowMask;
}
#endif

float anchorGlowForPosition(vec3 pos) {
  float glow = 0.0;
  for (int i = 0; i < 8; i++) {
    float pulse = uAnchorGlowPulse[i];
    float radius = max(uAnchorGlowRadius, 0.0001);
    float particleStrength = mix(0.45, 1.15, pow(aRandom.y, 0.65));
    float strength = (uAnchorGlowStrength + pulse * uAnchorGlowStrumStrength) * particleStrength;
    float d = distance(pos, uAnchorGlowPositions[i]);
    float falloff = clamp(1.0 - d / radius, 0.0, 1.0);
    falloff = falloff * falloff * falloff * falloff;
    glow = max(glow, falloff * strength);
  }
  return glow;
}

float sdfSphere(vec3 p, float radius) {
  return length(p) - max(radius, 0.0001);
}

float sdfBox(vec3 p, vec3 halfExtents) {
  vec3 q = abs(p) - max(halfExtents, vec3(0.0001));
  return length(max(q, vec3(0.0))) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdfTorus(vec3 p, vec2 torus) {
  vec2 q = vec2(length(p.xz) - max(torus.x, 0.0001), p.y);
  return length(q) - max(torus.y, 0.0001);
}

float sdfCylinder(vec3 p, float radius, float halfHeight) {
  vec2 d = abs(vec2(length(p.xz), p.y)) -
    vec2(max(radius, 0.0001), max(halfHeight, 0.0001));
  return min(max(d.x, d.y), 0.0) + length(max(d, vec2(0.0)));
}

const float SDF_INV_SQRT_3 = 0.57735027;
const float DODECAHEDRON_NORMAL_SHORT = 0.35682209;
const float DODECAHEDRON_NORMAL_LONG = 0.93417236;
const vec3 DODECAHEDRON_NORMAL_111 = vec3(SDF_INV_SQRT_3);
const vec3 DODECAHEDRON_NORMAL_0SL = vec3(
  0.0,
  DODECAHEDRON_NORMAL_SHORT,
  DODECAHEDRON_NORMAL_LONG
);
const vec3 DODECAHEDRON_NORMAL_SL0 = vec3(
  DODECAHEDRON_NORMAL_SHORT,
  DODECAHEDRON_NORMAL_LONG,
  0.0
);
const vec3 DODECAHEDRON_NORMAL_L0S = vec3(
  DODECAHEDRON_NORMAL_LONG,
  0.0,
  DODECAHEDRON_NORMAL_SHORT
);

float sdfOctahedron(vec3 p, float size) {
  return (dot(abs(p), vec3(1.0)) - max(size, 0.0001)) * SDF_INV_SQRT_3;
}

float sdfDodecahedron(vec3 p, float radius) {
  vec3 q = abs(p);
  float d = dot(q, DODECAHEDRON_NORMAL_111);
  d = max(d, dot(q, DODECAHEDRON_NORMAL_0SL));
  d = max(d, dot(q, DODECAHEDRON_NORMAL_SL0));
  d = max(d, dot(q, DODECAHEDRON_NORMAL_L0S));
  return d - max(radius, 0.0001);
}

// Type indices must match getSdfShapeTypeIndex() in PointcloudObject.ts.
float sdfForShapeLocal(int shapeType, vec4 params, vec3 localPosition) {
  if (shapeType == 1) {
    return sdfSphere(localPosition, params.x);
  }
  if (shapeType == 2) {
    return sdfBox(localPosition, params.xyz);
  }
  if (shapeType == 3) {
    return sdfTorus(localPosition, params.xy);
  }
  if (shapeType == 4) {
    return sdfCylinder(localPosition, params.x, params.y);
  }
  if (shapeType == 5) {
    return sdfOctahedron(localPosition, params.x);
  }
  if (shapeType == 6) {
    return sdfDodecahedron(localPosition, params.x);
  }
  return 1e6;
}

vec3 sdfNormalForShapeLocal(int shapeType, vec4 params, vec3 localPosition) {
  float e = 0.006;
  vec2 k = vec2(1.0, -1.0);
  vec3 n =
    k.xyy * sdfForShapeLocal(shapeType, params, localPosition + k.xyy * e) +
    k.yyx * sdfForShapeLocal(shapeType, params, localPosition + k.yyx * e) +
    k.yxy * sdfForShapeLocal(shapeType, params, localPosition + k.yxy * e) +
    k.xxx * sdfForShapeLocal(shapeType, params, localPosition + k.xxx * e);
  float lenSq = dot(n, n);
  if (lenSq <= 0.000001) {
    vec3 fallback = localPosition + aRandom.xyz - vec3(0.5);
    lenSq = max(dot(fallback, fallback), 0.000001);
    return fallback * inversesqrt(lenSq);
  }
  return n * inversesqrt(lenSq);
}

// Quintic ease (Perlin smootherstep). C2-continuous, unlike GLSL's cubic
// smoothstep, so the push ramps in/out with no derivative kink -> the
// displacement varies smoothly with distance and reads as more fluid.
float smootherstep01(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

vec3 applySdfShapeCollision(vec3 pos, float mask) {
  if (mask <= 0.0 || uSdfShapeCount <= 0) {
    return pos;
  }
  vec3 pushed = pos;
  int shapeCount = min(uSdfShapeCount, SDF_SHAPE_COUNT);
  for (int i = 0; i < shapeCount; i++) {
    float strength = uSdfShapeStrength[i];
    float falloff = uSdfShapeFalloff[i];
    if (strength <= 0.0001 || falloff <= 0.0001) {
      continue;
    }

    vec4 bounds = uSdfShapeBounds[i];
    vec3 centerDelta = pushed - bounds.xyz;
    if (dot(centerDelta, centerDelta) > bounds.w * bounds.w) {
      continue;
    }

    int shapeType = int(uSdfShapeType[i] + 0.5);
    vec4 params = uSdfShapeParams[i];
    mat4 inverseMatrix = uSdfShapeInverseMatrices[i];
    vec3 localPosition = (inverseMatrix * vec4(pushed, 1.0)).xyz;
    float distanceToShape = sdfForShapeLocal(shapeType, params, localPosition);
    if (distanceToShape >= falloff) {
      continue;
    }

    vec3 localNormal = sdfNormalForShapeLocal(shapeType, params, localPosition);
    mat3 inverseBasis = mat3(inverseMatrix);
    vec3 cloudNormalRaw = vec3(
      dot(inverseBasis[0], localNormal),
      dot(inverseBasis[1], localNormal),
      dot(inverseBasis[2], localNormal)
    );
    float normalLenSq = dot(cloudNormalRaw, cloudNormalRaw);
    vec3 cloudNormal = normalLenSq > 0.000001
      ? cloudNormalRaw * inversesqrt(normalLenSq)
      : normalize(aRandom.xyz - vec3(0.5));
    // Normalized distance through the influence band: 0 at the surface,
    // 1 at the outer falloff edge. Reach (falloff) and push magnitude
    // (strength) are decoupled so widening the band no longer strengthens
    // the push -- they can be dialed independently.
    float outsideDistance = max(distanceToShape, 0.0);
    float bandT = clamp(outsideDistance / falloff, 0.0, 1.0);
    // Quintic shoulder, then gradient shapes how fast the push damps with
    // distance: >1 hugs the surface (steeper damping), <1 reaches farther
    // (gentler damping).
    float fade = 1.0 - smootherstep01(bandT);
    fade = pow(fade, max(uSdfShapeGradient[i], 0.001));
    // Particles inside the shape eject outward, ramping to a capped
    // one-falloff depth so deeply-buried points don't fling out arbitrarily.
    float interior = clamp(-distanceToShape / falloff, 0.0, 1.0);
    float repel = strength * (fade + interior);
    pushed += cloudNormal * repel * uSdfShapePolarity[i];
  }
  return pushed;
}

vec3 markdownPaletteColor(float seed) {
  float r = fract(seed * 4.91 + aRandom.y * 2.37);
  if (r < 0.2) return vec3(0.2196, 0.7765, 0.3059);
  if (r < 0.55) return vec3(0.5059, 0.4275, 0.9176);
  if (r < 0.72) return vec3(0.8549, 0.4078, 0.9843);
  if (r < 0.88) return vec3(0.2667, 0.5569, 0.9647);
  return vec3(0.8980);
}

vec3 remapToMarkdownColor(vec3 sourceColor, float seed) {
  vec3 palette = markdownPaletteColor(seed);
  float luma = dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));
  float value = max(max(sourceColor.r, sourceColor.g), sourceColor.b);
  float brightness = mix(luma, value, 0.45);
  vec3 chroma = normalize(max(palette, vec3(0.001)));
  vec3 colored = chroma * (0.18 + brightness * 1.55);
  return mix(vec3(brightness), colored, 0.86);
}

// Triangular weight for a hue sector centered at \`center\` (in turns 0..1),
// linearly falling to zero at ±1/6 turn away.
float hueSectorWeight(float hue, float center) {
  float d = abs(hue - center);
  d = min(d, 1.0 - d);
  return clamp(1.0 - d * 6.0, 0.0, 1.0);
}

float hueToRgbChannel(float p, float q, float t) {
  t = fract(t);
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 0.5) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

vec3 hslToRgb(vec3 hsl) {
  float h = hsl.x;
  float s = clamp(hsl.y, 0.0, 1.0);
  float l = clamp(hsl.z, 0.0, 1.0);
  if (s < 0.0001) return vec3(l);
  float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
  float p = 2.0 * l - q;
  return vec3(
    hueToRgbChannel(p, q, h + 1.0 / 3.0),
    hueToRgbChannel(p, q, h),
    hueToRgbChannel(p, q, h - 1.0 / 3.0)
  );
}

vec3 applySelectiveColor(vec3 rgb) {
  float amount = clamp(uSelectiveAmount, 0.0, 1.0);
  if (amount < 0.0001) return rgb;

  float maxC = max(rgb.r, max(rgb.g, rgb.b));
  float minC = min(rgb.r, min(rgb.g, rgb.b));
  float chroma = maxC - minC;

  // Hue weights (R/Y/G/C/B/M) — scaled by saturation so neutrals don't bleed.
  float hue = 0.0;
  vec4 wRYGC = vec4(0.0);
  vec2 wBM = vec2(0.0);
  if (chroma > 0.0001) {
    if (rgb.r >= rgb.g && rgb.r >= rgb.b) {
      hue = (rgb.g - rgb.b) / chroma;
      if (hue < 0.0) hue += 6.0;
    } else if (rgb.g >= rgb.b) {
      hue = (rgb.b - rgb.r) / chroma + 2.0;
    } else {
      hue = (rgb.r - rgb.g) / chroma + 4.0;
    }
    hue *= 1.0 / 6.0; // turns
    wRYGC = vec4(
      hueSectorWeight(hue, 0.0 / 6.0),
      hueSectorWeight(hue, 1.0 / 6.0),
      hueSectorWeight(hue, 2.0 / 6.0),
      hueSectorWeight(hue, 3.0 / 6.0)
    );
    wBM = vec2(
      hueSectorWeight(hue, 4.0 / 6.0),
      hueSectorWeight(hue, 5.0 / 6.0)
    );
  }

  // Lightness weights (W/N/K) — based on max+min midpoint.
  float L = (maxC + minC) * 0.5;
  float wW = smoothstep(0.5, 1.0, L);
  float wK = 1.0 - smoothstep(0.0, 0.5, L);
  float wN = clamp(1.0 - abs(L * 2.0 - 1.0), 0.0, 1.0);

  // Accumulate weighted HSL deltas. Each uSelectiveAdj is (hueShiftTurns, satAdd, litAdd).
  vec3 totalAdj =
    wRYGC.x * uSelectiveAdj[0] +
    wRYGC.y * uSelectiveAdj[1] +
    wRYGC.z * uSelectiveAdj[2] +
    wRYGC.w * uSelectiveAdj[3] +
    wBM.x   * uSelectiveAdj[4] +
    wBM.y   * uSelectiveAdj[5] +
    wW      * uSelectiveAdj[6] +
    wN      * uSelectiveAdj[7] +
    wK      * uSelectiveAdj[8];
  totalAdj *= amount;

  float saturation = chroma > 0.0001
    ? (L > 0.5 ? chroma / max(2.0 - maxC - minC, 0.0001) : chroma / max(maxC + minC, 0.0001))
    : 0.0;

  vec3 hsl = vec3(
    fract(hue + totalAdj.x),
    clamp(saturation + totalAdj.y, 0.0, 1.0),
    clamp(L + totalAdj.z, 0.0, 1.0)
  );
  return clamp(hslToRgb(hsl), 0.0, 1.0);
}

void main() {
  float anchorHighlight = clamp(aAnchorHighlight * uAnchorHighlightOpacity, 0.0, 1.0);
  vSplatSize = aSize;
  vSparkleSeed = fract(aRandom.x * 17.13 + aRandom.y * 3.71 + aRandom.z * 11.47);
  vec3 pos = position;
  float anchorMotionMask = 1.0 - step(0.0001, aAnchorHighlight);
  pos += (aRandom.xyz * 2.0 - 1.0) * uRandomize * anchorMotionMask;
#if POINTCLOUD_USE_DENSITY_FILL
  if (uDensityFillJitter > 0.0) {
    vec3 densityFillJitter = vec3(
      hash(aRandom.xyz + vec3(uDensityFillPass * 11.13, 0.0, 0.0)),
      hash(aRandom.yzx + vec3(0.0, uDensityFillPass * 17.71, 0.0)),
      hash(aRandom.zxy + vec3(0.0, 0.0, uDensityFillPass * 23.37))
    );
    pos += (densityFillJitter * 2.0 - 1.0) * uDensityFillJitter * anchorMotionMask;
  }
#endif
  pos.y += sin(uTime * 0.18 + aRandom.x * 12.0) * 0.006 * anchorMotionMask;
  float restProgress = clamp(uTransitionRestProgress, 0.0001, 1.0);
  float transitionSettle = smoothstep(0.0, restProgress, clamp(uTransitionProgress, 0.0, 1.0));
  float transitionMask = pow(aRandom.y, max(uTransitionPow, 0.0001)) * mix(0.35, 1.0, aRandom.z);
  float transitionFloat = transitionMask * (1.0 - transitionSettle);
  pos.y += uTransitionYOffset * transitionFloat * anchorMotionMask;
  float conveyorLife = 1.0;
  float conveyorOffset = 0.0;
  float flowSize = 1.0;
#if POINTCLOUD_USE_FLOW || POINTCLOUD_USE_CONVEYOR
  vec4 preFlowMv = viewMatrix * modelMatrix * vec4(pos, 1.0);
#endif
#if POINTCLOUD_USE_CONVEYOR
  conveyorOffset = conveyorFlowOffset(preFlowMv, anchorMotionMask, conveyorLife);
#endif
#if POINTCLOUD_USE_FLOW
  float preFlowDistance = length(preFlowMv.xyz);
  flowSize = anchorMotionMask > 0.5 ? applyFlow(pos, preFlowDistance) : 1.0;
#endif
#if POINTCLOUD_USE_FLOW_LAYOUT
  pos = applyFlowLayout(pos, anchorMotionMask);
#endif
  float simpleMask = step(0.5, uSimplePoints);
  pos = applySdfShapeCollision(pos, anchorMotionMask);
  vAnchorGlow = simpleMask > 0.5
    ? 0.0
    : clamp(anchorGlowForPosition(pos) * uAnchorHighlightOpacity, 0.0, 1.0);
  vec3 introColor = remapToMarkdownColor(color, aRandom.x);
  vec3 baseColor = mix(color, introColor, clamp(uIntroColorMix, 0.0, 1.0));
  baseColor = applySelectiveColor(baseColor) * exp2(uExposure);
  vCloudColor = mix(baseColor, vec3(1.0), clamp(vAnchorGlow, 0.0, 1.0));

  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
#if POINTCLOUD_USE_CONVEYOR
  vec3 conveyorAxisWorld = normalize(mat3(modelMatrix) * uFlowConveyorAxis);
  worldPosition.xyz += conveyorAxisWorld * conveyorOffset;
#endif
  vec4 mv = viewMatrix * worldPosition;
  vWorldPosition = worldPosition.xyz;
#if POINTCLOUD_USE_FLUID
  if (simpleMask < 0.5 && uFluidInfluence > 0.0) {
    vec4 clipPos = projectionMatrix * mv;
    vec2 screenUV = clamp(clipPos.xy / max(clipPos.w, 0.0001) * 0.5 + 0.5, 0.0, 1.0);
    vec2 fluidVel = texture2D(uFluidVelocity, screenUV).xy;
    float depthAtten = 1.0 / (1.0 + max(-mv.z, 0.0) * 0.3);
    mv.xy += fluidVel * uFluidInfluence * 0.02 * depthAtten * anchorMotionMask;
  }
#endif
  float dist = length(mv.xyz);
  vCameraFade = uCamFadeEnabled > 0.5
    ? 1.0 - smoothstep(uCamFadeNear, max(uCamFadeFar, uCamFadeNear + 0.0001), dist)
    : 1.0;
  float baseSize = mix(0.6, 1.6, pow(aRandom.z, 4.0));
  float splatSize = mix(0.65, 1.35, vSplatSize);
  baseSize *= mix(1.0, splatSize, 0.3);
  float distSizeT = smoothstep(uDistanceSizeNear, uDistanceSizeFar, dist);
  float distSize = mix(1.0, uDistanceSizeMax, distSizeT);
  baseSize *= mix(1.0, distSize, uDistanceSizeInfluence);
  baseSize *= flowSize;
  baseSize *= conveyorLife;
  float opaqueSizeScale = mix(max(uOpacity, 0.0), 1.0, step(0.5, uTransparentPoints));
  float ps =
    uPointSize *
    max(uPointSizeScale, 0.001) *
    baseSize *
    opaqueSizeScale *
    max(uDensityFillPointSizeScale, 0.001) *
    uDPR *
    (120.0 / max(dist, 0.1));
  // ps is in render-target px, which shrink with renderScale; the frag's
  // min-size cull is an on-screen threshold, so normalize back to on-screen px
  // (÷ uRenderScale) — otherwise the cull tightens as the scale drops and faint
  // transparent points pop out while the scale animates. /1 at full scale.
  vProjectedPointSize = ps / uRenderScale;
  gl_PointSize = clamp(ps, 0.0, uMaxPointSize * uRenderScale);
  gl_Position = projectionMatrix * mv;
}
`,Po=`precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform float uLoadFade;
uniform float uDensityFillOpacityScale;
uniform float uTransparentPoints;
uniform float uCausticsEnabled;
uniform float uCausticsStrength;
uniform float uCausticsScale;
uniform float uCausticsPower;
uniform float uCausticsSparkle;
uniform vec3 uCausticsAxisScale;
uniform vec3 uCausticsSpeed;
uniform vec3 uCausticsColor;

varying vec3 vCloudColor;
varying vec3 vWorldPosition;
varying float vAnchorGlow;
varying float vProjectedPointSize;
varying float vCameraFade;
varying float vSparkleSeed;

const float MIN_PROJECTED_POINT_SIZE = 0.55;

#if POINTCLOUD_USE_CAUSTICS
float dotNoise(vec3 p) {
  const float PHI = 1.618033988;
  const mat3 GOLD = mat3(
    -0.571464913, 0.814921382, 0.096597072,
    -0.278044873, -0.303026659, 0.911518454,
    0.772087367, 0.494042493, 0.399753815
  );
  return dot(cos(GOLD * p), sin(PHI * p * GOLD));
}

float causticsPattern(vec3 worldPos) {
  float scale = max(uCausticsScale, 0.0001);
  vec3 p = worldPos * scale * max(uCausticsAxisScale, vec3(0.0001));
  vec3 drift = uTime * uCausticsSpeed;
  float n1 = dotNoise(p + drift);
  float n2 = dotNoise(p * 1.73 + vec3(-drift.y, drift.z, -drift.x));
  float n3 = dotNoise(p * 3.11 + vec3(drift.z, -drift.x, drift.y));
  float ridges = max(
    0.0,
    1.0 - min(min(abs(n1), abs(n2)), abs(n3)) * 1.7
  );
  float crossings = max(0.0, 1.0 - abs(n1 + n2 * 0.55 - n3 * 0.35) * 1.15);
  return pow(
    clamp(ridges * 0.82 + crossings * 0.28, 0.0, 1.0),
    max(0.001, uCausticsPower)
  );
}

vec3 applyCaustics(vec3 color, float r2) {
  if (uCausticsEnabled > 0.5) {
    float pointMask = 0.55 + 0.45 * smoothstep(0.25, 0.0, r2);
    float caustics = causticsPattern(vWorldPosition) * uCausticsStrength;
    color += uCausticsColor * caustics * pointMask;

    if (uCausticsSparkle > 0.0001) {
      float sparse = smoothstep(0.985, 1.0, vSparkleSeed);
      float twinkle = 0.5 + 0.5 * sin(
        uTime * mix(4.0, 11.0, vSparkleSeed) + vSparkleSeed * 37.699112
      );
      float pulse = smoothstep(0.72, 1.0, twinkle);
      pulse *= pulse * pulse;
      float center = smoothstep(0.18, 0.0, r2);
      float sparkle = uCausticsSparkle * sparse * pulse * center;
      color += mix(uCausticsColor, vec3(1.0), 0.82) * sparkle;
    }
  }
  return color;
}
#endif

void main() {
  float minPointSize = mix(0.01, MIN_PROJECTED_POINT_SIZE, step(0.5, uTransparentPoints));
  if (vProjectedPointSize < minPointSize) discard;

  vec2 uv = gl_PointCoord - 0.5;
  float r2 = dot(uv, uv);
  if (r2 > 0.25) discard;

  vec3 color = vCloudColor;
#if POINTCLOUD_USE_CAUSTICS
  color = applyCaustics(color, r2);
#endif
  float alpha = mix(1.0, uOpacity, step(0.5, uTransparentPoints)) * uDensityFillOpacityScale * vCameraFade * uLoadFade;
  gl_FragColor = vec4(clamp(color, vec3(0.0), vec3(1.0)), alpha);
}
`,_o="__POINTCLOUD_COLOR_CORRECTION_RANGE_COUNT__",Eo="__SDF_SHAPE_COUNT__",tt=8,D=4,Oo=1048576,Ro=2.5,Lo=.3,No=.995,zo=1;function Lt(t,e){const n=e.gridStrength??1;return t.set(e.gridMix?.x??(e.gridAxes?.x===!1?0:n),e.gridMix?.y??(e.gridAxes?.y===!1?0:n),e.gridMix?.z??(e.gridAxes?.z===!1?0:n)),t.x=T.clamp(t.x,0,1),t.y=T.clamp(t.y,0,1),t.z=T.clamp(t.z,0,1),t}const nt=new Jt(0,0,0,"XYZ");function Nt(t,e){return nt.set(e?.x??0,e?.y??0,e?.z??0),t.set(0,0,1).applyEuler(nt).normalize()}function zt(t){return Math.max(t??Ln,1)}function ot(t){return t?`${t.source512}:${t.source256}`:"default"}function Pe(t,e){return t===512&&e?.source512!==void 0?e.source512:t===256&&e?.source256!==void 0?e.source256:De(t)}function Uo(t){const e=t??Oe;return`${e.enabled}:${e.opacity}:${e.pointSizeScale}:${e.jitter}`}function Z(t){return t?1:0}function _e(t,e){if(!t)return{POINTCLOUD_USE_FLOW:1,POINTCLOUD_USE_FLOW_LAYOUT:1,POINTCLOUD_USE_CONVEYOR:1,POINTCLOUD_USE_FLUID:1,POINTCLOUD_USE_DENSITY_FILL:1,POINTCLOUD_USE_CAUSTICS:1};const n=t.flow,o=n.enabled&&n.strength>0,r=n.gridEnabled&&Le(n.layout)>0&&n.gridStrength>0,i=n.conveyorEnabled&&Math.abs(n.conveyorSpeed)>1e-4,a=e.fluidEnabled!==!1&&t.fluid.enabled&&t.fluid.influence>0,s=t.densityFill??Oe,l=s.enabled&&s.opacity>0,c=t.caustics,u=c===void 0||c.enabled&&(c.strength>0||Math.max(c.sparkle,0)>0);return{POINTCLOUD_USE_FLOW:Z(o),POINTCLOUD_USE_FLOW_LAYOUT:Z(r),POINTCLOUD_USE_CONVEYOR:Z(i),POINTCLOUD_USE_FLUID:Z(a),POINTCLOUD_USE_DENSITY_FILL:Z(l),POINTCLOUD_USE_CAUSTICS:Z(u)}}function rt(t){return`${t.POINTCLOUD_USE_FLOW}${t.POINTCLOUD_USE_FLOW_LAYOUT}${t.POINTCLOUD_USE_CONVEYOR}${t.POINTCLOUD_USE_FLUID}${t.POINTCLOUD_USE_DENSITY_FILL}${t.POINTCLOUD_USE_CAUSTICS}`}class Ne extends qt{pointCount;visiblePointCount;cloudInfo=null;sourcePositions;anchorHighlightValues;anchorHighlightAttribute;points;cloudMaterial;densityFillPoints;densityFillMaterial;pointcloud;transparentPoints=!0;blendMode="normal";loadFade=1;textureSize;pointSizeResolutionMultiplier;lastParticleScalarsKey="";lastDensityFillKey="";lastShaderDefinesKey="";fluidOptionEnabled;lastColorCorrections=null;layoutTargetAttribute;layoutTargetSignature;constructor(e,n={}){const o=n.radius??Ro,r=n.maxPoints??Oo,i=n.samplingInfluence??Lo,a=n.pointcloud??null,s=n.textureSize??Math.ceil(Math.sqrt(e.count)),l=Io(e,o,Math.min(s*s,r),i,a),c=Pe(s,a?.particleScalars),u=Go({...n,textureSize:s},a);super();const h=ko(u);this.points=new Ve(l.geometry,u),this.densityFillPoints=new Ve(l.geometry,h),this.points.frustumCulled=!1,this.densityFillPoints.frustumCulled=!1,this.densityFillPoints.visible=!1,this.add(this.points,this.densityFillPoints),this.cloudMaterial=u,this.densityFillMaterial=h,this.pointcloud=a,this.pointCount=l.count,this.visiblePointCount=l.count,this.sourcePositions=l.positions,this.anchorHighlightValues=l.anchorHighlightValues,this.anchorHighlightAttribute=l.anchorHighlightAttribute,this.textureSize=s,this.pointSizeResolutionMultiplier=c,this.lastParticleScalarsKey=ot(a?.particleScalars),this.fluidOptionEnabled=n.fluidEnabled!==!1,this.lastShaderDefinesKey=rt(_e(a,n)),this.layoutTargetAttribute=l.layoutTargetAttribute,this.layoutTargetSignature=l.layoutTargetSignature,this.frustumCulled=!1,this.applyDensityFill(a?.densityFill),typeof n.renderOrder=="number"&&(this.renderOrder=n.renderOrder,this.points.renderOrder=n.renderOrder,this.densityFillPoints.renderOrder=n.renderOrder)}static async loadFromPointcloud(e,n,o={}){const r=yt(e.sources,n),i=e.id?.startsWith("cloud-converted-")?!0:void 0,a=await io(r.asset,{orientAsConverted:i}),s=r.textureSize,l={id:e.id??"",asset:r.asset,resolution:s,byteSize:a.byteSize},c=new Ne(a,{...o,pointcloud:e,textureSize:s});return c.cloudInfo=l,{pointcloud:c,cloudInfo:l}}get material(){return this.cloudMaterial}get geometry(){return this.points.geometry}setTime(e){this.cloudMaterial.uniforms.uTime.value=e}setDpr(e){this.cloudMaterial.uniforms.uDPR.value=e}setRenderScale(e){this.cloudMaterial.uniforms.uRenderScale.value=e}setPointSize(e){this.cloudMaterial.uniforms.uPointSize.value=e*this.pointSizeResolutionMultiplier}setPointSizeScale(e){this.cloudMaterial.uniforms.uPointSizeScale.value=Math.max(e,.001)}setOpacity(e){this.cloudMaterial.uniforms.uOpacity.value=T.clamp(e,0,1),this.applyBlendMode()}setLoadFade(e){this.loadFade=T.clamp(e,0,1),this.cloudMaterial.uniforms.uLoadFade.value=this.loadFade,this.applyBlendMode()}setExposure(e){this.cloudMaterial.uniforms.uExposure.value=T.clamp(e,-4,4)}setTransparent(e){this.transparentPoints=e,this.cloudMaterial.uniforms.uTransparentPoints.value=e?1:0,this.applyBlendMode()}setBlendMode(e){this.blendMode=e,this.applyBlendMode()}applyBlendMode(){const e=this.transparentPoints?this.blendMode==="additive"?Vt:this.blendMode==="multiply"?$t:this.blendMode==="subtractive"?Kt:this.cloudMaterial.uniforms.uOpacity.value>=No&&this.loadFade>=1?Q:ie:this.loadFade<1?ie:Q;Ee(this.cloudMaterial,e),Ee(this.densityFillMaterial,e===Q?ie:e,!0)}setRandomize(e){this.cloudMaterial.uniforms.uRandomize.value.set(Math.max(e[0],0),Math.max(e[1],0),Math.max(e[2],0))}setSimplePoints(e){this.cloudMaterial.uniforms.uSimplePoints.value=e?1:0}setCameraFade(e){const n=Math.max(e.near,0);this.cloudMaterial.uniforms.uCamFadeEnabled.value=e.enabled?1:0,this.cloudMaterial.uniforms.uCamFadeNear.value=n,this.cloudMaterial.uniforms.uCamFadeFar.value=Math.max(e.far,n+1e-4),this.transparentPoints&&e.enabled&&this.cloudMaterial.blending===Q&&(this.cloudMaterial.blending=ie,this.cloudMaterial.transparent=!0,this.cloudMaterial.depthWrite=!1,this.cloudMaterial.needsUpdate=!0)}setFluidVelocity(e){this.cloudMaterial.uniforms.uFluidVelocity.value=e}setFluidInfluence(e){this.cloudMaterial.uniforms.uFluidInfluence.value=Math.max(0,e)}setSdfShapes(e){const n=this.cloudMaterial.uniforms,o=T.clamp(e.length,0,D),r=n.uSdfShapeType.value,i=n.uSdfShapeStrength.value,a=n.uSdfShapeFalloff.value,s=n.uSdfShapeGradient.value,l=n.uSdfShapePolarity.value,c=n.uSdfShapeParams.value,u=n.uSdfShapeBounds.value,h=n.uSdfShapeInverseMatrices.value;n.uSdfShapeCount.value=o;for(let d=0;d<o;d++){const m=e[d];r[d]=Ho(m.type),i[d]=Math.max(0,m.strength),a[d]=Math.max(0,m.falloff),s[d]=Math.max(.001,m.gradient),l[d]=m.invert?-1:1,c[d].copy(m.params),u[d].copy(m.bounds),h[d].copy(m.inverseMatrix)}}setIntroColorMix(e){this.cloudMaterial.uniforms.uIntroColorMix.value=T.clamp(e,0,1)}setTransitionUniforms(e){const n=this.cloudMaterial.uniforms;n.uTransitionYOffset.value=e.yOffset,n.uTransitionProgress.value=e.progress,n.uTransitionRestProgress.value=e.restProgress,n.uTransitionPow.value=e.pow}applyDynamicUniforms(e){const n=this.cloudMaterial.uniforms,o=this.updatePointSizeResolutionMultiplier(e.particleScalars);n.uPointSize.value=e.pointSize*o,n.uMaxPointSize.value=zt(e.maxPointSize)*o,n.uDistanceSizeInfluence.value=e.distanceSizeInfluence??.25,n.uDistanceSizeNear.value=e.distanceSizeNear??4,n.uDistanceSizeFar.value=e.distanceSizeFar??18,n.uDistanceSizeMax.value=e.distanceSizeMax??1.5;const r=e.colorCorrections;r!==this.lastColorCorrections&&(this.lastColorCorrections=r,n.uSelectiveAmount.value=ft(r),ht(n.uSelectiveAdj.value,r));const i=e.caustics;i&&(n.uCausticsEnabled.value=i.enabled?1:0,n.uCausticsStrength.value=i.strength,n.uCausticsScale.value=i.scale,n.uCausticsPower.value=i.power,n.uCausticsSparkle.value=Math.max(i.sparkle,0),n.uCausticsAxisScale.value.set(i.axisScale.x,i.axisScale.y,i.axisScale.z),n.uCausticsSpeed.value.set(i.speed.x,i.speed.y,i.speed.z),n.uCausticsColor.value.setRGB(i.color.r,i.color.g,i.color.b,le));const a=e.flow;n.uFlowEnabled.value=a.enabled?1:0,n.uFlowType.value=Ut(a.type),n.uFlowStrength.value=a.strength,n.uFlowSpeed.value=a.speed,n.uFlowScale.value=a.scale,n.uFlowGridLayout.value=Le(a.layout),n.uFlowGridEnabled.value=a.gridEnabled?1:0,n.uFlowGridSize.value=Math.max(Math.abs(a.gridSize),1e-4),n.uFlowGridStrength.value=a.gridStrength,Lt(n.uFlowGridMix.value,a),n.uFlowGridRotation.value.set(a.gridRotation?.x??0,a.gridRotation?.y??0,a.gridRotation?.z??0),n.uFlowConveyorEnabled.value=a.conveyorEnabled?1:0,n.uFlowConveyorSpeed.value=a.conveyorSpeed,n.uFlowConveyorDepth.value=a.conveyorDepth,Nt(n.uFlowConveyorAxis.value,a.conveyorRotation),n.uFlowConveyorDistanceNear.value=a.conveyorDistance?.near??a.distanceNear,n.uFlowConveyorDistanceFar.value=a.conveyorDistance?.far??a.distanceFar,n.uFlowRandomnessExponent.value=a.randomnessExponent,n.uFlowDistanceNear.value=a.distanceNear,n.uFlowDistanceFar.value=a.distanceFar,this.applyDensityFill(e.densityFill),this.syncShaderDefines(e)}syncShaderDefines(e){const n=_e(e,{fluidEnabled:this.fluidOptionEnabled}),o=rt(n);o!==this.lastShaderDefinesKey&&(this.lastShaderDefinesKey=o,Object.assign(this.cloudMaterial.defines,n),Object.assign(this.densityFillMaterial.defines,n,{POINTCLOUD_USE_DENSITY_FILL:1}),this.cloudMaterial.needsUpdate=!0,this.densityFillMaterial.needsUpdate=!0)}updatePointSizeResolutionMultiplier(e){const n=ot(e);return n!==this.lastParticleScalarsKey&&(this.lastParticleScalarsKey=n,this.pointSizeResolutionMultiplier=Pe(this.textureSize,e)),this.pointSizeResolutionMultiplier}applyDensityFill(e){const n=Uo(e);if(n===this.lastDensityFillKey)return;this.lastDensityFillKey=n;const o=e??Oe,r=o.enabled;this.densityFillPoints.visible=r,this.densityFillMaterial.uniforms.uDensityFillJitter.value=r?Math.max(o.jitter,0):0,this.densityFillMaterial.uniforms.uDensityFillOpacityScale.value=r?T.clamp(o.opacity,0,1):0,this.densityFillMaterial.uniforms.uDensityFillPointSizeScale.value=r?Math.max(o.pointSizeScale,.001):1,this.applyBlendMode()}setActivePointCount(e){const n=Math.max(1,Math.min(this.effectiveMaxPoints,Math.round(e)));n!==this.visiblePointCount&&(this.points.geometry.setDrawRange(0,n),this.visiblePointCount=n)}#e=1/0;get effectiveMaxPoints(){return Math.min(this.pointCount,this.#e)}setMaxActivePoints(e){const n=e===void 0?1/0:Math.max(1,Math.min(En,Math.round(e)));n!==this.#e&&(this.#e=n,this.visiblePointCount>this.effectiveMaxPoints&&this.setActivePointCount(this.effectiveMaxPoints))}#t=1;applyBehindContentQuality(e,n,o){o!==void 0&&(this.#t=o),this.setDpr(this.#t*e),this.setRenderScale(e),this.setActivePointCount(this.effectiveMaxPoints*n)}updateParticleLayoutTargets(e){const n=e??this.pointcloud;if(!n)return;const o=this.points.geometry.getAttribute("position");if(!o||!(o.array instanceof Float32Array))return;const r=Ot(n.flow,this.pointCount);if(r===this.layoutTargetSignature)return;const i=Rt(o.array,this.pointCount,n.flow);this.layoutTargetAttribute=new z(i,3).setUsage(Ae),this.layoutTargetSignature=r,this.points.geometry.setAttribute("aLayoutTarget",this.layoutTargetAttribute)}markActive(){if(!this.cloudInfo)return;const{id:e,asset:n,resolution:o,byteSize:r}=this.cloudInfo;globalThis.__PRETEXT_ACTIVE_CLOUD__={id:e,asset:n,resolution:`${o}`,byteSize:r}}update(e,n){this.setTime(e),typeof n=="number"&&this.setDpr(n)}dispose(){this.points.geometry.dispose(),this.cloudMaterial.dispose(),this.densityFillMaterial.dispose()}}function Io(t,e,n,o,r){const i=mo(t,e),a=new Float32Array(n*3),s=new Float32Array(n*3),l=new Float32Array(n),c=new Float32Array(n*4),u=new Float32Array(n);for(let f=0;f<n;f++){const F=po(t,o),x=f*3,S=F*3;a[x]=i[S],a[x+1]=i[S+1],a[x+2]=i[S+2],s[x]=t.colors[S]??1,s[x+1]=t.colors[S+1]??1,s[x+2]=t.colors[S+2]??1,l[f]=t.sizes?.[F]??.5;const w=f*4;c[w]=Math.random(),c[w+1]=Math.random(),c[w+2]=Math.random(),c[w+3]=Math.random()}const h=r?Rt(a,n,r.flow):a.slice(),d=new lt;d.setAttribute("position",new z(a,3)),d.setAttribute("color",new z(s,3)),d.setAttribute("aSize",new z(l,1)),d.setAttribute("aRandom",new z(c,4));const m=new z(h,3).setUsage(Ae),g=r?Ot(r.flow,n):"";d.setAttribute("aLayoutTarget",m);const p=new z(u,1).setUsage(Ae);return d.setAttribute("aAnchorHighlight",p),d.setDrawRange(0,n),{geometry:d,count:n,positions:a,anchorHighlightValues:u,anchorHighlightAttribute:p,layoutTargetAttribute:m,layoutTargetSignature:g}}function Ee(t,e,n=e!==Q){t.blending===e&&t.transparent===n&&t.depthWrite===!n||(t.blending=e,t.transparent=n,t.depthWrite=!n,t.needsUpdate=!0)}function ko(t){const e=new ut({defines:{...t.defines,POINTCLOUD_USE_DENSITY_FILL:1},vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,vertexColors:t.vertexColors,transparent:t.transparent,alphaTest:t.alphaTest,depthWrite:t.depthWrite,blending:t.blending,uniforms:{...t.uniforms,uDensityFillJitter:{value:0},uDensityFillPass:{value:zo},uDensityFillPointSizeScale:{value:1},uDensityFillOpacityScale:{value:0}}});return Ee(e,ie,!0),e}function Go(t,e){const n=t.externals??{},o=n.zeroVelocityTexture??pt(),r=t.dpr??(typeof window<"u"?window.devicePixelRatio:1),i=n.glowPositions??Array.from({length:tt},()=>new b),a=n.glowPulseValues??new Float32Array(tt),s=new Float32Array(D),l=new Float32Array(D),c=new Float32Array(D),u=new Float32Array(D).fill(1),h=new Float32Array(D).fill(1),d=Array.from({length:D},()=>new ye),m=Array.from({length:D},()=>new ye),g=Array.from({length:D},()=>new se),p=e?.caustics??{enabled:!0,strength:1.4,scale:.75,power:2.1,sparkle:0,axisScale:{x:1,y:1,z:2.4},speed:{x:.18,y:-.12,z:.08},color:{r:.95,g:.78,b:.42}},f=e?.flow??{enabled:!1,type:"curl",layout:"off",strength:0,speed:0,scale:1,gridEnabled:!1,gridSize:.1,gridStrength:0,gridMix:{x:0,y:0,z:0},gridRotation:{x:0,y:0,z:0},conveyorEnabled:!1,conveyorSpeed:0,conveyorDepth:1,conveyorRotation:{x:0,y:0,z:0},conveyorDistance:{near:0,far:1},randomnessExponent:1,distanceNear:0,distanceFar:1},F=t.fluidEnabled!==!1&&e?.fluid?.enabled?e.fluid.influence:0,x=Pe(t.textureSize,e?.particleScalars),S=sn.map(()=>new b);return ht(S,e?.colorCorrections),new ut({defines:_e(e,t),vertexShader:Do.replace(_o,String(ln)).replaceAll(Eo,String(D)),fragmentShader:Po,vertexColors:!0,transparent:!1,alphaTest:0,depthWrite:!0,blending:Q,uniforms:{uTime:{value:0},uPointSize:{value:(e?.pointSize??.018)*x},uDistanceSizeInfluence:{value:e?.distanceSizeInfluence??.25},uDistanceSizeNear:{value:e?.distanceSizeNear??4},uDistanceSizeFar:{value:e?.distanceSizeFar??18},uDistanceSizeMax:{value:e?.distanceSizeMax??1.5},uPointSizeScale:{value:t.pointSizeScale??1},uDensityFillJitter:{value:0},uDensityFillPass:{value:0},uDensityFillPointSizeScale:{value:1},uMaxPointSize:{value:zt(e?.maxPointSize)*x},uOpacity:{value:1},uLoadFade:{value:1},uExposure:{value:0},uDensityFillOpacityScale:{value:1},uTransparentPoints:{value:1},uSimplePoints:{value:0},uRandomize:{value:new b},uCamFadeEnabled:{value:0},uCamFadeNear:{value:0},uCamFadeFar:{value:1},uCausticsEnabled:{value:p.enabled?1:0},uCausticsStrength:{value:p.strength},uCausticsScale:{value:p.scale},uCausticsPower:{value:p.power},uCausticsSparkle:{value:Math.max(p.sparkle,0)},uCausticsAxisScale:{value:new b(p.axisScale.x,p.axisScale.y,p.axisScale.z)},uCausticsSpeed:{value:new b(p.speed.x,p.speed.y,p.speed.z)},uCausticsColor:{value:new ct().setRGB(p.color.r,p.color.g,p.color.b,le)},uDPR:{value:r},uRenderScale:{value:1},uFlowEnabled:{value:f.enabled?1:0},uFlowType:{value:Ut(f.type)},uFlowStrength:{value:f.strength},uFlowSpeed:{value:f.speed},uFlowScale:{value:f.scale},uFlowGridLayout:{value:Le(f.layout)},uFlowGridEnabled:{value:f.gridEnabled?1:0},uFlowGridSize:{value:f.gridSize},uFlowGridStrength:{value:f.gridStrength},uFlowGridMix:{value:Lt(new b,f)},uFlowGridRotation:{value:new b(f.gridRotation?.x??0,f.gridRotation?.y??0,f.gridRotation?.z??0)},uFlowConveyorEnabled:{value:f.conveyorEnabled?1:0},uFlowConveyorSpeed:{value:f.conveyorSpeed},uFlowConveyorDepth:{value:f.conveyorDepth},uFlowConveyorAxis:{value:Nt(new b,f.conveyorRotation)},uFlowConveyorDistanceNear:{value:f.conveyorDistance?.near??f.distanceNear},uFlowConveyorDistanceFar:{value:f.conveyorDistance?.far??f.distanceFar},uFlowRandomnessExponent:{value:f.randomnessExponent},uFlowDistanceNear:{value:f.distanceNear},uFlowDistanceFar:{value:f.distanceFar},uFluidVelocity:{value:o},uFluidInfluence:{value:F},uTransitionYOffset:{value:0},uTransitionProgress:{value:1},uTransitionRestProgress:{value:.5},uTransitionPow:{value:10},uIntroColorMix:{value:t.introColorMix??0},uSelectiveAmount:{value:ft(e?.colorCorrections)},uSelectiveAdj:{value:S},uAnchorHighlightOpacity:{value:0},uAnchorHighlightScale:{value:Un},uAnchorGlowPositions:{value:i},uAnchorGlowRadius:{value:.13},uAnchorGlowStrength:{value:.22},uAnchorGlowPulse:{value:a},uAnchorGlowStrumStrength:{value:1.05},uSdfShapeCount:{value:0},uSdfShapeType:{value:s},uSdfShapeStrength:{value:l},uSdfShapeFalloff:{value:c},uSdfShapeGradient:{value:u},uSdfShapePolarity:{value:h},uSdfShapeParams:{value:d},uSdfShapeBounds:{value:m},uSdfShapeInverseMatrices:{value:g}}})}function Ho(t){return t==="sphere"?1:t==="box"?2:t==="torus"?3:t==="cylinder"?4:t==="octahedron"?5:t==="dodecahedron"?6:0}function Ut(t){return t==="rise"?3:2}const Bo=1080,jo=1.2,Wo=.05,at=12e3;function Yo({isCriticalLoadingHandle:t,shouldLoad:e,renderTier:n}){return t&&(!e||n===null)}function it(t){return!t}function qo({error:t,phase:e,fallbackAssetTelemetry:n,id:o,handle:r,renderTier:i,elapsedMs:a,loadingHandle:s,isCriticalLoadingHandle:l,visibilityTelemetry:c,browserAssetTelemetry:u}){const h=Rn(t),d=t instanceof Error?t.message:String(t),m={phase:e,...n,...h,id:o,handle:r,renderTier:i,elapsedMs:a,loadingHandle:s,isCriticalLoadingHandle:l,...c,...u};return h.phase==="mdpc-unsupported-decompression-stream"||d===Re?{kind:"component-telemetry",targetName:"pointcloud_mdpc_unsupported_deflate",parentName:"pointcloud_loader",metadata:{source:"PointCloud.load",...m,phase:h.phase??"mdpc-unsupported-decompression-stream",message:d}}:{kind:"report-error",metadata:m}}function pr(t){const{id:e,pointcloud:n,timeScale:o=1,visibility:r,pointSizeScale:i,position:a,rotation:s,scale:l,opacity:c,exposure:u,transparent:h,blendMode:d,simplePoints:m,randomize:g,cameraFade:p,introColorMix:f,behindSpeed:F=1,reduceQualityBehind:x=!0,behindOffset:S=0,motion:w,fluidVelocityRef:R,onLoad:E,onError:O,loadingHandle:A,renderDpr:W,renderScale:Y=1,parentObject:ue,children:ze}=t,U=oe(v=>v.gl),ve=oe(v=>v.scene),Ue=oe(v=>v.camera),ge=oe(v=>v.size),Ie=oe(v=>v.viewport.dpr),ke=$e(v=>v.trackers),Ge=$e(v=>v.pageViewToken),He=C.useRef({trackers:ke,pageViewToken:Ge,size:ge});He.current={trackers:ke,pageViewToken:Ge,size:ge};const q=C.useRef(null),Be=C.useRef(ue);Be.current=ue,C.useEffect(()=>{const v=q.current;v&&(ue??ve).add(v)},[ue,q,ve]);const It=C.useContext(rn)?.handle,V=an(),je=Ze(v=>A?v.criticalHandles.includes(A):!1),I=Zt(),we=C.useRef(null),de=C.useRef(!1);C.useEffect(()=>{if(!Yo({isCriticalLoadingHandle:je,shouldLoad:V,renderTier:I})){we.current=null,de.current=!1;return}if(we.current??=hn(),!it(de.current))return;const P=pn(at,we.current,y=>{if(!it(de.current))return;de.current=!0;const L=V?"render-tier timeout":"sticky-mount timeout",$=new Error(`PointCloud startup ${L} after ${at}ms`);Je($,"PointCloud.startup",{id:e,loadingHandle:A,reason:L,shouldLoad:V,renderTier:I,...y}),O?.($)});return()=>P.clear()},[e,je,A,O,I,V]),C.useEffect(()=>{if(!V||I===null)return;let v=!1,P=null,y=!1,L="load";const $=performance.now(),ne=()=>{P&&(P.removeFromParent(),P.dispose(),q.current===P&&(q.current=null),P=null)};return Ne.loadFromPointcloud({...n,id:e},I,{dpr:Ie,pointSizeScale:i,introColorMix:f}).then(async({pointcloud:M})=>{if(v){M.dispose();return}P=M,L="warmup";const H=new Xt;H.add(M);try{await mn(async()=>{if(v)return;const B=U.getRenderTarget(),K=U.autoClear,_=new Qt(2,2);try{await U.compileAsync(H,Ue),U.setRenderTarget(_),U.autoClear=!0,U.render(H,Ue)}finally{U.autoClear=K,U.setRenderTarget(B),_.dispose()}},{visibilityAwareWatchdog:!0})}finally{y=!0}if(v){ne();return}M.removeFromParent(),(Be.current??ve).add(M),q.current=M,M.markActive(),E?.(M)}).catch(M=>{if(y=!0,ne(),v)return;const H=Ze.getState().criticalHandles;let B={};try{const j=yt(n.sources,I);B={assetUrl:j.asset,textureSize:j.textureSize,preferredResolution:j.preferredResolution}}catch{}const K=mt($),_=qo({error:M,phase:L,fallbackAssetTelemetry:B,id:e,handle:It,renderTier:I,elapsedMs:K,loadingHandle:A,isCriticalLoadingHandle:A?H.includes(A):void 0,visibilityTelemetry:yn(M),browserAssetTelemetry:On()});if(_.kind==="component-telemetry"){const{trackers:j,pageViewToken:be,size:xe}=He.current;en({trackers:j,pageViewToken:be,enabled:!0,targetName:_.targetName,parentName:_.parentName,width:xe.width,height:xe.height,duration:K,metadata:_.metadata})}else Je(M,"PointCloud.load",_.metadata);O?.(M)}),()=>{v=!0,y&&ne()}},[V,I,e,n.sources]);const We=C.useRef(0),fe=C.useRef(0),Ye=C.useRef(null);return dt((v,P)=>{const y=q.current;if(!y)return;const L=w?.current?.transition??0,$=typeof r=="number"&&r<=0||L<=-1||L>=1;Ye.current!==y&&(Ye.current=y,fe.current=0);const ne=typeof r=="number"&&r<=0||L>=1;fe.current=Gn(fe.current,P,{durationSeconds:jo,offscreen:ne,reducedMotion:Ke.getState().preferReducedMotion===!0});const M=kn(fe.current);if(y.setLoadFade(M),typeof r=="number"&&(y.visible=r>0),a&&y.position.set(a[0],a[1],a[2]),s&&y.rotation.set(T.degToRad(s[0]),T.degToRad(s[1]),T.degToRad(s[2])),typeof l=="number"&&y.scale.setScalar(Math.max(l,.001)),typeof i=="number"&&y.setPointSizeScale(i),typeof c=="number"&&y.setOpacity(c),typeof u=="number"&&y.setExposure(u),d&&y.setBlendMode(d),typeof h=="boolean"&&y.setTransparent(h),typeof m=="boolean"&&y.setSimplePoints(m),g){const he=Wo*(1-M);he===0?y.setRandomize(g):y.setRandomize([g[0]+he,g[1]+he,g[2]+he])}p&&y.setCameraFade(p),typeof f=="number"&&y.setIntroColorMix(f),y.updateParticleLayoutTargets(n),y.applyDynamicUniforms(n);const H=Math.max(1,ge.height)/Bo,B=w?.current?.screenOffset??0,K=dn(B),_=fn(B,S);if(y.setMaxActivePoints(n.maxPoints),y.applyBehindContentQuality(cn(_,Y,x),un(_,x),(W??Ie)*H),$)return;const j=Math.min(P,1/30),be=1-K*(1-F),kt=Ke.getState().preferReducedMotion?In:1;We.current+=j*o*be*kt,y.setTime(We.current),y.setFluidVelocity(R?.current??pt()),y.setFluidInfluence(n.fluid.enabled?n.fluid.influence*o:0)}),ze?X.jsx(X.Fragment,{children:ze}):null}const N=0,Vo=new b(1,1,1);function mr({pointCloudRef:t,pointCloudVersion:e,sdfs:n,showHelpers:o=!1,children:r}){const i=tn(p=>p.tier>=2),a=C.useRef(null),s=C.useRef(N),l=C.useRef([]),c=C.useRef({activeShapes:[],cloudInverseMatrix:new se,sdfMatrix:new se,unscaledSdfMatrix:new se,position:new b,quaternion:new nn,scale:new b(1,1,1),shapes:Array.from({length:D},()=>({type:"box",inverseMatrix:new se,params:new ye,bounds:new ye,strength:0,falloff:0,gradient:1}))}),[u,h]=C.useState(null);C.useEffect(()=>{h(t.current)},[t,e]);const d=C.useCallback(p=>(l.current.push(p),()=>{l.current=l.current.filter(f=>f!==p)}),[]),m=C.useMemo(()=>({registerSdf:d}),[d]);dt(()=>{const p=t.current,f=a.current;if(f!==p&&(f?.setSdfShapes([]),a.current=p,s.current=N),!p)return;if(!i){s.current>N&&(p.setSdfShapes([]),s.current=N);return}const F=l.current;if(!F.some(({objectRef:R,sdfRef:E})=>R.current&&E.current.enabled!==!1)){s.current>N&&(p.setSdfShapes([]),s.current=N);return}const S=c.current,w=S.activeShapes;w.length=0,p.updateWorldMatrix(!0,!1),S.cloudInverseMatrix.copy(p.matrixWorld).invert();for(const{objectRef:R,sdfRef:E}of F){if(w.length>=D)break;const O=R.current,A=E.current;if(!O||A.enabled===!1)continue;O.updateWorldMatrix(!0,!1),S.sdfMatrix.multiplyMatrices(S.cloudInverseMatrix,O.matrixWorld);const W=S.shapes[w.length];$o(A,W,S.sdfMatrix,S)&&w.push(W)}w.length===N&&s.current===N||(p.setSdfShapes(w),s.current=w.length)}),C.useEffect(()=>()=>{a.current?.setSdfShapes([]),s.current=N},[]);const g=u&&n?.length?on(X.jsx(X.Fragment,{children:n.map((p,f)=>X.jsx(Sn,{sdf:p,showHelper:o},p.id??f))}),u):null;return X.jsxs(vn.Provider,{value:i?m:null,children:[g,r]})}function $o(t,e,n,o){const r=t.strength??gn,i=t.falloff??wn,a=t.gradient??bn;return n.decompose(o.position,o.quaternion,o.scale),!st(o.position)||!Ko(o.quaternion)||!st(o.scale)?!1:(e.type=Jo(t.type),t.type==="cube"?(e.params.set(ee*Fe(o.scale.x),ee*Fe(o.scale.y),ee*Fe(o.scale.z),0),Qo(o.position,e.params,i,e.bounds),o.unscaledSdfMatrix.compose(o.position,o.quaternion,Vo),e.inverseMatrix.copy(o.unscaledSdfMatrix).invert()):(Zo(t.type,e.params),Xo(t.type,o.position,o.scale,i,e.bounds),e.inverseMatrix.copy(n).invert()),e.strength=r,e.falloff=i,e.gradient=a,e.invert=t.invert??!1,!0)}function st(t){return Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)}function Ko(t){return Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)&&Number.isFinite(t.w)}function Fe(t){return Math.max(xn,Math.abs(t))}function Jo(t){return t==="cube"?"box":t==="dodeca"?"dodecahedron":t}function Zo(t,e){if(t==="torus"){e.set(Cn,Tn,0,0);return}if(t==="cylinder"){e.set(Mn,Fn,0,0);return}if(t==="octahedron"){e.set(An,0,0,0);return}if(t==="dodeca"){e.set(Dn,0,0,0);return}if(t==="sphere"){e.set(Pn,0,0,0);return}e.set(ee,ee,ee,0)}function Xo(t,e,n,o,r){const i=Math.max(n.x,n.y,n.z),a=(_n(t)+Math.max(0,o))*i;r.set(e.x,e.y,e.z,a)}function Qo(t,e,n,o){const r=Math.hypot(e.x,e.y,e.z)+Math.max(0,n);o.set(t.x,t.y,t.z,r)}export{Ln as D,pr as P,mr as a,hr as b,Gn as c,Kn as d,kn as e,k as f,Rn as g,On as h,Ne as i,mt as r};
//# sourceMappingURL=SdfRegistry-sM3Q5YdE.js.map
