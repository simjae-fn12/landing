import{r as w}from"./chunk-QUQL4437-BD29ZypC.js";import{W as j,a6 as de,R as he,bk as ve,e as fe,M as pe,d as me,O as ye,V as R,r as N,L as Z,v as ge,C as te,t as y,u as $,y as xe}from"./TierResolver-y-fGWbnF.js";import{u as Se}from"./constants-xV0ws6Hx.js";import{a as Te}from"./reducedMotion-CdiMTSZU.js";import{u as we}from"./useStickyMountGate-DtwlF7FI.js";import{r as be}from"./reportError-CJPDlOyT.js";import{u as De}from"./useCanvasPointer-BnFn7xJn.js";import{o as Re}from"./lenisManager-BGOTe4iO.js";import{b as Me,D as Fe,M as Le,a as Ce}from"./presets-EmxEXVgb.js";const _e=14,Pe=10,Ee=.002,Ae=.32,Ve=8,Ie=80,Ue=.01,ze=1/30;let Q=!1,_=0,W=0,P=0,U=0,q=0;const J=new WeakMap;function ie(s,e){const t=performance.now(),i=e-s,n=Math.max(Ve,Math.min(Ie,t-U));U=t,W=Math.abs(i)<Ue?0:Math.max(-1,Math.min(1,i/n*Ae))}function Oe(s){const e=s.target;let t,i;if(e===document||e===window||e===null)i=window.scrollY,t=P,P=i;else if(e instanceof HTMLElement)i=e.scrollTop,t=J.get(e)??i,J.set(e,i);else return;ie(t,i)}function Be(s){ie(P,s.scroll),P=s.scroll}function Ne(s){const e=Math.max(0,Math.min(s,ze)),t=1-Math.exp(-e*_e),i=Math.exp(-e*Pe);_+=(W-_)*t,W*=i,Math.abs(_)<Ee&&(_=0)}function se(s){const e=(s-q)/1e3;q=s,Ne(e),requestAnimationFrame(se)}function He(){Q||typeof window>"u"||(Q=!0,P=window.scrollY,U=performance.now(),q=U,document.addEventListener("scroll",Oe,{passive:!0,capture:!0}),Re(s=>s.on("scroll",Be)),requestAnimationFrame(se))}function We(){return He(),_}function X(){return performance.now()}function qe(){return typeof document>"u"?"unknown":document.visibilityState??"visible"}function ne(){return typeof document>"u"?!0:document.hidden!==!0}function Xe(s=X()){const e=ne();return{visibleElapsedMs:0,hiddenElapsedMs:0,segmentStartedAt:s,isVisible:e,everHidden:!e}}function A(s,e=X()){const t=Math.max(0,e-s.segmentStartedAt);return s.isVisible?s.visibleElapsedMs+=t:s.hiddenElapsedMs+=t,s.segmentStartedAt=e,s.isVisible=ne(),s.everHidden||=!s.isVisible,oe(s,e)}function oe(s,e=X()){const t=Math.max(0,e-s.segmentStartedAt);return{visibilityState:qe(),everHidden:s.everHidden||!s.isVisible,visibleElapsedMs:Math.round(s.visibleElapsedMs+(s.isVisible?t:0)),hiddenElapsedMs:Math.round(s.hiddenElapsedMs+(s.isVisible?0:t))}}function Ye(s,e,t){let i=null,n=!1;const r=()=>{i!==null&&(window.clearTimeout(i),i=null)},o=()=>{if(r(),n||!e.isVisible)return;const d=Math.max(0,s-e.visibleElapsedMs);i=window.setTimeout(()=>{if(A(e),e.isVisible&&e.visibleElapsedMs>=s){n=!0,a(),t(oe(e));return}o()},d)},l=()=>{A(e),o()},a=()=>{typeof document>"u"||document.removeEventListener("visibilitychange",l)};return typeof document<"u"&&document.addEventListener("visibilitychange",l),A(e),o(),{clear:()=>{n||(n=!0,A(e),r(),a())}}}function Ge(s){return s instanceof Error?s.visibilityTelemetry??{}:{}}function je(s,e){return Object.assign(s,{visibilityTelemetry:e}),s}let I=!1;const Y=[];function Ze(s,{visibilityAwareWatchdog:e=!1}={}){return new Promise((t,i)=>{Y.push({task:s,resolve:t,reject:i,visibilityAwareWatchdog:e}),re()})}const $e=30,K=15e3;function re(){I||Y.length!==0&&window.setTimeout(Qe,$e)}function Qe(){if(I)return;const s=Y.shift();if(!s)return;I=!0;let e=!1;const t=()=>{e||(e=!0,i.clear(),I=!1,re())};let i;if(s.visibilityAwareWatchdog)i=Ye(K,Xe(),n=>{s.reject(je(new Error("warmup watchdog timeout"),n)),t()});else{const n=window.setTimeout(()=>{s.reject(new Error("warmup watchdog timeout")),t()},K);i={clear:()=>window.clearTimeout(n)}}s.task().then(s.resolve,s.reject).finally(t)}const Je=1e3,V=new Map;let M=null,k=0;function ae(){if(M!==null)return M;if(typeof window>"u")return M=!1,M;const s=new URLSearchParams(window.location.search);let e=!1;try{e=window.localStorage.getItem("scenePerf")==="1"}catch{e=!1}return M=s.has("scenePerf")||e,M}function Ke(s,e){if(!ae())return e();const t=performance.now();try{return e()}finally{ke(s,performance.now()-t)}}function ke(s,e){if(!ae())return;const t=V.get(s)??{total:0,count:0,max:0};t.total+=e,t.count++,t.max=Math.max(t.max,e),V.set(s,t);const i=performance.now();if(i-k<Je)return;k=i;const n=Array.from(V,([r,o])=>({name:r,avg:`${(o.total/Math.max(1,o.count)).toFixed(2)}ms`,max:`${o.max.toFixed(2)}ms`,count:o.count})).sort((r,o)=>parseFloat(o.avg)-parseFloat(r.avg));console.table(n),V.clear()}class C{#e;#t;uniform;constructor(e,t,i){const n={minFilter:i,magFilter:i,format:he,type:de,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1};this.#e=new j(e,t,n),this.#t=new j(e,t,n),this.uniform={value:this.#e.texture}}get read(){return this.#e.texture}get write(){return this.#t}swap(){const e=this.#e;this.#e=this.#t,this.#t=e,this.uniform.value=this.#e.texture}dispose(){this.#e.dispose(),this.#t.dispose()}}class S{gl;uniforms;mesh;scene;camera;constructor(e,t,i,n){this.gl=e,this.uniforms=n;const r=new ve(2,2),o=new fe({vertexShader:t,fragmentShader:i,uniforms:n,depthWrite:!1,depthTest:!1});this.mesh=new pe(r,o),this.scene=new me,this.scene.add(this.mesh),this.camera=new ye(-1,1,1,-1,0,1)}render(e){this.gl.setRenderTarget(e??null),this.gl.render(this.scene,this.camera)}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose()}}function H(s,e=1/60){const t=Math.max(0,Math.min(1,s));return t===0?0:Math.pow(t,Math.max(0,e)*60)}const T=`varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main() {
  vUv = uv;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(position, 1.0);
}

`,et=`varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;

void main() {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = dissipation * texture2D(uSource, coord);
  gl_FragColor.a = 1.0;
}

`,tt=`varying vec2 vUv;
uniform sampler2D uTexture;
uniform float value;

void main() {
  gl_FragColor = value * texture2D(uTexture, vUv);
}

`,it=`varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}

`,st=`// Display pass from Pavel Dobryakov's WebGL-Fluid-Simulation (MIT):
// straight passthrough of the dye texture.

varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
}
`,nt=`varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}

`,ot=`varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}

`,rt=`varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}

`,at=`// Splat brush. Deposits \`color\` along the segment from \`prevPoint\` to \`point\`
// with a Gaussian falloff. Pavel Dobryakov's WebGL-Fluid-Simulation (MIT) uses
// the same additive exp(-d^2/radius) deposit; here the distance is measured to
// the stroke segment (standard point-to-segment SDF) so pointer motion paints a
// continuous round-tipped stroke instead of discrete dots. \`radius\` is the
// Gaussian variance (aspect-corrected on X).

varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform vec2 prevPoint;
uniform float radius;

// Point-to-segment distance: the canonical 2D SDF from Inigo Quilez
// (https://iquilezles.org/articles/distfunctions2d/ — \`sdSegment\`),
// aspect-corrected on X so the brush stays round on non-square viewports.
float segmentDistance(vec2 uv, vec2 a, vec2 b) {
  vec2 pa = uv - a;
  vec2 ba = b - a;
  pa.x *= aspectRatio;
  ba.x *= aspectRatio;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  float d = segmentDistance(vUv, prevPoint, point);
  // Guard the divisor: a zero radius would divide by zero and write NaNs that
  // poison the velocity FBO.
  vec3 splat = exp(-(d * d) / max(radius, 1e-6)) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`,lt=`varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;

void main() {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture2D(uVelocity, vUv).xy;
  gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}

`,ee=s=>y.clamp(Math.floor(s),Le,Ce),ut={simSize:Fe,dyeSize:Me,densityDissipation:.97,velocityDissipation:.98,pressureDissipation:.8,pressureIterations:10,curl:30,splatRadius:.25};class ct{gl;config;fbos;#e=[];passes;width=0;height=0;aspect=1;simW=0;simH=0;dyeW=0;dyeH=0;#t=new R;#l=new R;#i=0;#s=null;constructor(e,t={}){this.gl=e,this.config={...ut,...t},this.#a(1),this.#c(),this.reset()}setTextureSizes(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return!1;const i=ee(e),n=ee(t);return i===this.config.simSize&&n===this.config.dyeSize?!1:(this.config.simSize=i,this.config.dyeSize=n,this.#r(this.aspect),this.width>0&&this.height>0&&this.passes.display.uniforms.texelSize.value.set(1/this.width,1/this.height),!0)}#r(e){this.#e.push({fbos:this.fbos,armed:!1}),this.#a(e,!1),this.#d()}#u(){this.#e.length!==0&&(this.#e=this.#e.filter(e=>{if(!e.armed)return!0;for(const t of Object.values(e.fbos))t.dispose();return!1}))}#a(e,t=!0){if(this.fbos&&t)for(const d of Object.values(this.fbos))d.dispose();const{simSize:i,dyeSize:n}=this.config;let r=i,o=i,l=n,a=n;e>1?(o=Math.round(i/e),a=Math.round(n/e)):(r=Math.round(i*e),l=Math.round(n*e)),this.fbos={density:new C(l,a,Z),velocity:new C(r,o,Z),divergence:new C(r,o,N),curl:new C(r,o,N),pressure:new C(r,o,N)},this.simW=r,this.simH=o,this.dyeW=l,this.dyeH=a}#c(){const{simSize:e}=this.config,t=()=>({value:new R(1/e,1/e)});this.passes={curl:new S(this.gl,T,it,{texelSize:t(),uVelocity:{value:null}}),vorticity:new S(this.gl,T,lt,{texelSize:t(),uVelocity:{value:null},uCurl:{value:null},curl:{value:this.config.curl},dt:{value:1/60}}),divergence:new S(this.gl,T,nt,{texelSize:t(),uVelocity:{value:null}}),clear:new S(this.gl,T,tt,{texelSize:t(),uTexture:{value:null},value:{value:this.config.pressureDissipation}}),pressure:new S(this.gl,T,rt,{texelSize:t(),uPressure:{value:null},uDivergence:{value:null}}),gradientSubtract:new S(this.gl,T,ot,{texelSize:t(),uPressure:{value:null},uVelocity:{value:null}}),advection:new S(this.gl,T,et,{texelSize:t(),uVelocity:{value:null},uSource:{value:null},dt:{value:1/60},dissipation:{value:this.config.velocityDissipation}}),display:new S(this.gl,T,st,{texelSize:{value:new R},uTexture:{value:null}}),splat:new S(this.gl,T,at,{uTarget:{value:null},aspectRatio:{value:1},point:{value:new R},prevPoint:{value:new R},color:{value:new ge},radius:{value:(this.config.splatRadius/200)**2}})}}setSize(e,t){this.width=e,this.height=t;const i=e/t;Math.abs(i-this.aspect)>.01&&(this.aspect=i,this.#r(i)),this.passes.display.uniforms.texelSize.value.set(1/e,1/t)}#d(){const e=1/this.simW,t=1/this.simH,i=[this.passes.curl,this.passes.vorticity,this.passes.divergence,this.passes.clear,this.passes.pressure,this.passes.gradientSubtract];for(const n of i)n.uniforms.texelSize.value.set(e,t)}#n(){this.#i++===0&&(this.#s=this.gl.getRenderTarget())}#o(){this.#i=Math.max(0,this.#i-1),this.#i===0&&(this.gl.setRenderTarget(this.#s),this.#s=null)}async compileAsync(){await Promise.all(Object.values(this.passes).map(e=>this.gl.compileAsync(e.scene,e.camera)))}update(e){this.#u();const{fbos:t,passes:i,config:n}=this;this.#n();try{i.curl.uniforms.uVelocity.value=t.velocity.read,i.curl.render(t.curl.write),t.curl.swap(),i.vorticity.uniforms.uVelocity.value=t.velocity.read,i.vorticity.uniforms.uCurl.value=t.curl.read,i.vorticity.uniforms.curl.value=n.curl,i.vorticity.uniforms.dt.value=e,i.vorticity.render(t.velocity.write),t.velocity.swap(),i.divergence.uniforms.uVelocity.value=t.velocity.read,i.divergence.render(t.divergence.write),t.divergence.swap(),i.clear.uniforms.uTexture.value=t.pressure.read,i.clear.uniforms.value.value=H(n.pressureDissipation,e),i.clear.render(t.pressure.write),t.pressure.swap(),i.pressure.uniforms.uDivergence.value=t.divergence.read;for(let r=0;r<n.pressureIterations;r++)i.pressure.uniforms.uPressure.value=t.pressure.read,i.pressure.render(t.pressure.write),t.pressure.swap();i.gradientSubtract.uniforms.uPressure.value=t.pressure.read,i.gradientSubtract.uniforms.uVelocity.value=t.velocity.read,i.gradientSubtract.render(t.velocity.write),t.velocity.swap(),i.advection.uniforms.texelSize.value.set(1/this.simW,1/this.simH),i.advection.uniforms.uVelocity.value=t.velocity.read,i.advection.uniforms.uSource.value=t.velocity.read,i.advection.uniforms.dissipation.value=H(n.velocityDissipation,e),i.advection.uniforms.dt.value=e,i.advection.render(t.velocity.write),t.velocity.swap(),i.advection.uniforms.texelSize.value.set(1/this.dyeW,1/this.dyeH),i.advection.uniforms.uVelocity.value=t.velocity.read,i.advection.uniforms.uSource.value=t.density.read,i.advection.uniforms.dissipation.value=H(n.densityDissipation,e),i.advection.render(t.density.write),t.density.swap()}finally{this.#o()}for(const r of this.#e)r.armed=!0}render(e=null){this.#n();try{this.passes.display.uniforms.uTexture.value=this.fbos.density.read,this.passes.display.render(e)}finally{this.#o()}}splat(e,t,i,n,r,o,l=e,a=t){const d=this.#t.set(e/this.width,1-t/this.height),u=this.#l.set(l/this.width,1-a/this.height),v=o/200;this.#n();try{const c=this.passes.splat;c.uniforms.uTarget.value=this.fbos.velocity.read,c.uniforms.radius.value=v*v,c.uniforms.aspectRatio.value=this.width/this.height,c.uniforms.point.value.copy(d),c.uniforms.prevPoint.value.copy(u),c.uniforms.color.value.set(i,-n,0),c.render(this.fbos.velocity.write),this.fbos.velocity.swap(),c.uniforms.uTarget.value=this.fbos.density.read,c.uniforms.color.value.set(r.r,r.g,r.b),c.render(this.fbos.density.write),this.fbos.density.swap()}finally{this.#o()}}updateConfig(e,t){this.config[e]=t}get velocityTexture(){return this.fbos.velocity.read}reset(){const e=this.gl.getRenderTarget(),t=new te;this.gl.getClearColor(t);const i=this.gl.getClearAlpha();this.gl.setClearColor(0,0);for(const n of Object.values(this.fbos))this.gl.setRenderTarget(n.write),this.gl.clear(),n.swap(),this.gl.setRenderTarget(n.write),this.gl.clear(),n.swap();this.gl.setRenderTarget(e),this.gl.setClearColor(t,i)}dispose(){for(const e of this.#e)for(const t of Object.values(e.fbos))t.dispose();this.#e=[];for(const e of Object.values(this.fbos))e.dispose();for(const e of Object.values(this.passes))e.dispose()}}const dt=.018,ht=.72,vt=8,ft=.02,pt=.3,mt=.9,yt=5,gt=50,xt=65,St=2,Tt=500,wt=1e4;class bt{fluid;color=new te;mouse={x:0,y:0,px:0,py:0,inside:!1};handPointers=new Map;handPointerActiveIds=new Set;lastActiveAt=0;lastStepTime=-1;lastScrollPaintStepTime=-1;scrollClear=0;lastPointerProcessTime=-1;lastScrollClearTime=-1;activeCompile=null;disposeRequested=!1;disposed=!1;constructor(e,t){this.fluid=new ct(e,t)}configure(e,t){return this.disposeRequested||this.disposed?!1:this.fluid.setTextureSizes(e,t)}resize(e,t){this.disposeRequested||this.disposed||(this.fluid.setSize(e,t),this.mouse.inside=!1,this.handPointers.clear())}compileAsync(){return this.disposeRequested||this.disposed?Promise.resolve():this.activeCompile?this.activeCompile:(this.activeCompile=this.fluid.compileAsync().finally(()=>{this.activeCompile=null,this.disposeRequested&&this.disposeNow()}),this.activeCompile)}reset(){this.disposeRequested||this.disposed||(this.fluid.reset(),this.mouse.x=0,this.mouse.y=0,this.mouse.px=0,this.mouse.py=0,this.mouse.inside=!1,this.handPointers.clear(),this.handPointerActiveIds.clear(),this.lastActiveAt=0,this.lastStepTime=-1,this.lastScrollPaintStepTime=-1,this.lastPointerProcessTime=-1,this.lastScrollClearTime=-1,this.scrollClear=0)}get densityTexture(){return this.fluid.fbos.density.read}get velocityTexture(){return this.fluid.fbos.velocity.read}update(e,t,i,n,r,o){if(this.disposeRequested||this.disposed)return this.velocityTexture;if(this.fluid.updateConfig("curl",i.pointcloud.fluid.curl),o!==this.lastScrollClearTime){this.lastScrollClearTime=o;const d=y.smoothstep(Math.abs(t.scrollVelocity),ft,pt);this.scrollClear=y.damp(this.scrollClear,d,yt,e)}const l=this.scrollClear,a=i.pointcloud.fluid.velocityDissipation;if(this.fluid.updateConfig("velocityDissipation",y.lerp(a,Math.min(a,mt),l)),this.fluid.updateConfig("densityDissipation",i.pointcloud.fluid.densityDissipation),this.fluid.updateConfig("pressureDissipation",i.pointcloud.fluid.pressure),t.pointerActive||(this.mouse.inside=!1),t.pointerActive&&i.pointcloud.fluid.enabled&&n>0&&r>0&&o!==this.lastPointerProcessTime){this.lastPointerProcessTime=o;const d=t.pointer,u=(d.x*.5+.5)*n,v=(-d.y*.5+.5)*r,c=performance.now(),p=this.mouse.inside&&c-this.lastActiveAt<80;this.mouse.px=p?this.mouse.x:u,this.mouse.py=p?this.mouse.y:v,this.mouse.x=u,this.mouse.y=v,this.mouse.inside=!0,this.lastActiveAt=c;const g=this.mouse.x-this.mouse.px,f=this.mouse.y-this.mouse.py;if(g!==0||f!==0){const h=Math.hypot(g,f)/Math.max(e,1e-4),x=1+(St-1)*y.smoothstep(h,Tt,wt),m=i.pointcloud.fluid.splatForce*x;this.color.setHSL(o*.1%1,.8,.5),this.fluid.splat(this.mouse.x,this.mouse.y,g*m,f*m,this.color,i.pointcloud.fluid.splatRadius*gt,this.mouse.px,this.mouse.py)}}return this.paintHandFluidPointers(t,i,n,r,o),this.paintScrollFluidRects(t,i,n,r,o,e),t.transitionRole!=="warmup"&&o!==this.lastStepTime&&(this.lastStepTime=o,Ke("cloudTexture.sharedFluid",()=>this.fluid.update(Math.min(e,1/30)))),this.fluid.fbos.velocity.read}paintHandFluidPointers(e,t,i,n,r){const o=e.handFluidPointers;if(!o||o.length===0||e.transitionRole==="warmup"||!t.pointcloud.fluid.enabled||i<=0||n<=0){(!o||o.length===0)&&this.handPointers.clear();return}const l=this.handPointerActiveIds;l.clear();for(const a of o){const d=y.clamp(a.x,0,1)*i,u=y.clamp(a.y,0,1)*n,v=this.handPointers.get(a.id);if(this.handPointers.set(a.id,{x:d,y:u}),l.add(a.id),!v)continue;const c=d-v.x,p=u-v.y;Math.hypot(c,p)<=.001||(this.color.setHSL((r*.11+a.id*.08)%1,.74,.54),this.fluid.splat(d,u,c*t.pointcloud.fluid.splatForce*a.strength*1.35,p*t.pointcloud.fluid.splatForce*a.strength*1.35,this.color,t.pointcloud.fluid.splatRadius*xt,v.x,v.y))}for(const a of this.handPointers.keys())l.has(a)||this.handPointers.delete(a)}paintScrollFluidRects(e,t,i,n,r,o){const l=e.scrollFluidRects,a=e.scrollVelocity;if(!l||e.transitionRole==="warmup"||!t.pointcloud.fluid.enabled||i<=0||n<=0||r===this.lastScrollPaintStepTime||Math.abs(a)<dt)return;const d=Math.max(window.innerWidth,1),u=Math.max(window.innerHeight,1),v=e.scrollFluidRectInfluences,c=Math.min(vt,l.length/4),p=y.clamp(o*60,.25,2),g=y.clamp(a,-1,1)*ht*p;if(!(Math.abs(g)<1e-4)){this.lastScrollPaintStepTime=r,this.color.setHSL((r*.07+.11)%1,.55,.54);for(let f=0;f<c;f++){const h=f*4,x=l[h],m=l[h+1],E=l[h+2],b=l[h+3];if(E<=0||b<=0)continue;const O=Math.max(0,m),D=Math.min(u,m+b),F=y.clamp((D-O)/Math.max(b,1),0,1);if(F<=0)continue;const L=Math.max(0,v?.[f]??1);if(L<=0)continue;const B=(x+E*.5)/d*i,le=(m+b*.5)/u*n,G=g*L,ue=Math.sin(r*1.7+f*1.91)*Math.abs(G)*.28,ce=y.clamp(Math.min(E,b)*.045*(i/d),9,23);this.fluid.splat(B,le,ue,-G*F,this.color,ce)}}}dispose(){this.disposed||this.disposeRequested||(this.disposeRequested=!0,this.activeCompile||this.disposeNow())}disposeNow(){this.disposed||(this.disposed=!0,this.fluid.dispose())}}const z=new WeakMap;function Dt(s,e){const t=z.get(s);if(t)return t.refs++,t.fluid;const i=new bt(s,e);return z.set(s,{fluid:i,refs:1}),i}function Rt(s,e){if(!s||!e)return;const t=z.get(s);!t||t.fluid!==e||(t.refs--,t.refs<=0&&(z.delete(s),e.dispose()))}function It({fluid:s,fluidVelocityRef:e,driveFluid:t=!0,scrollVelocity:i=0,motion:n}){const r=$(h=>h.gl),o=$(h=>h.size),l=De(),a=s.simSize,d=s.dyeSize,u=w.useMemo(()=>Dt(r,{simSize:a,dyeSize:d}),[r]);w.useEffect(()=>()=>Rt(r,u),[r,u]),w.useEffect(()=>{s.enabled&&u.resize(Math.max(1,o.width),Math.max(1,o.height))},[s.enabled,u,o.height,o.width]);const v=we(),c=w.useRef(!1);w.useEffect(()=>{if(!v||!s.enabled)return;let h=!1;return Ze(async()=>{h||(await u.compileAsync(),!h&&(u.update(1/60,{transitionRole:"solo",pointer:{x:0,y:0},pointerActive:!1,scrollVelocity:0},{pointcloud:{fluid:s}},Math.max(1,o.width),Math.max(1,o.height),0),h||(c.current=!0)))},{visibilityAwareWatchdog:!0}).catch(x=>{h||be(x,"FluidField.warmup",{...Ge(x)})}),()=>{h=!0}},[v,u]);const p=w.useRef(0),g=w.useRef({transitionRole:"solo",pointer:{x:0,y:0},pointerActive:!1,scrollVelocity:0}),f=w.useRef(null);return xe((h,x)=>{if(!s.enabled){e.current=null;return}const m=n?.current?.transition??0;if(m<=-1||m>=1){e.current=u.velocityTexture;return}const b=Math.min(x,1/30),O=m>=0&&m<1;if(t&&O&&c.current){u.configure(a,d)&&(u.reset(),p.current=0),p.current+=b;const D=g.current;D.pointer.x=l.current.x,D.pointer.y=l.current.y,D.pointerActive=l.current.active;const F=Se.getState().preferReducedMotion;D.scrollVelocity=F?0:n?.current?.scrollVelocity||i||We();let L=s;F&&((!f.current||f.current.src!==s)&&(f.current={src:s,out:{...s,splatForce:s.splatForce*Te}}),L=f.current.out);const B=u.update(x,D,{pointcloud:{fluid:L}},Math.max(1,o.width),Math.max(1,o.height),p.current);e.current=B}else e.current=u.velocityTexture}),null}export{It as F,Ge as a,Xe as c,Ze as e,We as g,Ye as s};
//# sourceMappingURL=FluidField-OmmkFHf7.js.map
