import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{t}from"./react-Dvkprh6u.js";import{t as n}from"./jsx-runtime-DKdBMi_L.js";import{Qi as r}from"./three.core-DVcoLpfz.js";import{g as i}from"./events-760a1017.esm-DCPtHAo6.js";import{t as a}from"./react-three-fiber.esm-Dxg-PL46.js";import{t as o}from"./dist-4Ign8GoJ.js";import{t as s}from"./FluidField-B_tNcYSl.js";import{t as c}from"./sharedZeroTexture-C5JcVREk.js";import{s as l}from"./theatre-DgCyCBq3.js";import{t as u}from"./theatreTypes-gh9oqObx.js";var d=e(t(),1),f=o(),p={driveFluid:!0,gain:6,fluid:{enabled:!0,curl:6.5,velocityDissipation:.96,densityDissipation:.92,pressure:.8,splatRadius:.5,splatForce:.08,simSize:128,dyeSize:256}},m={driveFluid:f.types.boolean(!0),gain:f.types.number(6,{range:[0,40],nudgeMultiplier:.1}),fluid:f.types.compound({enabled:f.types.boolean(!0),curl:f.types.number(6.5,{range:[0,20],nudgeMultiplier:.01}),velocityDissipation:f.types.number(.96,{range:[0,1],nudgeMultiplier:.001}),densityDissipation:f.types.number(.92,{range:[0,1],nudgeMultiplier:.001}),pressure:f.types.number(.8,{range:[0,1],nudgeMultiplier:.001}),splatRadius:f.types.number(.5,{range:[0,2],nudgeMultiplier:.001}),splatForce:f.types.number(.08,{range:[0,1],nudgeMultiplier:.001}),...u(128,256)})},h=n(),g=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,_=`
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform float uGain;

  vec3 hueToRgb(float hue) {
    vec3 k = mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0);
    return clamp(min(k, 4.0 - k), 0.0, 1.0);
  }

  void main() {
    vec2 vel = texture2D(uVelocity, vUv).xy;
    float speed = clamp(length(vel) * uGain, 0.0, 1.0);
    float angle = atan(vel.y, vel.x) / 6.2831853 + 0.5;
    vec3 color = mix(vec3(0.02, 0.02, 0.05), hueToRgb(angle), speed);
    gl_FragColor = vec4(color, 1.0);
  }
`;function v({velocityRef:e,gain:t}){let n=(0,d.useMemo)(()=>new r({vertexShader:g,fragmentShader:_,uniforms:{uVelocity:{value:c()},uGain:{value:1}},depthTest:!1,depthWrite:!1}),[]);return(0,d.useEffect)(()=>()=>n.dispose(),[n]),n.uniforms.uGain.value=t,i(()=>{n.uniforms.uVelocity.value=e.current??c()}),(0,h.jsxs)(`mesh`,{frustumCulled:!1,children:[(0,h.jsx)(`planeGeometry`,{args:[2,2]}),(0,h.jsx)(`primitive`,{object:n,attach:`material`})]})}function y(){let{values:e}=l(`FluidField`,m),t=e??p,n=(0,d.useRef)({transition:0,scrollVelocity:0}),r=(0,d.useRef)(null);return(0,h.jsx)(`div`,{style:{position:`relative`,width:`100%`,height:`100%`},children:(0,h.jsxs)(a,{style:{background:`#05050a`},children:[(0,h.jsx)(s,{fluid:{enabled:t.fluid.enabled,influence:1,curl:t.fluid.curl,velocityDissipation:t.fluid.velocityDissipation,densityDissipation:t.fluid.densityDissipation,pressure:t.fluid.pressure,splatRadius:t.fluid.splatRadius,splatForce:t.fluid.splatForce,simSize:t.fluid.simSize,dyeSize:t.fluid.dyeSize},fluidVelocityRef:r,driveFluid:t.driveFluid,motion:n}),(0,h.jsx)(v,{velocityRef:r,gain:t.gain})]})})}export{y as default};
//# sourceMappingURL=FluidFieldDemo-aQgIb73Y.js.map