import{j as N}from"./jsx-runtime-u17CrQMm.js";import{r as l}from"./chunk-QUQL4437-BD29ZypC.js";import{u as Ce}from"./constants-xV0ws6Hx.js";import{e as Ee,e4 as sr,V as Re,C as fe,bk as lt,M as We,S as ct,u as de,y as mt,L as Ne,J as Ge,K as Je,X as ur,n as lr,Z as et,v as le,$ as Yt,Y as ft,j as cr,I as mr,bO as tt,t as D,x as Pe,a0 as fr,Q as rt,d as ze,O as at,D as dr,R as hr,P as gr,bJ as pr}from"./TierResolver-y-fGWbnF.js";import{b as vr}from"./dpr-PcbKlAXR.js";import{E as Sr}from"./Environment-DIFuGnXd.js";import{g as xr,F as br}from"./FluidField-OmmkFHf7.js";import{c as Tr,e as Tt,r as Mr,d as ot,f as nt,g as Cr,h as yr,i as Fr,P as Rr,a as Ar}from"./SdfRegistry-sM3Q5YdE.js";import{R as wr}from"./reducedMotion-CdiMTSZU.js";import{u as Dr}from"./useStickyMountGate-DtwlF7FI.js";import{r as Ir}from"./reportError-CJPDlOyT.js";import{e as Er,k as Or}from"./ktx2-loader-C1zaadCA.js";import{C as kr,V as _r}from"./colorAndNoise-D12tu5Fy.js";import{s as Be}from"./sharedZeroTexture-BkFIhg0y.js";import{b as dt,D as Le,A as Mt,a as Lr,e as Br,c as Pr}from"./sectionModels-CRO2BpnI.js";import{g as it,m as Vr,j as Ct,h as Xt,i as ht,k as st,l as ut,d as yt,c as Qe,f as Ur}from"./presets-EmxEXVgb.js";import{r as Ft,a as Nr,g as Gr,h as zr,i as Wr,u as Hr,j as $t,S as jr,b as Rt,c as Qr,D as Yr}from"./Camera-BW__KBvN.js";import{u as Xr,C as $r}from"./useCanvasPointer-BnFn7xJn.js";import{g as At,c as he,r as ae,A as Kr,e as qr,f as Zr,h as Jr,M as ea,i as ta,j as ra,k as aa}from"./renderScaleResolve-CNZVtSA5.js";import{D as gt,a as oa,M as na}from"./layers-CClLq2fm.js";import{S as ia}from"./SectionFluidVelocityContext-DAYST_2V.js";const sa=10,ua=.064;function No(){const{isMobile:e,isLandscapeMobile:t,isTouchDevice:r}=Ce.getState();return e===!0||t===!0||r===!0}function la(e,t,r,a=sa){const o=Math.max(0,Math.min(r,ua)),n=1-Math.exp(-o*a);return e+(t-e)*n}const wt={none:0,linear:1,reinhard:2,cineon:3,aces:4,agx:5,neutral:6},Dt={none:0,solid:1,linear:2},ca=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,ma=`
  uniform sampler2D tMap;
  uniform sampler2D tOverlay;
  uniform sampler2D tDry;
  uniform float uHasMap;
  uniform float uHasOverlay;
  uniform float uHasDry;
  uniform float uDecodeSRGB;
  uniform int uBackgroundMode;
  uniform vec3 uBackgroundColor1;
  uniform vec3 uBackgroundColor2;
  uniform vec3 uBackgroundColor3;
  uniform float uBackgroundAngle;
  uniform float uBackgroundSmooth;
  uniform float uBackgroundAspect;
  uniform int uBackgroundPointCount;
  uniform float uBackgroundBias1;
  uniform float uBackgroundBias2;
  uniform float uBackgroundDarken;
  uniform float uBackgroundLoadFade;
  uniform float uBehindDarken;
  uniform float uBehindSaturation;
  uniform int uToneMapping;
  uniform float uIntroEnabled;
  uniform float uIntroProgress;
  uniform float uIntroGlowIntensity;
  uniform float uIntroBlendRange;
  uniform float uIntroWarpStrength;
  uniform float uIntroNoiseAmount;
  uniform float uIntroNoiseScale;
  uniform vec2 uIntroCenter;
  uniform vec3 uIntroGlowColor;
  uniform vec3 uIntroBgColor;
  uniform vec2 uIntroResolution;
  varying vec2 vUv;

  // three.js tone-mapping functions (also declares the toneMappingExposure uniform).
  ${sr.tonemapping_pars_fragment}

  vec3 applyToneMapping(vec3 linearColor) {
    if (uToneMapping == 1) return LinearToneMapping(linearColor);
    if (uToneMapping == 2) return ReinhardToneMapping(linearColor);
    if (uToneMapping == 3) return CineonToneMapping(linearColor);
    if (uToneMapping == 4) return ACESFilmicToneMapping(linearColor);
    if (uToneMapping == 5) return AgXToneMapping(linearColor);
    if (uToneMapping == 6) return NeutralToneMapping(linearColor);
    return linearColor;
  }

  vec3 sRGBToLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  vec3 linearToSRGB(vec3 c) {
    c = max(c, vec3(0.0));
    return mix(
      c * 12.92,
      1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
      step(0.0031308, c)
    );
  }

  float gradientMix(float position, float bias) {
    float center = clamp(0.5 + bias, 0.0, 1.0);
    float halfSmooth = clamp(uBackgroundSmooth, 0.0, 100.0) / 200.0;
    float start = center - halfSmooth;
    float end = center + halfSmooth;
    if (halfSmooth <= 0.0001) return step(center, position);
    return smoothstep(start, end, position);
  }

  float linearGradientPosition(vec2 uv) {
    float radiansAngle = radians(uBackgroundAngle);
    vec2 direction = vec2(sin(radiansAngle), cos(radiansAngle));
    vec2 aspectUv = (uv - 0.5) * vec2(uBackgroundAspect, 1.0);
    float extent = abs(direction.x) * uBackgroundAspect + abs(direction.y);
    return dot(aspectUv, direction) / extent + 0.5;
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += valueNoise(p) * amp;
      p *= 2.03;
      amp *= 0.5;
    }
    return value;
  }

  float introRadialMask(vec2 uv) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return 1.0;

    float progress = clamp(uIntroProgress, 0.0, 1.0);
    if (progress <= 0.0) return 0.0;
    float aspect = uIntroResolution.x / max(uIntroResolution.y, 1.0);
    vec2 center = clamp(uIntroCenter, vec2(0.0), vec2(1.0));
    vec2 dv = (uv - center) * vec2(aspect, 1.0);
    float radial = length(dv);

    // Same center-out mask shape as the hero handoff radial transition: the
    // authored center lives in screen UV, while X is aspect-corrected so the
    // reveal stays circular in viewport space.
    vec2 farCorner = max(center, 1.0 - center) * vec2(aspect, 1.0);
    float maxRadius = length(farCorner);
    float feather = max(uIntroBlendRange / max(uIntroResolution.y, 1.0), 0.001);
    float noiseAmount = max(uIntroNoiseAmount, 0.0) / max(uIntroResolution.y, 1.0);
    float noise = fbm(dv * max(uIntroNoiseScale, 0.001) + progress * 0.65) * 2.0 - 1.0;
    float noisyRadial = radial + noise * noiseAmount;
    float radialEdge = progress * (maxRadius + feather * 2.0) - feather;
    return 1.0 - smoothstep(
      radialEdge - feather,
      radialEdge + feather,
      noisyRadial
    );
  }

  vec2 introWarpUv(vec2 uv, float mask) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return uv;

    float progress = clamp(uIntroProgress, 0.0, 1.0);
    float aspect = uIntroResolution.x / max(uIntroResolution.y, 1.0);
    vec2 center = clamp(uIntroCenter, vec2(0.0), vec2(1.0));
    vec2 dv = (uv - center) * vec2(aspect, 1.0);
    float radial = length(dv);
    vec2 radialDirection = radial > 0.0001
      ? normalize(vec2(dv.x / max(aspect, 0.001), dv.y))
      : vec2(0.0, 1.0);
    vec2 tangent = vec2(-radialDirection.y, radialDirection.x);

    float seam = 1.0 - abs(mask * 2.0 - 1.0);
    float life = sin(clamp(progress, 0.0, 1.0) * 3.14159265);
    float ripple = sin(radial * 42.0 - progress * 12.0) * seam;
    vec2 radialWarp = radialDirection * uIntroWarpStrength * seam * life * 0.12;
    vec2 tangentWarp = tangent * ripple * uIntroWarpStrength * life * 0.018;
    return uv + radialWarp + tangentWarp;
  }

  vec3 applyRadialIntroReveal(vec3 inputColor, float mask) {
    if (uIntroEnabled < 0.5 || uIntroProgress >= 1.0) return inputColor;

    float edge = 1.0 - abs(mask * 2.0 - 1.0);
    vec3 finalColor = mix(uIntroBgColor, inputColor, mask);
    return mix(
      finalColor,
      uIntroGlowColor,
      edge * max(uIntroGlowIntensity, 0.0) * 0.35
    );
  }

  vec3 backgroundColor(vec2 uv) {
    if (uBackgroundMode == 1) return uBackgroundColor1; // solid uses color 1

    float position = linearGradientPosition(uv);
    if (uBackgroundPointCount < 3) {
      return mix(
        uBackgroundColor1,
        uBackgroundColor3,
        gradientMix(position, uBackgroundBias1)
      );
    }

    if (position < 0.5) {
      return mix(
        uBackgroundColor1,
        uBackgroundColor2,
        gradientMix(position * 2.0, uBackgroundBias1)
      );
    }

    return mix(
      uBackgroundColor2,
      uBackgroundColor3,
      gradientMix((position - 0.5) * 2.0, uBackgroundBias2)
    );
  }

  void main() {
    float introMask = introRadialMask(vUv);
    vec2 introUv = introWarpUv(vUv, introMask);
    vec4 color = uHasMap > 0.5 ? texture2D(tMap, introUv) : vec4(0.0);
    vec4 overlay = uHasOverlay > 0.5 ? texture2D(tOverlay, introUv) : vec4(0.0);
    vec4 dry = uHasDry > 0.5 ? texture2D(tDry, introUv) : vec4(0.0);
    // Composite the whole section in gamma/sRGB space — the LDR look designers
    // chose (the original direct-to-sRGB-canvas playground). The scene texture
    // is already display-referred, so it is used as-is; only the linear
    // gradient is encoded to sit in the same space before blending.
    if (uBackgroundMode > 0) {
      vec3 bg = linearToSRGB(backgroundColor(vUv));
      bg *= 1.0 - clamp(uBackgroundDarken, 0.0, 1.0);
      // Fade the gradient in alongside the section's video light volume:
      // until the volume is mounted the gradient sits at 5% so a
      // freshly-arrived (still-decoding) section never flashes the full
      // gradient on its own. 1 = fully shown.
      bg *= mix(0.05, 1.0, clamp(uBackgroundLoadFade, 0.0, 1.0));
      color.rgb = mix(bg, color.rgb, color.a);
      color.a = 1.0;
    }
    color.rgb += overlay.rgb;
    color.a = max(color.a, overlay.a);
    // "Behind page content" tune-down: desaturate then darken the whole
    // section output so it stops competing with the foreground.
    float luma = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    color.rgb = mix(vec3(luma), color.rgb, uBehindSaturation);
    color.rgb *= (1.0 - uBehindDarken);
    // Tone map in linear space. The composite above is in gamma/sRGB space, so
    // decode to linear, apply the three.js curve (which applies the
    // toneMappingExposure uniform internally), then re-encode to gamma before
    // the LDR clamp below.
    if (uToneMapping > 0) {
      vec3 lin = sRGBToLinear(color.rgb);
      lin = applyToneMapping(lin);
      color.rgb = linearToSRGB(lin);
    }
    // Composite the dry layer over the tone-mapped, tuned-down main layer. The
    // dry layer is post-exempt, so it lands after tone mapping — but still
    // inside the section image, so host transition + knockout passes shape and
    // clip it.
    color.rgb = dry.rgb + color.rgb * (1.0 - dry.a);
    color.a = dry.a + color.a * (1.0 - dry.a);
    color.rgb = applyRadialIntroReveal(color.rgb, introMask);
    // LDR clamp: a direct 8-bit sRGB write would clamp here; mirror that so
    // additive highlights don't blow past white.
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    // The HalfFloat composer re-encodes linear→sRGB on output, so decode the
    // gamma-domain result back to linear first — the round-trip reproduces
    // this composite pixel-for-pixel. A direct sRGB canvas target (uDecodeSRGB
    // == 0) isn't re-encoded, so it takes the value as-is.
    if (uDecodeSRGB > 0.5) color.rgb = sRGBToLinear(color.rgb);
    gl_FragColor = color;
  }
`,z={enabled:!1,progress:1,glowIntensity:2,feather:48,warpStrength:.35,noiseAmount:18,noiseScale:4,center:{x:.5,y:.58},glowColor:{r:1,g:.4,b:.1,a:1},bgColor:{r:.012,g:.118,b:.114,a:1}};function fa(e,t,r,a,o,n,c){const s=t.current,i=new Ee({uniforms:{tMap:{value:null},tOverlay:{value:null},tDry:{value:null},uHasMap:{value:0},uHasOverlay:{value:0},uHasDry:{value:0},uDecodeSRGB:{value:0},uBackgroundMode:{value:Dt[s.mode]},uBackgroundColor1:{value:new fe(s.color1)},uBackgroundColor2:{value:new fe(s.color2)},uBackgroundColor3:{value:new fe(s.color3)},uBackgroundAngle:{value:s.angle},uBackgroundSmooth:{value:s.smooth},uBackgroundAspect:{value:1},uBackgroundPointCount:{value:s.pointCount},uBackgroundBias1:{value:s.bias1},uBackgroundBias2:{value:s.bias2},uBackgroundDarken:{value:s.darken},uBackgroundLoadFade:{value:1},uBehindDarken:{value:0},uBehindSaturation:{value:1},uToneMapping:{value:wt[s.toneMapping]},toneMappingExposure:{value:s.toneMappingExposure},uIntroEnabled:{value:z.enabled?1:0},uIntroProgress:{value:z.progress},uIntroGlowIntensity:{value:z.glowIntensity},uIntroBlendRange:{value:z.feather},uIntroWarpStrength:{value:z.warpStrength},uIntroNoiseAmount:{value:z.noiseAmount},uIntroNoiseScale:{value:z.noiseScale},uIntroCenter:{value:new Re(z.center.x,z.center.y)},uIntroGlowColor:{value:new fe(z.glowColor.r,z.glowColor.g,z.glowColor.b)},uIntroBgColor:{value:new fe(z.bgColor.r,z.bgColor.g,z.bgColor.b)},uIntroResolution:{value:new Re(1,1)}},depthTest:!1,depthWrite:!1,vertexShader:ca,fragmentShader:ma}),m=new lt(2,2),v=new We(m,i);let S=s.color1,d=s.color2,p=s.color3;const C=new Re(1,1);return v.frustumCulled=!1,v.onBeforeRender=T=>{const E=e.current,I=r?.current??null,O=a?.current??null,h=t.current;i.uniforms.tMap.value=E,i.uniforms.tOverlay.value=I,i.uniforms.tDry.value=O,i.uniforms.uHasMap.value=E?1:0,i.uniforms.uHasOverlay.value=I?1:0,i.uniforms.uHasDry.value=O?1:0,i.uniforms.uBackgroundMode.value=Dt[h.mode],h.color1!==S&&(i.uniforms.uBackgroundColor1.value.set(h.color1),S=h.color1),h.color2!==d&&(i.uniforms.uBackgroundColor2.value.set(h.color2),d=h.color2),h.color3!==p&&(i.uniforms.uBackgroundColor3.value.set(h.color3),p=h.color3),i.uniforms.uBackgroundAngle.value=h.angle,i.uniforms.uBackgroundSmooth.value=h.smooth,i.uniforms.uToneMapping.value=wt[h.toneMapping],i.uniforms.toneMappingExposure.value=h.toneMappingExposure,T.getSize(C),i.uniforms.uBackgroundAspect.value=C.x/C.y,i.uniforms.uIntroResolution.value.copy(C);const x=n?.current??z;i.uniforms.uIntroEnabled.value=x.enabled?1:0,i.uniforms.uIntroProgress.value=x.progress,i.uniforms.uIntroGlowIntensity.value=x.glowIntensity,i.uniforms.uIntroBlendRange.value=x.feather??z.feather,i.uniforms.uIntroWarpStrength.value=x.warpStrength??z.warpStrength,i.uniforms.uIntroNoiseAmount.value=x.noiseAmount??z.noiseAmount,i.uniforms.uIntroNoiseScale.value=x.noiseScale??z.noiseScale,i.uniforms.uIntroCenter.value.set(x.center.x,x.center.y),i.uniforms.uIntroGlowColor.value.setRGB(x.glowColor.r,x.glowColor.g,x.glowColor.b),i.uniforms.uIntroBgColor.value.setRGB(x.bgColor.r,x.bgColor.g,x.bgColor.b),i.uniforms.uBackgroundPointCount.value=h.pointCount,i.uniforms.uBackgroundBias1.value=h.bias1,i.uniforms.uBackgroundBias2.value=h.bias2,i.uniforms.uBackgroundDarken.value=h.darken,i.uniforms.uBackgroundLoadFade.value=c?.current??1;const _=T.getRenderTarget();if(i.uniforms.uDecodeSRGB.value=_&&_.texture.colorSpace!==ct?1:0,o){const K=dt(o.motionRef.current?.screenOffset??0),re=o.paramsRef.current;i.uniforms.uBehindDarken.value=K*(re?.darken??0),i.uniforms.uBehindSaturation.value=1-K*(1-(re?.saturation??1))}},{mesh:v,material:i,dispose(){m.dispose(),i.dispose()}}}function pt(e){return e<=-1||e>=1}function Kt(e,t){const r=e??t;return[Number.isFinite(r[0])?r[0]:t[0],Number.isFinite(r[1])?r[1]:t[1]]}function da(e,t){const[r,a]=Kt(e,t),o=Math.min(r,a),n=Math.max(o+1e-4,r,a);return[o,n]}const ha=1.2;function It(){const e=Ce.getState();return e.preferReducedMotion===!0||e.isMobile!==!0}const qt=.001,ga=.04,pa=.025,va=Xt.toFixed(1),Sa=ht.toFixed(1),xa=String(ht),ba=5.208,Ta=50,Ma=1,Ca=.035,Et=new mr,Ot=6,kt={"/vendor/shopify-s26/remote/cdn.shopify.com/3a67102bfe571032-15de67fa52a247e9805165ba4417e3b7.mp4":{src:"/vendor/shopify-s26/remote/cdn.shopify.com/fcc0bfaf330c4ab7-video1-50f-360p.ktx2",duration:5.9388,width:640,height:360,layerCount:50},"/vendor/shopify-s26/remote/cdn.shopify.com/51a2364d667a65ad-c2ffb10c9eeb46a4a36b562d482d3988.mp4":{src:"/vendor/shopify-s26/remote/cdn.shopify.com/a806bd1a62cec780-video2-50f-360p.ktx2",duration:5.208,width:476,height:360,layerCount:50},"/vendor/shopify-s26/remote/cdn.shopify.com/446d72a6f0db0293-33de6200b962468fa7b58e50836eb729.mp4":{src:"/vendor/shopify-s26/remote/cdn.shopify.com/4ae5a37e0537292f-video3-50f-360p.ktx2",duration:5.208,width:200,height:360,layerCount:50},"/vendor/shopify-s26/remote/cdn.shopify.com/a7526c4dddc0f495-4396d38b5ba744f8aab63ed520071bd6.mp4":{src:"/vendor/shopify-s26/remote/cdn.shopify.com/bb486f68cfbcc8d3-video4-50f-360p.ktx2",duration:5.208,width:476,height:360,layerCount:50}},_t=new Set;function ya(e,t,r){const a=t instanceof Error?t.message:String(t),o=`${e}:${a}`;if(_t.has(o))return;_t.add(o);const n=Cr(t);Ir(t,"VideoLightVolume.source",{...r,...n,sourceUrl:e,...yr()})}function vt(e){const t=e.search(/[?#]/);return t===-1?e:e.slice(0,t)}function Fa(e,t){try{const r=new URL(e,"https://example.com").searchParams;for(const a of t){const o=Number(r.get(a));if(Number.isFinite(o)&&o>0)return o}}catch{}return null}function Ra(e){const t=vt(e).match(/(?:^|[-_])(\d+)f(?:[-_.]|$)/i),r=t?Number(t[1]):NaN;return Number.isFinite(r)&&r>0?r:Ta}function Aa(e){return Fa(e,["duration","d"])??ba}function Lt(e){return/\.ktx2$/i.test(vt(e))?{src:e,duration:Aa(e),layerCount:Ra(e)}:null}function Zt(e,t){if(t){const n=Lt(t);if(n)return n}const r=vt(e),a=kt[e];if(a)return a;const o=r===e?null:kt[r]??null;return o||Lt(e)}function Jt(e){const t=e;return t.isCompressedArrayTexture===!0||t.isDataArrayTexture===!0}function wa(e){return e==="low"?.5:e==="medium"?.7:1}function Da(e,t){const r=Number.isFinite(e)?e:it;return Math.max(Xt,Math.min(ht,Math.round(r*t)))}function Bt({sourceUrl:e,ktx2Url:t,depthMapUrl:r,settings:a,groupRef:o,behindSpeed:n=1,quality:c,motion:s,fluidVelocityRef:i,timeScale:m=1,externalLoadFadeRef:v}){const S=de(W=>W.gl),d=l.useRef(null),p=l.useRef(a),[C,T]=l.useState(null);p.current=a;const E=wa(c),I=l.useRef(E);I.current=E,l.useEffect(()=>{d.current?.apply(a,E)},[a,E]);const O=l.useRef(0),h=l.useRef(null),x=l.useRef(0),_=l.useRef(null),K=l.useRef(!1);mt(W=>{const b=W.clock.elapsedTime,u=h.current===null?0:Math.max(0,b-h.current);h.current=b;const M=pt(s?.current?.transition??0),R=d.current;if(R&&(_.current!==R&&(_.current=R,x.current=0),!M&&x.current<1&&(x.current=Tr(x.current,u,{durationSeconds:ha,offscreen:M,reducedMotion:It()}),R.setLoadFade(Tt(x.current)))),v&&(v.current=K.current?1:C?Tt(x.current):0),M)return;const F=s?.current?.screenOffset??0,X=1-dt(F)*(1-n),q=Ce.getState().preferReducedMotion?wr:1;O.current+=u*X*q*m,d.current?.setTime(O.current,i?.current??null,s?.current?.scrollVelocity??0)});const re=Dr();return l.useEffect(()=>{if(!re)return;r?.trim()||Er(S);const W=new AbortController;let b=null;const u=performance.now(),M=r?.trim()?null:Zt(e,t);return d.current?.dispose(),d.current=null,K.current=!1,T(null),Ia(e,t,r,W.signal).then(R=>{const F=ka(R);if(W.signal.aborted){F.dispose();return}b=F,d.current=F,F.apply(p.current,I.current),F.setLoadFade(It()?1:0),o&&(o.current=F.group),T(F.group)}).catch(R=>{if(W.signal.aborted)return;K.current=!0,v&&(v.current=1);const F=r?.trim()||M?.src||t||e;ya(F,R,{originalSourceUrl:e,loadUrl:F,ktx2Url:M?.src??t,depthMapUrl:r,phase:r?.trim()?"depth-map-load":"ktx2-load",elapsedMs:Mr(u),width:M?.width,height:M?.height,layerCount:M?.layerCount})}),()=>{W.abort(),o&&o.current===b?.group&&(o.current=null),b?.dispose(),d.current===b&&(d.current=null)}},[r,S,o,t,e,re,v]),C?N.jsx("primitive",{object:C}):null}async function Ia(e,t,r,a){const o=r?.trim();if(o)return Oa(e,o,a);const n=Zt(e,t);if(!n)throw new Error(`[VideoLightVolume] Missing KTX2 volume for ${e}. Pass ktx2Url or use a .ktx2 source URL.`);const c=await ot(()=>Or.loadAsync(n.src),{signal:a}).catch(s=>{throw nt(s instanceof Error?s:new Error(String(s)),{sourceUrl:e,loadUrl:n.src,ktx2Url:n.src,phase:"ktx2-load",width:n.width,height:n.height,layerCount:n.layerCount})});try{if(a.aborted)throw new DOMException("KTX2 load aborted","AbortError");if(c.colorSpace=ct,c.minFilter=Ne,c.magFilter=Ne,c.wrapS=Ge,c.wrapT=Ge,!Jt(c))throw new Error(`[VideoLightVolume] Expected ${n.src} to load as a KTX2 array texture.`);const s=c.image,i=s.width??n.width,m=s.height??n.height;if(!i||!m)throw new Error(`[VideoLightVolume] KTX2 texture dimensions missing for ${n.src}.`);const v=s.depth??n.layerCount;return{texture:c,width:i,height:m,layerCount:v,aspect:i/Math.max(1,m),duration:Math.max(qt,n.duration)}}catch(s){throw c.dispose(),s}}function Ea(e){const t=e.image,r=t?.width||t?.naturalWidth,a=t?.height||t?.naturalHeight;return r&&a?{width:r,height:a}:null}async function Oa(e,t,r){const a=ot(()=>Et.loadAsync(e),{signal:r}).catch(s=>{throw nt(s instanceof Error?s:new Error(String(s)),{sourceUrl:e,loadUrl:e,depthMapUrl:t,phase:"depth-map-source-load"})}),o=ot(()=>Et.loadAsync(t),{signal:r}).catch(s=>{throw nt(s instanceof Error?s:new Error(String(s)),{sourceUrl:e,loadUrl:t,depthMapUrl:t,phase:"depth-map-depth-load"})});a.catch(()=>{o.then(s=>s.dispose()).catch(()=>{})}),o.catch(()=>{a.then(s=>s.dispose()).catch(()=>{})});const[n,c]=await Promise.all([a,o]);try{if(r.aborted)throw new DOMException("depth map load aborted","AbortError");n.colorSpace=ct,c.colorSpace=cr;for(const i of[n,c])i.minFilter=Ne,i.magFilter=Ne,i.wrapS=Ge,i.wrapT=Ge,i.flipY=!1;const s=Ea(n);if(!s)throw new Error(`[VideoLightVolume] Source image dimensions missing for ${e}.`);return{texture:n,depthTexture:c,width:s.width,height:s.height,layerCount:1,aspect:s.width/Math.max(1,s.height),duration:Ma}}catch(s){throw n.dispose(),c.dispose(),s}}function ka(e){const t=new Je;t.name="videoLightVolume";const r=e.texture,a=e.depthTexture,o=e.aspect,n=a!==void 0,c=!n&&Jt(r),s=n?"sampler2D":c?"sampler2DArray":"sampler3D",i=new ur(1,1,1),m=new Ee({glslVersion:Yt,vertexShader:`
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
      precision highp ${s};
      uniform ${s} uVolume;
      ${n?"uniform sampler2D uDepthMap;":""}
      uniform float uOpacity;
      uniform float uBrightness;
      uniform float uThreshold;
      uniform float uSoftness;
      uniform float uEdgeFade;
      uniform float uLoopCount;
      uniform float uGridTimeOffset;
      uniform float uGridOpacity;
      uniform float uNearFade;
      uniform float uRaymarchSteps;
      uniform float uLayerCount;
      uniform float uScrubOffset;
      uniform vec3 uCenterFade;
      uniform vec3 uHsl;
      uniform float uTime;
      uniform vec3 uNoiseScale;
      uniform vec3 uNoiseMovement;
      uniform float uNoiseStrength;
      uniform float uLoadFade;
      in vec3 vLocalPos;
      in vec3 vCameraLocal;
      in vec3 vWorldPos;
      out vec4 outColor;

${kr}
${_r}

      vec3 animatedUvOffset(vec3 p) {
        if (abs(uNoiseStrength) <= 0.000001) return vec3(0.0);
        vec3 noisePos = p * uNoiseScale + uTime * uNoiseMovement;
        return vec3(
          cnoise(noisePos),
          cnoise(noisePos + vec3(19.19, 7.31, 3.77)),
          cnoise(noisePos + vec3(5.13, 23.17, 11.71))
        ) * uNoiseStrength;
      }

      vec4 sampleVolume(${s} tex, vec3 uvw) {
        ${n?`
        vec4 image = texture(tex, uvw.xy);
        float depthLimit = clamp(texture(uDepthMap, uvw.xy).r, 0.0, 1.0);
        float z = clamp(uvw.z, 0.0, 1.0);
        float thickness = max(${Ca.toFixed(3)}, 1.0 / max(uRaymarchSteps, 1.0));
        float frontMask = smoothstep(0.0, thickness, z);
        float backMask = depthLimit >= 0.999 ? 1.0 : 1.0 - smoothstep(depthLimit, min(depthLimit + thickness, 1.0), z);
        image.a *= clamp(frontMask * backMask, 0.0, 1.0);
        return image;
        `:c?`
        float layerCount = max(1.0, uLayerCount);
        float layerPos = clamp(uvw.z, 0.0, 0.999999) * max(0.0, layerCount - 1.0);
        float layer0 = floor(layerPos);
        float layer1 = min(layer0 + 1.0, layerCount - 1.0);
        float mixLayer = fract(layerPos);
        return mix(
          texture(tex, vec3(uvw.xy, layer0)),
          texture(tex, vec3(uvw.xy, layer1)),
          mixLayer
        );
        `:`
        return texture(tex, uvw);
        `}
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

      void main() {
        vec3 rayDir = normalize(vLocalPos - vCameraLocal);
        vec2 bounds = hitBox(vCameraLocal, rayDir);
        if (bounds.x > bounds.y) discard;
        bounds.x = max(bounds.x, 0.0);
        // Defensive clamp mirrors the JS uniform clamp so malformed live edits
        // cannot exceed the shader's static loop bound.
        float steps = clamp(uRaymarchSteps, ${va}, ${Sa});
        float dt = (bounds.y - bounds.x) / steps;
        float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        vec3 noiseSamplePos = vCameraLocal + rayDir * mix(bounds.x, bounds.y, 0.5);
        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec3 accum = vec3(0.0);
        float alpha = 0.0;
        for (int i = 0; i < ${xa}; i++) {
          if (float(i) >= steps) break;
          float t = bounds.x + (float(i) + jitter) * dt;
          vec3 p = vCameraLocal + rayDir * t;
          float rayDepth01 = clamp((t - bounds.x) / max(bounds.y - bounds.x, 0.0001), 0.0, 1.0);
          vec3 rawUvw = p + 0.5 + uvOffset;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
          float edgeFade = max(uEdgeFade, 0.0);
          float sideMask = edgeFade > 0.0001 ? smoothstep(0.0, edgeFade, sideDistance) : 1.0;
          float sideFeatherDepth = 1.0 - smoothstep(0.25, 0.85, rayDepth01);
          float sideFeather = mix(1.0, sideMask, sideFeatherDepth);
          vec3 uvw = clamp(rawUvw, vec3(0.001), vec3(0.999));
          float z = ${n?"uvw.z":"fract(uvw.z * max(0.0, uLoopCount) + uScrubOffset + uGridTimeOffset)"};
          vec4 tex = sampleVolume(uVolume, vec3(uvw.x, 1.0 - uvw.y, z));
          float centerFade = smoothstep(uCenterFade.x, uCenterFade.y, abs(uvw.z - 0.5));
          centerFade = mix(1.0, centerFade, clamp(uCenterFade.z, 0.0, 1.0));
          float luma = max(max(tex.r, tex.g), tex.b);
          float density = smoothstep(uThreshold, uThreshold + max(0.0001, uSoftness), luma) * tex.a * centerFade * uOpacity * sideFeather * uGridOpacity;
          float a = density / steps;
          accum += applyHsl(tex.rgb, uHsl) * uBrightness * a * (1.0 - alpha);
          alpha += a * (1.0 - alpha);
          if (alpha > 0.96) break;
        }
        float nearFade = smoothstep(0.0, max(0.0001, uNearFade), length(vWorldPos - cameraPosition));
        outColor = vec4(accum * nearFade, alpha * nearFade) * uLoadFade;
      }
    `,uniforms:{uVolume:{value:r},uDepthMap:{value:a??r},uOpacity:{value:1.8},uBrightness:{value:1.25},uThreshold:{value:.09},uSoftness:{value:.001},uEdgeFade:{value:.06},uLoopCount:{value:1},uGridTimeOffset:{value:0},uGridOpacity:{value:1},uNearFade:{value:0},uRaymarchSteps:{value:it},uLayerCount:{value:e.layerCount},uScrubOffset:{value:0},uCenterFade:{value:new le(...Vr)},uHsl:{value:new le},uTime:{value:0},uNoiseScale:{value:new le},uNoiseMovement:{value:new le},uNoiseStrength:{value:0},uLoadFade:{value:1}},transparent:!0,depthWrite:!1,depthTest:!1,blending:et,side:lr}),v=[m],S=[null],d=u=>{for(const M of v)u(M);for(const M of S)M&&u(M)},p=u=>{const M=new We(i,u);return M.name="Raymarched videoLightVolume",M.frustumCulled=!1,M},C=p(m),T=[C];t.add(C);const E=u=>{for(;T.length<u;){const M=m.clone();v.push(M),S.push(null);const R=p(M);T.push(R),t.add(R)}for(;T.length>u;){T.pop()?.removeFromParent();const R=v.pop(),F=S.pop();R?.dispose(),F?.dispose()}},I=u=>(S[u]||(S[u]=_a(v[u],r,s)),S[u]),O=new le(1,1,1),h=()=>{t.updateWorldMatrix(!0,!1),t.getWorldScale(O);const u=Math.max(Math.abs(O.x),1e-4),M=Math.max(Math.abs(O.y),1e-4),R=Math.max(Math.abs(O.z),1e-4);d(F=>{F.uniforms.uFluidWorldScale&&F.uniforms.uFluidWorldScale.value.set(u,M,R)})},x=Math.max(qt,e.duration);let _=Ct,K=0,re=it,W=null,b=0;return{group:t,apply:(u,M=1)=>{t.name=`videoLightVolume:${u.source}`,t.userData.videoLightLayer=u.layer,t.visible=u.visible&&u.opacity>1e-4,t.position.fromArray(u.position),t.rotation.fromArray(u.rotation),t.scale.set(u.scale[0]*u.width,u.scale[1]*(u.width/Math.max(.001,o)),u.scale[2]*u.depth);const R=u.grid?.enabled===!0,F=R?Math.max(1,Math.min(Ot,Math.round(u.grid.columns||1))):1,X=R?Math.max(1,Math.min(Ot,Math.round(u.grid.rows||1))):1,q=Number.isFinite(u.grid?.spacing?.[0])?u.grid.spacing[0]:1.1,Z=Number.isFinite(u.grid?.spacing?.[1])?u.grid.spacing[1]:1.1,H=R?Math.max(0,u.grid.randomTimeOffset||0):0,J=R?Math.max(0,Math.min(1,u.grid.outerOpacity??1)):1,g=Math.floor((F-1)*.5),ne=Math.floor((X-1)*.5),me=Math.max(g,F-1-g,ne,X-1-ne,1);E(F*X);for(let f=0;f<T.length;f++){const j=f%F,Q=Math.floor(f/F),U=Math.max(Math.abs(j-g),Math.abs(Q-ne))/me,P=j===g&&Q===ne,y=Math.sin((f+1)*12.9898+F*78.233)*43758.5453%1;T[f].position.set((j-(F-1)*.5)*q,(Q-(X-1)*.5)*Z,0),T[f].userData.gridTimeOffset=P?0:(y+1)%1*H,T[f].userData.gridOpacity=1-Math.min(U,1)*(1-J),T[f].renderOrder=u.renderBehindPointCloud?-5:35}const ee=Number.isFinite(u.fluidStrength[0])?u.fluidStrength[0]:0,A=Number.isFinite(u.fluidStrength[1])?u.fluidStrength[1]:0,[V,ie]=Kt(u.fluidDepthStrength,ut),[se,L]=da(u.fluidDistanceRange,st),$=Math.max(Math.abs(ee),Math.abs(A))>1e-6;for(let f=0;f<T.length;f++){const j=$?I(f):v[f];T[f].material!==j&&(T[f].material=j)}const B=u.blendMode==="additive"?ft:et;re=Da(u.raymarchSteps,M),d(f=>{f.blending=B,f.uniforms.uOpacity.value=u.opacity,f.uniforms.uBrightness.value=u.brightness,f.uniforms.uThreshold.value=Math.max(u.threshold,pa),f.uniforms.uSoftness.value=u.softness,f.uniforms.uEdgeFade.value=Math.max(u.edgeFade,0),f.uniforms.uLoopCount.value=Number.isFinite(u.loopCount)?Math.max(0,u.loopCount):1,f.uniforms.uNearFade.value=u.nearFade,f.uniforms.uRaymarchSteps.value=re,f.uniforms.uCenterFade.value.fromArray(u.centerFade),f.uniforms.uHsl.value.fromArray(u.hsl),f.uniforms.uNoiseScale.value.fromArray(u.noiseScale),f.uniforms.uNoiseMovement.value.fromArray(u.noiseMovement),f.uniforms.uNoiseStrength.value=u.noiseStrength,f.uniforms.uFluidStrength&&f.uniforms.uFluidStrength.value.set(ee,A),f.uniforms.uFluidDepthStrength&&f.uniforms.uFluidDepthStrength.value.set(V,ie),f.uniforms.uFluidDistanceRange&&f.uniforms.uFluidDistanceRange.value.set(se,L)}),h();for(let f=0;f<T.length;f++)for(const j of[v[f],S[f]])j&&(j.uniforms.uGridTimeOffset.value=T[f].userData.gridTimeOffset,j.uniforms.uGridOpacity.value=T[f].userData.gridOpacity);_=typeof u.playbackSpeed=="number"&&Number.isFinite(u.playbackSpeed)?u.playbackSpeed:Ct,K=typeof u.scrollVelocityScrub=="number"&&Number.isFinite(u.scrollVelocityScrub)?u.scrollVelocityScrub:0},setTime:(u,M,R)=>{const F=M??Be();d(H=>{H.uniforms.uTime.value=u,H.uniforms.uFluidVelocity&&(H.uniforms.uFluidVelocity.value=F)});const X=W===null?0:u-W;W=u;const q=D.clamp(X,-.1,.1);b+=q*_/x+q*D.clamp(R,-1,1)*K;const Z=(b%1+1)%1;d(H=>{H.uniforms.uScrubOffset.value=Z})},setLoadFade:u=>{const M=D.clamp(u,0,1);d(R=>{R.uniforms.uLoadFade.value=M})},dispose:()=>{t.removeFromParent(),i.dispose(),d(u=>{u.dispose()}),r.dispose(),a?.dispose()}}}function Ve(e,t,r){const a=e.replace(t,r);if(a===e)throw new Error("[VideoLightVolume] fluid shader patch target was not found");return a}function _a(e,t,r){let a=e.fragmentShader;const o=`uniform ${r} uVolume;
`;return a=Ve(a,o,`${o}      uniform sampler2D uFluidVelocity;
`),a=Ve(a,`uniform float uScrubOffset;
`,`uniform float uScrubOffset;
      uniform vec2 uFluidStrength;
      uniform vec2 uFluidDepthStrength;
      uniform vec2 uFluidDistanceRange;
      uniform vec3 uFluidWorldScale;
      uniform vec2 uFluidResolution;
`),a=Ve(a,`        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec3 accum = vec3(0.0);
`,`        vec3 uvOffset = animatedUvOffset(noiseSamplePos + 0.5);
        vec2 fluidUv = clamp(gl_FragCoord.xy / max(uFluidResolution, vec2(1.0)), 0.0, 1.0);
        vec2 fluidOffset = -texture(uFluidVelocity, fluidUv).xy * uFluidStrength * vec2(-1.0, 1.0) * ${ga.toFixed(2)};
        vec3 accum = vec3(0.0);
`),a=Ve(a,`          vec3 rawUvw = p + 0.5 + uvOffset;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
`,`          vec3 rawUvw = p + 0.5 + uvOffset;
          float fluidDepthMix = smoothstep(0.0, 1.0, rayDepth01);
          float fluidDepthStrength = mix(uFluidDepthStrength.x, uFluidDepthStrength.y, fluidDepthMix);
          float fluidDistance = length((p - vCameraLocal) * uFluidWorldScale);
          float fluidDistanceStrength = 1.0 - smoothstep(uFluidDistanceRange.x, uFluidDistanceRange.y, fluidDistance);
          rawUvw.xy += fluidOffset * fluidDepthStrength * fluidDistanceStrength;
          float sideDistance = min(min(rawUvw.x, 1.0 - rawUvw.x), min(rawUvw.y, 1.0 - rawUvw.y));
`),new Ee({glslVersion:Yt,vertexShader:e.vertexShader,fragmentShader:a,uniforms:{...tt.clone(e.uniforms),uVolume:{value:t},uFluidVelocity:{value:Be()},uFluidStrength:{value:new Re},uFluidDepthStrength:{value:new Re(ut[0],ut[1])},uFluidDistanceRange:{value:new Re(st[0],st[1])},uFluidWorldScale:{value:new le(1,1,1)},uFluidResolution:{value:new Re(1,1)}},transparent:!0,depthWrite:!1,depthTest:!1,blending:e.blending,side:e.side})}const Pt=Math.PI/2,Vt=[-yt,yt],La=6,Ba=14,Pa=5,Va=new le(1,1,1);function Ua({cameraObject:e,cameraRigObject:t,position:r,target:a,animation:o,positionOffset:n,mobilePositionOffset:c,rotationOffset:s,mobileRotationOffset:i,pointerInfluence:m,behindPointerInfluence:v=1,scrollDrift:S=Nr,motion:d,cameraDollyOffset:p=0,cameraDollyTransitionOffset:C=0}){const T=de($=>$.camera),E=e??T,I=Xr(),O=Ce($=>$.isMobile),h=Ce($=>$.isLandscapeMobile),x=l.useRef(null),_=l.useRef(null),K=l.useRef(null),re=l.useRef(null),W=l.useRef(null),b=l.useRef(null),u=l.useRef(null),M=l.useRef(null),R=l.useRef(null),F=l.useRef(null),X=l.useRef(null),q=x.current??=new le,Z=_.current??=new Pe,H=K.current??={pitch:0,yaw:0},J=re.current??=new le,g=W.current??=new fr,ne=b.current??=[0,0,0],me=u.current??=new le,ee=M.current??=new rt,A=R.current??=new Pe,V=F.current??=new Pe,ie=Rt[o]??Rt.none,se=l.useMemo(()=>Ft(n,c,O,h,[0,0,0]),[n,c,O,h]),L=l.useMemo(()=>Ft(s,i,O,h,[0,0,0]),[s,i,O,h]);return mt(($,B)=>{const{transition:f,progress:j,screenOffset:Q}=d.current;if(pt(f))return;const U=Ce.getState().preferReducedMotion,P=ie({position:r,target:a,transition:f,progress:j,screenOffset:U?0:Q,scrollDrift:S}),[y,ce]=m?.[0]??Vt,[Ae,we]=m?.[1]??Vt,{x:ue,y:ge,active:pe}=I.current,ve=pe&&!U,Se=1-dt(Q)*(1-v),be=ve?D.mapLinear(ue,-1,1,y,ce)*Pt*Se:0,De=ve?D.mapLinear(-ge,-1,1,Ae,we)*Pt*Se:0,Te=ve?La:Ba;H.pitch=D.damp(H.pitch,De,Te,B),H.yaw=D.damp(H.yaw,be,Te,B),J.set(P.position[0]-P.target[0],P.position[1]-P.target[1],P.position[2]-P.target[2]),g.setFromVector3(J),g.theta+=H.yaw,g.phi+=H.pitch,g.makeSafe(),J.setFromSpherical(g),ne[0]=P.target[0]+J.x,ne[1]=P.target[1]+J.y,ne[2]=P.target[2]+J.z,X.current===null||U?X.current=p:X.current=D.damp(X.current,p,Pa,B);const Y=U?0:C*D.clamp(-f,0,1),ye=(P.localZOffset??0)+X.current+Y;Gr(E,se,L,t),zr(E,ne,P.target,q,Z,ye),Wr(E,t),Hr(E);const Me=t??E.parent;if(Me?.userData[$t]){const w=Me.userData[jr]??=new Pe;me.set(...P.position),q.set(...P.target),Z.lookAt(me,q,E.up),ee.setFromRotationMatrix(Z),A.compose(me,ee,Va),ye!==0&&A.multiply(V.makeTranslation(0,0,ye)),w.multiplyMatrices(Me.matrixWorld,A)}},-1),null}const Na=`uniform sampler2D tDiffuse;
uniform sampler2D tOld;
uniform sampler2D tFluidMask;
uniform sampler2D tAfterImageExclude;
uniform sampler2D tBloom;
uniform float uDamp;
uniform float uStrength;
uniform float uThreshold;
uniform float uFluidMaskStrength;
uniform float uFluidChromaticStrength;
uniform float uAfterImageExcludeStrength;
uniform vec3 uBloomColor;
uniform float uBloomOpacity;
uniform float uChromaticAmount;
uniform float uChromaticAngle;
uniform float uNoiseAmount;
uniform float uNoiseScale;
uniform float uNoiseTime;
uniform float uVignetteAmount;
uniform float uVignetteRadius;
uniform float uVignetteSoftness;
uniform float uVignetteAspect;

varying vec2 vUv;

float afterImageLuma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 fluid = vec3(0.0);
  float chromaticAmount = uChromaticAmount;
  if (uFluidMaskStrength > 0.0001) {
    fluid = texture2D(tFluidMask, vUv).rgb * uFluidMaskStrength;
    float fluidChromatic = clamp(
      length(fluid.xy) * uFluidChromaticStrength,
      0.0,
      2.0
    );
    chromaticAmount *= 1.0 + fluidChromatic;
  }

  vec4 current = texture2D(tDiffuse, vUv);
  if (chromaticAmount > 0.0001) {
    vec2 chromaticCenter = vUv - 0.5;
    float chromaticRadius = length(chromaticCenter);
    float chromaticAngleCos = cos(uChromaticAngle);
    float chromaticAngleSin = sin(uChromaticAngle);
    vec2 chromaticDir = chromaticRadius > 0.00001
      ? chromaticCenter / chromaticRadius
      : vec2(0.0);
    chromaticDir = vec2(
      chromaticDir.x * chromaticAngleCos - chromaticDir.y * chromaticAngleSin,
      chromaticDir.x * chromaticAngleSin + chromaticDir.y * chromaticAngleCos
    );
    vec2 chromaticOffset = chromaticDir *
      chromaticAmount *
      (chromaticRadius + 0.15) *
      smoothstep(0.0, 0.05, chromaticRadius);
    vec4 currentR = texture2D(
      tDiffuse,
      clamp(vUv + chromaticOffset, vec2(0.0), vec2(1.0))
    );
    vec4 currentB = texture2D(
      tDiffuse,
      clamp(vUv - chromaticOffset, vec2(0.0), vec2(1.0))
    );
    current = vec4(vec3(currentR.r, current.g, currentB.b), current.a);
  }
  if (uBloomOpacity > 0.0001) {
    vec3 bloom = texture2D(tBloom, vUv).rgb;
    current.rgb += bloom * uBloomColor * uBloomOpacity;
  }

  vec4 previous = texture2D(tOld, vUv);
  float keep = step(uThreshold, afterImageLuma(previous.rgb));
  vec3 decayed = previous.rgb * uDamp * keep;
  vec3 afterimage = max(current.rgb, decayed);

  float mixAfter = clamp(uStrength, 0.0, 1.0);
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.r));
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.g));
  mixAfter *= smoothstep(1.0, 0.0, abs(fluid.b));
  // The background light-volume FBO is already precomposited into tDiffuse. Its
  // alpha mask keeps the temporal trail on the pointcloud layer instead of
  // smearing the raymarched volume texture. (Foreground is composited after
  // this pass, so it is not masked here.)
  if (uAfterImageExcludeStrength > 0.5) {
    mixAfter *= 1.0 - clamp(texture2D(tAfterImageExclude, vUv).a, 0.0, 1.0);
  }

  vec3 color = mix(current.rgb, afterimage, mixAfter);

  if (uNoiseAmount > 0.0001) {
    float scale = clamp(uNoiseScale, 0.1, 8.0);
    vec2 noiseCell = floor(gl_FragCoord.xy / scale);
    float noise = rand(
      noiseCell + vec2(uNoiseTime * 59.0, uNoiseTime * 83.0)
    ) - 0.5;
    color += noise * uNoiseAmount;
  }

  vec2 centered = vUv - 0.5;
  centered.x *= uVignetteAspect;
  float softness = max(uVignetteSoftness, 0.0001);
  float edge = smoothstep(
    uVignetteRadius - softness,
    uVignetteRadius,
    length(centered)
  );
  float shade = mix(1.0, 1.0 - clamp(uVignetteAmount, 0.0, 1.0), edge);
  shade = mix(1.0, shade, smoothstep(0.5, 1.0, vUv.y));
  color *= shade;

  gl_FragColor = vec4(color, current.a);
}
`,Ga=`uniform sampler2D tDiffuse;
uniform float uAmount;
uniform float uWidth;
uniform float uHeight;
uniform float uRounded;
uniform float uBlur;
uniform vec3 uColor;

varying vec2 vUv;

float topRoundedRectSdf(vec2 point, vec2 size, float radius) {
  float x = abs(point.x);
  float y = point.y;
  float clampedRadius = min(radius, min(size.x, size.y));
  vec2 cornerCenter = size - vec2(clampedRadius);

  if (clampedRadius > 0.0 && x > cornerCenter.x && y > cornerCenter.y) {
    vec2 cornerDelta = vec2(x - cornerCenter.x, y - cornerCenter.y);
    return length(cornerDelta) - clampedRadius;
  }

  return max(x - size.x, y - size.y);
}

void main() {
  vec4 source = texture2D(tDiffuse, vUv);
  float amount = clamp(uAmount, 0.0, 1.0);
  float width = max(clamp(uWidth, 0.0, 1.0), 0.0001);
  float height = max(clamp(uHeight, 0.0, 1.0), 0.0001);
  float vertical = 1.0 - smoothstep(0.0, height, vUv.y);
  float radius = clamp(uRounded, 0.0, 1.0) * min(width, height);
  float blur = max(uBlur, 0.0001);
  vec2 shapePoint = vec2((vUv.x - 0.5) * 2.0, vUv.y);
  float sdf = topRoundedRectSdf(shapePoint, vec2(width, height), radius);
  float shapeMask = 1.0 - smoothstep(0.0, blur, sdf);
  float k = vertical * shapeMask * amount;
  // Force alpha so the downstream bg gradient doesn't bleed through gaps.
  source.a = mix(source.a, 1.0, k);
  source.rgb = mix(source.rgb, uColor, k);
  gl_FragColor = source;
}
`,St=`varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ye={uniforms:{tDiffuse:{value:null},tOld:{value:null},tFluidMask:{value:null},tAfterImageExclude:{value:null},tBloom:{value:null},uDamp:{value:.93},uStrength:{value:0},uThreshold:{value:.04},uFluidMaskStrength:{value:0},uFluidChromaticStrength:{value:0},uAfterImageExcludeStrength:{value:0},uBloomColor:{value:new fe(1,1,1)},uBloomOpacity:{value:0},uChromaticAmount:{value:0},uChromaticAngle:{value:0},uNoiseAmount:{value:0},uNoiseScale:{value:1},uNoiseTime:{value:0},uVignetteAmount:{value:0},uVignetteRadius:{value:.72},uVignetteSoftness:{value:.35},uVignetteAspect:{value:1}},vertexShader:St,fragmentShader:Na},Xe={uniforms:{tDiffuse:{value:null},uAmount:{value:0},uWidth:{value:1},uHeight:{value:1},uRounded:{value:0},uBlur:{value:.08},uColor:{value:new fe(0,0,0)}},vertexShader:St,fragmentShader:Ga},za=new fe;function Ut(e,t){const r=new We(new lt(2,2),t);return e.add(r),r}class Wa{rawSceneTarget=null;options;preset;renderer=null;afterImageOldTarget=null;afterImageTarget=null;afterImageMaterial=null;afterImageScene=new ze;afterImageCamera=new at(-1,1,1,-1,0,1);afterImageQuad=null;crossFadeTransitionTarget=null;crossFadeTransitionMaterial=null;crossFadeTransitionScene=new ze;crossFadeTransitionCamera=new at(-1,1,1,-1,0,1);crossFadeTransitionQuad=null;fxWidth=0;fxHeight=0;sceneWidth=1;sceneHeight=1;initialized=!1;hasAfterImageFrame=!1;afterImageCameraFade=1;afterImageScrollFade=1;afterImageScrollFadeTime=0;afterImageCameraSampleReady=!1;transientRtsCleared=!0;afterImageCameraPosition=new le;afterImagePreviousCameraPosition=new le;afterImageCameraQuaternion=new rt;afterImagePreviousCameraQuaternion=new rt;constructor(t){this.options=t,this.preset=t.preset}init(t){if(this.renderer=t,this.initialized)return;this.initialized=!0,this.afterImageMaterial=new Ee({uniforms:tt.clone(Ye.uniforms),vertexShader:Ye.vertexShader,fragmentShader:Ye.fragmentShader,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.afterImageQuad=Ut(this.afterImageScene,this.afterImageMaterial);const r=this.preset.tint;this.afterImageMaterial.uniforms.uBloomColor.value.setRGB(r[0],r[1],r[2])}resize(t,r,a,o,n,c){if(this.sceneWidth=a,this.sceneHeight=o,this.rawSceneTarget){this.rawSceneTarget.setSize(a,o);const s=this.rawSceneTarget.depthTexture;s&&(s.image.width!==a||s.image.height!==o)&&(s.image.width=a,s.image.height=o,s.needsUpdate=!0)}this.afterImageOldTarget?.setSize(n,c),this.afterImageTarget?.setSize(n,c),this.crossFadeTransitionTarget?.setSize(n,c),this.fxWidth=n,this.fxHeight=c,this.hasAfterImageFrame=!1,this.afterImageCameraSampleReady=!1,this.renderer&&At(this.renderer).setSize(t,r),this.afterImageMaterial&&(this.afterImageMaterial.uniforms.uVignetteAspect.value=t/Math.max(r,1))}acquireSceneTarget(t){this.rawSceneTarget||(this.rawSceneTarget=he(t,"main",this.sceneWidth,this.sceneHeight))}releaseSceneTarget(t){this.rawSceneTarget&&(ae(t,"main",this.rawSceneTarget),this.rawSceneTarget=null)}acquireFxTargets(t){this.afterImageOldTarget||(this.afterImageOldTarget=he(t,"fx",this.fxWidth,this.fxHeight),this.afterImageTarget=he(t,"fx",this.fxWidth,this.fxHeight),this.hasAfterImageFrame=!1)}releaseFxTargets(t){this.afterImageOldTarget&&(ae(t,"fx",this.afterImageOldTarget),this.afterImageOldTarget=null),this.afterImageTarget&&(ae(t,"fx",this.afterImageTarget),this.afterImageTarget=null),this.crossFadeTransitionTarget&&(ae(t,"fx",this.crossFadeTransitionTarget),this.crossFadeTransitionTarget=null),this.hasAfterImageFrame=!1,this.transientRtsCleared=!0}resetTransientState(t){if(this.hasAfterImageFrame=!1,this.afterImageCameraSampleReady=!1,this.afterImageCameraFade=1,this.afterImageScrollFade=1,this.afterImageScrollFadeTime=0,t&&!this.transientRtsCleared&&this.afterImageOldTarget&&this.afterImageTarget){const r=t.getRenderTarget(),a=t.getClearColor(za).clone(),o=t.getClearAlpha();t.setClearColor(0,0),t.setRenderTarget(this.afterImageOldTarget),t.clear(),t.setRenderTarget(this.afterImageTarget),t.clear(),t.setRenderTarget(r),t.setClearColor(a,o),this.transientRtsCleared=!0}}applyPreset(t){if(this.preset=t,this.afterImageMaterial){const r=t.tint;this.afterImageMaterial.uniforms.uBloomColor.value.setRGB(r[0],r[1],r[2])}}isBloomActive(t){return this.getBloomOverlayOpacity(t)>0}isAfterImageActive(t){return t.cameraMotion.afterimageEnabled!==!1&&(t.cameraMotion.afterimageStrength??Le.afterimageStrength)>0}isVignetteActive(t){return t.cameraMotion.vignetteEnabled!==!1&&(t.cameraMotion.vignetteAmount??0)>0}getBloomOverlayOpacity(t){return!this.preset.enabled||t.cameraMotion.bloomEnabled===!1?0:this.preset.opacity}get hasPersistedAfterImageFrame(){return this.hasAfterImageFrame}get afterImageOldTexture(){return this.afterImageOldTarget?.texture??null}updateCameraFade(t){if(t.updateMatrixWorld(!0),t.getWorldPosition(this.afterImageCameraPosition),t.getWorldQuaternion(this.afterImageCameraQuaternion),!this.afterImageCameraSampleReady){this.afterImagePreviousCameraPosition.copy(this.afterImageCameraPosition),this.afterImagePreviousCameraQuaternion.copy(this.afterImageCameraQuaternion),this.afterImageCameraSampleReady=!0,this.afterImageCameraFade=1;return}const r=this.afterImageCameraPosition.distanceTo(this.afterImagePreviousCameraPosition),a=1-Math.abs(this.afterImageCameraQuaternion.dot(this.afterImagePreviousCameraQuaternion)),o=r+a*2;this.afterImageCameraFade=1-D.smoothstep(o,Kr,qr),this.afterImagePreviousCameraPosition.copy(this.afterImageCameraPosition),this.afterImagePreviousCameraQuaternion.copy(this.afterImageCameraQuaternion)}resetCameraFade(){this.afterImageCameraFade=1}invalidateCameraBaseline(){this.afterImageCameraSampleReady=!1}renderBloom(t){return this.rawSceneTarget?At(t).render(t,this.rawSceneTarget.texture,this.preset.intensity,this.preset.radius,this.preset.threshold):null}renderAfterImage(t,r){if(!this.afterImageOldTarget||!this.afterImageTarget||!this.afterImageMaterial)return;const{ctx:a,source:o,bloomTexture:n,fluidMaskTexture:c,afterImageExcludeTexture:s}=r,i=a.cameraMotion,m=i.afterimageEnabled===!1?0:i.afterimageStrength??Le.afterimageStrength,v=i.vignetteEnabled===!1?0:i.vignetteAmount??0,S=n?this.getBloomOverlayOpacity(a):0,d=i.chromaticEnabled===!1?0:i.chromaticAmount??0,p=i.noiseEnabled===!1?0:i.noiseAmount??0;if(m<=0&&v<=0&&S<=0&&d<=0&&p<=0){this.hasAfterImageFrame=!1;return}const C=D.clamp(1-D.smoothstep(Math.abs(a.scrollVelocity),Zr,Jr),0,1),T=performance.now(),E=this.afterImageScrollFadeTime?Math.min(ea,(T-this.afterImageScrollFadeTime)/1e3):1/60;this.afterImageScrollFadeTime=T;const I=D.clamp(i.afterimageScrollFadeLerp??Le.afterimageScrollFadeLerp,Mt[0],Mt[1]);this.afterImageScrollFade=this.hasAfterImageFrame?la(this.afterImageScrollFade,C,E,I):C;const O=this.afterImageScrollFade,h=this.afterImageMaterial.uniforms;h.tDiffuse.value=o,h.tOld.value=this.hasAfterImageFrame?this.afterImageOldTarget.texture:o,h.tFluidMask.value=c??this.options.zeroTexture,h.tAfterImageExclude.value=s??this.options.zeroTexture,h.uAfterImageExcludeStrength.value=s?1:0,h.tBloom.value=n??this.options.zeroTexture;const x=D.clamp(i.afterimageDamp??Le.afterimageDamp,0,.999),_=D.lerp(ra,x,O);h.uDamp.value=this.hasAfterImageFrame?Math.pow(_,E*ta):0,h.uFluidMaskStrength.value=c?1:0,h.uFluidChromaticStrength.value=c?4:0,h.uStrength.value=D.clamp(m*O*this.afterImageCameraFade,0,1),h.uThreshold.value=i.afterimageThreshold??.04,h.uBloomOpacity.value=S,h.uChromaticAmount.value=d,h.uChromaticAngle.value=i.chromaticAngle??this.preset.rgbAngle,h.uNoiseAmount.value=D.clamp(p,0,1),h.uNoiseScale.value=D.clamp(i.noiseScale??1,.1,8),h.uNoiseTime.value=performance.now()*.001%1e3,h.uVignetteAmount.value=D.clamp(v,0,1),h.uVignetteRadius.value=D.clamp(i.vignetteRadius??.72,0,1.5),h.uVignetteSoftness.value=D.clamp(i.vignetteSoftness??.35,.001,1),t.setRenderTarget(this.afterImageTarget),t.clear(),t.render(this.afterImageScene,this.afterImageCamera);const K=this.afterImageOldTarget;this.afterImageOldTarget=this.afterImageTarget,this.afterImageTarget=K,this.hasAfterImageFrame=!0,this.transientRtsCleared=!1}renderCrossFadeTransition(t,r,a,o,n,c,s,i){if(a<=0||(this.crossFadeTransitionTarget??=he(t,"fx",this.fxWidth,this.fxHeight),this.crossFadeTransitionMaterial||(this.crossFadeTransitionMaterial=new Ee({uniforms:tt.clone(Xe.uniforms),vertexShader:Xe.vertexShader,fragmentShader:Xe.fragmentShader,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.crossFadeTransitionQuad=Ut(this.crossFadeTransitionScene,this.crossFadeTransitionMaterial)),!this.crossFadeTransitionTarget))return null;const m=this.crossFadeTransitionMaterial.uniforms;return m.tDiffuse.value=r,m.uAmount.value=D.clamp(a,0,1),m.uWidth.value=D.clamp(o,0,1),m.uHeight.value=D.clamp(n,0,1),m.uRounded.value=D.clamp(c,0,1),m.uBlur.value=D.clamp(s,1e-4,1),m.uColor.value.setRGB(i.r,i.g,i.b),t.setRenderTarget(this.crossFadeTransitionTarget),t.clear(),t.render(this.crossFadeTransitionScene,this.crossFadeTransitionCamera),this.crossFadeTransitionTarget.texture}dispose(){this.rawSceneTarget?.dispose(),this.afterImageOldTarget?.dispose(),this.afterImageTarget?.dispose(),this.rawSceneTarget=null,this.afterImageOldTarget=null,this.afterImageTarget=null,this.initialized=!1,this.afterImageQuad&&this.afterImageScene.remove(this.afterImageQuad),this.afterImageQuad?.geometry.dispose(),this.afterImageMaterial?.dispose(),this.afterImageMaterial=null,this.afterImageQuad=null,this.crossFadeTransitionQuad&&this.crossFadeTransitionScene.remove(this.crossFadeTransitionQuad),this.crossFadeTransitionQuad?.geometry.dispose(),this.crossFadeTransitionMaterial?.dispose(),this.crossFadeTransitionTarget?.dispose(),this.crossFadeTransitionMaterial=null,this.crossFadeTransitionQuad=null,this.crossFadeTransitionTarget=null}}const Ha=4,Nt=new WeakMap;function er(e){let t=Nt.get(e);return t||(t=[],Nt.set(e,t)),t}function ja(e,t){const r=er(e);return r.length>0?r.pop():new Wa(t)}function Qa(e,t){const r=er(e);if(r.length>=Ha){t.dispose();return}r.push(t)}let $e=null;function Ya(){return $e||($e=$a()),$e}const Xa=l.forwardRef(function(t,r){const{bloom:a,zeroTexture:o,maxDpr:n,dpr:c}=t,s=de(C=>C.gl),i=de(C=>C.size),m=de(C=>C.viewport.dpr),v=c!=null?Math.min(Math.max(.05,c),n??1/0):n!=null?Math.min(m,n):m,S=o??Ya(),d=l.useRef(null),p=d.current??(d.current=ja(s,{preset:a,zeroTexture:S}));return l.useImperativeHandle(r,()=>p,[p]),l.useEffect(()=>{p.init(s),p.resetTransientState(s),p.invalidateCameraBaseline()},[p,s]),l.useEffect(()=>{p.applyPreset(a)},[p,a]),l.useEffect(()=>{const C=Math.max(1,Math.round(i.width*v)),T=Math.max(1,Math.round(i.height*v));p.resize(i.width,i.height,C,T,C,T)},[p,i.width,i.height,v]),l.useEffect(()=>()=>{p.releaseSceneTarget(s),p.releaseFxTargets(s),Qa(s,p)},[s,p]),null});function $a(){const e=new dr(new Uint8Array([0,0,0,255]),1,1,hr);return e.needsUpdate=!0,e}const tr=1.5,Gt=2,zt=new fe,Oe=new fe,Ka={r:0,g:0,b:0},qa=4;function ke(e){const t=[];return e.traverse(r=>{const a=r.material;a&&(Array.isArray(a)?t.push(...a):t.push(a))}),t}function Za(e){const t=[],r=new Set;for(const a of e)!a||r.has(a)||(r.add(a),t.push({object:a,visible:a.visible}),a.visible=!1);return t}function Ue(e){for(const{object:t,visible:r}of e)t.visible=r}function Wt(e,t){let r=t;for(;r;){if(r===e)return!0;r=r.parent}return!1}function Ja(){const e=new ze,t=new at(-1,1,1,-1,0,1),r=new lt(2,2),a=new Ee({uniforms:{tMap:{value:null},tFluidMask:{value:Be()},uFluidMaskStrength:{value:0},uFluidChromaticStrength:{value:qa},uChromaticAmount:{value:0},uChromaticAngle:{value:0}},vertexShader:St,fragmentShader:`
      uniform sampler2D tMap;
      uniform sampler2D tFluidMask;
      uniform float uFluidMaskStrength;
      uniform float uFluidChromaticStrength;
      uniform float uChromaticAmount;
      uniform float uChromaticAngle;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(tMap, vUv);
        if (color.a <= 0.0001) discard;

        vec3 fluid = texture2D(tFluidMask, vUv).rgb * uFluidMaskStrength;
        float fluidChromatic = clamp(
          length(fluid.xy) * uFluidChromaticStrength,
          0.0,
          2.0
        );
        float chromaticAmount = uChromaticAmount * (1.0 + fluidChromatic);

        if (chromaticAmount > 0.000001) {
          vec2 chromaticCenter = vUv - 0.5;
          float chromaticRadius = length(chromaticCenter);
          float chromaticAngleCos = cos(uChromaticAngle);
          float chromaticAngleSin = sin(uChromaticAngle);
          vec2 chromaticDir = chromaticRadius > 0.00001
            ? chromaticCenter / chromaticRadius
            : vec2(0.0);
          chromaticDir = vec2(
            chromaticDir.x * chromaticAngleCos - chromaticDir.y * chromaticAngleSin,
            chromaticDir.x * chromaticAngleSin + chromaticDir.y * chromaticAngleCos
          );
          vec2 chromaticOffset = chromaticDir *
            chromaticAmount *
            (chromaticRadius + 0.15) *
            smoothstep(0.0, 0.05, chromaticRadius);
          vec4 colorR = texture2D(
            tMap,
            clamp(vUv + chromaticOffset, vec2(0.0), vec2(1.0))
          );
          vec4 colorB = texture2D(
            tMap,
            clamp(vUv - chromaticOffset, vec2(0.0), vec2(1.0))
          );
          color.rgb = vec3(colorR.r, color.g, colorB.b);
        }

        gl_FragColor = color;
      }
    `,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new We(r,a);o.frustumCulled=!1,e.add(o);const n={};let c=1,s=1,i=1,m=1;const v=(d,p)=>{const C=n[p];C&&(ae(d,"video",C),delete n[p])},S=d=>{v(d,"background"),v(d,"environment"),v(d,"foreground")};return{scene:e,camera:t,material:a,quad:o,setSizes:(d,p,C,T)=>{c=d,s=p,i=C,m=T,n.background?.setSize(d,p),n.environment?.setSize(d,p),n.foreground?.setSize(C,T)},acquire:(d,p)=>(p.background?n.background??=he(d,"video",c,s):v(d,"background"),p.environment?n.environment??=he(d,"video",c,s):v(d,"environment"),p.foreground?n.foreground??=he(d,"video",i,m):v(d,"foreground"),n),release:S,dispose:d=>{e.remove(o),r.dispose(),a.dispose(),S(d)}}}function eo(e,t,r){for(const a of e)for(const o of ke(a)){const c=o.uniforms?.uFluidResolution?.value;c&&typeof c.set=="function"&&c.set(t,r)}}function Ke(e,t,r,a,o,n=!1){if(a.length===0&&!n)return;const c=[];t.traverse(S=>{if(S===t)return;const d=a.some(p=>Wt(S,p)||Wt(p,S));c.push({object:S,visible:S.visible}),S.visible=d&&S.visible});const s=e.getRenderTarget(),i=e.autoClear,m=t.background,v=e.getClearAlpha();e.getClearColor(Oe),n||(t.background=null),e.autoClear=!1,e.setClearColor(0,0),eo(a,o.width,o.height),e.setRenderTarget(o),e.clear(),e.render(t,r),e.setRenderTarget(s),e.setClearColor(Oe,v),e.autoClear=i,t.background=m,Ue(c)}function to(e){return e.some(t=>ke(t).some(r=>r.blending===ft))}function ro(e){let t=!1;const r=1<<gt;return e.traverseVisible(a=>{t||(a.layers.mask&r)===0||(t=ke(a).some(o=>o.visible))}),t}function ao(e){let t=!1;const r=1<<gt;return e.traverseVisible(a=>{t||!a.userData[oa]||(a.layers.mask&r)===0||(t=ke(a).some(o=>o.visible))}),t}function oo(e){return"blitFramebuffer"in e}function Ht(e,t){const r=e.properties.get(t).__webglFramebuffer;if(Array.isArray(r)){const a=r[0];return(Array.isArray(a)?a[0]:a)??null}return r??null}function no(e,t,r,a=t.width,o=t.height){const n=e.getContext();if(!oo(n))return!1;const c=e.getRenderTarget();e.setRenderTarget(r),e.setRenderTarget(c);const s=Ht(e,t),i=Ht(e,r);return!s||!i?!1:(e.state.bindFramebuffer(n.READ_FRAMEBUFFER,s),e.state.bindFramebuffer(n.DRAW_FRAMEBUFFER,i),n.blitFramebuffer(0,0,a,o,0,0,r.width,r.height,n.DEPTH_BUFFER_BIT,n.NEAREST),e.setRenderTarget(c),!0)}function jt(e,t,r,a,o={}){const n=Math.max(0,o.chromaticAmount??0),c=o.fluidMaskTexture??null,s=e.autoClear;t.material.blending=to(a)?ft:et,t.material.uniforms.tMap.value=r,t.material.uniforms.tFluidMask.value=c??Be(),t.material.uniforms.uFluidMaskStrength.value=n>0&&c?1:0,t.material.uniforms.uChromaticAmount.value=n,t.material.uniforms.uChromaticAngle.value=o.chromaticAngle??0,e.autoClear=!1,e.render(t.scene,t.camera),e.autoClear=s,t.material.uniforms.tMap.value=null,t.material.uniforms.tFluidMask.value=Be()}function io(e,t){const r=[];let a=t;for(;a.parent&&a!==e;){for(const o of a.parent.children)o!==a&&(r.push({object:o,visible:o.visible}),o.visible=!1);a=a.parent}return r}function rr(e,t,r,a,o=[]){const n=Za(o);if(!a?.visible){e.render(t,r),Ue(n);return}const c=e.autoClear,s=io(t,a),i=ke(a).map(m=>({material:m,colorWrite:m.colorWrite,depthWrite:m.depthWrite,depthTest:m.depthTest}));for(const{material:m}of i)m.colorWrite=!1,m.depthWrite=!0,m.depthTest=!0;e.autoClear=!1,e.render(t,r),Ue(s);for(const{material:m,colorWrite:v,depthWrite:S,depthTest:d}of i)m.colorWrite=v,m.depthWrite=S,m.depthTest=d;e.render(t,r),e.autoClear=c,Ue(n)}function so(e,t,r,a,o=!1){const n=e.getRenderTarget(),c=e.autoClear,s=t.background,i=e.getClearAlpha(),m=r.layers.mask;e.getClearColor(Oe),t.background=null,r.layers.set(gt),e.autoClear=!1,e.setClearColor(0,0),e.setRenderTarget(a),e.clear(!0,o,!1),e.render(t,r),e.setRenderTarget(n),e.setClearColor(Oe,i),e.autoClear=c,t.background=s,r.layers.mask=m}function qe(e,t,r,a,o,n){const c=e.getRenderTarget(),s=e.autoClear,i=t.background,m=e.getClearAlpha(),v=r.layers.mask,S=ke(t).map(d=>({material:d,colorWrite:d.colorWrite}));e.getClearColor(Oe);for(const{material:d}of S)d.colorWrite=!1;t.background=null,r.layers.set(na),e.autoClear=!1,e.setClearColor(0,0),e.setRenderTarget(n),e.clear(!0,!0,!1),rr(e,t,r,a,o);for(const{material:d,colorWrite:p}of S)d.colorWrite=p;e.setRenderTarget(c),e.setClearColor(Oe,m),e.autoClear=s,t.background=i,r.layers.mask=v}function uo({bloom:e,bloomEnabled:t,chromaticEnabled:r,chromaticAmount:a,chromaticAngle:o,vignetteEnabled:n,vignetteAmount:c,vignetteRadius:s,vignetteSoftness:i,heroBottomGradient:m,afterimageEnabled:v,afterimageStrength:S,afterimageDamp:d,afterimageScrollFadeLerp:p,afterimageThreshold:C,noiseEnabled:T,noiseAmount:E,noiseScale:I,outputTextureRef:O,foregroundTextureRef:h,dryTextureRef:x,fboDpr:_,renderScale:K=1,reduceQualityBehind:re=!0,behindOffset:W=0,dryLayerMsaa:b=!0,transparentBackground:u=!1,motion:M,fluidVelocityRef:R,pointCloudRef:F,foregroundVideoLightVolumeRef:X,videoLightVolumeRef:q,renderScene:Z,renderCamera:H}){const J=l.useRef(null),g=de(U=>U.gl),ne=de(U=>U.scene),me=de(U=>U.camera),ee=de(U=>U.size),A=Z??ne,V=H??me,ie=l.useRef({scrollVelocity:0,cameraMotion:{}}),se=l.useRef({ctx:ie.current,source:null,bloomTexture:null,fluidMaskTexture:null,afterImageExcludeTexture:null}),L=l.useMemo(()=>Ja(),[]),$=b?"dryMsaa":"dry",B=l.useRef(null),f=l.useRef(null),j=l.useRef({width:1,height:1}),Q=l.useRef(null);return l.useEffect(()=>()=>L.dispose(g),[L,g]),l.useEffect(()=>()=>{B.current&&(ae(g,$,B.current),B.current=null),f.current&&(ae(g,"dryDepth",f.current),f.current=null),Q.current&&(ae(g,"sceneCapture",Q.current),Q.current=null)},[g,$]),l.useEffect(()=>{L.setSizes(Math.max(1,Math.round(ee.width*_.background)),Math.max(1,Math.round(ee.height*_.background)),Math.max(1,Math.round(ee.width*_.foreground)),Math.max(1,Math.round(ee.height*_.foreground)));const U=Math.max(1,Math.round(ee.width*Gt)),P=Math.max(1,Math.round(ee.height*Gt));j.current={width:U,height:P},B.current&&(B.current.depthTexture=null,B.current.setSize(U,P))},[_.background,_.foreground,ee.height,ee.width,L]),mt(()=>{const{progress:U,transition:P}=M.current;if(pt(P)){J.current?.releaseSceneTarget(g),J.current?.releaseFxTargets(g),J.current?.resetTransientState(g),L.release(g),B.current&&(ae(g,$,B.current),B.current=null),f.current&&(ae(g,"dryDepth",f.current),f.current=null),Q.current&&(ae(g,"sceneCapture",Q.current),Q.current=null),O.current=null,h&&(h.current=null),x&&(x.current=null);return}const y=J.current;if(!y){O.current=null,h&&(h.current=null),x&&(x.current=null);return}if(y.acquireSceneTarget(g),y.acquireFxTargets(g),!y.rawSceneTarget){O.current=null,h&&(h.current=null),x&&(x.current=null);return}const ce=F?.current??null,Ae=q?.current??null,we=X?.current??null,ue=[],ge=[];for(const oe of[Ae,we])oe?.visible&&(oe.userData.videoLightLayer==="foreground"?ge.push(oe):ue.push(oe));const pe=[...ue,...ge],ve=A.background!==null,xe=ue.length>0,Se=ve,be=ge.length>0,De=xe||Se,Te=r&&xe?a:0,Y=L.acquire(g,{background:xe,environment:Se,foreground:be});xe&&Y.background&&Ke(g,A,V,ue,Y.background),Se&&Y.environment&&Ke(g,A,V,[],Y.environment,!0),be&&Y.foreground&&Ke(g,A,V,ge,Y.foreground),g.getClearColor(zt);const ye=g.getClearAlpha();g.setClearColor(0,u?0:1);const Me=Lr(M.current.screenOffset,W),w=Pr(Me,K,re),Fe=w<1;let k=Q.current;Fe?k?(k.width!==y.rawSceneTarget.width||k.height!==y.rawSceneTarget.height)&&k.setSize(y.rawSceneTarget.width,y.rawSceneTarget.height):k=Q.current=he(g,"sceneCapture",y.rawSceneTarget.width,y.rawSceneTarget.height):k&&(ae(g,"sceneCapture",k),Q.current=null,k=null);const ar=k??y.rawSceneTarget;if(k){const oe=Math.max(1,Math.round(k.width*w)),Ie=Math.max(1,Math.round(k.height*w));k.viewport.set(0,0,oe,Ie),k.scissor.set(0,0,oe,Ie),k.scissorTest=!0}g.setRenderTarget(ar),g.clear();const or=A.background;if(De&&(Y.environment&&jt(g,L,Y.environment.texture,[]),Y.background&&jt(g,L,Y.background.texture,ue,{chromaticAmount:Te,chromaticAngle:o,fluidMaskTexture:R?.current??null}),A.background=null),ce instanceof Fr&&ce.applyBehindContentQuality(w,Br(Me,re)),rr(g,A,V,ce,pe),A.background=or,k&&(k.scissorTest=!1,k.viewport.set(0,0,k.width,k.height),k.scissor.set(0,0,k.width,k.height),aa(g,k,y.rawSceneTarget,w)),x)if(!ro(A))B.current&&(ae(g,$,B.current),B.current=null),f.current&&(ae(g,"dryDepth",f.current),f.current=null),x.current=null;else{const oe=B.current??(B.current=he(g,$,j.current.width,j.current.height)),Ie=ao(A);if(Ie||oe.samples>0)f.current&&(ae(g,"dryDepth",f.current),f.current=null),Ie||qe(g,A,V,ce,pe,oe);else{const G=f.current??(f.current=he(g,"dryDepth",y.rawSceneTarget.width,y.rawSceneTarget.height));(G.width!==y.rawSceneTarget.width||G.height!==y.rawSceneTarget.height)&&(G.depthTexture=null,G.setSize(y.rawSceneTarget.width,y.rawSceneTarget.height));const He=Fe?Math.max(1,Math.round(G.width*w)):G.width,je=Fe?Math.max(1,Math.round(G.height*w)):G.height;Fe&&(G.viewport.set(0,0,He,je),G.scissor.set(0,0,He,je),G.scissorTest=!0),qe(g,A,V,ce,pe,G),Fe&&(G.scissorTest=!1,G.viewport.set(0,0,G.width,G.height),G.scissor.set(0,0,G.width,G.height)),no(g,G,oe,He,je)||qe(g,A,V,ce,pe,oe)}so(g,A,V,oe,Ie),x.current=oe.texture}h&&(h.current=Y.foreground?.texture??null),g.setClearColor(zt,ye);const xt=t?y.renderBloom(g):null;ie.current.scrollVelocity=M.current.scrollVelocity||xr();const te=ie.current.cameraMotion;te.bloomEnabled=t,te.afterimageEnabled=v,te.afterimageStrength=S,te.afterimageDamp=d,te.afterimageScrollFadeLerp=p,te.afterimageThreshold=C,te.vignetteEnabled=n,te.vignetteAmount=c,te.vignetteRadius=s,te.vignetteSoftness=i,te.chromaticEnabled=!1,te.chromaticAmount=0,te.chromaticAngle=o,te.noiseEnabled=T,te.noiseAmount=E,te.noiseScale=I,y.updateCameraFade(V);const _e=se.current;_e.source=y.rawSceneTarget.texture,_e.bloomTexture=xt,_e.fluidMaskTexture=null,_e.afterImageExcludeTexture=Y.background?.texture??null,y.renderAfterImage(g,_e);const bt=v&&S>0||n&&c>0||T&&E>0||xt!==null&&y.getBloomOverlayOpacity(ie.current)>0?y.afterImageOldTexture??y.rawSceneTarget.texture:y.rawSceneTarget.texture,nr=m?m.opacity*(1-D.smoothstep(U,m.fadeStartProgress,m.fadeEndProgress)):0,ir=y.renderCrossFadeTransition(g,bt,nr,m?.width??1,m?.height??1,m?.rounded??0,m?.blur??.08,m?.color??Ka);O.current=ir??bt,g.setRenderTarget(null)},0),N.jsx(Xa,{ref:J,bloom:e,maxDpr:tr,dpr:_.main})}const lo={visibility:1,pointSizeScale:1,introColorMix:0,timeScale:1,driveFluid:!0,scrollVelocity:0},Ze="#0a0a14",co={position:[0,0,0],rotation:[0,0,0]};function mo(e){return{...e.environment}}function Qt(e,t,r){return!r||!t?e:[(e?.[0]??0)+t[0],(e?.[1]??0)+t[1],(e?.[2]??0)+t[2]]}function fo(e){return{position:e.camera.position,target:e.camera.target,animation:e.camera.animation??Yr,fov:e.camera.fov,mobileFov:e.camera.mobileFov,positionOffset:e.camera.positionOffset,mobilePositionOffset:e.camera.mobilePositionOffset,rotationOffset:e.camera.rotationOffset,mobileRotationOffset:e.camera.mobileRotationOffset,pointerInfluence:e.camera.pointerInfluence,scrollDrift:e.camera.scrollDrift}}function ho(e){return{...lo,pointSizeScale:e.pointcloud.pointSizeScale??1,position:e.pointcloud.position?[e.pointcloud.position.x,e.pointcloud.position.y,e.pointcloud.position.z]:void 0,rotation:e.pointcloud.rotation?[e.pointcloud.rotation.x,e.pointcloud.rotation.y,e.pointcloud.rotation.z]:void 0,scale:e.pointcloud.scale,mobile:e.pointcloud.mobile?{position:e.pointcloud.mobile.position?[e.pointcloud.mobile.position.x,e.pointcloud.mobile.position.y,e.pointcloud.mobile.position.z]:void 0,rotation:e.pointcloud.mobile.rotation?[e.pointcloud.mobile.rotation.x,e.pointcloud.mobile.rotation.y,e.pointcloud.mobile.rotation.z]:void 0}:void 0,opacity:e.pointcloud.opacity,exposure:0,transparent:e.pointcloud.transparent??!0,blendMode:e.pointcloud.blendMode,simplePoints:!e.pointcloud.fluid.enabled,randomize:e.pointcloud.randomize?[e.pointcloud.randomize.x,e.pointcloud.randomize.y,e.pointcloud.randomize.z]:void 0,cameraFade:e.pointcloud.cameraFade}}function go(e){const{bloom:t,chromatic:r,vignette:a,afterimage:o,noise:n,toneMapping:c,toneMappingExposure:s}=e.postprocessing;return{bloom:t,bloomEnabled:t.enabled,chromaticEnabled:r.enabled,chromaticAmount:r.amount,chromaticAngle:r.angle,vignetteEnabled:a.enabled,vignetteAmount:a.amount,vignetteRadius:a.radius,vignetteSoftness:a.softness,afterimageEnabled:o.enabled,afterimageStrength:o.strength,afterimageDamp:o.damp,afterimageScrollFadeLerp:Le.afterimageScrollFadeLerp,afterimageThreshold:o.threshold,noiseEnabled:n.enabled,noiseAmount:n.amount,noiseScale:n.scale,toneMapping:c,toneMappingExposure:s}}function po(e){return e.videoLightVolume??null}function vo(e){return e.foregroundVideoLightVolume??null}function Go({preset:e,camera:t=fo(e),cameraDollyOffset:r=0,cameraDollyTransitionOffset:a=0,postprocessing:o=go(e),pointCloud:n=ho(e),backgroundDarken:c=0,sceneTransform:s=co,videoLightVolume:i=po(e),foregroundVideoLightVolume:m=vo(e),sdfs:v=e.sdfs,sdfHelpers:S=!1,fboDpr:d,renderScale:p=1,transition:C=0,progress:T=0,screenOffset:E=0,behindContent:I=e.behindContent,dryLayerMsaa:O=!0,motion:h,loadingHandle:x,onPointCloudLoad:_,onPointCloudError:K,mousePointerEnabled:re=!0,subSceneContent:W}){const b=mo(e),u=Ce(w=>w.isMobile),M=Ce(w=>w.isLandscapeMobile),R=l.useMemo(()=>({background:Math.max(.05,d?.background??Qe.background),main:Math.max(.05,d?.main??Qe.main),foreground:Math.max(.05,d?.foreground??Qe.foreground)}),[d?.background,d?.foreground,d?.main]),F=Math.min(Math.max(p,.01),1),X=Math.min(R.main,tr),q=l.useRef(null),Z=l.useRef(null),H=vr(),J=l.useRef(null),g=l.useRef(null),[ne,me]=l.useState(0);l.useEffect(()=>{q.current=null,Z.current=null,me(w=>w+1)},[e.id]);const ee=l.useCallback(w=>{q.current=w,me(Fe=>Fe+1),_?.(w)},[_]),A=l.useRef({transition:C,progress:T,scrollVelocity:n.scrollVelocity,screenOffset:E});h||(A.current.transition=C,A.current.progress=T,A.current.scrollVelocity=n.scrollVelocity,A.current.screenOffset=E);const V=h??A,ie=l.useMemo(()=>new ze,[]),se=l.useMemo(()=>{const w=new Je;return w.name="SectionScene content transform",w},[]),L=l.useMemo(()=>new gr(50,1,.1,100),[]),$=l.useMemo(()=>{const w=new Je;return w.name="SectionScene camera rig",w.userData[$t]=!0,w},[]);l.useEffect(()=>(L.removeFromParent(),()=>{L.removeFromParent()}),[L]);const[B,f,j]=s.position,[Q,U,P]=s.rotation;l.useEffect(()=>{se.position.set(B,f,j),se.rotation.set(Q,U,P),se.updateMatrixWorld(!0)},[se,B,f,j,Q,U,P]);const y=de(w=>w.size);l.useEffect(()=>{L.aspect=y.width/y.height,L.updateProjectionMatrix()},[L,y]);const ce=l.useRef(null),Ae=l.useRef(null),we=l.useRef(null),ue=b.bgMode,ge=ue==="hdr"||ue===void 0&&b.background,pe=ge||ue===void 0?"none":ue==="solid"?"solid":"linear",ve=l.useMemo(()=>({mode:pe,color1:b.bgColor1??Ze,color2:b.bgColor2??Ze,color3:Ur({bgColor2:b.bgColor2,bgColor3:b.bgColor3,bgGradientPoints:b.bgGradientPoints},Ze),angle:b.bgAngle??0,smooth:b.bgSpread??50,pointCount:b.bgGradientPoints??2,bias1:b.bgBias1??0,bias2:b.bgBias2??0,toneMapping:o.toneMapping,toneMappingExposure:o.toneMappingExposure,darken:c}),[o.toneMapping,o.toneMappingExposure,pe,b.bgColor1,b.bgColor2,b.bgColor3,b.bgAngle,b.bgSpread,b.bgGradientPoints,b.bgBias1,b.bgBias2,c]),xe=l.useRef(ve);xe.current=ve;const Se=l.useRef(o.introTransition??null);Se.current=o.introTransition??null;const be=l.useRef({darken:I.darken,saturation:I.saturation});be.current.darken=I.darken,be.current.saturation=I.saturation;const De=l.useRef(i?0:1),Te=l.useMemo(()=>fa(ce,xe,Ae,we,{motionRef:V,paramsRef:be},Se,De),[V]),Y=!!(u||M),ye=l.useMemo(()=>Qt(n.position,n.mobile?.position,Y),[Y,n.mobile?.position,n.position]),Me=l.useMemo(()=>Qt(n.rotation,n.mobile?.rotation,Y),[Y,n.mobile?.rotation,n.rotation]);return l.useEffect(()=>()=>Te.dispose(),[Te]),N.jsxs(N.Fragment,{children:[pr(N.jsxs($r,{mouseEnabled:re,children:[N.jsx("primitive",{object:$}),N.jsx(Qr,{cameraObject:L,cameraRigObject:$,position:t.position,target:t.target,fov:t.fov,mobileFov:t.mobileFov,mobileFovMultiplier:t.mobileFovMultiplier,positionOffset:t.positionOffset,mobilePositionOffset:t.mobilePositionOffset,rotationOffset:t.rotationOffset,mobileRotationOffset:t.mobileRotationOffset}),N.jsx(Ua,{cameraObject:L,cameraRigObject:$,position:t.position,target:t.target,animation:t.animation,positionOffset:t.positionOffset,mobilePositionOffset:t.mobilePositionOffset,rotationOffset:t.rotationOffset,mobileRotationOffset:t.mobileRotationOffset,pointerInfluence:t.pointerInfluence,behindPointerInfluence:I.pointerInfluence,scrollDrift:t.scrollDrift,motion:V,cameraDollyOffset:r,cameraDollyTransitionOffset:a}),N.jsxs("primitive",{object:se,children:[N.jsx(Sr,{url:b.url,background:ge,blur:b.blur,darken:b.darken,rotation:b.rotation}),N.jsx(br,{fluid:e.pointcloud.fluid,fluidVelocityRef:Z,driveFluid:n.driveFluid,scrollVelocity:n.scrollVelocity,motion:V}),i&&N.jsx(l.Suspense,{fallback:null,children:N.jsx(Bt,{sourceUrl:i.videoUrl,ktx2Url:i.ktx2Url,depthMapUrl:i.depthMapUrl,settings:i,groupRef:J,behindSpeed:I.speed,quality:H,timeScale:i.timeScale??1,motion:V,fluidVelocityRef:Z,externalLoadFadeRef:De})}),m&&N.jsx(l.Suspense,{fallback:null,children:N.jsx(Bt,{sourceUrl:m.videoUrl,ktx2Url:m.ktx2Url,depthMapUrl:m.depthMapUrl,settings:m,groupRef:g,behindSpeed:I.speed,quality:H,timeScale:m.timeScale??1,motion:V,fluidVelocityRef:Z})}),N.jsx(l.Suspense,{fallback:null,children:N.jsx(Rr,{pointcloud:e.pointcloud,id:e.id,motion:V,fluidVelocityRef:Z,visibility:n.visibility,pointSizeScale:n.pointSizeScale??1,position:ye,rotation:Me,scale:n.scale,opacity:n.opacity,exposure:n.exposure,transparent:n.transparent,blendMode:n.blendMode,simplePoints:n.simplePoints,randomize:n.randomize,cameraFade:n.cameraFade,introColorMix:n.introColorMix,timeScale:n.timeScale,behindSpeed:I.speed,reduceQualityBehind:I.reduceQuality,behindOffset:I.offset,renderDpr:X,renderScale:F,parentObject:se,onLoad:ee,onError:K,loadingHandle:x,children:N.jsx(Ar,{pointCloudRef:q,pointCloudVersion:ne,sdfs:v,showHelpers:S,children:N.jsx(ia,{value:Z,children:W})})})})]}),N.jsx(uo,{bloom:o.bloom,bloomEnabled:o.bloomEnabled,chromaticEnabled:o.chromaticEnabled,chromaticAmount:o.chromaticAmount,chromaticAngle:o.chromaticAngle,vignetteEnabled:o.vignetteEnabled,vignetteAmount:o.vignetteAmount,vignetteRadius:o.vignetteRadius,vignetteSoftness:o.vignetteSoftness,heroBottomGradient:o.heroBottomGradient,afterimageEnabled:o.afterimageEnabled,afterimageStrength:o.afterimageStrength,afterimageDamp:o.afterimageDamp,afterimageScrollFadeLerp:o.afterimageScrollFadeLerp,afterimageThreshold:o.afterimageThreshold,noiseEnabled:o.noiseEnabled,noiseAmount:o.noiseAmount,noiseScale:o.noiseScale,toneMapping:o.toneMapping,toneMappingExposure:o.toneMappingExposure,outputTextureRef:ce,foregroundTextureRef:Ae,dryTextureRef:W?we:void 0,fboDpr:R,renderScale:F,reduceQualityBehind:I.reduceQuality,behindOffset:I.offset,dryLayerMsaa:O,transparentBackground:ve.mode!=="none",motion:V,fluidVelocityRef:Z,pointCloudRef:q,foregroundVideoLightVolumeRef:g,videoLightVolumeRef:J,renderScene:ie,renderCamera:L})]}),ie,{scene:ie,camera:L}),N.jsx("primitive",{object:Te.mesh})]})}export{z as I,Go as S,la as a,ho as b,go as d,No as s};
//# sourceMappingURL=SectionScene-BxWu04-d.js.map
