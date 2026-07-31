import{j as A}from"./jsx-runtime-u17CrQMm.js";import{r as f}from"./chunk-QUQL4437-BD29ZypC.js";import{W as vt,L as We,a6 as He,a as pt,bs as dt,e as M,V as R,O as Ge,M as xe,bk as qe,d as Se,u as Ye,i as re,v as he,Q as Ve,P as Ze,y as ht,w as gt,bQ as wt,t as P,bJ as xt,T as St}from"./TierResolver-y-fGWbnF.js";import{R as Ct,P as yt,a as Dt,b as Tt}from"./index-DszS3wvk.js";import{D as Ut,e as Pt,H as Et,R as Rt,f as je,a as Bt,S as bt}from"./useElementVisibility-DKDtBcxj.js";import{S as At}from"./SceneDataContext-DuAaqaMN.js";import{H as Fe}from"./sectionModels-CRO2BpnI.js";import{S as It}from"./GltfAsset-d5eUf3Eg.js";import{d as Mt,a as Wt,b as Vt}from"./renderScaleResolve-CNZVtSA5.js";import{i as Ft}from"./EnvironmentObject-COeDMh80.js";import{g as $e,c as _e,k as ke,d as Le,e as _t,M as I,f as oe,h as Oe,m as kt,i as Lt,u as Ot}from"./useSectionRegistry-DPzXWDP5.js";import{a as zt}from"./useAssetLoadingStore-BQ9V8Ec_.js";import{u as Nt,g as ge}from"./postEffectRegistry-CZ7I-0VS.js";import{u as ze,e as Ht}from"./constants-xV0ws6Hx.js";class Gt{#t=null;#i=null;#e=1;#r=1;current(){return this.#t??=this.#o(),this.#t}incoming(){return this.#i??=this.#o(),this.#i}setSize(e,r){this.#e=e,this.#r=r,this.#t&&this.#n(this.#t,e,r),this.#i&&this.#n(this.#i,e,r)}#n(e,r,i){e.setSize(r,i);const n=e.depthTexture;n&&(n.image.width!==r||n.image.height!==i)&&(n.image.width=r,n.image.height=i,n.needsUpdate=!0)}dispose(){this.#t?.dispose(),this.#i?.dispose(),this.#t=null,this.#i=null}#o(){const e=new vt(this.#e,this.#r,{type:He,depthBuffer:!0,stencilBuffer:!1,minFilter:We,magFilter:We});return e.depthTexture=new pt(this.#e,this.#r),e.depthTexture.type=dt,e}}const Ke=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,N={vertexShader:Ke,depthTest:!1,depthWrite:!1},ie=`
  bool currentCloser = false;
  if (uFullyEntered > 0.5) {
    float depthCurrent = texture2D(tCurrentDepth, vUv).r;
    float depthIncoming = texture2D(tIncomingDepth, vUv).r;
    currentCloser = depthCurrent < depthIncoming;
  }
`;function qt(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},tCurrentDepth:{value:null},tIncomingDepth:{value:null},uProgress:{value:0},uDirection:{value:new R(0,-1)},uFullyEntered:{value:0},uViewportBottomVUv:{value:0},uScrollBendVUv:{value:0}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform vec2 uDirection;
      uniform float uFullyEntered;
      uniform float uViewportBottomVUv;
      uniform float uScrollBendVUv;
      varying vec2 vUv;

      // Match knockoutShader's scrollBendY exactly: same arch shape, same
      // detuned-π pair, so the cut edge tracks the knockout cover edges.
      float scrollBendY(float x) {
        float t = clamp(x, 0.0, 1.0);
        float arch = sin(t * 3.14159265);
        return (arch + sin(t * 3.1431853) * 2.0) * uScrollBendVUv;
      }

      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${ie}
        // Guard normalize(vec2(0,0)) — undefined in GLSL.
        vec2 dir = length(uDirection) > 0.0001
          ? normalize(uDirection)
          : vec2(0.0, -1.0);
        float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
        // Remap vUv.y into the visible viewport span so the cut tracks
        // window.innerHeight, not the taller canvas (window.outerHeight).
        vec2 visibleVUv = vec2(
          vUv.x,
          (vUv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
        );
        vec2 bentVisibleVUv = vec2(
          visibleVUv.x,
          visibleVUv.y - scrollBendY(visibleVUv.x)
        );
        float norm = dot(bentVisibleVUv - 0.5, dir) / scale;
        // Cut traverses the viewport linearly with progress so it tracks the
        // knockout cover bottom edge (which moves linearly with scroll). A
        // bend-amplitude factor on edgeTravel would speed the cut up vs the
        // cover at non-midpoint progress and they only align where the
        // formula collapses (progress=0.5). Any bleed near viewport corners
        // at peak velocity is hidden by the knockout cover drawn on top.
        float edge = 1.0 - 2.0 * uProgress;
        // Narrow smoothstep band (~1 fragment at innerHeight = 800) so
        // diagonal directions or arched cuts don't stair-step inside any
        // cover-free region. Fixed band keeps this portable without the
        // derivative extension.
        float mask = smoothstep(edge - 0.003, edge + 0.003, norm);
        vec4 mixed = mix(current, incoming, mask);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `})}function Yt(){return new M({...N,uniforms:{tInput:{value:null}},fragmentShader:`
      uniform sampler2D tInput;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(tInput, vUv);
      }
    `})}function Zt(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},tCurrentDepth:{value:null},tIncomingDepth:{value:null},uProgress:{value:0},uFullyEntered:{value:0}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform float uFullyEntered;
      varying vec2 vUv;
      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${ie}
        vec4 mixed = mix(current, incoming, uProgress);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `})}function jt(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},tCurrentDepth:{value:null},tIncomingDepth:{value:null},uProgress:{value:0},uFullyEntered:{value:0},uReducedMotion:{value:0},uTime:{value:0},uScrollProgress:{value:0},uScrollBendVUv:{value:0},uAspect:{value:1},uCenter:{value:new R(.5,.5)},uNoiseStrength:{value:.2},uMudStrength:{value:.35},uEdgeStrength:{value:1},uGlowStrength:{value:1},uZoomStrength:{value:.1},uTextureScale:{value:1},uDistance:{value:1},uMode:{value:0},uAngle:{value:0},uSpread:{value:1.2},uBend:{value:0},uWipeSharpness:{value:2},uWipeWaveAmp:{value:.4},uWipeWaveFreq:{value:0},uWipeWaveSpeed:{value:2},uWipeWaveScroll:{value:1},uWipeScrollBend:{value:0},uWipeDistort:{value:new R(.5,1)},uWipeTranslate:{value:new R(-.2,.5)},uWipeSwayAmp:{value:.2},uWipeSwayFreq:{value:-.5},uWipeSwaySpeed:{value:1},uWipeSwayWhole:{value:.5}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform float uFullyEntered;
      uniform float uReducedMotion;
      uniform float uTime;
      uniform float uScrollProgress;
      uniform float uScrollBendVUv;
      uniform float uAspect;
      uniform vec2 uCenter;
      uniform float uNoiseStrength;
      uniform float uMudStrength;
      uniform float uEdgeStrength;
      uniform float uGlowStrength;
      uniform float uZoomStrength;
      uniform float uTextureScale;
      uniform float uDistance;
      uniform float uMode;
      uniform float uAngle;
      uniform float uSpread;
      uniform float uBend;
      uniform float uWipeSharpness;
      uniform float uWipeWaveAmp;
      uniform float uWipeWaveFreq;
      uniform float uWipeWaveSpeed;
      uniform float uWipeWaveScroll;
      uniform float uWipeScrollBend;
      uniform vec2 uWipeDistort;
      uniform vec2 uWipeTranslate;
      uniform float uWipeSwayAmp;
      uniform float uWipeSwayFreq;
      uniform float uWipeSwaySpeed;
      uniform float uWipeSwayWhole;
      varying vec2 vUv;

      const float PI = 3.14159265;
      const float TWO_PI = 6.28318530;

      float tri(float t) {
        return 1.0 - abs(2.0 * t - 1.0);
      }

      float sineInOut(float t) {
        return -0.5 * (cos(PI * t) - 1.0);
      }

      vec2 rotate2d(vec2 v, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
      }

      float scrollBendYUv(float x) {
        float t = clamp(x, 0.0, 1.0);
        return sin(t * PI) * 3.0 * uScrollBendVUv * uWipeScrollBend;
      }

      void main() {
        float progress = clamp(uProgress, 0.0, 1.0);
        ${ie}

        if (progress <= 0.0) {
          gl_FragColor = texture2D(tCurrent, vUv);
          return;
        }
        if (progress >= 1.0 && uDistance >= 0.999) {
          gl_FragColor = currentCloser
            ? texture2D(tCurrent, vUv)
            : texture2D(tIncoming, vUv);
          return;
        }

        float time2pi = uTime * TWO_PI;
        vec2 center = clamp(uCenter, vec2(0.0), vec2(1.0));
        vec2 dv = (vUv - center) * vec2(uAspect, 1.0);
        float radial = length(dv);
        vec2 farCorner = max(center, 1.0 - center) * vec2(uAspect, 1.0);
        float maxDist = length(farCorner);
        float feather = max(0.02, 0.08 * uSpread);
        float radialDistance = max(uDistance, 0.0);
        float radialEdge = progress * (maxDist * radialDistance + feather * 2.0) - feather;
        float radialTransition = 1.0 - smoothstep(
          radialEdge - feather,
          radialEdge + feather,
          radial
        );

        vec2 direction = vec2(cos(uAngle), sin(uAngle));
        vec2 tangent = vec2(-direction.y, direction.x);
        vec2 radialDirection = radial > 0.0001
          ? normalize(vec2(dv.x / max(uAspect, 0.001), dv.y))
          : direction;

        float pixelTransition = radialTransition;
        vec2 uv1 = vUv;
        vec2 uv2 = vUv;

        if (uMode > 0.5) {
          // y11i study-005 preset 1 values are exposed in Theatre under
          // Wipe settings: https://y11i-3d.github.io/study-005/
          // Sharpness/frequencies use y11i's 2 ** value scale.
          float wipeSharpness = pow(2.0, uWipeSharpness);
          vec2 wipeDirection = normalize(vec2(sin(uAngle), cos(uAngle)));
          vec2 wipeUv = rotate2d(vUv * vec2(uAspect, 1.0), uAngle);
          float wipeWave = sin(
            wipeUv.x / max(uAspect, 0.001) * TWO_PI * pow(2.0, uWipeWaveFreq) +
            time2pi * uWipeWaveSpeed +
            uScrollProgress * TWO_PI * uWipeWaveScroll
          ) * uWipeWaveAmp * tri(progress);
          float wipeExtent = abs(wipeDirection.x) * 0.5 + abs(wipeDirection.y) * 0.5;
          // Subtract in UV space to match knockout's top-left pixel bend convention.
          vec2 bentWipeUv = vec2(vUv.x, vUv.y - scrollBendYUv(vUv.x));
          float wipePosition = dot(bentWipeUv - 0.5, wipeDirection) / max(wipeExtent * 2.0, 0.001) + 0.5;
          float wipeFeather = 0.5 / max(wipeSharpness, 0.001);
          float wipeEdge = mix(-wipeFeather, 1.0 + wipeFeather, progress) + wipeWave;
          pixelTransition = 1.0 - smoothstep(
            wipeEdge - wipeFeather,
            wipeEdge + wipeFeather,
            wipePosition
          );

          vec2 translate = uWipeTranslate;
          vec2 distort = uWipeDistort;
          vec2 translate1 = translate * progress;
          vec2 translate2 = translate * (progress - 1.0);
          vec2 distort1 = translate * pixelTransition * distort;
          vec2 distort2 = translate * (pixelTransition - 1.0) * distort;
          float sway = sin(
            time2pi * uWipeSwaySpeed +
            vUv.x * TWO_PI * pow(2.0, uWipeSwayFreq)
          ) * uWipeSwayAmp;
          float swayBlend = mix(
            tri(pixelTransition),
            tri(progress),
            uWipeSwayWhole
          );
          sway *= sineInOut(swayBlend);
          vec2 bend = radialDirection * uBend * tri(pixelTransition) * sineInOut(tri(progress)) * 0.18;
          vec2 displacement1 = translate1 + distort1 + vec2(0.0, sway) + bend;
          vec2 displacement2 = translate2 + distort2 + vec2(0.0, sway) + bend;
          float topFade = 1.0 - smoothstep(0.72, 0.98, vUv.y);
          displacement1 *= mix(1.0, topFade, step(0.0, displacement1.y));
          displacement2 *= mix(1.0, topFade, step(0.0, displacement2.y));
          uv1 = vUv + displacement1;
          uv2 = vUv + displacement2;
        } else {
          float seamMask = tri(pixelTransition);
          vec2 translate = direction * clamp(uZoomStrength * 4.0, 0.0, 2.0) * 0.25;
          vec2 distort = vec2(1.0, 2.5) * max(uMudStrength, 0.0);

          vec2 translate1 = translate * progress * seamMask;
          vec2 translate2 = translate * (progress - 1.0) * seamMask;
          vec2 distort1 = translate * (pixelTransition * distort) * seamMask;
          vec2 distort2 = translate * ((pixelTransition - 1.0) * distort) * seamMask;

          float angleNoise = dot(vUv - center, tangent) * TWO_PI * max(uTextureScale, 0.001);
          float swayBase = sin(time2pi + angleNoise) * uNoiseStrength;
          float swayBlend = mix(tri(pixelTransition), tri(progress), 0.5);
          vec2 sway = tangent * swayBase * sineInOut(swayBlend) * seamMask;
          vec2 bend = radialDirection * uBend * seamMask * sineInOut(tri(progress)) * 0.18;
          uv1 = vUv + translate1 + distort1 + sway + bend;
          uv2 = vUv + translate2 + distort2 + sway + bend;
        }
        // Reduced motion: skip the scene-texture displacement (translate /
        // distort / sway / bend) so neither scene slides up or sideways as the
        // swipe passes — only the wipe boundary reveals. (Zoom enters via
        // translate/uZoomStrength, so resetting the UVs neutralizes it too.)
        if (uReducedMotion > 0.5) {
          uv1 = vUv;
          uv2 = vUv;
        }
        vec4 current = texture2D(tCurrent, uv1);
        vec4 incoming = texture2D(tIncoming, uv2);
        vec4 mixed = mix(current, incoming, pixelTransition);

        float edge = tri(pixelTransition);
        mixed = mix(mixed, vec4(vec3(1.0), 1.0), edge * uEdgeStrength * 0.18);
        mixed = mix(mixed, mixed * mix(1.0, 2.5, edge), edge * uGlowStrength * 0.35);

        gl_FragColor = currentCloser ? texture2D(tCurrent, vUv) : mixed;
      }
    `})}function $t(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},uProgress:{value:0},uOrigin:{value:new R(.5,.5)},uSoftness:{value:.25},uEdgeGlow:{value:.4},uZoom:{value:.08},uAspect:{value:1}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform float uProgress;
      uniform vec2 uOrigin;
      uniform float uSoftness;
      uniform float uEdgeGlow;
      uniform float uZoom;
      uniform float uAspect;
      varying vec2 vUv;

      // Aspect-correct distance so the iris is circular on non-square canvases.
      float aspectDist(vec2 uv) {
        return length((uv - uOrigin) * vec2(uAspect, 1.0));
      }

      void main() {
        // Normalise distance so the farthest corner from the origin maps to 1,
        // guaranteeing the iris fully clears the screen at progress 1.
        float maxDist = max(
          max(aspectDist(vec2(0.0, 0.0)), aspectDist(vec2(1.0, 0.0))),
          max(aspectDist(vec2(0.0, 1.0)), aspectDist(vec2(1.0, 1.0)))
        );
        float nd = aspectDist(vUv) / max(maxDist, 0.0001);

        float softness = max(uSoftness, 0.0001);
        // Travel the front past 1 by softness on each end so the feather
        // band fully clears at progress 0 and 1 (no residual ring).
        float radius = uProgress * (1.0 + 2.0 * softness) - softness;
        float mask = 1.0 - smoothstep(radius - softness, radius + softness, nd);

        // Incoming zooms from (1 - uZoom) toward 1 as it reveals, scaling about
        // the origin so the reveal feels like it pushes forward.
        float scale = mix(1.0 - uZoom, 1.0, uProgress);
        vec2 zoomUv = uOrigin + (vUv - uOrigin) / max(scale, 0.0001);
        vec4 incoming = texture2D(tIncoming, zoomUv);
        vec4 current = texture2D(tCurrent, vUv);
        vec4 mixed = mix(current, incoming, mask);

        // Luminous leading edge on the reveal front; naturally vanishes at the
        // extremes where the front sits off-screen.
        float edge = 1.0 - smoothstep(0.0, softness, abs(nd - radius));
        mixed.rgb += edge * uEdgeGlow * mask;

        gl_FragColor = mixed;
      }
    `})}function Kt(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},tCurrentDepth:{value:null},tIncomingDepth:{value:null},uProgress:{value:0},uDirection:{value:new R(1,0)},uFeather:{value:0},uFullyEntered:{value:0},uViewportBottomVUv:{value:0},uNoiseAmount:{value:0}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform sampler2D tCurrentDepth;
      uniform sampler2D tIncomingDepth;
      uniform float uProgress;
      uniform vec2 uDirection;
      uniform float uFeather;
      uniform float uFullyEntered;
      uniform float uViewportBottomVUv;
      uniform float uNoiseAmount;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += noise(p) * amplitude;
          p = p * 2.03 + 17.13;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec4 current = texture2D(tCurrent, vUv);
        vec4 incoming = texture2D(tIncoming, vUv);
        ${ie}
        // Guard normalize(vec2(0,0)) — undefined in GLSL.
        vec2 dir = length(uDirection) > 0.0001
          ? normalize(uDirection)
          : vec2(1.0, 0.0);
        float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
        // Remap vUv.y into the visible viewport span so the wipe edge tracks
        // window.innerHeight, not the taller canvas (window.outerHeight).
        vec2 visibleVUv = vec2(
          vUv.x,
          (vUv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
        );
        float norm = dot(visibleVUv - 0.5, dir) / scale;
        // Extend edge travel by feather on each side so the feather band
        // clears [-1, 1] at both extremes — otherwise a non-zero feather
        // leaves a seam of the opposite scene at progress 0 and 1.
        float feather = max(uFeather, 0.0001);
        // Skip the 16-hash fbm walk when the dissolve is disabled.
        float transitionNoise = uNoiseAmount > 0.0
          ? (fbm(visibleVUv * vec2(3.5, 5.5) + uProgress * 1.7) - 0.5) * uNoiseAmount
          : 0.0;
        // Include uNoiseAmount in edgeTravel so transitionNoise can't pull the
        // wipe back on-screen at progress 0/1 (where the noise is signed and
        // the mask would otherwise reveal a sliver of the wrong scene).
        float edgeTravel = 1.0 + feather + uNoiseAmount;
        float edge = edgeTravel * (1.0 - 2.0 * uProgress) + transitionNoise;
        float mask = smoothstep(edge - feather, edge + feather, norm);
        vec4 mixed = mix(current, incoming, mask);
        gl_FragColor = currentCloser ? current : mixed;
      }
    `})}function Qt(){return new M({...N,uniforms:{tCurrent:{value:null},tIncoming:{value:null},uProgress:{value:0},uStrength:{value:1}},fragmentShader:`
      uniform sampler2D tCurrent;
      uniform sampler2D tIncoming;
      uniform float uProgress;
      uniform float uStrength;
      varying vec2 vUv;

      vec4 softSample(sampler2D tex, vec2 uv) {
        vec4 c = texture2D(tex, clamp(uv, 0.0, 1.0));
        vec2 outside = max(vec2(0.0), max(vec2(0.0) - uv, uv - vec2(1.0)));
        float d = length(outside);
        float mask = 1.0 - smoothstep(0.0, 0.03, d);
        c.rgb *= mask;
        c.a *= mask;
        return c;
      }

      float random(vec3 scale, float seed) {
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
      }

      vec4 zoomSample(sampler2D tex, vec2 uv, vec2 center, float scale, float blur) {
        vec2 scaledUv = (uv - center) / scale + center;
        if (blur < 0.001) {
          return softSample(tex, scaledUv);
        }
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 toCenter = center - scaledUv;
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        const float SAMPLES = 15.0;
        for (float t = 0.0; t < SAMPLES; t++) {
          float percent = (t + offset) / SAMPLES;
          float weight = 4.0 * (percent - percent * percent);
          vec2 sampleUv = scaledUv + toCenter * percent * blur;
          color += softSample(tex, sampleUv) * weight;
          total += weight;
        }
        return color / total;
      }

      void main() {
        float p = uProgress;
        vec2 center = vec2(0.5, 0.5);

        float currentScale = mix(1.0, 1.0 + 2.0 * uStrength, p);
        float currentBlur = mix(0.0, 0.6 * uStrength, p);
        float nextBlur = mix(0.3 * uStrength, 0.0, p);

        vec4 currentCol = zoomSample(tCurrent, vUv, center, currentScale, currentBlur);
        vec4 nextCol = zoomSample(tIncoming, vUv, center, 1.0, nextBlur);

        float fade = smoothstep(0.55, 1.0, p);
        gl_FragColor = mix(currentCol, nextCol, fade);
      }
    `})}class Xt extends Ct{mainScenes=[];transitioningSection=null;transitioningCamera=null;#t;#i="";#e=0;#r=0;#n=0;#o=0;#s;#a=new Ge(-1,1,1,-1,0,1);#m=Yt();#u=Zt();#l=jt();#c=Kt();#f=qt();#v=Qt();#p=$t();#d=new xe(new qe(2,2),this.#m);#h=null;#g=null;constructor(e,r){const i=new Se;super(i,e),this.#s=i,this.#t=r,this.#s.add(this.#d)}setSize(e,r){super.setSize(e,r),this.#t.setSize(e,r)}knockoutLayerTargets(){return{current:this.#h,incoming:this.#g}}render(e,r){const{mainScenes:i,transitioningSection:n}=this;n?.mode!=="hero"&&this.#S();const p=e.autoClear;e.autoClear=!1;const l=this.#t.current();this.#h=l,this.#g=null,e.setRenderTarget(l),e.setClearColor(8421504,1),e.clear();for(const d of i)e.render(d,this.camera);let t;if(n){const d=this.#t.incoming();if(this.#g=d,e.setRenderTarget(d),e.setClearColor(8421504,1),e.clear(),e.render(n.scene,this.transitioningCamera??this.camera),n.mode==="zoomBlur")t=this.#v,t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.uProgress.value=n.progress,t.uniforms.uStrength.value=n.zoomBlurStrength;else if(n.mode==="crossfade")t=this.#u,t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.tCurrentDepth.value=l.depthTexture,t.uniforms.tIncomingDepth.value=d.depthTexture,t.uniforms.uProgress.value=n.progress,t.uniforms.uFullyEntered.value=!n.disableDepthMerge&&n.progress>=1?1:0;else if(n.mode==="hero"){const a=n.hero;t=this.#l,t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.tCurrentDepth.value=l.depthTexture,t.uniforms.tIncomingDepth.value=d.depthTexture,t.uniforms.uProgress.value=n.progress,t.uniforms.uFullyEntered.value=!n.disableDepthMerge&&n.progress>=1?1:0,t.uniforms.uTime.value=performance.now()/1e3%1e3;const D=ze.getState().preferReducedMotion;t.uniforms.uReducedMotion.value=D?1:0,t.uniforms.uScrollProgress.value=D?0:this.#C(n.scrollProgress,a.wipe.waveScrollLerp),t.uniforms.uScrollBendVUv.value=D?0:this.#y(this.#x(),a.wipe.scrollBendLerp),t.uniforms.uAspect.value=e.domElement.clientWidth/Math.max(e.domElement.clientHeight,1),t.uniforms.uCenter.value.set(a.center.x,a.center.y),t.uniforms.uNoiseStrength.value=a.noiseStrength,t.uniforms.uMudStrength.value=a.textureStrength,t.uniforms.uEdgeStrength.value=a.outlineStrength,t.uniforms.uGlowStrength.value=a.glowStrength,t.uniforms.uZoomStrength.value=a.zoomStrength,t.uniforms.uTextureScale.value=a.textureScale,t.uniforms.uDistance.value=a.distance,t.uniforms.uMode.value=a.mode==="wipe"?1:0,t.uniforms.uAngle.value=a.angleDeg*Math.PI/180,t.uniforms.uSpread.value=a.spread,t.uniforms.uBend.value=a.bend,t.uniforms.uWipeSharpness.value=a.wipe.sharpness,t.uniforms.uWipeWaveAmp.value=a.wipe.waveAmp,t.uniforms.uWipeWaveFreq.value=a.wipe.waveFreq,t.uniforms.uWipeWaveSpeed.value=a.wipe.waveSpeed,t.uniforms.uWipeWaveScroll.value=a.wipe.waveScroll,t.uniforms.uWipeScrollBend.value=a.wipe.scrollBend,t.uniforms.uWipeDistort.value.set(a.wipe.distort.x,a.wipe.distort.y),t.uniforms.uWipeTranslate.value.set(a.wipe.translate.x,a.wipe.translate.y),t.uniforms.uWipeSwayAmp.value=a.wipe.swayAmp,t.uniforms.uWipeSwayFreq.value=a.wipe.swayFreq,t.uniforms.uWipeSwaySpeed.value=a.wipe.swaySpeed,t.uniforms.uWipeSwayWhole.value=a.wipe.swayWhole}else if(n.mode==="reveal"){const a=n.reveal;t=this.#p,t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.uProgress.value=n.progress,t.uniforms.uOrigin.value.set(a.origin.x,a.origin.y),t.uniforms.uSoftness.value=a.softness,t.uniforms.uEdgeGlow.value=a.edgeGlow,t.uniforms.uZoom.value=a.zoom,t.uniforms.uAspect.value=e.domElement.clientWidth/Math.max(e.domElement.clientHeight,1)}else n.mode==="bend"?(t=this.#f,t.uniforms.uDirection.value.set(n.bendDirection.x,n.bendDirection.y),t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.tCurrentDepth.value=l.depthTexture,t.uniforms.tIncomingDepth.value=d.depthTexture,t.uniforms.uProgress.value=n.progress,t.uniforms.uFullyEntered.value=!n.disableDepthMerge&&n.progress>=1?1:0,t.uniforms.uViewportBottomVUv.value=this.#w(e,l.height),t.uniforms.uScrollBendVUv.value=ze.getState().preferReducedMotion?0:this.#x()):(t=this.#c,t.uniforms.uDirection.value.set(n.swipeDirection.x,n.swipeDirection.y),t.uniforms.uFeather.value=n.swipeFeather,t.uniforms.uNoiseAmount.value=n.swipeNoiseAmount,t.uniforms.tCurrent.value=l.texture,t.uniforms.tIncoming.value=d.texture,t.uniforms.tCurrentDepth.value=l.depthTexture,t.uniforms.tIncomingDepth.value=d.depthTexture,t.uniforms.uProgress.value=n.progress,t.uniforms.uFullyEntered.value=!n.disableDepthMerge&&n.progress>=1?1:0,t.uniforms.uViewportBottomVUv.value=this.#w(e,l.height))}else t=this.#m,t.uniforms.tInput.value=l.texture;this.#d.material=t,e.setRenderTarget(this.renderToScreen?null:r),e.render(this.#s,this.#a),e.autoClear=p}#w(e,r){return Math.max(0,1-window.innerHeight*e.getPixelRatio()/r)}#S(){this.#e=0,this.#r=0,this.#n=0,this.#o=0}#C(e,r){const i=performance.now();if(this.#o===0)return this.#o=i,this.#n=e,this.#n;const n=Math.min((i-this.#o)/1e3,1/30);this.#o=i;const p=1-Math.exp(-n*Math.max(r,.001));return this.#n+=(e-this.#n)*p,this.#n}#y(e,r){const i=performance.now();if(this.#r===0)return this.#r=i,this.#e=0,this.#e;const n=Math.min((i-this.#r)/1e3,1/30);this.#r=i;const p=1-Math.exp(-n*Math.max(r,.001));return this.#e+=(e-this.#e)*p,this.#e}#x(){const e=window.innerHeight;return e>0?$e()/e:0}dispose(){this.#m.uniforms.tInput.value=null,this.#u.uniforms.tCurrent.value=null,this.#u.uniforms.tIncoming.value=null,this.#u.uniforms.tCurrentDepth.value=null,this.#u.uniforms.tIncomingDepth.value=null,this.#l.uniforms.tCurrent.value=null,this.#l.uniforms.tIncoming.value=null,this.#l.uniforms.tCurrentDepth.value=null,this.#l.uniforms.tIncomingDepth.value=null,this.#c.uniforms.tCurrent.value=null,this.#c.uniforms.tIncoming.value=null,this.#c.uniforms.tCurrentDepth.value=null,this.#c.uniforms.tIncomingDepth.value=null,this.#f.uniforms.tCurrent.value=null,this.#f.uniforms.tIncoming.value=null,this.#f.uniforms.tCurrentDepth.value=null,this.#f.uniforms.tIncomingDepth.value=null,this.#v.uniforms.tCurrent.value=null,this.#v.uniforms.tIncoming.value=null,this.#p.uniforms.tCurrent.value=null,this.#p.uniforms.tIncoming.value=null,this.#m.dispose(),this.#u.dispose(),this.#l.dispose(),this.#c.dispose(),this.#f.dispose(),this.#v.dispose(),this.#p.dispose(),this.#d.geometry.dispose(),super.dispose()}}const Jt={b100:"#090909"},U=1,er=4,tr=`
  precision highp float;

  uniform sampler2D tInput;
  uniform vec2 uViewport;
  uniform float uUseBaseLayer;
  uniform float uUseCutouts;
  uniform int uCoverCount;
  uniform vec4 uCovers[${I}];
  uniform float uCoverPinBottom[${I}];
  uniform float uCoverPinTop[${I}];
  uniform int uCutoutCount;
  uniform vec4 uCutouts[${oe}];
  uniform float uUseTransition;
  uniform float uInvertTransition;
  uniform float uTransitionProgress;
  uniform vec2 uTransitionDirection;
  uniform float uViewportBottomVUv;
  uniform float uScrollBendPx;
  uniform float uScrollBendVUv;
  varying vec2 vUv;

  float roundedRectSdf(vec2 p, vec4 rect, float radius) {
    vec2 halfSize = rect.zw * 0.5;
    vec2 center = rect.xy + halfSize;
    float r = min(radius, min(halfSize.x, halfSize.y));
    vec2 q = abs(p - center) - halfSize + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  // Negative inside / positive outside SDF → feathered [0,1] coverage with a
  // ~2px anti-aliased band (matches the legacy overlay's smoothstep edge).
  float sdfMask(float sd) {
    return 1.0 - smoothstep(-1.0, 1.0, sd);
  }

  float scrollBendArch(float t) {
    float arch = sin(t * 3.14159265);
    return arch + sin(t * 3.1431853) * 2.0;
  }

  float scrollBendUv(float x) {
    return scrollBendArch(clamp(x, 0.0, 1.0)) * uScrollBendVUv;
  }

  float scrollBendPx(float px) {
    float t = clamp(px / max(uViewport.x, 1.0), 0.0, 1.0);
    return scrollBendArch(t) * uScrollBendPx;
  }

  float pinBottomRectSdf(vec2 p, vec4 rect) {
    float topD = (rect.y - scrollBendPx(p.x)) - p.y;
    float bottomD = p.y - (rect.y + rect.w);
    float leftD = rect.x - p.x;
    float rightD = p.x - (rect.x + rect.z);
    return max(max(topD, bottomD), max(leftD, rightD));
  }

  float pinTopRectMask(vec2 p, vec4 rect) {
    // Retail POS hides the leading bend; keep that top edge un-feathered so
    // the unused AA fringe cannot show as a full-width hairline.
    float bottomD = (p.y + scrollBendPx(p.x)) - (rect.y + rect.w);
    float leftD = rect.x - p.x;
    float rightD = p.x - (rect.x + rect.z);
    return step(rect.y, p.y) * sdfMask(max(bottomD, max(leftD, rightD)));
  }

  float coverMask(vec2 p, vec4 rect, float pinBottom, float pinTop) {
    vec2 bentP = vec2(p.x, p.y + scrollBendPx(p.x));
    return pinBottom > 0.5
      ? sdfMask(pinBottomRectSdf(p, rect))
      : pinTop > 0.5
        ? pinTopRectMask(p, rect)
        : sdfMask(roundedRectSdf(bentP, rect, 0.0));
  }

  // Feathered [0,1] coverage for the incoming side of a bend (1 on the
  // revealed side, 0 on the other). fwidth gives a resolution-correct ~1px
  // edge so the bend seam is anti-aliased too.
  float incomingTransitionCoverage(vec2 uv) {
    vec2 dir = length(uTransitionDirection) > 0.0001
      ? normalize(uTransitionDirection)
      : vec2(0.0, -1.0);
    float scale = max(0.5 * (abs(dir.x) + abs(dir.y)), 0.0001);
    vec2 visibleVUv = vec2(
      uv.x,
      (uv.y - uViewportBottomVUv) / max(1.0 - uViewportBottomVUv, 0.0001)
    );
    vec2 bentVisibleVUv = vec2(
      visibleVUv.x,
      visibleVUv.y - scrollBendUv(visibleVUv.x)
    );
    float norm = dot(bentVisibleVUv - 0.5, dir) / scale;
    float edge = 1.0 - 2.0 * uTransitionProgress;
    float feather = max(fwidth(norm), 1e-4);
    return smoothstep(edge - feather, edge + feather, norm);
  }

  void main() {
    vec2 p = vec2(vUv.x * uViewport.x, (1.0 - vUv.y) * uViewport.y);

    float coverage = 0.0;
    if (uUseBaseLayer > 0.5) {
      float covered = 0.0;
      for (int i = 0; i < ${I}; i++) {
        if (i >= uCoverCount) break;
        covered = max(
          covered,
          coverMask(p, uCovers[i], uCoverPinBottom[i], uCoverPinTop[i])
        );
      }
      coverage = 1.0 - covered;
    }

    if (uUseCutouts > 0.5) {
      float cut = 0.0;
      for (int i = 0; i < ${oe}; i++) {
        if (i >= uCutoutCount) break;
        cut = max(cut, sdfMask(roundedRectSdf(p, uCutouts[i], 0.0)));
      }
      coverage = max(coverage, cut);
    }

    if (uUseTransition > 0.5) {
      float t = incomingTransitionCoverage(vUv);
      coverage *= uInvertTransition > 0.5 ? 1.0 - t : t;
    }

    if (coverage <= 0.0) discard;

    gl_FragColor = vec4(texture2D(tInput, vUv).rgb, coverage);
    #include <colorspace_fragment>
  }
`;function rr(){return new M({vertexShader:Ke,fragmentShader:tr,depthTest:!1,depthWrite:!1,transparent:!0,uniforms:{tInput:{value:null},uViewport:{value:new R(1,1)},uUseBaseLayer:{value:1},uUseCutouts:{value:0},uCoverCount:{value:0},uCovers:{value:new Float32Array(I*4)},uCoverPinBottom:{value:new Float32Array(I)},uCoverPinTop:{value:new Float32Array(I)},uCutoutCount:{value:0},uCutouts:{value:new Float32Array(oe*4)},uUseTransition:{value:0},uInvertTransition:{value:0},uTransitionProgress:{value:1},uTransitionDirection:{value:new R(0,-1)},uViewportBottomVUv:{value:0},uScrollBendPx:{value:0},uScrollBendVUv:{value:0}}})}class nr extends yt{#t=new Se;#i=new Ge(-1,1,1,-1,0,1);#e=rr();#r=new xe(new qe(2,2),this.#e);#n=null;#o=null;#s=1;#a=1;constructor(){super("LayerKnockoutPass"),this.needsSwap=!1,this.#t.add(this.#r)}setTransitionState(e){this.#n=e}setLayerSourceProvider(e){this.#o=e}setViewportSize(e,r){this.#s=Math.max(1,e),this.#a=Math.max(1,r),this.#e.uniforms.uViewport.value.set(this.#s,this.#a)}setSize(){}render(e,r){e.setRenderTarget(this.renderToScreen?null:r),e.setClearColor(Jt.b100,1),e.clear(!0,!0,!1);const i=this.#u(),n=this.#m(i);if(n.length===0)return;const p=$e();this.#c(this.#l(p)),this.#f(i),this.#e.uniforms.uViewportBottomVUv.value=this.#d(e),this.#e.uniforms.uScrollBendPx.value=p,this.#e.uniforms.uScrollBendVUv.value=this.#h(p);const l=this.#o?.()??null;for(const t of n){const d=this.#p(t.sourceLayer,r,l);d&&(this.#v(t),this.#e.uniforms.tInput.value=d.texture,e.render(this.#t,this.#i))}}#m(e){const r=this.#n;if(!r)return[];const i=e.length>0,n=[],p=r.incomingIndex!==null&&r.mode==="bend",l=({sourceLayer:t,useTransition:d,invertTransition:a,includeBaseLayer:D=!0})=>{!D&&!i||n.push({sourceLayer:t,transitionDirection:r.direction,transitionProgress:r.progress,useBaseLayer:D,useCutouts:i,useTransition:d,invertTransition:a})};return p&&r.incomingIndex!==null?(l({sourceLayer:"current",useTransition:!1,invertTransition:!1,includeBaseLayer:!1}),l({sourceLayer:"incoming",useTransition:!0,invertTransition:!1})):l({sourceLayer:"composite",useTransition:!1,invertTransition:!1}),n}#u(){const e=[],r=_e(),i=Oe();let n=0;for(const[p]of ke.cutouts){if(n>=oe)break;const l=Le(p,r,i)??p.getBoundingClientRect();if(l.width<=0||l.height<=0)continue;const t=l.left+l.width,d=l.top+l.height;t<-U||d<-U||l.left>this.#s+U||l.top>this.#a+U||(e.push(l),n++)}return e}#l(e){const r=[],i=_e(),n=Oe(),p=_t(e)+U;for(const[l,t]of ke.covers){if(r.length>=I)break;if(t.full){r.push({left:-U,top:-U,width:this.#s+U*2,height:this.#a+U*2,pinBottom:!!t.pinBottom,pinTop:!!t.pinTop});continue}const d=Le(l,i,n)??l.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;const a=Math.max(0,d.top-p);Math.min(this.#a,d.top+d.height+p)-a<er||r.push({left:-U,top:d.top,width:this.#s+U*2,height:d.height,pinBottom:!!t.pinBottom,pinTop:!!t.pinTop})}return r}#c(e){const r=this.#e.uniforms.uCovers.value,i=this.#e.uniforms.uCoverPinBottom.value,n=this.#e.uniforms.uCoverPinTop.value;r.fill(0),i.fill(0),n.fill(0),e.forEach((p,l)=>{const t=l*4;r[t]=p.left,r[t+1]=p.top,r[t+2]=p.width,r[t+3]=p.height,i[l]=p.pinBottom?1:0,n[l]=p.pinTop?1:0}),this.#e.uniforms.uCoverCount.value=e.length}#f(e){const r=this.#e.uniforms.uCutouts.value;r.fill(0),e.forEach((i,n)=>{const p=n*4;r[p]=i.left,r[p+1]=i.top,r[p+2]=i.width,r[p+3]=i.height}),this.#e.uniforms.uCutoutCount.value=e.length}#v(e){this.#e.uniforms.uUseBaseLayer.value=e.useBaseLayer?1:0,this.#e.uniforms.uUseCutouts.value=e.useCutouts?1:0,this.#e.uniforms.uTransitionDirection.value.set(e.transitionDirection.x,e.transitionDirection.y),this.#e.uniforms.uTransitionProgress.value=e.transitionProgress,this.#e.uniforms.uUseTransition.value=e.useTransition?1:0,this.#e.uniforms.uInvertTransition.value=e.invertTransition?1:0}#p(e,r,i){return e==="current"?i?.current??r:e==="incoming"?i?.incoming??r??i?.current??null:r??i?.current??i?.incoming??null}#d(e){const r=Math.max(1,this.#a*e.getPixelRatio());return Math.max(0,1-window.innerHeight*e.getPixelRatio()/r)}#h(e){const r=window.innerHeight;return r>0?e/r:0}dispose(){this.#e.uniforms.tInput.value=null,this.#e.dispose(),this.#r.geometry.dispose(),super.dispose()}}const or=new Set(["bend","swipe","reveal"]),ir=.9999,sr=[],ar="sectionRevealDirection",ur="stateDrivenSceneOverlay",lr=-.998;function cr(s,e){s.setEffects(e),s.recompile()}function G(s,e=je,r=1,i=1){const n=P.clamp(1+s,0,1),p=P.clamp(e,0,.9999),l=P.clamp(Math.max(r,p+1e-4),1e-4,1),t=P.clamp((n-p)/(l-p),0,1);return Math.pow(t,Math.max(i,1e-4))}function Mr({sections:s,onRendererReady:e,contentMountedElements:r,quality:i,onQualityDowngrade:n,enableKnockout:p=!0,domKnockout:l=!1,scenePresets:t=[],fpsTrackingEnabled:d=!1}){const a=i==="low"?.03333333333333333:.016666666666666666,D=f.useRef(0),{gl:g,camera:W,size:x}=Ye(),Y=f.useRef(null),Ce=f.useRef(!1),Xe=5e3;f.useEffect(()=>{g.setClearColor(8421504,1)},[g]);const se=f.useRef(performance.now()),Z=f.useRef(60),ae=f.useRef(!1),ue=f.useRef(typeof document<"u"?document.hasFocus():!0),Je=i==="low"?25:45;f.useEffect(()=>{const o=()=>{ue.current=!0,se.current=performance.now()},m=()=>{ue.current=!1};return window.addEventListener("focus",o),window.addEventListener("blur",m),()=>{window.removeEventListener("focus",o),window.removeEventListener("blur",m)}},[]);const B=f.useRef(new Map),j=f.useMemo(()=>new Set(s.map(o=>o.element)),[s]);for(const o of j)B.current.has(o)||B.current.set(o,new Se);const ye=f.useRef([]),et=f.useMemo(()=>new Map(s.map(o=>[o.element,o])),[s]);f.useEffect(()=>{for(const[o,m]of B.current)j.has(o)||(Ne(m),B.current.delete(o));ye.current=s.map(o=>{const m=B.current.get(o.element);return m?[o.element,m]:null}).filter(o=>o!==null)},[s,j]),f.useEffect(()=>{const o=B.current;return()=>{for(const m of o.values())Ne(m);o.clear()}},[]);const V=f.useRef(null),le=f.useRef(null),J=f.useRef(null),$=f.useRef(null),ce=f.useRef(null),De=Nt(),tt=f.useRef(new R);f.useEffect(()=>{const o=new Dt(g,{frameBufferType:He}),m=new Gt,w=new Xt(W,m),T=new Tt(W,...ge().map(F=>F.effect));let S=null;return o.addPass(w),o.addPass(T),p?(S=new nr,S.renderToScreen=!0,S.setViewportSize(x.width,x.height),S.setLayerSourceProvider(()=>w.knockoutLayerTargets()),o.addPass(S)):T.renderToScreen=!0,o.setSize(x.width,x.height),ce.current=m,le.current=w,J.current=S,$.current=T,V.current=o,o.render(0),()=>{V.current?.dispose(),ce.current?.dispose(),Mt(g),Wt(g),Vt(g),vr(),V.current=null,le.current=null,J.current=null,$.current=null,ce.current=null}},[g,W,p]),f.useEffect(()=>{if(De===0)return;const o=$.current;if(!o)return;cr(o,ge().map(w=>w.effect));const m=g.getDrawingBufferSize(tt.current);o.setSize(m.width,m.height),re()},[g,De]),f.useEffect(()=>()=>Ft(g),[g]),f.useEffect(()=>{V.current&&(V.current.setSize(x.width,x.height),J.current?.setViewportSize(x.width,x.height),re())},[x.width,x.height]),f.useEffect(()=>{ae.current=!1,Z.current=60},[i]);const Te=f.useRef(!1),K=f.useRef(new Map),Ue=f.useRef(new he),Pe=f.useRef(new he),Ee=f.useRef(new Ve),Re=f.useRef(new Ve),Be=f.useRef(new he),rt=f.useRef(new Ze);f.useRef(""),f.useEffect(()=>{for(const o of K.current.keys())j.has(o)||K.current.delete(o)},[j]),f.useEffect(()=>{const o=x.width/x.height;for(const m of K.current.values())m.aspect=o,m.updateProjectionMatrix()},[x.width,x.height]);const Q=o=>{const m=B.current.get(o);if(!m)return;const w=K.current.get(o);if(w&&w.parent)return w;const T=m.getObjectByProperty("type","PerspectiveCamera");return T&&(T.aspect=x.width/x.height,T.updateProjectionMatrix(),K.current.set(o,T)),T},nt=(o,m)=>{o.updateMatrixWorld();const w=Be.current;return w.set(m.x,m.y,m.z),o.localToWorld(w),{x:w.x,y:w.y,z:w.z}},ot=(o,m)=>{if(!o||!m)return{x:.5,y:.5};o.updateMatrixWorld();const w=Be.current;return w.set(m.x,m.y,m.z).project(o),{x:P.clamp(w.x*.5+.5,0,1),y:P.clamp(w.y*.5+.5,0,1)}};ht((o,m)=>{if(!V.current)return;for(const u of ge())u.update?.(o,m);if(re(),D.current+=m,D.current<a-1/1e3)return;D.current=Math.max(0,D.current-a);const w=performance.now();if(ue.current){const v=1e3/(w-se.current);if(Z.current+=(v-Z.current)*.01,!ae.current&&i!=="low"&&n&&Z.current<Je&&(ae.current=!0,n()),zt.getState().isLoaded&&Y.current===null&&(Y.current=w),d&&!Ce.current&&Y.current!==null&&w-Y.current>=Xe){const{trackers:h,pageViewToken:y}=Ht.getState();if(h?.dux){Ce.current=!0;const{tier:b}=gt.getState();wt({trackers:h,pageViewToken:y,enabled:d,targetName:"fps_measurement",parentName:"renderer_pipeline",width:x.width,height:x.height,duration:Math.round(w-Y.current),metadata:{measuredFps:Math.round(Z.current*100)/100,effectiveTier:b,targetFps:a===1/30?30:60}})}}}se.current=w;const T=et,S=[];for(const[u,v]of ye.current){const h=T.get(u);if(!h)continue;const y=kt(u),L=(h.offsets?.transition??"bend")==="bend"?Lt(u,y.transition):y.transition;S.push({element:u,scene:v,section:h,progress:y.progress,transition:L})}const F=[],be=[];let c=null;const fe=u=>{F.push(u),be.push(u.scene)};for(let u=0;u<S.length;u++){const v=S[u],h=v.section.offsets;if(v.element.dataset[ur]==="true"&&v.transition<=lr)continue;let b=v.transition>-1&&v.transition<1;if(!b&&v.transition<0&&u>0&&(b=S[u-1].progress>=(h?.sceneEnterAt??Ut)),!b&&v.transition>=1&&u<S.length-1&&(b=S[u+1].progress<(h?.sceneExitAt??Pt)),!b)continue;const L=u>0?S[u-1]:void 0,ve=L?.section.handle===Fe&&v.section.handle!==Fe&&v.transition<0,Me=ve?"hero":h?.transition??"none",pe=l&&or.has(Me)?"crossfade":Me;if(pe!=="none"){c&&fe(c);const C=(ve?L?.section.offsets?.hero:h?.hero)??Et,de=pe==="hero"&&v.element.dataset[ar]==="out",X=de?"crossfade":pe,ct=X==="hero"&&L?nt(L.scene,C.center):void 0,ft={center:{x:.5,y:.5},noiseStrength:C.noiseStrength,textureStrength:C.textureStrength,outlineStrength:C.outlineStrength,glowStrength:C.glowStrength,zoomStrength:C.zoomStrength,textureScale:C.textureScale,distance:C.distance,mode:C.mode,angleDeg:C.angleDeg,spread:C.spread,bend:C.bend,wipe:C.wipe},O=h?.reveal??Rt,mt={origin:O.origin,softness:O.softness,edgeGlow:O.edgeGlow,zoom:O.zoom};c={...v,mode:X,transitionT:de?G(v.transition):X==="crossfade"?G(v.transition,h?.crossfadeStartAt??je):X==="hero"?G(v.transition,C.startAt,C.endAt,C.curve):X==="reveal"?G(v.transition,O.startAt,O.endAt,O.curve):G(v.transition),scrollProgress:L?.progress??v.progress,swipeDirection:h?.swipeDirection??{x:1,y:0},swipeFeather:h?.swipeFeather??0,swipeNoiseAmount:h?.swipeNoiseAmount??0,hero:ft,heroCenterWorld:ct,fadeOutReveal:de,reveal:mt,bendDirection:h?.bendDirection??{x:0,y:-1},zoomBlurStrength:h?.zoomBlurStrength??1,lerpCameraWithPrevious:ve||(h?.lerpCameraWithPrevious??!1)};continue}fe(v)}c&&F.length===0&&(fe(c),c=null);let _,E;const ee=u=>{u.transition>0?(!_||u.transition<_.transition)&&(_=u):(!E||u.transition>E.transition)&&(E=u)};for(const u of F)ee(u);c?.lerpCameraWithPrevious&&ee(c);for(let u=1;u<S.length;u++){const v=S[u];if(v.transition>=0)continue;const h=v.section.offsets;!h?.lerpCameraWithPrevious||h.transition!=="none"||(ee(S[u-1]),ee(v))}const Ae=S[S.length-1]?.element;let k;if(_&&E&&_.element!==Ae&&E.element!==Ae){const u=Q(_.element),v=Q(E.element);if(u&&v){const h=c?.lerpCameraWithPrevious&&E.element===c.element?P.smoothstep(c.transitionT,0,.5):G(E.transition);u.getWorldPosition(Ue.current),v.getWorldPosition(Pe.current),u.getWorldQuaternion(Ee.current),v.getWorldQuaternion(Re.current);const y=rt.current;y.position.lerpVectors(Ue.current,Pe.current,h),y.quaternion.slerpQuaternions(Ee.current,Re.current,h),y.fov=P.lerp(u.fov,v.fov,h),y.aspect=x.width/x.height,y.near=P.lerp(u.near,v.near,h),y.far=P.lerp(u.far,v.far,h),y.updateProjectionMatrix(),k=y}else k=v??u}else{const u=_??E;u&&(k=Q(u.element))}const Ie=c!==null&&(c.fadeOutReveal||c.mode==="hero"&&c.hero.mode==="radial"&&c.hero.distance<.999),st=c?{scene:c.scene,mode:c.mode,progress:c.transitionT,scrollProgress:c.scrollProgress,swipeDirection:c.swipeDirection,swipeFeather:c.swipeFeather,swipeNoiseAmount:c.swipeNoiseAmount,disableDepthMerge:Ie,hero:{...c.hero,center:c.mode==="hero"?ot(k??Q(c.element),c.heroCenterWorld):c.hero.center},reveal:c.reveal,bendDirection:c.bendDirection,zoomBlurStrength:c.zoomBlurStrength}:null,H=le.current,at=c&&!c.lerpCameraWithPrevious?Q(c.element)??null:null,te=Ot.getState(),ut=c!==null&&!Ie,me=te.exclusiveOverlayElement!==null&&c?.element===te.exclusiveOverlayElement&&c.transitionT>=ir&&ut;te.exclusiveCoverActive!==me&&te.setExclusiveCoverActive(me),H&&(H.mainScenes=me?sr:be,H.transitioningSection=st,H.transitioningCamera=at),k&&(H&&(H.mainCamera=k),$.current&&($.current.mainCamera=k));const lt=(()=>{const u=h=>s.findIndex(y=>y.element===h);if(c){const h=u(c.element);return h<0?null:{incomingIndex:h,progress:c.transitionT,direction:c.bendDirection,mode:c.mode}}const v=F[F.length-1];return!v||u(v.element)<0?null:{incomingIndex:null,progress:1,direction:v.section.offsets?.bendDirection??{x:0,y:-1},mode:v.section.offsets?.transition??"bend"}})();J.current?.setTransitionState(lt),V.current.render(m),Te.current||(Te.current=!0,e())},1);const it=Bt(o=>o.ready);return A.jsx(A.Fragment,{children:s.map(o=>{const m=B.current.get(o.element);if(!m)return null;const w=r===void 0||r.has(o.element),T=it[o.handle]??!1;return A.jsx(f.Fragment,{children:xt(A.jsx(bt,{value:t,children:A.jsxs(At,{value:{element:o.element,handle:o.handle,progress:o.progress,transition:o.transition,screenOffset:o.screenOffset,stateUrl:o.stateUrl,isContentMounted:w,isPresetResolved:T},children:[A.jsx(wr,{transform:o.transform,scene:m}),A.jsxs(f.Suspense,{fallback:null,children:[o.content,A.jsx(gr,{scene:m})]})]})}),m)},`scene-${o.handle}`)})})}const fr=new Ze,mr=1;let ne=0,we=0;function vr(){we+=1,ne=0,z.clear(),q.length=0}const z=new Map,q=[];function pr(s){if(z.has(s.scene)){z.set(s.scene,s);return}z.set(s.scene,s),q.push(s.scene),Qe()}function dr(s){if(!z.delete(s))return;const e=q.indexOf(s);e!==-1&&q.splice(e,1)}function Qe(){for(;ne<mr&&q.length>0;){const s=q.shift(),e=z.get(s);if(!e)continue;z.delete(s),ne++;const r=we;e.gl.compileAsync(e.scene,e.camera).then(e.onDone).catch(e.onDone).finally(()=>{r===we&&(ne--,Qe())})}}const hr=100;function gr({scene:s}){const{gl:e}=Ye();return f.useEffect(()=>{let r=!1,i=0;const n=new Set,p=()=>{if(r)return;const g=s.getObjectByProperty("type","PerspectiveCamera")??fr;pr({scene:s,camera:g,gl:e,onDone:()=>{r||re()}})},l=()=>{r||(clearTimeout(i),i=setTimeout(p,hr))},t=g=>{a(g.child),l()},d=g=>{D(g.child)},a=g=>{if(!n.has(g)){n.add(g),g.addEventListener("childadded",t),g.addEventListener("childremoved",d);for(const W of g.children)a(W)}},D=g=>{if(n.has(g)){n.delete(g),g.removeEventListener("childadded",t),g.removeEventListener("childremoved",d);for(const W of g.children)D(W)}};return a(s),l(),()=>{r=!0,clearTimeout(i),dr(s);for(const g of n)g.removeEventListener("childadded",t),g.removeEventListener("childremoved",d);n.clear()}},[e,s]),null}function wr({transform:s,scene:e}){return f.useEffect(()=>{s?(e.position.set(s.position.x,s.position.y,s.position.z),e.rotation.set(s.rotation.x,s.rotation.y,s.rotation.z),e.scale.set(s.scale.x,s.scale.y,s.scale.z)):(e.position.set(0,0,0),e.rotation.set(0,0,0),e.scale.set(1,1,1))},[e,s]),null}function Ne(s){s.traverse(e=>{if(!e.userData[It]&&e instanceof xe&&(e.geometry&&e.geometry.dispose(),e.material)){const r=Array.isArray(e.material)?e.material:[e.material];for(const i of r){for(const n of Object.values(i))n instanceof St&&n.dispose();i.dispose()}}}),s.clear()}export{Mr as R};
//# sourceMappingURL=RendererPipeline-XN_DhLbk.js.map
