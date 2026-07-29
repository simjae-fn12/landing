async function inflate(bytes){
  const ds=new DecompressionStream("deflate");
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(ds)).arrayBuffer());
}
function unpack12(bytes,total){
  const out=new Uint16Array(total);let j=0;
  for(let i=0;i+2<bytes.length&&j<total;i+=3){
    out[j++]=bytes[i]|((bytes[i+1]&15)<<8);
    if(j<total)out[j++]=(bytes[i+1]>>4)|(bytes[i+2]<<4);
  }
  return out;
}
self.onmessage=async({data})=>{
  const {id,url,limit}=data;
  try{
    const raw=new Uint8Array(await fetch(url).then(r=>r.arrayBuffer()));
    const view=new DataView(raw.buffer),hlen=view.getUint32(0,true);
    const meta=JSON.parse(new TextDecoder().decode(raw.slice(4,4+hlen)));
    let o=4+hlen;
    const pos=await inflate(raw.slice(o,o+meta.posLen));o+=meta.posLen;
    const yy=await inflate(raw.slice(o,o+meta.yLen));o+=meta.yLen;
    const cb=await inflate(raw.slice(o,o+meta.cbLen));o+=meta.cbLen;
    const cr=await inflate(raw.slice(o,o+meta.crLen));
    const q=unpack12(pos,meta.N*3),step=Math.max(1,Math.floor(meta.N/limit)),count=Math.ceil(meta.N/step);
    const pp=new Float32Array(count*3),cc=new Float32Array(count*3),[x0,y0,z0,x1,y1,z1]=meta.bbox;
    for(let i=0,k=0;i<meta.N;i+=step,k++){
      pp[k*3]=x0+(q[i]/4095)*(x1-x0);
      pp[k*3+1]=y0+(q[meta.N+i]/4095)*(y1-y0);
      pp[k*3+2]=z0+(q[meta.N*2+i]/4095)*(z1-z0);
      const Y=yy[i]??128,Cb=(cb[Math.floor(i/meta.chromaSub)]??128)-128,Cr=(cr[Math.floor(i/meta.chromaSub)]??128)-128;
      cc[k*3]=Math.min(255,Math.max(0,Y+1.402*Cr))/255;
      cc[k*3+1]=Math.min(255,Math.max(0,Y-.344*Cb-.714*Cr))/255;
      cc[k*3+2]=Math.min(255,Math.max(0,Y+1.772*Cb))/255;
    }
    self.postMessage({id,positions:pp,colors:cc,count},[pp.buffer,cc.buffer]);
  }catch(error){self.postMessage({id,error:String(error?.message||error)})}
};
