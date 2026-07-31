import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{t}from"./react-Dvkprh6u.js";import{t as n}from"./jsx-runtime-DKdBMi_L.js";import{$a as r,Gt as i,In as a,O as o,Qi as s,Wa as c,Yi as l,Zr as u,qt as d,rr as f,ut as p}from"./three.core-DVcoLpfz.js";import{b as m}from"./events-760a1017.esm-DCPtHAo6.js";import{t as h}from"./react-three-fiber.esm-Dxg-PL46.js";import{t as g}from"./dist-4Ign8GoJ.js";import{t as _}from"./colorAndNoise-DY6zB3P7.js";import{t as v}from"./OrbitControls-C3_f9Wka.js";import{s as y}from"./theatre-DgCyCBq3.js";import{a as b,n as x,r as S}from"./theatreTypes-gh9oqObx.js";var C=e(t(),1),w=g(),T=`/vendor/shopify-s26/remote/cdn.shopify.com/3a67102bfe571032-15de67fa52a247e9805165ba4417e3b7.mp4`,E={visible:!0,width:.7,depth:3.5,opacity:1.8,brightness:1.25,threshold:.09,softness:.001,blendMode:`normal`,steps:96,nearFade:0,position:{x:-.065,y:-.815,z:-.95},rotation:{x:-.149,y:.259,z:-1.502},scale:{x:2.75,y:4.17,z:.31},hsl:{x:0,y:0,z:0}},D={visible:w.types.boolean(E.visible,{label:`Visible`}),width:w.types.number(E.width,{range:[.05,20],nudgeMultiplier:.01}),depth:w.types.number(E.depth,{range:[.01,20],nudgeMultiplier:.01}),opacity:w.types.number(E.opacity,{range:[0,8],nudgeMultiplier:.01}),brightness:w.types.number(E.brightness,{range:[0,8],nudgeMultiplier:.01}),threshold:w.types.number(E.threshold,{range:[0,1],nudgeMultiplier:.001}),softness:w.types.number(E.softness,{range:[.001,1],nudgeMultiplier:.001}),blendMode:w.types.stringLiteral(E.blendMode,x([`normal`,`additive`]),{as:`menu`,label:`Blend Mode`}),steps:w.types.number(E.steps,{range:[8,96],nudgeMultiplier:1}),nearFade:w.types.number(E.nearFade,{range:[0,12],nudgeMultiplier:.1,label:`Near Fade`}),position:b([-.065,-.815,-.95],{range:[-4,4],nudgeMultiplier:.001}),rotation:b([-.149,.259,-1.502],{range:[-Math.PI,Math.PI],nudgeMultiplier:.001}),scale:b([2.75,4.17,.31],{range:[.01,10],nudgeMultiplier:.01}),hsl:b([0,0,0],{range:[-1,1],nudgeMultiplier:.01})},O=n(),k=50,A=256,j=[0,.15,5.2],M=[0,-.35,-.8];function N(){let e=m(e=>e.camera);return(0,C.useEffect)(()=>{e.position.fromArray(j),e.lookAt(...M),e.updateProjectionMatrix()},[e]),null}function P({sourceUrl:e,settings:t,onStatus:n}){let r=(0,C.useRef)(null),i=(0,C.useRef)(t),[a,o]=(0,C.useState)(null);return i.current=t,(0,C.useEffect)(()=>{r.current?.apply(t)},[t]),(0,C.useEffect)(()=>{let t=new AbortController,a=null;return r.current?.dispose(),r.current=null,o(null),n(`Extracting ${k} videoLightVolume frames…`),B(e,k,A,t.signal).then(e=>{let s=R(e);if(t.signal.aborted){s.dispose();return}a=s,r.current=s,s.apply(i.current),o(s.group),n(`Loaded ${e.layerCount} videoLightVolume frames (${e.width}×${e.height}).`)}).catch(e=>{t.signal.aborted||n(`videoLightVolume source error: ${e instanceof Error?e.message:String(e)}`)}),()=>{t.abort(),a?.dispose(),r.current===a&&(r.current=null)}},[n,e]),a?(0,O.jsx)(`primitive`,{object:a}):(0,O.jsx)(F,{settings:t})}function F({settings:e}){return e.visible?(0,O.jsx)(`group`,{position:e.position,rotation:e.rotation,scale:[e.scale[0]*e.width,e.scale[1]*(e.width/(16/9)),e.scale[2]*e.depth],children:(0,O.jsxs)(`mesh`,{children:[(0,O.jsx)(`boxGeometry`,{args:[1,1,1]}),(0,O.jsx)(`meshBasicMaterial`,{color:`#8fd6ff`,wireframe:!0,transparent:!0,opacity:.5})]})}):null}function I({sourceUrl:e,settings:t,onStatus:n}){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`color`,{attach:`background`,args:[`#05060d`]}),(0,O.jsx)(N,{}),(0,O.jsx)(v,{makeDefault:!0,target:M}),(0,O.jsx)(P,{sourceUrl:e,settings:t,onStatus:n})]})}function L(){let{values:e}=y(`VideoLightVolume`,D),t=e??E,[n,r]=(0,C.useState)(`Ready to load videoLightVolume.`),i=T,a=(0,C.useMemo)(()=>({visible:t.visible,width:t.width,depth:t.depth,opacity:t.opacity,brightness:t.brightness,threshold:t.threshold,softness:t.softness,blendMode:t.blendMode,steps:t.steps,nearFade:t.nearFade,position:S(t.position),rotation:S(t.rotation),scale:S(t.scale),hsl:S(t.hsl)}),[t]);return(0,O.jsxs)(`div`,{className:`relative h-full w-full bg-black`,children:[(0,O.jsx)(h,{camera:{position:j,fov:45,near:.1,far:100},children:(0,O.jsx)(I,{sourceUrl:i,settings:a,onStatus:r})}),(0,O.jsxs)(`div`,{className:`pointer-events-none absolute right-16 bottom-16 max-w-96 rounded-[12px] bg-black/55 px-12 py-10 text-xs leading-snug text-white/80 backdrop-blur-md`,children:[(0,O.jsx)(`div`,{className:`font-medium text-white`,children:`videoLightVolume`}),(0,O.jsx)(`div`,{children:n}),(0,O.jsx)(`div`,{className:`mt-4 text-white/45`,children:`VF Source is temporarily backed by a sample video URL until the VFPlayer source-frame seam is added.`})]})]})}function R(e){let t=new d;t.name=`videoLightVolume`;let n=z(e),a=e.aspect||e.width/Math.max(1,e.height),c=new o(1,1,1),l=new s({glslVersion:i,vertexShader:`
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

${_}

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
    `,uniforms:{uVolume:{value:n},uOpacity:{value:1.8},uBrightness:{value:1.25},uThreshold:{value:.09},uSoftness:{value:.001},uSteps:{value:96},uNearFade:{value:0},uHsl:{value:new r}},transparent:!0,depthWrite:!1,depthTest:!1,blending:1,side:1}),u=new f(c,l);return u.name=`Raymarched videoLightVolume`,u.frustumCulled=!1,t.add(u),{group:t,apply:e=>{t.visible=e.visible,t.position.fromArray(e.position),t.rotation.fromArray(e.rotation),t.scale.set(e.scale[0]*e.width,e.scale[1]*(e.width/Math.max(.001,a)),e.scale[2]*e.depth),u.renderOrder=10,l.blending=e.blendMode===`additive`?2:1,l.uniforms.uOpacity.value=e.opacity,l.uniforms.uBrightness.value=e.brightness,l.uniforms.uThreshold.value=e.threshold,l.uniforms.uSoftness.value=e.softness,l.uniforms.uSteps.value=e.steps,l.uniforms.uNearFade.value=e.nearFade,l.uniforms.uHsl.value.fromArray(e.hsl)},dispose:()=>{t.removeFromParent(),c.dispose(),l.dispose(),n.dispose()}}}function z(e){let t=new p(e.data,e.width,e.height,e.layerCount);return t.format=u,t.type=c,t.minFilter=a,t.magFilter=a,t.colorSpace=l,t.unpackAlignment=1,t.needsUpdate=!0,t}async function B(e,t,n,r){U(r);let i=document.createElement(`video`);i.crossOrigin=`anonymous`,i.muted=!0,i.playsInline=!0,i.preload=`metadata`;try{if(i.src=e,i.load(),i.readyState<HTMLMediaElement.HAVE_METADATA&&await H(i,`loadedmetadata`,r),U(r),!Number.isFinite(i.duration)||i.duration<=0)throw Error(`Video does not expose a finite duration`);let a=Math.min(1,n/Math.max(i.videoWidth,i.videoHeight)),o=Math.max(1,Math.round(i.videoWidth*a)),s=Math.max(1,Math.round(i.videoHeight*a)),c=Math.max(1,Math.floor(t)),l=new Uint8Array(o*s*4*c),u=document.createElement(`canvas`);u.width=o,u.height=s;let d=u.getContext(`2d`,{willReadFrequently:!0});if(!d)throw Error(`Could not create 2D canvas context`);let f=Math.max(0,i.duration-.001);for(let e=0;e<c;e++)await V(i,c===1?f*.5:e/(c-1)*f,r),d.clearRect(0,0,o,s),d.drawImage(i,0,0,o,s),l.set(d.getImageData(0,0,o,s).data,e*o*s*4),e&3||await new Promise(e=>setTimeout(e,0));return{data:l,width:o,height:s,layerCount:c,aspect:i.videoWidth/Math.max(1,i.videoHeight)}}finally{i.removeAttribute(`src`),i.load()}}async function V(e,t,n){U(n);let r=Math.max(0,Math.min(t,e.duration-.001));if(Math.abs(e.currentTime-r)<.002&&e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)return;let i=H(e,`seeked`,n);e.currentTime=r,await i}function H(e,t,n){return U(n),new Promise((r,i)=>{let a=()=>{window.clearTimeout(l),e.removeEventListener(t,o),e.removeEventListener(`error`,s),n?.removeEventListener(`abort`,c)},o=()=>{a(),r()},s=()=>{a(),i(Error(e.error?.message||`Video ${t} failed`))},c=()=>{a(),i(new DOMException(`videoLightVolume build aborted`,`AbortError`))},l=window.setTimeout(()=>{a(),i(Error(`Timed out waiting for video ${t}`))},1e4);e.addEventListener(t,o,{once:!0}),e.addEventListener(`error`,s,{once:!0}),n?.addEventListener(`abort`,c,{once:!0})})}function U(e){if(e?.aborted)throw new DOMException(`videoLightVolume build aborted`,`AbortError`)}export{L as default};
//# sourceMappingURL=VideoLightVolumeDemo-6xpNiwYy.js.map