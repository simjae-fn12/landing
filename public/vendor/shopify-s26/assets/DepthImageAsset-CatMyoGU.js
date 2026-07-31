import{j as d}from"./jsx-runtime-u17CrQMm.js";import{r as e}from"./chunk-QUQL4437-BD29ZypC.js";import{H as k,I as W,V as u,S as se,j as oe,L as G,J as N,e as ae,o as ie,u as ue,y as ce}from"./TierResolver-y-fGWbnF.js";import{d as i}from"./index-CplsFZVb.js";import{u as le}from"./SceneDataContext-DuAaqaMN.js";import{u as pe}from"./useTheatreObject-B5lJAGa0.js";import{a as me}from"./pointerNdc-sUXB2i1s.js";const v=new Map;function q(t){return Array.isArray(t)?t.join(`
`):t}function fe(t){const o=q(t);v.set(o,(v.get(o)??0)+1)}function he(t,o){const m=q(t),x=v.get(m)??0;if(x>1){v.set(m,x-1);return}v.delete(m);const g=new Set;for(const c of Array.isArray(o)?o:[o])c&&!g.has(c)&&(c.dispose(),g.add(c));k.clear(W,Array.isArray(t)?[...t]:t)}const z=300,de=1,B=.25,X=.5,ve=8,xe=8,ge=1.1,De=7,Y=.3+.7*2*B,ye=45,Te=4,Re=e.createContext(null),Ee=`
  uniform sampler2D depthMap;
  uniform vec2 depthTexel;
  uniform float dilateRadius;
  uniform vec2 mouseDelta;
  uniform float meshDepth;
  uniform float focus;
  uniform float sensitivity;
  varying vec2 vUv;

  float sampleDepth(vec2 uv) {
    float r = clamp(dilateRadius, 0.0, 20.0);
    if (r < 0.5) return texture2D(depthMap, uv).r;
    float maxD = 0.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 o = vec2(float(i), float(j)) * depthTexel * r;
        maxD = max(maxD, texture2D(depthMap, uv + o).r);
      }
    }
    return maxD;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float depth = sampleDepth(uv);
    float actualDepth = depth * meshDepth;
    float focusDepth = focus * meshDepth;

    float scaleFactor = (4.0 - actualDepth) / 4.0;
    pos.xy *= scaleFactor;
    pos.z = actualDepth;

    vec2 edge = smoothstep(0.0, 0.02, uv) * smoothstep(1.0, 0.98, uv);
    pos.xy += mouseDelta * sensitivity * (1.0 - focus) * (actualDepth - focusDepth)
              * vec2(-1.0, 1.0) * (edge.x * edge.y);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,Me=`
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(map, vUv);
  }
`;function be({url:t,depthMap:o,position:m,rotation:x,scale:g,sheet:c,theatreId:J,sensitivity:S=X,children:Z}){const A=e.useRef(null),y=e.useRef(null),l=e.useRef(new u(0,0)),T=e.useRef({x:0,y:0}),D=e.useRef(S),_=e.useRef(new u(0,0)),j=e.useRef(new u(0,0)),p=e.useRef(new u(0,0)),Q=e.useMemo(()=>({sensitivity:i.types.number(S,{nudgeMultiplier:.01,range:[0,5]}),transitionParallax:i.types.compound({in:i.types.compound({x:i.types.number(-1.2,{nudgeMultiplier:.01,range:[-2,2]}),y:i.types.number(0,{nudgeMultiplier:.01,range:[-2,2]})}),out:i.types.compound({x:i.types.number(1.2,{nudgeMultiplier:.01,range:[-2,2]}),y:i.types.number(0,{nudgeMultiplier:.01,range:[-2,2]})})},{label:"Transition Parallax"})}),[]),R=pe(c??null,A,J,Q);e.useEffect(()=>{if(R)return R.onValuesChange(n=>{const r=n;D.current=r.sensitivity??X,_.current.set(r.transitionParallax?.in?.x??0,r.transitionParallax?.in?.y??0),j.current.set(r.transitionParallax?.out?.x??0,r.transitionParallax?.out?.y??0)})},[R]);const E=e.useRef(new u(0,0)),$=e.useMemo(()=>({mouseDelta:E,sensitivity:D}),[]);e.useEffect(()=>{if(!window.matchMedia("(hover: hover)").matches)return;const n=r=>{me(r,T.current,{yAxis:"down",clamp:!0})};return window.addEventListener("pointermove",n),()=>window.removeEventListener("pointermove",n)},[]);const[a,s]=k(W,[t,o]),C=e.useRef(a);C.current=a;const P=e.useRef(s);P.current=s,e.useEffect(()=>{const n=[t,o];fe(n);const r=C.current,h=P.current;return()=>{he(n,[r,h])}},[t,o]);const M=a.image?a.image.width/a.image.height:1,f=e.useMemo(()=>{a.colorSpace=se,s.colorSpace=oe,s.minFilter=G,s.magFilter=G,s.wrapS=N,s.wrapT=N;const n=s.image?.width??1024,r=s.image?.height??1024;return new ae({vertexShader:Ee,fragmentShader:Me,side:ie,uniforms:{map:{value:a},depthMap:{value:s},depthTexel:{value:new u(1/n,1/r)},dilateRadius:{value:De},mouseDelta:{value:new u(0,0)},meshDepth:{value:de},focus:{value:B},sensitivity:{value:D.current}}})},[a,s]);e.useEffect(()=>()=>{f.dispose()},[f]);const b=ue(n=>n.size),K=le();return ce((n,r)=>{if(y.current){const w=2*Math.tan(ye*Math.PI/360)*Te,V=w*(b.width/b.height),U=ge*(V/w>M?V/M:w);y.current.scale.set(U,U,1)}const h=D.current,F=1-Math.exp(-r*ve),ee=-T.current.x*Y*h,te=-T.current.y*Y*h;l.current.x+=(ee-l.current.x)*F,l.current.y+=(te-l.current.y)*F;const I=K.transition,O=I<0?_.current:j.current,L=Math.abs(I),re=O.x*L,ne=O.y*L,H=1-Math.exp(-r*xe);p.current.x+=(re-p.current.x)*H,p.current.y+=(ne-p.current.y)*H,E.current.set(l.current.x+p.current.x,l.current.y+p.current.y),f.uniforms.mouseDelta.value.copy(E.current),f.uniforms.sensitivity.value=h}),d.jsx("group",{ref:A,position:m,rotation:x,scale:g,children:d.jsxs("group",{ref:y,children:[d.jsx("mesh",{material:f,children:d.jsx("planeGeometry",{args:[M,1,z,z]})}),d.jsx(Re,{value:$,children:Z})]})})}export{Te as D,ye as a,be as b,fe as c,he as r};
//# sourceMappingURL=DepthImageAsset-CatMyoGU.js.map
