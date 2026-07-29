const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/popupHandlerSingleton-uySVdaak.js","assets/lenisManager-BGOTe4iO.js","assets/(_locale).editions.spring2026-BxKRjLcQ.js","assets/chunk-QUQL4437-BD29ZypC.js","assets/jsx-runtime-u17CrQMm.js","assets/preload-helper-DO1ztSUD.js","assets/reportError-CJPDlOyT.js","assets/constants-xV0ws6Hx.js","assets/Media-9k068KyC.js","assets/index-CRnHN5xY.js","assets/safeLazy-B5k5LqLU.js","assets/clamp-co6UzHBn.js","assets/useSectionRegistry-DPzXWDP5.js","assets/middleware-DwGWrwkz.js","assets/TierResolver-y-fGWbnF.js","assets/index-7OC5HNn7.js","assets/Button-CLLMYZB9.js","assets/useAssetLoadingStore-BQ9V8Ec_.js","assets/constants-CblcJfKC.js","assets/sectionModels-CRO2BpnI.js","assets/presets-EmxEXVgb.js","assets/constants-JKmfcSdx.js","assets/dpr-PcbKlAXR.js","assets/useStickyMountGate-DtwlF7FI.js","assets/SceneDataContext-DuAaqaMN.js","assets/index-CplsFZVb.js","assets/SheetContext-lLmr1oRJ.js","assets/deploy-urls-BqJLL-2u.js","assets/useElementVisibility-DKDtBcxj.js","assets/SectionScene-BxWu04-d.js","assets/Environment-DIFuGnXd.js","assets/EnvironmentObject-COeDMh80.js","assets/FluidField-OmmkFHf7.js","assets/reducedMotion-CdiMTSZU.js","assets/useCanvasPointer-BnFn7xJn.js","assets/pointerNdc-sUXB2i1s.js","assets/SdfRegistry-sM3Q5YdE.js","assets/sharedZeroTexture-BkFIhg0y.js","assets/AssetSdf-okzHBKiM.js","assets/ktx2-loader-C1zaadCA.js","assets/colorAndNoise-D12tu5Fy.js","assets/Camera-BW__KBvN.js","assets/renderScaleResolve-CNZVtSA5.js","assets/layers-CClLq2fm.js","assets/SectionFluidVelocityContext-DAYST_2V.js","assets/POS-DiMOl3ZJ.js","assets/subscribeWithInitial-D3gqGtvn.js","assets/index-CRfrcCUo.js","assets/Environment-CR6h1qx-.js","assets/extends-CF3RwP-h.js","assets/Gltf-BPFpbdM1.js","assets/OrbitControls-CUsrAYnc.js","assets/useTheatreObject-B5lJAGa0.js","assets/heroRingTheatreControls-CXZse0Qa.js","assets/HeroRingObject-D71dX2vG.js","assets/meta-CwiYJk4F.js","assets/PopupChannel-DqE-iZUI.js"])))=>i.map(i=>d[i]);
import{_ as q}from"./preload-helper-DO1ztSUD.js";import{j as T}from"./jsx-runtime-u17CrQMm.js";import{d as f}from"./index-CplsFZVb.js";import{u as J}from"./constants-xV0ws6Hx.js";import{r as n}from"./chunk-QUQL4437-BD29ZypC.js";import{u as G,v as Q,y as Z,e as ee,aa as te,C as oe,Y as re,o as ne,ab as ie,V as se}from"./TierResolver-y-fGWbnF.js";import{u as ae}from"./SceneDataContext-DuAaqaMN.js";import{u as ue}from"./SheetContext-lLmr1oRJ.js";import{f as ce,u as le}from"./(_locale).editions.spring2026-BxKRjLcQ.js";import{d as de}from"./useElementVisibility-DKDtBcxj.js";import{u as fe}from"./useTheatreObject-B5lJAGa0.js";import{p as O,M as U,c as me,s as pe}from"./PopupChannel-DqE-iZUI.js";const V=new Map;function he(t,r){const o=t.trim(),c=r.trim();!o||!c||V.set(o,c)}function ve(t,r){return V.get(t)??r}const ge=.424,we=4/3,y=24,Se="spring_car_popup";function j(t,r,o){return o<r?r:Math.min(Math.max(t,r),o)}function be(){const t=Math.max(0,(window.outerWidth-window.innerWidth)/2),r=Math.max(0,window.outerHeight-window.innerHeight);return{x:window.screenX+t,y:window.screenY+r}}function ye(){const t=Math.min(window.innerWidth,window.innerHeight)*ge;return{width:Math.round(t*we),height:Math.round(t)}}function Pe(t,r){const o=be(),c=o.x+window.innerWidth-r.width-y,l=o.y+window.innerHeight-r.height-y;if(typeof t.clientX!="number"||typeof t.clientY!="number")return{left:Math.round(c),top:Math.round(l)};const d=o.x+y,u=o.x+window.innerWidth-r.width-y,g=o.y+y,w=o.y+window.innerHeight-r.height-y;return{left:Math.round(j(o.x+t.clientX-r.width/2,d,u)),top:Math.round(j(o.y+t.clientY-r.height/2,g,w))}}function Me(t){const r=window.location.pathname.match(/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?editions\/spring2026/)?.[0]??"/editions/spring2026",o=new URL(`${r}/drive`,window.location.origin);t.openWithTheatre&&o.searchParams.set("popup-studio","1");const c=t.theatreSheetSrc?.trim();c&&o.searchParams.set("theatre-src",c);const l=t.targetSceneHandle?.trim();l&&o.searchParams.set("drive-scene",l);const d=t.sourceSectionHandle?.trim();d&&o.searchParams.set("drive-section",d);const u=t.sessionId?.trim();return u&&o.searchParams.set("drive-session",u),o.toString()}function xe(t={}){const r=ye(),o=Pe(t,r),c=`popup,width=${r.width},height=${r.height},left=${o.left},top=${o.top}`;return window.open(Me(t),Se,c)}const Ee="race-track",Y={r:173/255,g:240/255,b:1,a:1};function Re(t,r){return{...Object.keys(t).length>0?{targetScene:f.types.stringLiteral(r,t,{label:"Portal target"})}:{},visual:{color:f.types.rgba(Y,{label:"color"}),borderWidth:f.types.number(.16,{range:[.02,.42],nudgeMultiplier:.005,label:"border width"}),borderBlur:f.types.number(.055,{range:[.005,.16],nudgeMultiplier:.002,label:"border softness"}),glowStrength:f.types.number(.08,{range:[0,.8],nudgeMultiplier:.01,label:"pulse glow"}),glowSize:f.types.number(.2,{range:[.04,.4],nudgeMultiplier:.005,label:"glow size"}),pulseSpeed:f.types.number(1.2,{range:[0,6],nudgeMultiplier:.05,label:"pulse speed"}),bottomFadeMix:f.types.number(.55,{range:[0,1],nudgeMultiplier:.01,label:"bottom fade mix"}),noiseAmount:f.types.number(.18,{range:[0,1],nudgeMultiplier:.01,label:"noise amount"}),noiseScale:f.types.number(14,{range:[.1,100],nudgeMultiplier:.5,label:"noise scale"}),noiseSpeed:f.types.number(.3,{range:[-8,8],nudgeMultiplier:.01,label:"noise speed"})},popup:{openWithTheatre:f.types.boolean(!1,{label:"open with Theatre"}),theatreSheetSrc:f.types.string("",{label:"Theatre sheet src"})}}}function Te(t,r,o){const c=r.getBoundingClientRect();o.x=(t.clientX-c.left)/c.width*2-1,o.y=-((t.clientY-c.top)/c.height*2-1)}function Be(t,r,o){const{camera:c,gl:l}=G(),d=n.useRef(!1),u=n.useRef(o);u.current=o,n.useEffect(()=>{if(!t)return;const g=l.domElement,w=new ie,B=new se,b=()=>{const m=le.getState();return m.sectionHandles[m.interactiveSection]===r},P=m=>(Te(m,g,B),w.setFromCamera(B,c),w.intersectObject(t,!0).length>0),M=m=>{if(!b()||u.current.disabled?.()){d.current&&(d.current=!1,u.current.onPointerLeave?.());return}const h=P(m);h&&!d.current?(d.current=!0,u.current.onPointerEnter?.()):!h&&d.current&&(d.current=!1,u.current.onPointerLeave?.())},a=m=>{!b()||u.current.disabled?.()||P(m)&&u.current.onClick?.(m)},x=()=>{d.current&&(d.current=!1,u.current.onPointerLeave?.())};return window.addEventListener("pointermove",M),window.addEventListener("click",a),window.addEventListener("pointerleave",x),()=>{x(),window.removeEventListener("pointermove",M),window.removeEventListener("click",a),window.removeEventListener("pointerleave",x)}},[c,l,r,t])}function De(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function _e(){return new ee({transparent:!0,depthTest:!1,depthWrite:!1,side:ne,blending:re,toneMapped:!1,uniforms:{uColor:{value:new oe(11399423)},uOpacity:{value:.65},uEdgeBlur:{value:.12},uMiddleFade:{value:.12},uSideFade:{value:new te},uBorderWidth:{value:.16},uBorderBlur:{value:.055},uGlowStrength:{value:.08},uGlowSize:{value:.2},uBottomFadeMix:{value:.55},uNoiseAmount:{value:.18},uNoiseScale:{value:14},uNoiseSpeed:{value:.3},uHover:{value:0},uPulse:{value:0},uTime:{value:0}},vertexShader:`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEdgeBlur;
      uniform float uMiddleFade;
      uniform vec4 uSideFade;
      uniform float uBorderWidth;
      uniform float uBorderBlur;
      uniform float uGlowStrength;
      uniform float uGlowSize;
      uniform float uBottomFadeMix;
      uniform float uNoiseAmount;
      uniform float uNoiseScale;
      uniform float uNoiseSpeed;
      uniform float uHover;
      uniform float uPulse;
      uniform float uTime;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        float centerDistance = length((vUv - 0.5) * 2.0) / 1.41421356;
        float middleFade = mix(1.0, smoothstep(0.0, 1.0, centerDistance), uMiddleFade);
        float noise = valueNoise(vUv * max(uNoiseScale, 0.0001) + vec2(uTime * uNoiseSpeed, -uTime * uNoiseSpeed * 0.37));
        float noiseMask = mix(1.0, smoothstep(0.12, 0.95, noise), clamp(uNoiseAmount, 0.0, 1.0));
        float pulseAmount = smoothstep(0.0, 0.24, clamp(uGlowStrength, 0.0, 1.0));
        float pulse = mix(1.0, 0.7 + uPulse * 0.45, pulseAmount);

        vec2 edgeUv = min(vUv, 1.0 - vUv);
        float edgeDistance = min(edgeUv.x, edgeUv.y);
        float bottomFadeMix = clamp(uBottomFadeMix, 0.0, 1.0);
        float noBottomFeatherDistance = min(edgeUv.x, 1.0 - vUv.y);
        float featherDistance = mix(edgeDistance, noBottomFeatherDistance, bottomFadeMix);
        float feather = smoothstep(0.0, max(uEdgeBlur, 0.0001), featherDistance);
        vec4 side = clamp(uSideFade, vec4(0.0), vec4(1.0));
        float sideFadeWithoutBottom = 1.0;
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, vUv.x), side.x);
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, 1.0 - vUv.x), side.y);
        sideFadeWithoutBottom *= mix(1.0, smoothstep(0.0, 1.0, 1.0 - vUv.y), side.z);
        float sideFadeWithBottom = sideFadeWithoutBottom * mix(1.0, smoothstep(0.0, 1.0, vUv.y), side.w);
        float sideFade = mix(sideFadeWithBottom, sideFadeWithoutBottom, bottomFadeMix);

        float borderWidth = clamp(uBorderWidth, 0.001, 0.49);
        float borderBlur = max(uBorderBlur, 0.0001);
        float borderMask = 1.0 - smoothstep(borderWidth, borderWidth + borderBlur, edgeDistance);
        float glowMask = 1.0 - smoothstep(borderWidth, borderWidth + max(uGlowSize, 0.0001), edgeDistance);
        float pulseGlow = glowMask * clamp(uGlowStrength, 0.0, 1.0) * (0.25 + uPulse * 0.75);
        float fillAmount = clamp(uHover * 1.25, 0.0, 1.0);
        float shapeMask = mix(min(1.0, borderMask + pulseGlow), 1.0, fillAmount);

        float alpha = uOpacity * middleFade * noiseMask * pulse * shapeMask * (1.0 + uHover * 0.25);
        alpha *= feather * sideFade;
        gl_FragColor = vec4(uColor, alpha);
      }
    `})}function We({targetSceneHandle:t}){const r=ue(),{camera:o,gl:c}=G(),{handle:l}=ae(),d=de(),u=n.useMemo(()=>{const i=d.filter(s=>s.preset.pointcloud.sources.some(e=>e.src.startsWith("https://")));return i.sort((s,e)=>s.name.localeCompare(e.name)),Object.fromEntries(i.map(s=>[s.name,s.name]))},[d]),g=t?.trim(),w=(g&&u[g]?g:Object.keys(u)[0])??"",B=n.useMemo(()=>Re(u,w),[u,w]),b=n.useRef(null),P=n.useRef(null),M=n.useRef(null),a=n.useMemo(()=>_e(),[]),[x,m]=n.useState(null),h=J(i=>!!(i.isMobile||i.isLandscapeMobile||i.isTouchDevice)),A=n.useRef(h),D=n.useRef(!1),_=n.useRef(null),H=n.useRef(!1),N=n.useRef(""),k=n.useRef(1.2),W=n.useRef(t?.trim()||Ee),L=n.useRef(null),F=n.useRef(new Q),I=n.useRef(1),C=n.useRef(0),v=fe(r,b,"key",B);n.useEffect(()=>{if(!v)return;const i=s=>{const e=s.targetScene;he(l,e&&u[e]?e:W.current)};return i(v.value),v.onValuesChange(s=>i(s))},[v,l,u]),n.useEffect(()=>{const i=t?.trim();i&&(W.current=i)},[t]),n.useEffect(()=>{A.current=h,h&&(document.body.style.cursor="auto",C.current=0)},[h]),n.useEffect(()=>()=>{a.dispose()},[a]),n.useEffect(()=>{m(M.current)},[]),n.useEffect(()=>{if(!v)return;const i=e=>{H.current=e.popup?.openWithTheatre===!0,N.current=e.popup?.theatreSheetSrc?.trim()||"";const p=e.visual?.color||Y;a.uniforms.uColor.value.setRGB(p.r,p.g,p.b),a.uniforms.uOpacity.value=.65*(p.a??1),a.uniforms.uBorderWidth.value=e.visual?.borderWidth??.16,a.uniforms.uBorderBlur.value=e.visual?.borderBlur??.055,a.uniforms.uGlowStrength.value=e.visual?.glowStrength??.08,a.uniforms.uGlowSize.value=e.visual?.glowSize??.2,k.current=e.visual?.pulseSpeed??1.2,a.uniforms.uBottomFadeMix.value=e.visual?.bottomFadeMix??.55,a.uniforms.uNoiseAmount.value=e.visual?.noiseAmount??.18,a.uniforms.uNoiseScale.value=e.visual?.noiseScale??14,a.uniforms.uNoiseSpeed.value=e.visual?.noiseSpeed??.3};return i(v.value),v.onValuesChange(e=>{i(e)})},[v,a]),n.useEffect(()=>{const i=O.on(U.WEBRTC_READY,e=>{!e.sessionId||e.sessionId!==_.current||(D.current=!0,O.send(U.KEY_ANIMATED_OUT,{time:Date.now()}))}),s=O.on(U.POPUP_CLOSED,e=>{!e.sessionId||e.sessionId!==_.current||(D.current=!1,_.current=null,me(e.sessionId))});return()=>{i(),s()}},[]);const z=n.useCallback(i=>{ce.getState().activate();const s=ve(l,W.current);W.current=s;const e=De(),p={clientX:L.current?.clientX??i.clientX,clientY:L.current?.clientY??i.clientY,openWithTheatre:H.current,theatreSheetSrc:N.current,targetSceneHandle:s,sourceSectionHandle:l,sessionId:e},S=xe(p);S&&(window.__easterEggPopupWindow=S,window.__easterEggPopupOptions=p,_.current=e,pe(e),window.dispatchEvent(new CustomEvent("developer-drive-scene-target",{detail:{handle:s,sectionHandle:l,sessionId:e}})),O.send(U.DRIVE_SCENE_REVEAL,{sessionId:e,handle:s,sectionHandle:l,progress:0}),q(async()=>{const{initPopupHandler:E,isPopupHandlerInitialized:R}=await import("./popupHandlerSingleton-uySVdaak.js");return{initPopupHandler:E,isPopupHandlerInitialized:R}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56])).then(({initPopupHandler:E,isPopupHandlerInitialized:R})=>{const K=R();E(),K&&window.dispatchEvent(new CustomEvent("open-popup",{detail:p}))}).catch(()=>{}))},[l]),X=n.useCallback(()=>{document.body.style.cursor="pointer",C.current=1},[]),$=n.useCallback(()=>{document.body.style.cursor="auto",C.current=0},[]);return Be(x,l,{disabled:()=>D.current||A.current,onClick:z,onPointerEnter:X,onPointerLeave:$}),Z(({clock:i},s)=>{const e=P.current,p=b.current;if(!e||!p||A.current)return;p.getWorldPosition(F.current),F.current.project(o);const S=c.domElement.getBoundingClientRect();L.current={clientX:S.left+(F.current.x+1)/2*S.width,clientY:S.top+(1-F.current.y)/2*S.height};const E=D.current?0:1;I.current+=(E-I.current)*Math.min(1,s*12),e.scale.setScalar(I.current),e.rotation.y+=(0-e.rotation.y)*Math.min(1,s*6);const R=k.current<=0?.5:.5+.5*Math.sin(i.elapsedTime*k.current*Math.PI*2);a.uniforms.uTime.value=i.elapsedTime,a.uniforms.uPulse.value=R,a.uniforms.uHover.value+=(C.current*.8-a.uniforms.uHover.value)*Math.min(1,s*8)}),h?null:T.jsx("group",{ref:b,name:"key",position:[.8,-.2,1.2],rotation:[.2,-.5,.15],scale:[.7,.7,.7],children:T.jsx("group",{ref:P,children:T.jsxs("mesh",{ref:M,scale:[1.65,.92,1],renderOrder:10,children:[T.jsx("planeGeometry",{args:[1,1]}),T.jsx("primitive",{attach:"material",object:a})]})})})}const Ve=Object.freeze(Object.defineProperty({__proto__:null,DeveloperKeyEasterEgg:We},Symbol.toStringTag,{value:"Module"}));export{Ve as D,ve as g,xe as o};
//# sourceMappingURL=DeveloperKeyEasterEgg-DsT8oset.js.map
