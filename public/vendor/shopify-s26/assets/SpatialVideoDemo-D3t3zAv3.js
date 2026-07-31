import{j as f}from"./jsx-runtime-u17CrQMm.js";import{K as J,t as L,y as re,X as oe,M as ne,Y as ie,Z as K,_ as ue,R as se,U as le,L as j,J as G,S as ce,e as me,n as de,v as b,$ as fe,s as ve,u as pe}from"./TierResolver-y-fGWbnF.js";import{r as d}from"./chunk-QUQL4437-BD29ZypC.js";import{u as he}from"./constants-xV0ws6Hx.js";import{R as xe}from"./reducedMotion-CdiMTSZU.js";import{C as ye,V as Me}from"./colorAndNoise-D12tu5Fy.js";import{u as ge}from"./PlaygroundApp-CsTPFYzC.js";import{t as D}from"./theatreTypes-DCxDp2Xq.js";import{S as $,a as Te,s as Ee}from"./SpatialVideoDemo.theatre-D3h2YKcV.js";import"./index-7OC5HNn7.js";import"./preload-helper-DO1ztSUD.js";import"./BrowserSpecsListener-Y175IQs6.js";import"./index-BsuVXJ23.js";import"./index-CplsFZVb.js";import"./presets-EmxEXVgb.js";const Se=50,Y=768,we=1,Oe=.035,X=64,Ce=`
  out vec3 vLocalPos;
  out vec3 vCameraLocal;
  out vec3 vWorldPos;

  void main() {
    vLocalPos = position;
    vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Fe=`
  precision highp float;
  precision highp sampler3D;

  uniform sampler3D uVolume;
  uniform float uOpacity;
  uniform float uEdgeWidth;
  uniform float uEdgeOnly;
  uniform float uNearFade;
  uniform float uBrightness;
  uniform vec3 uHsl;
  uniform float uTime;
  uniform vec3 uNoiseScale;
  uniform vec3 uNoiseMovement;
  uniform float uNoiseStrength;
  uniform float uOffset;
  uniform int uOpacityCurve;
  uniform float uFalloff;
  uniform float uIntensity;

  in vec3 vLocalPos;
  in vec3 vCameraLocal;
  in vec3 vWorldPos;
  out vec4 outColor;

${ye}
${Me}

  vec3 animatedUvOffset(vec3 p) {
    if (abs(uNoiseStrength) <= 0.000001) return vec3(0.0);
    vec3 noisePos = p * uNoiseScale + uTime * uNoiseMovement;
    return vec3(
      cnoise(noisePos),
      cnoise(noisePos + vec3(19.19, 7.31, 3.77)),
      cnoise(noisePos + vec3(5.13, 23.17, 11.71))
    ) * uNoiseStrength;
  }

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

  float curveOpacity(float t) {
    float value = 1.0;
    if (uOpacityCurve == 0) {
      value = 1.0 - t * uFalloff;
    } else if (uOpacityCurve == 1) {
      value = exp(-t * uFalloff * 3.0);
    } else if (uOpacityCurve == 2) {
      value = t < uFalloff ? 1.0 : 0.05;
    } else if (uOpacityCurve == 3) {
      value = exp(-pow((t - 0.5) * uFalloff * 3.0, 2.0));
    }
    return clamp(value, 0.02, 1.0) * uIntensity;
  }

  void main() {
    vec3 rayDir = normalize(vLocalPos - vCameraLocal);
    vec2 bounds = hitBox(vCameraLocal, rayDir);
    if (bounds.x > bounds.y) discard;
    bounds.x = max(bounds.x, 0.0);

    float steps = float(${X});
    float dt = (bounds.y - bounds.x) / steps;
    float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 noiseSamplePos = vCameraLocal + rayDir * mix(bounds.x, bounds.y, 0.5);
    vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);

    vec3 accum = vec3(0.0);
    float alpha = 0.0;
    for (int i = 0; i < ${X}; i++) {
      float t = bounds.x + (float(i) + jitter) * dt;
      vec3 p = vCameraLocal + rayDir * t;
      vec3 uvw = clamp(p + 0.5 + uvOffset, vec3(0.001), vec3(0.999));
      float z = fract(uvw.z + uOffset);
      vec4 tex = texture(uVolume, vec3(uvw.x, 1.0 - uvw.y, z));
      float luma = max(max(tex.r, tex.g), tex.b);
      float edgeDist = min(min(uvw.x, 1.0 - uvw.x), min(uvw.y, 1.0 - uvw.y));
      float edge = 1.0 - smoothstep(0.0, uEdgeWidth, edgeDist);
      float edgeMask = mix(1.0, edge, uEdgeOnly);
      float density = smoothstep(0.09, 0.091, luma) * uOpacity * curveOpacity(uvw.z) * edgeMask;
      float a = density / steps;
      accum += applyHsl(tex.rgb, uHsl) * uBrightness * a * (1.0 - alpha);
      alpha += a * (1.0 - alpha);
      if (alpha > 0.96) break;
    }

    float nearFade = smoothstep(0.0, max(0.0001, uNearFade), length(vWorldPos - cameraPosition));
    outColor = vec4(accum * nearFade, alpha * nearFade);
  }
`,_=new Map;function Ae({videoUrl:t,position:e=[0,0,0],rotation:r=[0,0,0],scale:a=[1,1,1],offset:n=0,animateOffset:o=0,opacity:u=1,spacing:i=Oe,width:s=we,frameCount:l=Se,textureMax:c=Y,centerDepth:x=!1,renderOnTop:v=!1,opacityCurve:y="linear",falloff:E=.5,intensity:p=.7,edgeWidth:O=.001,edgeOnly:C=0,nearFade:F=2,brightness:q=1,hsl:Q=[0,0,0],noiseScale:k=[0,0,0],noiseMovement:ee=[0,0,0],noiseStrength:te=0,blendMode:ae="normal",groupRef:g}){const m=d.useMemo(()=>{const h=new J;return h.name="Theatre-positioned spatial video layer",h},[]),M=d.useRef(null),A=d.useRef(0),S=d.useRef(0);d.useEffect(()=>{if(g)return g.current=m,()=>{g.current===m&&(g.current=null)}},[g,m]);const[V,P,R]=e,[N,I,U]=r,[z,W,B]=a;return d.useEffect(()=>{m.position.set(V,P,R),m.rotation.set(L.degToRad(N),L.degToRad(I),L.degToRad(U)),m.scale.set(z,W,B)},[m,V,P,R,N,I,U,z,W,B]),d.useEffect(()=>{const h=++S.current;if(M.current?.dispose(),M.current=null,A.current=0,!!t)return Ne(t,l,c).then(w=>{if(h!==S.current)return;const T=De(w);M.current=T,m.add(T.group)}).catch(w=>{S.current}),()=>{S.current++,M.current?.dispose(),M.current=null}},[l,c,m,t]),re((h,w)=>{const T=M.current;if(!T)return;const H=he.getState().preferReducedMotion?xe:1;A.current+=o*Math.min(w,1/30)*60*H,_e(T,{width:s,spacing:i,opacity:u,center:x,renderOnTop:v,blendMode:ae,opacityCurve:y,falloff:E,intensity:p,edgeWidth:O,edgeOnly:C,nearFade:F,brightness:q,hsl:Q,noiseScale:k,noiseMovement:ee,noiseStrength:te,time:h.clock.elapsedTime*H,offset:n+A.current})}),f.jsx("primitive",{object:m})}function Le(t){return new me({glslVersion:fe,vertexShader:Ce,fragmentShader:Fe,uniforms:{uVolume:{value:t},uOpacity:{value:.72},uEdgeWidth:{value:.001},uEdgeOnly:{value:0},uNearFade:{value:2},uBrightness:{value:1},uHsl:{value:new b},uTime:{value:0},uNoiseScale:{value:new b},uNoiseMovement:{value:new b},uNoiseStrength:{value:0},uOffset:{value:0},uOpacityCurve:{value:0},uFalloff:{value:.5},uIntensity:{value:.7}},transparent:!0,depthTest:!0,depthWrite:!1,blending:K,side:de})}function be(t){const e=new ue(t.data,t.width,t.height,t.layerCount);return e.format=se,e.type=le,e.minFilter=j,e.magFilter=j,e.wrapS=G,e.wrapT=G,e.colorSpace=ce,e.unpackAlignment=1,e.needsUpdate=!0,e}function De(t){const e=new J;e.name="Raymarched spatial video layer";const r=be(t),a=new oe(1,1,1),n=Le(r),o=new ne(a,n);return o.name="Raymarched spatial video frames",o.frustumCulled=!1,o.renderOrder=30,e.add(o),{group:e,material:n,mesh:o,texture:r,layerCount:t.layerCount,aspect:t.aspect,dispose:()=>{e.removeFromParent(),a.dispose(),n.dispose(),r.dispose()}}}function _e(t,e){const r=Math.max(e.width,.001),a=r/Math.max(.001,t.aspect),n=Math.max(e.spacing,e.spacing*Math.max(1,t.layerCount-1));t.group.scale.set(r,a,n),t.group.position.z=e.center?0:-n*.5,t.material.uniforms.uOpacity.value=e.opacity,t.material.uniforms.uEdgeWidth.value=e.edgeWidth,t.material.uniforms.uEdgeOnly.value=e.edgeOnly,t.material.uniforms.uNearFade.value=e.nearFade,t.material.uniforms.uBrightness.value=e.brightness,t.material.uniforms.uHsl.value.fromArray(e.hsl),t.material.uniforms.uNoiseScale.value.fromArray(e.noiseScale),t.material.uniforms.uNoiseMovement.value.fromArray(e.noiseMovement),t.material.uniforms.uNoiseStrength.value=e.noiseStrength,t.material.uniforms.uTime.value=e.time,t.material.uniforms.uOffset.value=Pe(e.offset,t.layerCount),t.material.uniforms.uOpacityCurve.value=Ve(e.opacityCurve),t.material.uniforms.uFalloff.value=e.falloff,t.material.uniforms.uIntensity.value=e.intensity;const o=e.blendMode==="additive"?ie:K,u=!e.renderOnTop,i=!1;(t.material.blending!==o||t.material.depthTest!==u||t.material.depthWrite!==i)&&(t.material.blending=o,t.material.depthTest=u,t.material.depthWrite=i,t.material.needsUpdate=!0),t.mesh.renderOrder=e.renderOnTop?1e3:30}function Ve(t){switch(t){case"expo":return 1;case"step":return 2;case"gauss":return 3;case"flat":return 4;default:return 0}}function Pe(t,e){return e<=0||!Number.isFinite(t)?0:(t%e+e)%e/e}function Re(t,e){const r=Math.max(1,Math.min(e,t));return r===1?[0]:Array.from({length:r},(a,n)=>Math.round(n/(r-1)*(t-1)))}async function Ne(t,e,r){const a=Math.max(1,Math.floor(e)),n=Math.max(64,Math.floor(r||Y)),o=`${t}|${a}|${n}`,u=_.get(o);if(u)return u;const i=Ie(t,a,n).catch(s=>{throw _.delete(o),s});return _.set(o,i),i}async function Ie(t,e,r){const a=document.createElement("video");a.crossOrigin="anonymous",a.muted=!0,a.playsInline=!0,a.preload="metadata",a.src=t,a.load();try{if(a.readyState<HTMLMediaElement.HAVE_METADATA&&await Z(a,"loadedmetadata"),!Number.isFinite(a.duration)||a.duration<=0)throw new Error("Video does not expose a finite duration");const n=a.videoWidth,o=a.videoHeight;if(!n||!o)throw new Error("Video has no readable dimensions");const u=n/Math.max(1,o),i=Math.min(1,r/Math.max(n,o)),s=Math.max(1,Math.round(n*i)),l=Math.max(1,Math.round(o*i)),c=Re(e,e),x=new Uint8Array(s*l*4*c.length),v=document.createElement("canvas");v.width=s,v.height=l;const y=v.getContext("2d",{willReadFrequently:!0});if(!y)throw new Error("Could not create 2D canvas context");const E=Math.max(0,a.duration-.001);for(let p=0;p<c.length;p++){const O=c.length===1?E*.5:p/(c.length-1)*E;await Ue(a,O),y.clearRect(0,0,s,l),y.drawImage(a,0,0,s,l);const C=y.getImageData(0,0,s,l);x.set(C.data,p*s*l*4),(p&3)===0&&await new Promise(F=>setTimeout(F,0))}return{data:x,width:s,height:l,aspect:u,layerCount:c.length}}finally{a.removeAttribute("src"),a.load(),a.remove()}}function Z(t,e){return new Promise((r,a)=>{const n=window.setTimeout(()=>a(new Error(`Timeout waiting for video ${e}`)),1e4),o=()=>{window.clearTimeout(n),t.removeEventListener(e,u),t.removeEventListener("error",i)},u=()=>{o(),r()},i=()=>{o(),a(t.error??new Error(`Video ${e} failed`))};t.addEventListener(e,u,{once:!0}),t.addEventListener("error",i,{once:!0})})}async function Ue(t,e){const r=Math.max(0,Math.min(e,Math.max(0,(t.duration||0)-.001)));if(Math.abs(t.currentTime-r)<.002&&t.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)return;const a=Z(t,"seeked");t.currentTime=r,await a}const ze=[0,0,-.8];function We({cameraZ:t}){const e=pe(r=>r.camera);return d.useEffect(()=>{e.position.set(0,0,t),e.lookAt(...ze)},[e,t]),null}function Be({videoUrl:t,cameraZ:e,position:r,rotation:a,scale:n,offset:o,animateOffset:u,opacity:i,spacing:s,edgeOnly:l,nearFade:c,brightness:x,blendMode:v}){return f.jsxs(f.Fragment,{children:[f.jsx("color",{attach:"background",args:["#05060d"]}),f.jsx(We,{cameraZ:e}),f.jsx(Ae,{videoUrl:t,position:r,rotation:a,scale:n,offset:o,animateOffset:u,opacity:i,spacing:s,edgeOnly:l,nearFade:c,brightness:x,blendMode:v})]})}function ot(){const{values:t}=ge("SpatialVideo",Ee),e=t??Te,r=$.find(a=>a.id===e.video)?.url??$[0].url;return f.jsx(ve,{flat:!0,camera:{fov:45,near:.1,far:100},children:f.jsx(Be,{videoUrl:r,cameraZ:e.cameraZ,position:D(e.position),rotation:D(e.rotation),scale:D(e.scale),offset:e.offset,animateOffset:e.animateOffset,opacity:e.opacity,spacing:e.spacing,edgeOnly:e.edgeOnly,nearFade:e.nearFade,brightness:e.brightness,blendMode:e.blendMode},r)})}export{ot as default};
//# sourceMappingURL=SpatialVideoDemo-D3t3zAv3.js.map
