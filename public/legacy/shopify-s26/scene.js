import * as THREE from "./assets/three.module.min.js";

const canvas = document.querySelector("#scene");
const renderer = new THREE.WebGLRenderer({canvas, antialias:false, powerPreference:"high-performance", alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth > 1600 ? 1.35 : 1.65));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48,1,.01,100);
camera.position.set(0,0,5);
const pointer = new THREE.Vector2();
const smoothPointer = new THREE.Vector2();
let lastScroll = scrollY;
let scrollSpeed = 0;
let elapsed = 0;

function resize(){
  renderer.setSize(innerWidth,innerHeight,false);
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
}
resize();
addEventListener("resize",resize);
addEventListener("pointermove",event=>{
  pointer.set(event.clientX/innerWidth*2-1,-(event.clientY/innerHeight*2-1));
});

const vertexShader=`
attribute vec3 aColor;
attribute float aSeed;
uniform float uTime,uOpacity,uSize,uScatter,uSpeed,uDepth;
uniform vec2 uPointer;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec3 p=position;
  float pulse=sin(uTime*.45+aSeed*18.+p.y*2.4)*.018;
  p+=normalize(p+vec3(.001))*pulse;
  vec2 delta=p.xy-uPointer*1.18;
  float force=exp(-dot(delta,delta)*2.15);
  p.xy+=normalize(delta+vec2(.001))*force*(.055+uSpeed*.045);
  p+=normalize(p+vec3(.001))*uScatter*(.25+aSeed*.95);
  p.z+=uDepth;
  vec4 mv=modelViewMatrix*vec4(p,1.);
  gl_Position=projectionMatrix*mv;
  gl_PointSize=min(3.15,uSize*(.72+aSeed*.95)*(12./max(1.,-mv.z)));
  vColor=aColor;
  vAlpha=uOpacity*(.55+aSeed*.45);
}`;
const fragmentShader=`
varying vec3 vColor;varying float vAlpha;
void main(){
  vec2 p=gl_PointCoord-.5;
  float d=dot(p,p);
  if(d>.25)discard;
  gl_FragColor=vec4(vColor,smoothstep(.25,.025,d)*vAlpha);
}`;
function material(size=2.4){
  return new THREE.ShaderMaterial({
    vertexShader,fragmentShader,transparent:true,depthWrite:false,
    uniforms:{uTime:{value:0},uOpacity:{value:0},uSize:{value:size},uScatter:{value:0},uSpeed:{value:0},uDepth:{value:0},uPointer:{value:new THREE.Vector2()}}
  });
}
function hash(value){const n=Math.sin(value*127.1)*43758.5453123;return n-Math.floor(n)}
function geometry(positions,colors,count){
  const result=new THREE.BufferGeometry();
  result.setAttribute("position",new THREE.BufferAttribute(positions,3));
  result.setAttribute("aColor",new THREE.BufferAttribute(colors,3));
  const seeds=new Float32Array(count);
  for(let i=0;i<count;i++)seeds[i]=hash(i*1.731);
  result.setAttribute("aSeed",new THREE.BufferAttribute(seeds,1));
  return result;
}
function procedural(count,shape,palette,size){
  const positions=new Float32Array(count*3);
  const colors=new Float32Array(count*3);
  const swatches=palette.map(value=>new THREE.Color(value));
  for(let i=0;i<count;i++){
    const p=shape(i,count),c=swatches[Math.floor(hash(i*3.71)*swatches.length)];
    positions.set(p,i*3);colors.set([c.r,c.g,c.b],i*3);
  }
  return new THREE.Points(geometry(positions,colors,count),material(size));
}

const worker=new Worker("./mdpc-worker.js?v=3");
let taskId=0;
const tasks=new Map();
worker.onmessage=({data})=>{
  const task=tasks.get(data.id);
  if(!task)return;
  tasks.delete(data.id);
  if(data.error){task.reject(new Error(data.error));return}
  task.resolve(new THREE.Points(geometry(data.positions,data.colors,data.count),material(task.size)));
};
function loadCloud(url,limit=70000,size=2.5){
  return new Promise((resolve,reject)=>{
    const id=++taskId;
    tasks.set(id,{resolve,reject,size});
    worker.postMessage({id,url,limit});
  });
}
function normalize(object,height=3,offset=[0,0,0]){
  object.geometry.computeBoundingBox();
  const box=object.geometry.boundingBox;
  const center=box.getCenter(new THREE.Vector3());
  const extent=box.getSize(new THREE.Vector3());
  object.geometry.translate(-center.x,-center.y,-center.z);
  object.scale.setScalar(height/Math.max(.001,extent.y));
  object.position.set(...offset);
  return object;
}
function group(name,...objects){
  const result=new THREE.Group();
  result.name=name;
  objects.forEach(object=>result.add(object));
  scene.add(result);
  return result;
}

const atmosphere=procedural(30000,()=>{
  const a=Math.random()*Math.PI*2;
  const r=Math.pow(Math.random(),.38)*6;
  return[Math.cos(a)*r,(Math.random()-.5)*5,Math.sin(a)*r-2];
},["#ffffff","#d8cce0","#84919a"],1.55);
const atmosphereGroup=group("atmosphere",atmosphere);
atmosphere.material.uniforms.uOpacity.value=.25;

const fallback=procedural(18000,(i,n)=>{
  const part=hash(i*4.8);
  if(part<.14){const a=hash(i)*Math.PI*2,r=Math.sqrt(hash(i*2.1))*.22;return[Math.cos(a)*r,1.38+Math.sin(a)*r,(hash(i*5)-.5)*.18]}
  if(part<.72){const y=-.25+hash(i*2.6)*1.48,w=.22+(1.1-y)*.17;return[(hash(i*3.4)-.5)*w*2,y,(hash(i*6)-.5)*.23]}
  const side=hash(i*7)>.5?1:-1,y=.88-hash(i*8)*2.2;return[side*(.18+(y+.6)*.1)+(hash(i*9)-.5)*.11,y,(hash(i*10)-.5)*.12];
},["#09100b","#315438","#83ae6b","#d4e3b7"],2.25);
const heroGroup=group("hero",fallback);

const groups={hero:heroGroup};
const assetConfig=[
  ["forest","./assets/forest.mdpc",52000,3.1,4.9,[0,.1,-.6]],
  ["mini","./assets/mini.mdpc",52000,2.5,3.15,[0,0,0]],
  ["arches","./assets/arches.mdpc",62000,2.55,3.55,[0,-.1,0]],
  ["globe","./assets/globe.mdpc",62000,2.45,3.45,[0,0,0]],
  ["retail","./assets/retail.mdpc",70000,2.5,3.4,[0,0,0]],
  ["shopapp","./assets/shopapp.mdpc",70000,2.45,3.5,[0,0,0]]
];

const loader=document.querySelector("#loader");
const loaderBar=document.querySelector("#loaderBar");
const loaderCount=document.querySelector("#loaderCount");
let loaded=0;
function reportLoad(){
  loaded++;
  const progress=Math.round(loaded/(assetConfig.length+1)*100);
  loaderBar.style.width=progress+"%";
  loaderCount.textContent=String(progress).padStart(2,"0");
}

async function setupAssets(){
  const heroCloud=await loadCloud("./assets/jacket.mdpc",65000,2.55);
  normalize(heroCloud,3.15,[0,-.05,.1]);
  fallback.material.uniforms.uOpacity.value=0;
  heroGroup.add(heroCloud);
  reportLoad();
  await Promise.all(assetConfig.map(async([name,url,limit,size,height,offset])=>{
    try{
      const cloud=await loadCloud(url,limit,size);
      normalize(cloud,height,offset);
      groups[name]=group(name,cloud);
    }catch(error){
      console.warn(`Unable to load ${name}`,error);
      groups[name]=group(name,procedural(15000,(i,n)=>{
        const a=hash(i)*Math.PI*2,r=Math.pow(hash(i*2),.5)*1.8;
        return[Math.cos(a)*r,(hash(i*3)-.5)*2.6,Math.sin(a)*r];
      },["#ffffff","#b3d6c2","#9a86ad"],2.3));
    }
    reportLoad();
  }));
  setTimeout(()=>loader.classList.add("done"),280);
}
setupAssets();

const sections=[...document.querySelectorAll(".scene-section")];
const sceneOrder=["hero","forest","mini","arches","globe","retail","shopapp","finale"];
const backgrounds={
  hero:["#16162a","#322c43"],
  forest:["#152922","#536f69"],
  mini:["#0b1015","#25293e"],
  arches:["#eeeade","#9db8ad"],
  globe:["#061c45","#156a91"],
  retail:["#171125","#6d4f83"],
  shopapp:["#d3e658","#8ca931"],
  finale:["#09110b","#1b3527"]
};
groups.finale=group("finale",procedural(22000,()=>{
  const a=Math.random()*Math.PI*2,r=Math.pow(Math.random(),.42)*3.7;
  return[Math.cos(a)*r,(Math.random()-.5)*3.2,Math.sin(a)*r];
},["#c7ff38","#f8fff1","#629140"],2.1));

function scrollState(){
  const marker=scrollY+innerHeight*.52;
  let index=0;
  for(let i=0;i<sections.length;i++)if(marker>=sections[i].offsetTop)index=i;
  const section=sections[index];
  const local=Math.max(0,Math.min(1,(scrollY-section.offsetTop)/Math.max(1,section.offsetHeight-innerHeight)));
  return{index,scene:section.dataset.scene,local};
}
function updateHero(progress){
  const ease=progress*progress*(3-2*progress);
  const title=document.querySelector(".hero h1");
  const ring=document.querySelector(".hero-ring");
  title.style.transform=`translate(-50%,-50%) translate3d(0,${-ease*8}vh,${-ease*620}px) scale(${1+ease*.72})`;
  title.style.opacity=String(1-Math.max(0,(progress-.62)/.22));
  ring.style.transform=`translate(-50%,-50%) rotateX(${67+ease*10}deg) rotateZ(${ease*118}deg) scale(${1+ease*.72})`;
  document.querySelector(".hero-kicker").style.opacity=String(1-Math.max(0,(progress-.45)*2.5));
  document.querySelector(".hero-intro").style.opacity=String(1-Math.max(0,(progress-.3)*2));
  document.querySelector(".hero-index").style.opacity=String(1-Math.max(0,(progress-.22)*2.2));
}
function transitionWeights(state){
  const weights={};
  sceneOrder.forEach(name=>weights[name]=0);
  const current=state.scene;
  const next=sections[state.index+1]?.dataset.scene;
  const blend=Math.max(0,(state.local-.78)/.22);
  weights[current]=1-blend;
  if(next)weights[next]=blend;
  return weights;
}

let previous=performance.now();
function frame(now){
  requestAnimationFrame(frame);
  const dt=Math.min(.05,(now-previous)/1000);
  previous=now;
  elapsed+=dt;
  const state=scrollState();
  updateHero(Math.max(0,Math.min(1,scrollY/(innerHeight*2.6))));
  scrollSpeed+=(Math.abs(scrollY-lastScroll)/Math.max(1,innerHeight)-scrollSpeed)*.14;
  lastScroll=scrollY;
  scrollSpeed*=.91;
  smoothPointer.lerp(pointer,.055);
  const weights=transitionWeights(state);
  const currentColors=backgrounds[state.scene]||backgrounds.hero;
  const nextName=sections[state.index+1]?.dataset.scene;
  const nextColors=backgrounds[nextName]||currentColors;
  const blend=Math.max(0,(state.local-.78)/.22);
  const base=new THREE.Color(currentColors[0]).lerp(new THREE.Color(currentColors[1]),.46+.12*Math.sin(elapsed*.11));
  const nextColor=new THREE.Color(nextColors[0]).lerp(new THREE.Color(nextColors[1]),.5);
  scene.background=base.lerp(nextColor,blend);

  for(const [name,object] of Object.entries(groups)){
    const target=weights[name]||0;
    let visible=0;
    object.traverse(child=>{
      if(!child.material?.uniforms)return;
      const uniforms=child.material.uniforms;
      uniforms.uOpacity.value+=(target-uniforms.uOpacity.value)*.07;
      visible=Math.max(visible,uniforms.uOpacity.value);
      uniforms.uTime.value=elapsed;
      uniforms.uPointer.value.copy(smoothPointer);
      uniforms.uSpeed.value=Math.min(1,scrollSpeed*28);
      const transition=Math.sin(Math.min(1,state.local/.18)*Math.PI)+Math.sin(Math.max(0,(state.local-.8)/.2)*Math.PI);
      uniforms.uScatter.value+=(transition*.16-uniforms.uScatter.value)*.06;
    });
    object.visible=target>.001||visible>.002;
    object.rotation.y+=dt*(name==="globe"?.11:.018);
    object.rotation.y+=(smoothPointer.x*.12-object.rotation.y)*.012;
    object.rotation.x+=(smoothPointer.y*.06-object.rotation.x)*.015;
  }
  atmosphereGroup.visible=true;
  atmosphere.material.uniforms.uOpacity.value=.18+.08*Math.sin(elapsed*.17);
  atmosphere.material.uniforms.uTime.value=elapsed;
  atmosphere.rotation.y+=dt*.006;
  camera.position.x+=(smoothPointer.x*.12-camera.position.x)*.025;
  camera.position.y+=(smoothPointer.y*.08-camera.position.y)*.025;
  camera.lookAt(0,0,0);
  renderer.render(scene,camera);
}
requestAnimationFrame(frame);
