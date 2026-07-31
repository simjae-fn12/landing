import{j as s}from"./jsx-runtime-u17CrQMm.js";import{s as C,u as F,K as R,X as j,e as P,n as O,Z as y,v as B,$ as _,M as k,Y as U,_ as D,R as H,U as N,L as w,S as z}from"./TierResolver-y-fGWbnF.js";import{r as h}from"./chunk-QUQL4437-BD29ZypC.js";import{C as G}from"./colorAndNoise-D12tu5Fy.js";import{u as I}from"./PlaygroundApp-CsTPFYzC.js";import{v as x,o as $,t as b}from"./theatreTypes-DCxDp2Xq.js";import{d as p}from"./index-CplsFZVb.js";import{O as W}from"./OrbitControls-CUsrAYnc.js";import"./constants-xV0ws6Hx.js";import"./index-7OC5HNn7.js";import"./preload-helper-DO1ztSUD.js";import"./BrowserSpecsListener-Y175IQs6.js";import"./index-BsuVXJ23.js";import"./presets-EmxEXVgb.js";import"./extends-CF3RwP-h.js";const X="/vendor/shopify-s26/remote/cdn.shopify.com/3a67102bfe571032-15de67fa52a247e9805165ba4417e3b7.mp4",m={visible:!0,width:.7,depth:3.5,opacity:1.8,brightness:1.25,threshold:.09,softness:.001,blendMode:"normal",steps:96,nearFade:0,position:{x:-.065,y:-.815,z:-.95},rotation:{x:-.149,y:.259,z:-1.502},scale:{x:2.75,y:4.17,z:.31},hsl:{x:0,y:0,z:0}},q={visible:p.types.boolean(m.visible,{label:"Visible"}),width:p.types.number(m.width,{range:[.05,20],nudgeMultiplier:.01}),depth:p.types.number(m.depth,{range:[.01,20],nudgeMultiplier:.01}),opacity:p.types.number(m.opacity,{range:[0,8],nudgeMultiplier:.01}),brightness:p.types.number(m.brightness,{range:[0,8],nudgeMultiplier:.01}),threshold:p.types.number(m.threshold,{range:[0,1],nudgeMultiplier:.001}),softness:p.types.number(m.softness,{range:[.001,1],nudgeMultiplier:.001}),blendMode:p.types.stringLiteral(m.blendMode,$(["normal","additive"]),{as:"menu",label:"Blend Mode"}),steps:p.types.number(m.steps,{range:[8,96],nudgeMultiplier:1}),nearFade:p.types.number(m.nearFade,{range:[0,12],nudgeMultiplier:.1,label:"Near Fade"}),position:x([-.065,-.815,-.95],{range:[-4,4],nudgeMultiplier:.001}),rotation:x([-.149,.259,-1.502],{range:[-Math.PI,Math.PI],nudgeMultiplier:.001}),scale:x([2.75,4.17,.31],{range:[.01,10],nudgeMultiplier:.01}),hsl:x([0,0,0],{range:[-1,1],nudgeMultiplier:.01})},L=50,J=256,E=[0,.15,5.2],T=[0,-.35,-.8];function K(){const t=F(e=>e.camera);return h.useEffect(()=>{t.position.fromArray(E),t.lookAt(...T),t.updateProjectionMatrix()},[t]),null}function Y({sourceUrl:t,settings:e,onStatus:i}){const n=h.useRef(null),o=h.useRef(e),[a,l]=h.useState(null);return o.current=e,h.useEffect(()=>{n.current?.apply(e)},[e]),h.useEffect(()=>{const r=new AbortController;let d=null;return n.current?.dispose(),n.current=null,l(null),i(`Extracting ${L} videoLightVolume frames…`),oe(t,L,J,r.signal).then(u=>{const c=ee(u);if(r.signal.aborted){c.dispose();return}d=c,n.current=c,c.apply(o.current),l(c.group),i(`Loaded ${u.layerCount} videoLightVolume frames (${u.width}×${u.height}).`)}).catch(u=>{if(r.signal.aborted)return;const c=u instanceof Error?u.message:String(u);i(`videoLightVolume source error: ${c}`)}),()=>{r.abort(),d?.dispose(),n.current===d&&(n.current=null)}},[i,t]),a?s.jsx("primitive",{object:a}):s.jsx(Z,{settings:e})}function Z({settings:t}){if(!t.visible)return null;const e=16/9;return s.jsx("group",{position:t.position,rotation:t.rotation,scale:[t.scale[0]*t.width,t.scale[1]*(t.width/e),t.scale[2]*t.depth],children:s.jsxs("mesh",{children:[s.jsx("boxGeometry",{args:[1,1,1]}),s.jsx("meshBasicMaterial",{color:"#8fd6ff",wireframe:!0,transparent:!0,opacity:.5})]})})}function Q({sourceUrl:t,settings:e,onStatus:i}){return s.jsxs(s.Fragment,{children:[s.jsx("color",{attach:"background",args:["#05060d"]}),s.jsx(K,{}),s.jsx(W,{makeDefault:!0,target:T}),s.jsx(Y,{sourceUrl:t,settings:e,onStatus:i})]})}function Me(){const{values:t}=I("VideoLightVolume",q),e=t??m,[i,n]=h.useState("Ready to load videoLightVolume."),o=X,a=h.useMemo(()=>({visible:e.visible,width:e.width,depth:e.depth,opacity:e.opacity,brightness:e.brightness,threshold:e.threshold,softness:e.softness,blendMode:e.blendMode,steps:e.steps,nearFade:e.nearFade,position:b(e.position),rotation:b(e.rotation),scale:b(e.scale),hsl:b(e.hsl)}),[e]);return s.jsxs("div",{className:"relative h-full w-full bg-black",children:[s.jsx(C,{camera:{position:E,fov:45,near:.1,far:100},children:s.jsx(Q,{sourceUrl:o,settings:a,onStatus:n})}),s.jsxs("div",{className:"pointer-events-none absolute right-16 bottom-16 max-w-96 rounded-[12px] bg-black/55 px-12 py-10 text-xs leading-snug text-white/80 backdrop-blur-md",children:[s.jsx("div",{className:"font-medium text-white",children:"videoLightVolume"}),s.jsx("div",{children:i}),s.jsx("div",{className:"mt-4 text-white/45",children:"VF Source is temporarily backed by a sample video URL until the VFPlayer source-frame seam is added."})]})]})}function ee(t){const e=new R;e.name="videoLightVolume";const i=te(t),n=t.aspect||t.width/Math.max(1,t.height),o=new j(1,1,1),a=new P({glslVersion:_,vertexShader:`
      out vec3 vLocalPos;
      out vec3 vCameraLocal;
      out vec3 vWorldPos;
      void main() {
        vLocalPos = position;
        vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      precision highp sampler3D;
      uniform sampler3D uVolume;
      uniform float uOpacity;
      uniform float uBrightness;
      uniform float uThreshold;
      uniform float uSoftness;
      uniform float uSteps;
      uniform float uNearFade;
      uniform vec3 uHsl;
      in vec3 vLocalPos;
      in vec3 vCameraLocal;
      in vec3 vWorldPos;
      out vec4 outColor;

${G}

      vec2 hitBox(vec3 orig, vec3 dir) {
        vec3 boxMin = vec3(-0.5);
        vec3 boxMax = vec3(0.5);
        vec3 invDir = 1.0 / dir;
        vec3 tMinTmp = (boxMin - orig) * invDir;
        vec3 tMaxTmp = (boxMax - orig) * invDir;
        vec3 tMin = min(tMinTmp, tMaxTmp);
        vec3 tMax = max(tMinTmp, tMaxTmp);
        float t0 = max(max(tMin.x, tMin.y), tMin.z);
        float t1 = min(min(tMax.x, tMax.y), tMax.z);
        return vec2(t0, t1);
      }

      void main() {
        vec3 rayDir = normalize(vLocalPos - vCameraLocal);
        vec2 bounds = hitBox(vCameraLocal, rayDir);
        if (bounds.x > bounds.y) discard;
        bounds.x = max(bounds.x, 0.0);
        float steps = clamp(uSteps, 8.0, 96.0);
        float dt = (bounds.y - bounds.x) / steps;
        vec3 accum = vec3(0.0);
        float alpha = 0.0;
        for (int i = 0; i < 96; i++) {
          if (float(i) >= steps) break;
          float t = bounds.x + (float(i) + 0.5) * dt;
          vec3 p = vCameraLocal + rayDir * t;
          vec3 uvw = p + 0.5;
          vec4 tex = texture(uVolume, vec3(uvw.x, 1.0 - uvw.y, uvw.z));
          float luma = max(max(tex.r, tex.g), tex.b);
          float density = smoothstep(uThreshold, uThreshold + max(0.0001, uSoftness), luma) * uOpacity;
          float a = density / steps;
          accum += applyHsl(tex.rgb, uHsl) * uBrightness * a * (1.0 - alpha);
          alpha += a * (1.0 - alpha);
          if (alpha > 0.96) break;
        }
        float nearFade = smoothstep(0.0, max(0.0001, uNearFade), length(vWorldPos - cameraPosition));
        outColor = vec4(accum * nearFade, alpha * nearFade);
      }
    `,uniforms:{uVolume:{value:i},uOpacity:{value:1.8},uBrightness:{value:1.25},uThreshold:{value:.09},uSoftness:{value:.001},uSteps:{value:96},uNearFade:{value:0},uHsl:{value:new B}},transparent:!0,depthWrite:!1,depthTest:!1,blending:y,side:O}),l=new k(o,a);return l.name="Raymarched videoLightVolume",l.frustumCulled=!1,e.add(l),{group:e,apply:r=>{e.visible=r.visible,e.position.fromArray(r.position),e.rotation.fromArray(r.rotation),e.scale.set(r.scale[0]*r.width,r.scale[1]*(r.width/Math.max(.001,n)),r.scale[2]*r.depth),l.renderOrder=10,a.blending=r.blendMode==="additive"?U:y,a.uniforms.uOpacity.value=r.opacity,a.uniforms.uBrightness.value=r.brightness,a.uniforms.uThreshold.value=r.threshold,a.uniforms.uSoftness.value=r.softness,a.uniforms.uSteps.value=r.steps,a.uniforms.uNearFade.value=r.nearFade,a.uniforms.uHsl.value.fromArray(r.hsl)},dispose:()=>{e.removeFromParent(),o.dispose(),a.dispose(),i.dispose()}}}function te(t){const e=new D(t.data,t.width,t.height,t.layerCount);return e.format=H,e.type=N,e.minFilter=w,e.magFilter=w,e.colorSpace=z,e.unpackAlignment=1,e.needsUpdate=!0,e}async function oe(t,e,i,n){M(n);const o=document.createElement("video");o.crossOrigin="anonymous",o.muted=!0,o.playsInline=!0,o.preload="metadata";try{if(o.src=t,o.load(),o.readyState<HTMLMediaElement.HAVE_METADATA&&await V(o,"loadedmetadata",n),M(n),!Number.isFinite(o.duration)||o.duration<=0)throw new Error("Video does not expose a finite duration");const a=Math.min(1,i/Math.max(o.videoWidth,o.videoHeight)),l=Math.max(1,Math.round(o.videoWidth*a)),r=Math.max(1,Math.round(o.videoHeight*a)),d=Math.max(1,Math.floor(e)),u=new Uint8Array(l*r*4*d),c=document.createElement("canvas");c.width=l,c.height=r;const f=c.getContext("2d",{willReadFrequently:!0});if(!f)throw new Error("Could not create 2D canvas context");const g=Math.max(0,o.duration-.001);for(let v=0;v<d;v++){const A=d===1?g*.5:v/(d-1)*g;await re(o,A,n),f.clearRect(0,0,l,r),f.drawImage(o,0,0,l,r),u.set(f.getImageData(0,0,l,r).data,v*l*r*4),(v&3)===0&&await new Promise(S=>setTimeout(S,0))}return{data:u,width:l,height:r,layerCount:d,aspect:o.videoWidth/Math.max(1,o.videoHeight)}}finally{o.removeAttribute("src"),o.load()}}async function re(t,e,i){M(i);const n=Math.max(0,Math.min(e,t.duration-.001));if(Math.abs(t.currentTime-n)<.002&&t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)return;const o=V(t,"seeked",i);t.currentTime=n,await o}function V(t,e,i){return M(i),new Promise((n,o)=>{const a=()=>{window.clearTimeout(u),t.removeEventListener(e,l),t.removeEventListener("error",r),i?.removeEventListener("abort",d)},l=()=>{a(),n()},r=()=>{a(),o(new Error(t.error?.message||`Video ${e} failed`))},d=()=>{a(),o(new DOMException("videoLightVolume build aborted","AbortError"))},u=window.setTimeout(()=>{a(),o(new Error(`Timed out waiting for video ${e}`))},1e4);t.addEventListener(e,l,{once:!0}),t.addEventListener("error",r,{once:!0}),i?.addEventListener("abort",d,{once:!0})})}function M(t){if(t?.aborted)throw new DOMException("videoLightVolume build aborted","AbortError")}export{Me as default};
//# sourceMappingURL=VideoLightVolumeDemo-CHWbqECU.js.map
