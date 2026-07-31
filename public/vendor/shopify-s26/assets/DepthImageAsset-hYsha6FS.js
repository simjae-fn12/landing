import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{t}from"./react-Dvkprh6u.js";import{t as n}from"./jsx-runtime-DKdBMi_L.js";import{n as r}from"./SceneDataContext-BXyXjH22.js";import{In as i,Qa as a,Qi as o,V as s,Yi as c,ka as l}from"./three.core-DVcoLpfz.js";import{b as u,g as d,v as f}from"./events-760a1017.esm-DCPtHAo6.js";import{t as p}from"./dist-4Ign8GoJ.js";import{n as m}from"./pointerNdc-C2qFNexH.js";import{t as ee}from"./useTheatreObject-H4ZAcMv1.js";var h=e(t(),1),g=p(),_=new Map;function v(e){return Array.isArray(e)?e.join(`
`):e}function y(e){let t=v(e);_.set(t,(_.get(t)??0)+1)}function b(e,t){let n=v(e),r=_.get(n)??0;if(r>1){_.set(n,r-1);return}_.delete(n);let i=new Set;for(let e of Array.isArray(t)?t:[t])e&&!i.has(e)&&(e.dispose(),i.add(e));f.clear(l,Array.isArray(e)?[...e]:e)}var x=n(),S=300,C=1,w=.25,T=.5,E=8,D=8,te=1.1,ne=7,O=.6499999999999999,k=(0,h.createContext)(null),A=`
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
`,j=`
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(map, vUv);
  }
`;function M({url:e,depthMap:t,position:n,rotation:p,scale:_,sheet:v,theatreId:M,sensitivity:N=T,children:P}){let F=(0,h.useRef)(null),I=(0,h.useRef)(null),L=(0,h.useRef)(new a(0,0)),R=(0,h.useRef)({x:0,y:0}),z=(0,h.useRef)(N),B=(0,h.useRef)(new a(0,0)),V=(0,h.useRef)(new a(0,0)),H=(0,h.useRef)(new a(0,0)),U=(0,h.useMemo)(()=>({sensitivity:g.types.number(N,{nudgeMultiplier:.01,range:[0,5]}),transitionParallax:g.types.compound({in:g.types.compound({x:g.types.number(-1.2,{nudgeMultiplier:.01,range:[-2,2]}),y:g.types.number(0,{nudgeMultiplier:.01,range:[-2,2]})}),out:g.types.compound({x:g.types.number(1.2,{nudgeMultiplier:.01,range:[-2,2]}),y:g.types.number(0,{nudgeMultiplier:.01,range:[-2,2]})})},{label:`Transition Parallax`})}),[]),W=ee(v??null,F,M,U);(0,h.useEffect)(()=>{if(W)return W.onValuesChange(e=>{let t=e;z.current=t.sensitivity??T,B.current.set(t.transitionParallax?.in?.x??0,t.transitionParallax?.in?.y??0),V.current.set(t.transitionParallax?.out?.x??0,t.transitionParallax?.out?.y??0)})},[W]);let G=(0,h.useRef)(new a(0,0)),K=(0,h.useMemo)(()=>({mouseDelta:G,sensitivity:z}),[]);(0,h.useEffect)(()=>{if(!window.matchMedia(`(hover: hover)`).matches)return;let e=e=>{m(e,R.current,{yAxis:`down`,clamp:!0})};return window.addEventListener(`pointermove`,e),()=>window.removeEventListener(`pointermove`,e)},[]);let[q,J]=f(l,[e,t]),Y=(0,h.useRef)(q);Y.current=q;let X=(0,h.useRef)(J);X.current=J,(0,h.useEffect)(()=>{let n=[e,t];y(n);let r=Y.current,i=X.current;return()=>{b(n,[r,i])}},[e,t]);let Z=q.image?q.image.width/q.image.height:1,Q=(0,h.useMemo)(()=>{q.colorSpace=c,J.colorSpace=``,J.minFilter=i,J.magFilter=i,J.wrapS=s,J.wrapT=s;let e=J.image?.width??1024,t=J.image?.height??1024;return new o({vertexShader:A,fragmentShader:j,side:2,uniforms:{map:{value:q},depthMap:{value:J},depthTexel:{value:new a(1/e,1/t)},dilateRadius:{value:ne},mouseDelta:{value:new a(0,0)},meshDepth:{value:C},focus:{value:w},sensitivity:{value:z.current}}})},[q,J]);(0,h.useEffect)(()=>()=>{Q.dispose()},[Q]);let $=u(e=>e.size),re=r();return d((e,t)=>{if(I.current){let e=2*Math.tan(45*Math.PI/360)*4,t=e*($.width/$.height),n=te*(t/e>Z?t/Z:e);I.current.scale.set(n,n,1)}let n=z.current,r=1-Math.exp(-t*E),i=-R.current.x*O*n,a=-R.current.y*O*n;L.current.x+=(i-L.current.x)*r,L.current.y+=(a-L.current.y)*r;let o=re.transition,s=o<0?B.current:V.current,c=Math.abs(o),l=s.x*c,u=s.y*c,d=1-Math.exp(-t*D);H.current.x+=(l-H.current.x)*d,H.current.y+=(u-H.current.y)*d,G.current.set(L.current.x+H.current.x,L.current.y+H.current.y),Q.uniforms.mouseDelta.value.copy(G.current),Q.uniforms.sensitivity.value=n}),(0,x.jsx)(`group`,{ref:F,position:n,rotation:p,scale:_,children:(0,x.jsxs)(`group`,{ref:I,children:[(0,x.jsx)(`mesh`,{material:Q,children:(0,x.jsx)(`planeGeometry`,{args:[Z,1,S,S]})}),(0,x.jsx)(k,{value:K,children:P})]})})}export{y as n,b as r,M as t};
//# sourceMappingURL=DepthImageAsset-hYsha6FS.js.map