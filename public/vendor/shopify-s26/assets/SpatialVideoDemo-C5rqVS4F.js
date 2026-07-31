import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{t}from"./react-Dvkprh6u.js";import{t as n}from"./jsx-runtime-DKdBMi_L.js";import{t as r}from"./useBrowserSpecsStore-KSBuyu5W.js";import{$a as i,$n as a,Gt as o,In as s,O as c,Qi as l,V as u,Wa as d,Yi as f,Zr as p,qt as m,rr as h,ut as g}from"./three.core-DVcoLpfz.js";import{b as _,g as v}from"./events-760a1017.esm-DCPtHAo6.js";import{t as y}from"./react-three-fiber.esm-Dxg-PL46.js";import{n as b}from"./reducedMotion-CT1n0ezQ.js";import{n as x,t as S}from"./colorAndNoise-DY6zB3P7.js";import{s as C}from"./theatre-DgCyCBq3.js";import{r as w}from"./theatreTypes-gh9oqObx.js";import{n as T,r as E,t as D}from"./SpatialVideoDemo.theatre-YKDtCFoF.js";var O=e(t(),1),k=n(),A=50,j=768,M=1,N=.035,P=64,F=`
  out vec3 vLocalPos;
  out vec3 vCameraLocal;
  out vec3 vWorldPos;

  void main() {
    vLocalPos = position;
    vCameraLocal = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,I=`
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

${S}
${x}

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

    float steps = float(${P});
    float dt = (bounds.y - bounds.x) / steps;
    float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 noiseSamplePos = vCameraLocal + rayDir * mix(bounds.x, bounds.y, 0.5);
    vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);

    vec3 accum = vec3(0.0);
    float alpha = 0.0;
    for (int i = 0; i < ${P}; i++) {
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
`,L=new Map;function R({videoUrl:e,position:t=[0,0,0],rotation:n=[0,0,0],scale:i=[1,1,1],offset:o=0,animateOffset:s=0,opacity:c=1,spacing:l=N,width:u=M,frameCount:d=A,textureMax:f=j,centerDepth:p=!1,renderOnTop:h=!1,opacityCurve:g=`linear`,falloff:_=.5,intensity:y=.7,edgeWidth:x=.001,edgeOnly:S=0,nearFade:C=2,brightness:w=1,hsl:T=[0,0,0],noiseScale:E=[0,0,0],noiseMovement:D=[0,0,0],noiseStrength:P=0,blendMode:F=`normal`,groupRef:I}){let L=(0,O.useMemo)(()=>{let e=new m;return e.name=`Theatre-positioned spatial video layer`,e},[]),R=(0,O.useRef)(null),z=(0,O.useRef)(0),B=(0,O.useRef)(0);(0,O.useEffect)(()=>{if(I)return I.current=L,()=>{I.current===L&&(I.current=null)}},[I,L]);let[U,W,G]=t,[q,J,Y]=n,[X,Z,Q]=i;return(0,O.useEffect)(()=>{L.position.set(U,W,G),L.rotation.set(a.degToRad(q),a.degToRad(J),a.degToRad(Y)),L.scale.set(X,Z,Q)},[L,U,W,G,q,J,Y,X,Z,Q]),(0,O.useEffect)(()=>{let t=++B.current;if(R.current?.dispose(),R.current=null,z.current=0,e)return K(e,d,f).then(e=>{if(t!==B.current)return;let n=V(e);R.current=n,L.add(n.group)}).catch(e=>{B.current}),()=>{B.current++,R.current?.dispose(),R.current=null}},[d,f,L,e]),v((e,t)=>{let n=R.current;if(!n)return;let i=r.getState().preferReducedMotion?b:1;z.current+=s*Math.min(t,1/30)*60*i,H(n,{width:u,spacing:l,opacity:c,center:p,renderOnTop:h,blendMode:F,opacityCurve:g,falloff:_,intensity:y,edgeWidth:x,edgeOnly:S,nearFade:C,brightness:w,hsl:T,noiseScale:E,noiseMovement:D,noiseStrength:P,time:e.clock.elapsedTime*i,offset:o+z.current})}),(0,k.jsx)(`primitive`,{object:L})}function z(e){return new l({glslVersion:o,vertexShader:F,fragmentShader:I,uniforms:{uVolume:{value:e},uOpacity:{value:.72},uEdgeWidth:{value:.001},uEdgeOnly:{value:0},uNearFade:{value:2},uBrightness:{value:1},uHsl:{value:new i},uTime:{value:0},uNoiseScale:{value:new i},uNoiseMovement:{value:new i},uNoiseStrength:{value:0},uOffset:{value:0},uOpacityCurve:{value:0},uFalloff:{value:.5},uIntensity:{value:.7}},transparent:!0,depthTest:!0,depthWrite:!1,blending:1,side:1})}function B(e){let t=new g(e.data,e.width,e.height,e.layerCount);return t.format=p,t.type=d,t.minFilter=s,t.magFilter=s,t.wrapS=u,t.wrapT=u,t.colorSpace=f,t.unpackAlignment=1,t.needsUpdate=!0,t}function V(e){let t=new m;t.name=`Raymarched spatial video layer`;let n=B(e),r=new c(1,1,1),i=z(n),a=new h(r,i);return a.name=`Raymarched spatial video frames`,a.frustumCulled=!1,a.renderOrder=30,t.add(a),{group:t,material:i,mesh:a,texture:n,layerCount:e.layerCount,aspect:e.aspect,dispose:()=>{t.removeFromParent(),r.dispose(),i.dispose(),n.dispose()}}}function H(e,t){let n=Math.max(t.width,.001),r=n/Math.max(.001,e.aspect),i=Math.max(t.spacing,t.spacing*Math.max(1,e.layerCount-1));e.group.scale.set(n,r,i),e.group.position.z=t.center?0:-i*.5,e.material.uniforms.uOpacity.value=t.opacity,e.material.uniforms.uEdgeWidth.value=t.edgeWidth,e.material.uniforms.uEdgeOnly.value=t.edgeOnly,e.material.uniforms.uNearFade.value=t.nearFade,e.material.uniforms.uBrightness.value=t.brightness,e.material.uniforms.uHsl.value.fromArray(t.hsl),e.material.uniforms.uNoiseScale.value.fromArray(t.noiseScale),e.material.uniforms.uNoiseMovement.value.fromArray(t.noiseMovement),e.material.uniforms.uNoiseStrength.value=t.noiseStrength,e.material.uniforms.uTime.value=t.time,e.material.uniforms.uOffset.value=W(t.offset,e.layerCount),e.material.uniforms.uOpacityCurve.value=U(t.opacityCurve),e.material.uniforms.uFalloff.value=t.falloff,e.material.uniforms.uIntensity.value=t.intensity;let a=t.blendMode===`additive`?2:1,o=!t.renderOnTop;(e.material.blending!==a||e.material.depthTest!==o||e.material.depthWrite!==!1)&&(e.material.blending=a,e.material.depthTest=o,e.material.depthWrite=!1,e.material.needsUpdate=!0),e.mesh.renderOrder=t.renderOnTop?1e3:30}function U(e){switch(e){case`expo`:return 1;case`step`:return 2;case`gauss`:return 3;case`flat`:return 4;default:return 0}}function W(e,t){return t<=0||!Number.isFinite(e)?0:(e%t+t)%t/t}function G(e,t){let n=Math.max(1,Math.min(t,e));return n===1?[0]:Array.from({length:n},(t,r)=>Math.round(r/(n-1)*(e-1)))}async function K(e,t,n){let r=Math.max(1,Math.floor(t)),i=Math.max(64,Math.floor(n||j)),a=`${e}|${r}|${i}`,o=L.get(a);if(o)return o;let s=q(e,r,i).catch(e=>{throw L.delete(a),e});return L.set(a,s),s}async function q(e,t,n){let r=document.createElement(`video`);r.crossOrigin=`anonymous`,r.muted=!0,r.playsInline=!0,r.preload=`metadata`,r.src=e,r.load();try{if(r.readyState<HTMLMediaElement.HAVE_METADATA&&await J(r,`loadedmetadata`),!Number.isFinite(r.duration)||r.duration<=0)throw Error(`Video does not expose a finite duration`);let e=r.videoWidth,i=r.videoHeight;if(!e||!i)throw Error(`Video has no readable dimensions`);let a=e/Math.max(1,i),o=Math.min(1,n/Math.max(e,i)),s=Math.max(1,Math.round(e*o)),c=Math.max(1,Math.round(i*o)),l=G(t,t),u=new Uint8Array(s*c*4*l.length),d=document.createElement(`canvas`);d.width=s,d.height=c;let f=d.getContext(`2d`,{willReadFrequently:!0});if(!f)throw Error(`Could not create 2D canvas context`);let p=Math.max(0,r.duration-.001);for(let e=0;e<l.length;e++){await Y(r,l.length===1?p*.5:e/(l.length-1)*p),f.clearRect(0,0,s,c),f.drawImage(r,0,0,s,c);let t=f.getImageData(0,0,s,c);u.set(t.data,e*s*c*4),e&3||await new Promise(e=>setTimeout(e,0))}return{data:u,width:s,height:c,aspect:a,layerCount:l.length}}finally{r.removeAttribute(`src`),r.load(),r.remove()}}function J(e,t){return new Promise((n,r)=>{let i=window.setTimeout(()=>r(Error(`Timeout waiting for video ${t}`)),1e4),a=()=>{window.clearTimeout(i),e.removeEventListener(t,o),e.removeEventListener(`error`,s)},o=()=>{a(),n()},s=()=>{a(),r(e.error??Error(`Video ${t} failed`))};e.addEventListener(t,o,{once:!0}),e.addEventListener(`error`,s,{once:!0})})}async function Y(e,t){let n=Math.max(0,Math.min(t,Math.max(0,(e.duration||0)-.001)));if(Math.abs(e.currentTime-n)<.002&&e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)return;let r=J(e,`seeked`);e.currentTime=n,await r}var X=[0,0,-.8];function Z({cameraZ:e}){let t=_(e=>e.camera);return(0,O.useEffect)(()=>{t.position.set(0,0,e),t.lookAt(...X)},[t,e]),null}function Q({videoUrl:e,cameraZ:t,position:n,rotation:r,scale:i,offset:a,animateOffset:o,opacity:s,spacing:c,edgeOnly:l,nearFade:u,brightness:d,blendMode:f}){return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`color`,{attach:`background`,args:[`#05060d`]}),(0,k.jsx)(Z,{cameraZ:t}),(0,k.jsx)(R,{videoUrl:e,position:n,rotation:r,scale:i,offset:a,animateOffset:o,opacity:s,spacing:c,edgeOnly:l,nearFade:u,brightness:d,blendMode:f})]})}function $(){let{values:e}=C(`SpatialVideo`,E),t=e??T,n=D.find(e=>e.id===t.video)?.url??D[0].url;return(0,k.jsx)(y,{flat:!0,camera:{fov:45,near:.1,far:100},children:(0,k.jsx)(Q,{videoUrl:n,cameraZ:t.cameraZ,position:w(t.position),rotation:w(t.rotation),scale:w(t.scale),offset:t.offset,animateOffset:t.animateOffset,opacity:t.opacity,spacing:t.spacing,edgeOnly:t.edgeOnly,nearFade:t.nearFade,brightness:t.brightness,blendMode:t.blendMode},n)})}export{$ as default};
//# sourceMappingURL=SpatialVideoDemo-C5rqVS4F.js.map