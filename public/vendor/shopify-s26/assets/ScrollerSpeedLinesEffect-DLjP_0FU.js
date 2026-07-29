import{E as x,B as y}from"./index-DszS3wvk.js";import{V as U,f as t,v as b}from"./TierResolver-y-fGWbnF.js";import{D as o,r as w,c as i}from"./DriveEasterEgg-CPXv0NF9.js";import"./chunk-QUQL4437-BD29ZypC.js";import"./constants-xV0ws6Hx.js";import"./index-7OC5HNn7.js";import"./jsx-runtime-u17CrQMm.js";import"./preload-helper-DO1ztSUD.js";import"./useCanvasPointer-BnFn7xJn.js";import"./pointerNdc-sUXB2i1s.js";import"./PopupChannel-DqE-iZUI.js";import"./postEffectRegistry-CZ7I-0VS.js";import"./(_locale).editions.spring2026-BxKRjLcQ.js";import"./reportError-CJPDlOyT.js";import"./Media-9k068KyC.js";import"./index-CRnHN5xY.js";import"./safeLazy-B5k5LqLU.js";import"./clamp-co6UzHBn.js";import"./useSectionRegistry-DPzXWDP5.js";import"./middleware-DwGWrwkz.js";import"./lenisManager-BGOTe4iO.js";import"./Button-CLLMYZB9.js";import"./useAssetLoadingStore-BQ9V8Ec_.js";import"./constants-CblcJfKC.js";import"./sectionModels-CRO2BpnI.js";import"./presets-EmxEXVgb.js";import"./constants-JKmfcSdx.js";import"./dpr-PcbKlAXR.js";import"./useStickyMountGate-DtwlF7FI.js";import"./SceneDataContext-DuAaqaMN.js";import"./index-CplsFZVb.js";import"./SheetContext-lLmr1oRJ.js";import"./deploy-urls-BqJLL-2u.js";import"./useElementVisibility-DKDtBcxj.js";import"./SectionScene-BxWu04-d.js";import"./Environment-DIFuGnXd.js";import"./EnvironmentObject-COeDMh80.js";import"./FluidField-OmmkFHf7.js";import"./reducedMotion-CdiMTSZU.js";import"./SdfRegistry-sM3Q5YdE.js";import"./sharedZeroTexture-BkFIhg0y.js";import"./AssetSdf-okzHBKiM.js";import"./ktx2-loader-C1zaadCA.js";import"./colorAndNoise-D12tu5Fy.js";import"./Camera-BW__KBvN.js";import"./renderScaleResolve-CNZVtSA5.js";import"./layers-CClLq2fm.js";import"./SectionFluidVelocityContext-DAYST_2V.js";import"./POS-DiMOl3ZJ.js";import"./subscribeWithInitial-D3gqGtvn.js";import"./index-CRfrcCUo.js";import"./Environment-CR6h1qx-.js";import"./extends-CF3RwP-h.js";import"./Gltf-BPFpbdM1.js";import"./OrbitControls-CUsrAYnc.js";import"./useTheatreObject-B5lJAGa0.js";import"./heroRingTheatreControls-CXZse0Qa.js";import"./HeroRingObject-D71dX2vG.js";import"./meta-CwiYJk4F.js";const C=`
  uniform vec2 resolution;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uScrollDirection;
  uniform vec2 uGazeOffset;
  uniform float uStrength;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uBendStrength;
  uniform float uCenterFollow;
  uniform float uLineWidth;
  uniform float uLineColorShift;
  uniform float uRgbShift;
  uniform vec3 uRgbStrength;
  uniform vec3 uTintColor;
  uniform float uTintMix;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float hash11(float value) {
    return fract(sin(value * 127.1) * 43758.5453123);
  }

  float speedLineSeed(vec2 uv, float density) {
    return hash11(floor(uv.x * 128.0 * density));
  }

  float vDrop(vec2 uv, float t, float density, float lineWidth) {
    uv.x = uv.x * 128.0 * density;
    float dx = fract(uv.x);
    uv.x = floor(uv.x);
    uv.y *= 0.05;
    float o = sin(uv.x * 215.4);
    float s = cos(uv.x * 33.1) * 0.3 + 0.7;
    float trail = mix(95.0, 35.0, s);
    float yv = fract(uv.y + t * s + o) * trail;
    yv = 1.0 / yv;
    yv = smoothstep(0.0, 1.0, yv * yv);
    yv = sin(yv * 3.14159) * (s * 5.0);
    float d2 = sin(dx * 3.14159);
    float width = clamp(lineWidth, 0.01, 1.0);
    float line = width >= 0.999 ? d2 : smoothstep(1.0 - width, 1.0, d2);
    return yv * (line * line);
  }

  vec2 bendTunnelPoint(vec2 p, float steer, float strength) {
    // Bend the tunnel walls around the vanishing point. The vanishing point
    // itself is shifted separately by uCenterFollow so the tunnel endpoint
    // can follow the popup/car movement without smearing the whole image.
    float baseRadius = length(p);
    float wallBend = smoothstep(0.04, 0.75, baseRadius);
    float edgeRelease = 1.0 - smoothstep(1.0, 1.45, baseRadius);
    p.x -= steer * p.y * p.y * wallBend * edgeRelease * 0.36 * strength;
    return p;
  }

  vec2 tunnelCenter(float steer, float centerFollow) {
    return 0.5 * resolution.xy + vec2(-steer * centerFollow * resolution.y * 0.35, 0.0);
  }

  vec2 bendSceneUv(vec2 uv, float steer, float strength, float centerFollow) {
    vec2 center = tunnelCenter(steer, centerFollow);
    vec2 p = (uv * resolution.xy - center) / resolution.y;
    p = bendTunnelPoint(p, steer, strength * 0.5);
    return (p * resolution.y + center) / resolution.xy;
  }

  vec3 getTunnelEffect(
    vec2 fragCoord,
    float time,
    float direction,
    vec2 gazeOffset,
    float density,
    float bendStrength,
    float centerFollow,
    float lineWidth,
    float lineColorShift,
    float rgbShift,
    vec3 rgbStrength,
    vec3 tintColor,
    float tintMix
  ) {
    float steer = clamp(gazeOffset.x, -1.0, 1.0);
    vec2 center = tunnelCenter(steer, centerFollow);
    vec2 p = (fragCoord.xy - center) / resolution.y;
    p = bendTunnelPoint(p, steer, bendStrength);

    float d = length(p) + 0.1;
    float angle = atan(p.x, p.y) / 3.14159;
    float depth = 2.0 / d;
    float baseRadius = length((fragCoord.xy - center) / resolution.y);
    float wallBend = smoothstep(0.04, 0.75, baseRadius);
    float edgeRelease = 1.0 - smoothstep(1.0, 1.45, baseRadius);
    float laneCurve = -steer * wallBend * edgeRelease * baseRadius * 0.12 * bendStrength;

    vec2 tunnelUv = vec2(angle + laneCurve, depth);
    float t = time * 0.72 * direction;
    float fringeOffset = mix(0.008, 0.026, smoothstep(0.15, 1.1, d)) * rgbShift;

    vec2 fringeUvA = tunnelUv + vec2(fringeOffset, 0.026 * rgbShift);
    vec2 fringeUvB = tunnelUv - vec2(fringeOffset, 0.022 * rgbShift);
    float core = vDrop(tunnelUv, t, density, lineWidth);
    float fringeA = vDrop(fringeUvA, t * 1.015, density, lineWidth);
    float fringeB = vDrop(fringeUvB, t * 0.985, density, lineWidth);
    float mask = max(core, max(fringeA, fringeB) * 0.82);

    float lineWeight = core + (fringeA + fringeB) * 0.82 + 0.0001;
    float lineSeed = (
      speedLineSeed(tunnelUv, density) * core +
      speedLineSeed(fringeUvA, density) * fringeA * 0.82 +
      speedLineSeed(fringeUvB, density) * fringeB * 0.82
    ) / lineWeight;
    float lineShift = clamp(lineColorShift, 0.0, 2.0);
    float lineShiftMix = clamp(lineColorShift, 0.0, 1.0);
    float lineHueShift = (lineSeed - 0.5) * 0.42 * lineShift;
    float lineDrift = sin(lineSeed * 6.28318 + time * 0.45 * direction) * 0.035 * lineShift;
    float hue = fract((angle + laneCurve) * 0.72 + depth * 0.018 + time * 0.55 * direction + lineHueShift + lineDrift);
    float saturation = mix(0.82, mix(0.68, 0.96, hash11(lineSeed * 53.17 + 4.0)), lineShiftMix);
    float value = mix(1.0, mix(0.78, 1.16, hash11(lineSeed * 37.73 + 9.0)), lineShiftMix);
    vec3 coreColor = hsv2rgb(vec3(hue, saturation, value));
    vec3 warmFringe = hsv2rgb(vec3(hue + 0.055, min(1.0, saturation + 0.08), value));
    vec3 coolFringe = hsv2rgb(vec3(hue - 0.07, min(1.0, saturation + 0.08), value));

    vec3 color = coreColor * core;
    color += warmFringe * fringeA * 0.35;
    color += coolFringe * fringeB * 0.35;
    color *= rgbStrength;
    color += vec3(mask) * 0.08;
    color = color / (color + vec3(1.15));
    color = mix(color, tintColor * mask, tintMix);

    return color * mask * min(d * d, 1.8);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float baseIntensity = smoothstep(0.1, 1.2, uScrollVelocity);
    float tunnelIntensity = baseIntensity * uStrength;
    if (tunnelIntensity <= 0.001) {
      outputColor = inputColor;
      return;
    }

    float steer = clamp(uGazeOffset.x, -1.0, 1.0);
    vec2 sceneUv = bendSceneUv(
      uv,
      steer,
      baseIntensity * uBendStrength,
      baseIntensity * uCenterFollow
    );
    vec4 sceneColor = texture2D(inputBuffer, clamp(sceneUv, vec2(0.0), vec2(1.0)));

    vec2 fragCoord = uv * resolution;
    vec3 tunnelColor = getTunnelEffect(
      fragCoord,
      uTime * uSpeed,
      -uScrollDirection * 2.0,
      uGazeOffset,
      uDensity,
      uBendStrength,
      baseIntensity * uCenterFollow,
      uLineWidth,
      uLineColorShift,
      uRgbShift,
      uRgbStrength,
      uTintColor,
      uTintMix
    );

    vec3 color = sceneColor.rgb + tunnelColor * tunnelIntensity * 0.55;
    outputColor = vec4(clamp(color, 0.0, 1.0), inputColor.a);
  }
`;class De extends x{resolution;timeUniform;velocityUniform;directionUniform;gazeUniform;strengthUniform;speedUniform;densityUniform;bendStrengthUniform;centerFollowUniform;lineWidthUniform;lineColorShiftUniform;rgbShiftUniform;rgbStrengthUniform;tintColorUniform;tintMixUniform;constructor(){const n=new U(1,1),e=new t(0),r=new t(0),l=new t(1),f=new t(new U(0,0)),s=new t(o.strength),a=new t(o.speed),m=new t(o.dpr),u=new t(o.bendStrength),c=new t(o.centerFollow),h=new t(o.lineWidth),v=new t(o.lineColorShift),p=new t(o.rgbShift),d=new t(new b(o.rgb.r,o.rgb.g,o.rgb.b)),g=new t(new b(o.color.r,o.color.g,o.color.b)),S=new t(o.colorMix);super("ScrollerSpeedLinesEffect",C,{blendFunction:y.NORMAL,uniforms:new Map([["resolution",new t(n)],["uTime",e],["uScrollVelocity",r],["uScrollDirection",l],["uGazeOffset",f],["uStrength",s],["uSpeed",a],["uDensity",m],["uBendStrength",u],["uCenterFollow",c],["uLineWidth",h],["uLineColorShift",v],["uRgbShift",p],["uRgbStrength",d],["uTintColor",g],["uTintMix",S]])}),this.resolution=n,this.timeUniform=e,this.velocityUniform=r,this.directionUniform=l,this.gazeUniform=f,this.strengthUniform=s,this.speedUniform=a,this.densityUniform=m,this.bendStrengthUniform=u,this.centerFollowUniform=c,this.lineWidthUniform=h,this.lineColorShiftUniform=v,this.rgbShiftUniform=p,this.rgbStrengthUniform=d,this.tintColorUniform=g,this.tintMixUniform=S}setSize(n,e){this.resolution.set(n,e)}setSettings(n){const e=w(n);this.strengthUniform.value=e.enabled?Math.max(0,e.strength):0,this.speedUniform.value=Math.max(0,e.speed),this.densityUniform.value=i(e.dpr,.1,4),this.bendStrengthUniform.value=Math.max(0,e.bendStrength),this.centerFollowUniform.value=i(e.centerFollow,-2,2),this.lineWidthUniform.value=i(e.lineWidth,.01,1),this.lineColorShiftUniform.value=i(e.lineColorShift,0,2),this.rgbShiftUniform.value=i(e.rgbShift,0,4),this.rgbStrengthUniform.value.set(Math.max(0,e.rgb.r),Math.max(0,e.rgb.g),Math.max(0,e.rgb.b)),this.tintColorUniform.value.set(i(e.color.r,0,1),i(e.color.g,0,1),i(e.color.b,0,1)),this.tintMixUniform.value=i(e.colorMix,0,1)}setDriveState({time:n,velocity:e,direction:r,gazeX:l}){this.timeUniform.value=n,this.velocityUniform.value=e,this.directionUniform.value=r,this.gazeUniform.value.set(l,0)}}export{De as ScrollerSpeedLinesEffect};
//# sourceMappingURL=ScrollerSpeedLinesEffect-DLjP_0FU.js.map
