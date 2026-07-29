import{r as y}from"./chunk-QUQL4437-BD29ZypC.js";import{d as g}from"./index-CplsFZVb.js";import{j as B}from"./jsx-runtime-u17CrQMm.js";import{u as j}from"./constants-xV0ws6Hx.js";import{D as oe,R as ye,F as De,r as ae,br as Se,bs as Te,bt as Me,m as Y,aT as H,bu as k,G as Re,bj as Ee,v as $,bv as Ce,$ as _e,o as ce,Z as we,C as ie,M as ue,y as Be,K as Pe,t as se}from"./TierResolver-y-fGWbnF.js";import{U as J}from"./constants-CblcJfKC.js";import{a as Oe}from"./useAssetLoadingStore-BQ9V8Ec_.js";import{s as Fe}from"./sharedZeroTexture-BkFIhg0y.js";import{s as Ae,D as Ie}from"./layers-CClLq2fm.js";import{u as Ue}from"./SectionFluidVelocityContext-DAYST_2V.js";import{u as Ge}from"./useCanvasPointer-BnFn7xJn.js";const Ye=45,Le=.35,Xe=5400,P=-.08,Ne=102,Ve=-295,ze=4500,We=15e4,je=[.2,.9,.3,.986],He=[0,0,.58,1],ke=600,$e=55,Ze=650,Ke=300,qe=14,K0=2e3,Je="#ffffff",Z=[..."NEXT SECURITIES"].map(t=>({char:t,trackingEm:t===" "?.5:.015})),Q=[Z,Z],K=Q.flatMap((t,e)=>t.map((n,i)=>({...n,wordIndex:e,letterIndex:i})));function Qe(t){const n=(360-t.reduce((d,o)=>d+o,0))/Q.length,i=[];let s=n/2,a=0;for(const d of Q){for(let o=0;o<d.length;o++)i[a]=s+t[a]/2,s+=t[a],a+=1;s+=n}return i}function q0(t,e){return 2*Math.atan(t/2/e)*(180/Math.PI)}function ee(t,e,n,i){const s=3*t,a=3*(n-t)-s,d=1-s-a,o=3*e,l=3*(i-e)-o,m=1-o-l,x=u=>((d*u+a)*u+s)*u,h=u=>((m*u+l)*u+o)*u,S=u=>(3*d*u+2*a)*u+s,_=u=>{let T=u;for(let D=0;D<8;D++){const U=x(T)-u;if(Math.abs(U)<1e-6)return T;const O=S(T);if(Math.abs(O)<1e-6)break;T-=U/O}return T};return u=>u<=0?0:u>=1?1:h(_(u))}function J0(t,e,n,i){const s=y.useRef(i);s.current=i,y.useEffect(()=>{if(!t||!e)return;const a=t.object(e,n,{reconfigure:!0});s.current(a.value);const d=a.onValuesChange(o=>{s.current(o)});return()=>{d(),t.detachObject(e)}},[t,e])}const I=4096;function e0({entries:t,curvesData:e,bandHeaders:n,bandRefs:i,ascender:s,descender:a,unitsPerEm:d}){const o=new Map;t.forEach(D=>o.set(D.codePoint,D));const l=Math.max(1,Math.ceil(e.length/4)),m=Math.ceil(l/I),x=new Float32Array(I*m*4).fill(-1);x.set(e);const h=new oe(x,I,m,ye,De);h.minFilter=h.magFilter=ae,h.needsUpdate=!0;const S=Math.floor(n.length/2)+Math.floor(i.length/2),_=Math.max(1,Math.ceil(S/I)),u=new Uint32Array(I*_*2);u.set(n,0),u.set(i,n.length);const T=new oe(u,I,_,Se,Te);return T.minFilter=T.magFilter=ae,T.needsUpdate=!0,{codePoints:o,curvesTex:h,bandsTex:T,ascender:s,descender:a,unitsPerEm:d}}class t0 extends Me{constructor(e=1024){super();const n=new Float32Array([-1,-1,0,-1,1,0,1,1,0,1,-1,0]),i=new Float32Array([0,0,0,1,1,1,1,0]),s=new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1]),a=new Uint16Array([0,2,1,0,3,2]);this.setIndex(new Y(a,1)),this.setAttribute("position",new Y(n,3)),this.setAttribute("uv",new Y(i,2)),this.setAttribute("normal",new Y(s,3)),this.maxGlyphs=e,this.glyphCount=0,this.aScaleBias=new Float32Array(e*4),this.aGlyphBandScale=new Float32Array(e*4),this.aBandMaxTexCoords=new Float32Array(e*4);const d=new H(this.aScaleBias,4);d.setUsage(k),this.setAttribute("aScaleBias",d);const o=new H(this.aGlyphBandScale,4);o.setUsage(k),this.setAttribute("aGlyphBandScale",o);const l=new H(this.aBandMaxTexCoords,4);l.setUsage(k),this.setAttribute("aBandMaxTexCoords",l),this.instanceCount=0,this.boundingBox=new Re,this.boundingSphere=new Ee}computeBoundingSphere(){!this.boundingBox||this.boundingBox.isEmpty()?this.boundingSphere.set(new $,0):this.boundingBox.getBoundingSphere(this.boundingSphere)}addGlyph(e,n,i,s,a,d,o){if(this.glyphCount>=this.maxGlyphs)return!1;const l=this.glyphCount,m=s/2,x=a/2,h=n+m,S=i+x;return this.aScaleBias[l*4+0]=m,this.aScaleBias[l*4+1]=x,this.aScaleBias[l*4+2]=h,this.aScaleBias[l*4+3]=S,this.boundingBox.expandByPoint(new $(h-m,S-x,0)),this.boundingBox.expandByPoint(new $(h+m,S+x,0)),this.aGlyphBandScale[l*4+0]=e.width,this.aGlyphBandScale[l*4+1]=e.height,this.aGlyphBandScale[l*4+2]=e.width/e.bandDimX,this.aGlyphBandScale[l*4+3]=e.height/e.bandDimY,this.aBandMaxTexCoords[l*4+0]=e.bandCount-1,this.aBandMaxTexCoords[l*4+1]=e.bandCount-1,this.aBandMaxTexCoords[l*4+2]=e.bandsTexCoordX,this.aBandMaxTexCoords[l*4+3]=e.bandsTexCoordY,this.glyphCount++,this.instanceCount=this.glyphCount,!0}updateBuffers(){this.attributes.aScaleBias.needsUpdate=!0,this.attributes.aGlyphBandScale.needsUpdate=!0,this.attributes.aBandMaxTexCoords.needsUpdate=!0,this.computeBoundingSphere()}}const n0=`
precision highp int;
precision highp usampler2D;

in vec2 vTexCoords;
flat in vec4 vGlyphBandScale;
flat in uvec4 vBandMaxTexCoords;

uniform sampler2D curvesTex;
uniform usampler2D bandsTex;

const float epsilon = 0.0001;

#define glyphScale     vGlyphBandScale.xy
#define bandScale      vGlyphBandScale.zw
#define bandMax        vBandMaxTexCoords.xy
#define bandsTexCoords vBandMaxTexCoords.zw

float TraceRayCurveH(vec2 p1, vec2 p2, vec2 p3, float pixelsPerEm)
{
    if(max(max(p1.x, p2.x), p3.x) * pixelsPerEm < -0.5)
    {
        return 0.0;
    }

    uint code = (0x2E74U >> (((p1.y > 0.0) ? 2U : 0U) + ((p2.y > 0.0) ? 4U : 0U) + ((p3.y > 0.0) ? 8U : 0U))) & 3U;
    if(code == 0U)
    {
        return 0.0;
    }

    vec2 a = p1 - p2 * 2.0 + p3;
    vec2 b = p1 - p2;
    float c = p1.y;
    float ayr = 1.0 / a.y;
    float d = sqrt(max(b.y * b.y - a.y * c, 0.0));
    float t1 = (b.y - d) * ayr;
    float t2 = (b.y + d) * ayr;

    if(abs(a.y) < epsilon)
    {
        t1 = t2 = c / (2.0 * b.y);
    }

    float coverage = 0.0;

    if((code & 1U) != 0U)
    {
        float x1 = (a.x * t1 - b.x * 2.0) * t1 + p1.x;
        float cov_c = clamp(x1 * pixelsPerEm + 0.5, 0.0, 1.0);
        coverage += cov_c;
    }

    if(code > 1U)
    {
        float x2 = (a.x * t2 - b.x * 2.0) * t2 + p1.x;
        float cov_c = clamp(x2 * pixelsPerEm + 0.5, 0.0, 1.0);
        coverage -= cov_c;
    }

    return coverage;
}

float TraceRayBandH(uvec2 bandData, float pixelsPerEm)
{
    float coverage = 0.0;
    for(uint curve = 0U; curve < bandData.x; ++curve)
    {
        uint curveOffset = bandData.y + curve;
        ivec2 curveLoc = ivec2(texelFetch(bandsTex, ivec2(curveOffset & 0xFFFU, curveOffset >> 12U), 0).xy);
        vec4 p12 = texelFetch(curvesTex, curveLoc, 0) / vec4(glyphScale, glyphScale) - vec4(vTexCoords, vTexCoords);
        vec2 p3 = texelFetch(curvesTex, ivec2(curveLoc.x + 1, curveLoc.y), 0).xy / glyphScale - vTexCoords;
        coverage += TraceRayCurveH(p12.xy, p12.zw, p3.xy, pixelsPerEm);
    }
    return coverage;
}

float TraceRayBandV(uvec2 bandData, float pixelsPerEm)
{
    float coverage = 0.0;
    for(uint curve = 0U; curve < bandData.x; ++curve)
    {
        uint curveOffset = bandData.y + curve;
        ivec2 curveLoc = ivec2(texelFetch(bandsTex, ivec2(curveOffset & 0xFFFU, curveOffset >> 12U), 0).xy);
        vec4 p12 = texelFetch(curvesTex, curveLoc, 0) / vec4(glyphScale, glyphScale) - vec4(vTexCoords, vTexCoords);
        vec2 p3 = texelFetch(curvesTex, ivec2(curveLoc.x + 1, curveLoc.y), 0).xy / glyphScale - vTexCoords;
        coverage += TraceRayCurveH(p12.yx, p12.wz, p3.yx, pixelsPerEm);
    }
    return coverage;
}
`,r0=`
    vec2 fdx = dFdx(vTexCoords);
    vec2 fdy = dFdy(vTexCoords);
    // Modern WebGL GPUs legally return 0.0 for fragment derivatives inside colorless Depth-Only passes!
    // A strict mechanical floor guarantees we never divide-by-zero -> Infinity.
    vec2 fw = max(max(abs(fdx), abs(fdy)), vec2(0.000001));
    vec2 pixelsPerEm = vec2(1.0 / fw.x, 1.0 / fw.y);

    // Shadow cameras evaluate text at a sub-pixel size and the algorithm aggressively culls it into alpha 0.0.
    // Clamping to a high resolution floor forces solid strokes when drawn locally into a shadow mapping buffer!
    pixelsPerEm = clamp(pixelsPerEm, vec2(1.0), vec2(200.0));

    uvec2 bandIndex = uvec2(clamp(uvec2(vTexCoords * bandScale), uvec2(0U, 0U), bandMax));

    uint hBandOffset = bandsTexCoords.y * 4096U + bandsTexCoords.x + bandIndex.y;
    uvec2 hBandData = texelFetch(bandsTex, ivec2(hBandOffset & 0xFFFU, hBandOffset >> 12U), 0).xy;

    uint vBandOffset = bandsTexCoords.y * 4096U + bandsTexCoords.x + bandMax.y + 1U + bandIndex.x;
    uvec2 vBandData = texelFetch(bandsTex, ivec2(vBandOffset & 0xFFFU, vBandOffset >> 12U), 0).xy;

    float coverageX = TraceRayBandH(hBandData, pixelsPerEm.x);
    float coverageY = TraceRayBandV(vBandData, pixelsPerEm.y);

    coverageX = min(abs(coverageX), 1.0);
    coverageY = min(abs(coverageY), 1.0);
    float slugAlpha = (coverageX + coverageY) * 0.5;
`,o0=`
in vec4 aScaleBias;
in vec4 aGlyphBandScale;
in vec4 aBandMaxTexCoords;

out vec2 vTexCoords;
flat out vec4 vGlyphBandScale;
flat out uvec4 vBandMaxTexCoords;
`,a0=`
    vec3 transformed = vec3( position.xy * aScaleBias.xy + aScaleBias.zw, 0.0 );
    vTexCoords = position.xy * 0.5 + 0.5;
    
    #ifdef SLUG_MODELSPACE_UV
    #ifdef USE_UV
    vUv = transformed.xy;
    #endif
    #ifdef USE_MAP
    
    
    vMapUv = ( mapTransform * vec3( vec2(length(modelMatrix[0].xyz)*transformed.x,length(modelMatrix[2].xyz)*transformed.y), 1.0 ) ).xy;
    #endif
    #endif

    vGlyphBandScale = aGlyphBandScale;
    vBandMaxTexCoords = uvec4(aBandMaxTexCoords);
`,i0=`
precision highp float;
${n0}
uniform vec3 uColor;
// Left-to-right reveal in glyph-local space (0 = hidden, 1 = fully shown).
// vTexCoords.x runs 0→1 across the glyph quad, so this matches a CSS
// clip-path inset(0 right% 0 0) wipe and rotates with the glyph for free.
uniform float uReveal;
// Global fade multiplier, driven by the host's Theatre opacity.
uniform float uOpacity;

out vec4 fragColor;

void main() {
    if (vTexCoords.x > uReveal) discard;
${r0}
    if (slugAlpha < 0.001) discard;
    fragColor = vec4(uColor, slugAlpha * uOpacity);
}
`,s0=`
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform sampler2D uFluidVelocity;
uniform float uFluidInfluence;
in vec2 position;
${o0}
void main() {
${a0}
    vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
    vec4 clip = projectionMatrix * mv;
    if (uFluidInfluence > 0.0001 && clip.w > 0.0001) {
      vec2 screenUv = clamp(clip.xy / clip.w * 0.5 + 0.5, 0.0, 1.0);
      vec2 fluidVel = texture(uFluidVelocity, screenUv).xy;
      float depthAtten = 1.0 / (1.0 + max(-mv.z, 0.0) * 0.3);
      mv.xy += fluidVel * uFluidInfluence * 0.02 * depthAtten;
      clip = projectionMatrix * mv;
    }
    gl_Position = clip;
}
`;class l0 extends Ce{constructor(e={}){super({vertexShader:s0,fragmentShader:i0,uniforms:{curvesTex:{value:null},bandsTex:{value:null},uColor:{value:new ie(1,1,1)},uReveal:{value:1},uOpacity:{value:1},uFluidVelocity:{value:null},uFluidInfluence:{value:0}},transparent:!0,depthWrite:!1,blending:we,side:ce,glslVersion:_e}),e.curvesTex&&(this.uniforms.curvesTex.value=e.curvesTex),e.bandsTex&&(this.uniforms.bandsTex.value=e.bandsTex),e.color&&(this.uniforms.uColor.value=new ie(e.color))}}const c0=[{codePoint:-1,width:0,height:0,advanceWidth:658,bearingX:0,bearingY:0,bandCount:0,bandDimX:0,bandDimY:0,bandsTexCoordX:0,bandsTexCoordY:0},{codePoint:69,width:420,height:668,advanceWidth:577,bearingX:93,bearingY:0,bandCount:16,bandDimX:27,bandDimY:42,bandsTexCoordX:0,bandsTexCoordY:0},{codePoint:118,width:450,height:500,advanceWidth:504,bearingX:27,bearingY:0,bandCount:16,bandDimX:29,bandDimY:32,bandsTexCoordX:32,bandsTexCoordY:0},{codePoint:101,width:417,height:524,advanceWidth:520,bearingX:52,bearingY:-12,bandCount:16,bandDimX:27,bandDimY:33,bandsTexCoordX:64,bandsTexCoordY:0},{codePoint:114,width:264,height:512,advanceWidth:375,bearingX:88,bearingY:0,bandCount:16,bandDimX:17,bandDimY:33,bandsTexCoordX:96,bandsTexCoordY:0},{codePoint:121,width:450,height:710,advanceWidth:504,bearingX:27,bearingY:-210,bandCount:16,bandDimX:29,bandDimY:45,bandsTexCoordX:128,bandsTexCoordY:0},{codePoint:119,width:654,height:500,advanceWidth:708,bearingX:27,bearingY:0,bandCount:16,bandDimX:41,bandDimY:32,bandsTexCoordX:160,bandsTexCoordY:0},{codePoint:104,width:393,height:722,advanceWidth:564,bearingX:88,bearingY:0,bandCount:16,bandDimX:25,bandDimY:46,bandsTexCoordX:192,bandsTexCoordY:0}],u0=[82,303,82,188.5,82,74,251,74,420,74,420,37,420,0,210,0,0,0,0,334,0,668,210,668,420,668,420,631,420,594,251,594,82,594,82,485.5,82,377,232.5,377,383,377,383,340,383,303,232.5,303,82,303,-1,-1,0,500,43.5,500,87,500,156.5,293.5,226,87,227,87,228,87,298,293.5,368,500,409,500,450,500,358.5,250,267,0,225,0,183,0,91.5,250,0,500,-1,-1,223,65,270,65,300,88,330,111,341,156,376.5,146,412,136,396,70,347,35,298,0,223,0,118,0,59,68,0,136,0,260,0,381,60,452,121,524,223,524,312,524,364,466,417,409,417,314,417,295,414,277,411,259,407,247,243,247,79,247,82,160,119,112,157,65,223,65,-1,-1,221,461,162,461,125,421,89,381,81,307,208,307,335,307,336,312,336,317,336,323,336,333,336,390,304,425,273,461,221,461,-1,-1,82,0,41,0,0,0,0,250,0,500,32.5,500,65,500,70.5,436,76,372,90,435,134,473,178,512,235,512,242,512,249,511,257,510,264,509,261.5,466,259,423,253,424,242,425,231,426,219,426,157,426,119,379,82,332,82,253,82,126.5,82,0,-1,-1,87,710,156,499,225,288,226,288,227,288,297.5,499,368,710,409,710,450,710,355,446.5,260,183,224,84,184,42,144,0,83,0,65,0,47,5,29,10,13,19,19,53,25,87,45,75,56,72,68,68,81,68,118,68,139,92,160,116,186,189,93,449.5,0,710,43.5,710,87,710,-1,-1,185,98,186,98,187,98,239,299,291,500,328,500,365,500,417,299,469,98,470,98,471,98,523,299,575,500,614.5,500,654,500,583,250,512,0,472,0,432,0,380,197,328,394,327,394,326,394,274,197,222,0,182,0,142,0,71,250,0,500,40.5,500,81,500,133,299,185,98,-1,-1,0,0,0,361,0,722,41,722,82,722,82,571.5,82,421,105,465,145,488,186,512,239,512,309,512,351,468,393,425,393,351,393,175.5,393,0,352,0,311,0,311,167,311,334,311,385,285,412,260,440,213,440,151,440,116,401,82,362,82,290,82,145,82,0,41,0,0,0],d0=[2,224,3,226,2,229,2,231,2,233,2,235,2,237,3,239,3,242,2,245,2,247,2,249,2,251,2,253,3,255,2,258,2,260,2,262,2,264,6,266,6,272,6,278,6,284,6,290,6,296,6,302,6,308,6,314,6,320,6,326,6,332,4,338,2,342,2,344,4,346,4,350,4,354,4,358,4,362,4,366,4,370,4,374,4,378,4,382,4,386,4,390,4,394,4,398,2,402,2,404,3,406,3,409,2,412,2,414,3,416,4,419,2,423,3,425,2,428,2,430,3,432,2,435,2,437,2,439,2,441,5,443,6,448,5,454,5,459,2,464,2,466,4,468,3,472,6,475,5,481,4,486,6,490,5,496,3,501,2,504,2,506,2,508,8,510,6,518,8,524,6,532,6,538,6,544,10,550,6,560,6,566,8,572,9,580,5,589,4,594,6,598,2,604,2,606,2,608,2,610,2,612,2,614,2,616,3,618,2,621,2,623,2,625,5,627,7,632,4,639,5,643,6,648,2,654,2,656,2,658,3,660,4,663,2,667,3,669,4,672,2,676,2,678,2,680,2,682,3,684,3,687,4,690,3,694,5,697,5,702,3,707,2,710,4,712,2,716,4,718,4,722,4,726,4,730,4,734,4,738,4,742,4,746,4,750,4,754,5,758,6,763,7,769,5,776,5,781,4,786,5,790,4,795,3,799,2,802,2,804,2,806,3,808,2,811,2,813,2,815,4,817,4,821,4,825,8,829,8,837,8,845,8,853,8,861,8,869,8,877,8,885,8,893,8,901,6,909,6,915,6,921,2,927,3,929,2,932,3,934,4,937,3,941,2,944,5,946,4,951,2,955,3,957,4,960,3,964,2,967,3,969,2,972,4,974,4,978,4,982,4,986,4,990,4,994,5,998,6,1003,6,1009,6,1015,6,1021,4,1027,2,1031,2,1033,2,1035,2,1037,2,1039,2,1041,2,1043,4,1045,3,1049,3,1052,2,1055,2,1057,3,1059,3,1062,2,1065,3,1067,3,1070,2,1073,3,1075,2,1078],p0=[2,0,4,0,2,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,0,0,4,0,10,0,0,0,4,0,10,0,8,0,4,0,8,0,4,0,8,0,4,0,8,0,4,0,8,0,4,0,8,0,4,0,6,0,8,0,4,0,6,0,4,0,5,0,3,0,5,0,3,0,5,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,9,0,11,0,1,0,3,0,5,0,7,0,1,0,3,0,18,0,20,0,18,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,18,0,16,0,14,0,20,0,13,0,20,0,13,0,20,0,13,0,14,0,20,0,13,0,14,0,20,0,14,0,20,0,14,0,20,0,14,0,20,0,19,0,14,0,16,0,15,0,19,0,16,0,19,0,16,0,18,0,19,0,16,0,18,0,16,0,18,0,16,0,17,0,18,0,17,0,18,0,17,0,18,0,17,0,18,0,26,0,27,0,25,0,26,0,22,0,27,0,37,0,25,0,23,0,22,0,27,0,37,0,28,0,25,0,23,0,37,0,36,0,28,0,24,0,25,0,23,0,36,0,28,0,36,0,28,0,36,0,28,0,34,0,36,0,29,0,28,0,33,0,34,0,29,0,32,0,33,0,42,0,43,0,40,0,29,0,32,0,43,0,44,0,40,0,29,0,32,0,44,0,40,0,29,0,32,0,44,0,45,0,39,0,40,0,29,0,32,0,45,0,30,0,39,0,29,0,32,0,31,0,30,0,31,0,30,0,29,0,28,0,29,0,28,0,30,0,29,0,40,0,41,0,28,0,35,0,36,0,27,0,30,0,40,0,41,0,35,0,36,0,27,0,30,0,39,0,40,0,41,0,35,0,36,0,37,0,27,0,30,0,39,0,41,0,35,0,37,0,27,0,30,0,39,0,41,0,35,0,37,0,27,0,30,0,39,0,41,0,35,0,37,0,27,0,30,0,31,0,39,0,45,0,41,0,35,0,37,0,22,0,27,0,26,0,31,0,45,0,41,0,35,0,22,0,26,0,31,0,45,0,41,0,35,0,22,0,26,0,31,0,45,0,44,0,41,0,35,0,23,0,22,0,26,0,31,0,44,0,42,0,41,0,35,0,23,0,24,0,25,0,26,0,31,0,32,0,35,0,24,0,25,0,32,0,35,0,24,0,25,0,32,0,33,0,34,0,35,0,24,0,25,0,60,0,48,0,60,0,48,0,60,0,48,0,60,0,48,0,60,0,48,0,60,0,48,0,60,0,48,0,59,0,60,0,48,0,59,0,48,0,59,0,48,0,59,0,48,0,58,0,51,0,59,0,50,0,48,0,55,0,56,0,57,0,58,0,51,0,50,0,48,0,55,0,51,0,50,0,48,0,55,0,52,0,51,0,50,0,48,0,54,0,55,0,53,0,52,0,50,0,48,0,49,0,47,0,49,0,47,0,49,0,47,0,49,0,50,0,47,0,50,0,51,0,59,0,47,0,51,0,59,0,51,0,58,0,59,0,52,0,51,0,58,0,59,0,52,0,58,0,52,0,58,0,52,0,58,0,52,0,58,0,52,0,57,0,58,0,52,0,53,0,57,0,53,0,54,0,57,0,56,0,54,0,55,0,56,0,67,0,68,0,69,0,70,0,71,0,67,0,74,0,73,0,72,0,71,0,67,0,75,0,74,0,67,0,75,0,66,0,67,0,75,0,76,0,66,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,66,0,64,0,62,0,76,0,76,0,77,0,71,0,72,0,70,0,76,0,77,0,72,0,73,0,70,0,69,0,62,0,76,0,77,0,74,0,73,0,68,0,69,0,62,0,76,0,77,0,74,0,68,0,62,0,76,0,75,0,74,0,68,0,62,0,76,0,75,0,68,0,62,0,76,0,75,0,67,0,68,0,62,0,64,0,63,0,67,0,64,0,66,0,67,0,64,0,66,0,64,0,66,0,64,0,66,0,64,0,65,0,66,0,65,0,66,0,65,0,66,0,65,0,66,0,86,0,88,0,90,0,92,0,86,0,88,0,90,0,92,0,86,0,88,0,90,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,88,0,90,0,80,0,94,0,92,0,86,0,84,0,82,0,80,0,94,0,92,0,86,0,84,0,82,0,80,0,94,0,92,0,86,0,84,0,82,0,80,0,94,0,92,0,92,0,93,0,92,0,93,0,94,0,92,0,94,0,92,0,94,0,91,0,80,0,94,0,79,0,91,0,80,0,90,0,91,0,80,0,90,0,80,0,81,0,88,0,89,0,90,0,81,0,82,0,88,0,89,0,82,0,88,0,82,0,88,0,87,0,82,0,84,0,83,0,87,0,84,0,86,0,87,0,84,0,86,0,84,0,85,0,86,0,85,0,86,0,103,0,105,0,110,0,96,0,103,0,105,0,110,0,96,0,103,0,105,0,110,0,96,0,103,0,105,0,110,0,96,0,103,0,105,0,110,0,96,0,103,0,105,0,110,0,96,0,103,0,105,0,109,0,110,0,96,0,102,0,103,0,105,0,106,0,109,0,96,0,102,0,106,0,107,0,108,0,109,0,96,0,102,0,107,0,108,0,99,0,98,0,96,0,102,0,101,0,100,0,99,0,98,0,96,0,101,0,100,0,98,0,96,0,98,0,96,0,98,0,96,0,98,0,96,0,98,0,96,0,97,0,111,0,97,0,111,0,97,0,111,0,97,0,99,0,109,0,111,0,99,0,108,0,109,0,100,0,99,0,108,0,100,0,108,0,100,0,108,0,100,0,107,0,108,0,100,0,101,0,107,0,101,0,107,0,101,0,107,0,106,0,101,0,106,0,104,0,101,0,104,0,101,0,102,0,104,0,102,0,104,0],g0=983,f0=-263,v0=1e3,x0={entries:c0,curvesData:u0,bandHeaders:d0,bandRefs:p0,ascender:g0,descender:f0,unitsPerEm:v0},le=180,h0=2;function m0(t,e,n){return t||!e?0:Math.max(n,0)}function b0(){return{scrollSpinDeg:0,scrollYOffset:0,scrollOriginY:null,lastScrollY:null}}function y0(t,e){t.lastScrollY=e,t.scrollOriginY=e,t.scrollYOffset=0}function D0(t,e,n){return t.scrollOriginY!==null&&t.scrollOriginY>n&&e<=h0?(t.scrollOriginY=0,t.lastScrollY=e,!0):!1}function S0(t,e,n){const i=t.lastScrollY,s=t.scrollOriginY??e;if(t.scrollOriginY=s,t.lastScrollY=e,t.scrollYOffset=Math.max(0,(e-s)*n.scrollYPerPx),i!==null){const a=Math.max(-le,Math.min(le,e-i));t.scrollSpinDeg-=a*n.scrollSpinDegPerPx}return{scrollSpin:t.scrollSpinDeg,scrollY:t.scrollYOffset}}const F=Math.PI/180,T0=.1,M0=600,R0=.12,E0=.01,C0=2.5,_0=18,w0=8,q=ee(...He),r={ringFromDeg:Ne,ringToDeg:Ve,introDurationMs:ze,introBezier:je,ambientDurationMs:We,scrollSpinDegPerPx:R0,scrollYPerPx:E0,pointerRepulseEnabled:!0,pointerRepulseStrength:C0,pointerXRotationDeg:_0,pointerXRotationDamping:w0,wordStaggerMs:ke,letterStaggerMs:$e,slideDurationMs:Ze,wipeDurationMs:Ke,revealSweepDeg:qe,ringTiltDeg:18,reverseSpin:!1,radiusVmin:Ye,letterSizeRatio:Le,perspectivePx:Xe,letterColor:Je};function B0(t){let e=t?.parent;for(;e;){const n=e.userData.theatreOpacity;if(typeof n=="number")return n;e=e.parent}return 1}function P0(t,e,n){const i=t-J;if(i<=0)return e.ringFromDeg;if(i<e.introDurationMs)return e.ringFromDeg+(e.ringToDeg-e.ringFromDeg)*n(i/e.introDurationMs);const s=i-e.introDurationMs;return e.ringToDeg-360*(s/e.ambientDurationMs)}function O0(t,e,n,i,s){const a=new t0(1),d=t.codePoints.get(e.codePointAt(0)??0);d&&(a.addGlyph(d,-d.advanceWidth/2+d.bearingX,d.bearingY,d.width,d.height,0,0),a.updateBuffers());const o=new l0({curvesTex:t.curvesTex,bandsTex:t.bandsTex,color:s});o.uniforms.uReveal.value=0;const l=new ue(a,o);l.frustumCulled=!1,l.scale.setScalar(n);const m=(t.ascender+t.descender)/2;l.position.set(0,-m*n,i);const x=new Pe;return x.add(l),Ae(x,Ie),{group:x,material:o,resting:0}}function Q0({controls:t,controlsRef:e,scrubMs:n=null,waitForLoading:i=!0,debug:s=!1,width:a,children:d}){const o=t??e?.current??r,l=a===void 0?1:a/90,m=y.useRef(null),x=y.useRef(null),h=y.useRef([]),S=y.useRef(!1),_=y.useRef(null),u=y.useRef(b0()),T=Ue(),D=y.useMemo(()=>e0(x0),[]);y.useEffect(()=>()=>{D.curvesTex.dispose(),D.bandsTex.dispose()},[D]);const U=y.useRef(o);U.current=o;const O=e??U,te=y.useRef(ee(...o.introBezier)),ne=y.useRef(o.introBezier),de=v=>{const c=ne.current,p=v.introBezier;return p!==c&&(p[0]!==c[0]||p[1]!==c[1]||p[2]!==c[2]||p[3]!==c[3])&&(ne.current=p,te.current=ee(...p)),te.current};y.useEffect(()=>{n===null&&(_.current=null)},[n]),y.useEffect(()=>{const v=x.current;if(!D||!v)return;const{unitsPerEm:c}=D,p=K.map(({char:b,trackingEm:R})=>((D.codePoints.get(b.codePointAt(0)??0)?.advanceWidth??0)/c+R)*o.letterSizeRatio*(180/Math.PI)),C=Qe(p),M=o.radiusVmin*o.letterSizeRatio/c;return h.current=K.map(({char:b},R)=>{const w=O0(D,b,M,o.radiusVmin,o.letterColor);return w.resting=C[R],w.group.rotation.y=(C[R]-O.current.revealSweepDeg)*F,v.add(w.group),w}),S.current=!0,()=>{S.current=!1,h.current.forEach(({group:b})=>{b.parent?.remove(b),b.traverse(R=>{R instanceof ue&&(R.geometry.dispose(),R.material.dispose())})}),h.current=[]}},[D,o.radiusVmin,o.letterSizeRatio,o.letterColor,O]);const L=(v,c,p=0,C=0,M=0)=>{const b=j.getState().preferReducedMotion,R=b?q(se.clamp((v-J)/M0,0,1)):1;if(m.current){const E=b?-.9*(1-R):0;m.current.position.y=C+E,m.current.rotation.x=c.ringTiltDeg*F}if(x.current){const E=c.reverseSpin?-1:1;if(b)x.current.rotation.y=E*(c.ringToDeg+p*T0)*F;else{const A=E*(P0(v,c,de(c))+p);x.current.rotation.y=(A+M)*F}}if(!S.current)return;const w=B0(m.current);if(b){for(const{group:E,material:A,resting:G}of h.current)A.uniforms.uOpacity.value=w*R,A.uniforms.uReveal.value=1,E.rotation.y=G*F;return}for(let E=0;E<h.current.length;E++){const{group:A,material:G,resting:ve}=h.current[E],{wordIndex:xe,letterIndex:he}=K[E];G.uniforms.uOpacity.value=0;const re=J+xe*c.wordStaggerMs,z=v-re,me=z<=0?-c.revealSweepDeg:z<c.slideDurationMs?-c.revealSweepDeg*(1-q(z/c.slideDurationMs)):0;A.rotation.y=(ve+me)*F;const be=re+he*c.letterStaggerMs,W=v-be;G.uniforms.uReveal.value=W<=0?0:W<c.wipeDurationMs?q(W/c.wipeDurationMs):1}},X=()=>{typeof window>"u"||y0(u.current,window.scrollY)},pe=()=>{if(typeof window>"u")return{scrollSpin:u.current.scrollSpinDeg,scrollY:u.current.scrollYOffset};const v=u.current;return D0(v,window.scrollY,window.innerHeight),S0(v,window.scrollY,O.current)},ge=Ge(),N=y.useRef(0),fe=(v,c,p)=>{const M=c.active&&!j.getState().preferReducedMotion?c.x*v.pointerXRotationDeg:0,b=1-Math.exp(-Math.max(0,v.pointerXRotationDamping)*p);return N.current=se.lerp(N.current,M,b),N.current},V=v=>{if(!S.current)return;const c=j.getState().preferReducedMotion,p=T?.current??Fe(),C=m0(c,v.pointerRepulseEnabled,v.pointerRepulseStrength);for(const{material:M}of h.current)M.uniforms.uFluidVelocity.value=p,M.uniforms.uFluidInfluence.value=C};return Be((v,c)=>{const p=O.current,C=v.clock.getElapsedTime()*1e3,M=fe(p,ge.current,c);if(n!==null){X(),L(n,p,0,0,M),V(p);return}if(_.current===null){if(!(S.current&&(!i||Oe.getState().isLoadingComplete))){X(),L(0,p,0,0,M),V(p);return}_.current=C,X()}const b=pe();L(C-_.current,p,b.scrollSpin,b.scrollY,M),V(p)}),B.jsxs("group",{ref:m,"rotation-x":o.ringTiltDeg*F,scale:[l,l,l],children:[B.jsx("group",{ref:x}),d,s&&B.jsxs(B.Fragment,{children:[B.jsxs("mesh",{"rotation-x":-Math.PI/2,children:[B.jsx("ringGeometry",{args:[o.radiusVmin*.99,o.radiusVmin,128]}),B.jsx("meshBasicMaterial",{color:"#ff2d78",side:ce,transparent:!0,opacity:.7})]}),B.jsx("axesHelper",{args:[o.radiusVmin]})]})]})}const f={spin:{fromDeg:r.ringFromDeg,toDeg:r.ringToDeg,ambientMs:r.ambientDurationMs,tiltDeg:r.ringTiltDeg,reverse:r.reverseSpin,pointerXDeg:r.pointerXRotationDeg,pointerXDamping:r.pointerXRotationDamping},intro:{durationMs:r.introDurationMs,ease:r.introBezier.join(", ")},scroll:{spinDegPerPx:r.scrollSpinDegPerPx,yPerPx:r.scrollYPerPx},pointerRepulse:{enabled:r.pointerRepulseEnabled,strength:r.pointerRepulseStrength},reveal:{wordStaggerMs:r.wordStaggerMs,letterStaggerMs:r.letterStaggerMs,slideDurationMs:r.slideDurationMs,wipeDurationMs:r.wipeDurationMs,sweepDeg:r.revealSweepDeg}},F0={fromDeg:g.types.number(f.spin.fromDeg,{range:[-360,360],nudgeMultiplier:1}),toDeg:g.types.number(f.spin.toDeg,{range:[-720,360],nudgeMultiplier:1}),ambientMs:g.types.number(f.spin.ambientMs,{range:[2e3,3e5],nudgeMultiplier:1e3}),tiltDeg:g.types.number(f.spin.tiltDeg,{range:[-90,90],nudgeMultiplier:1}),reverse:g.types.boolean(f.spin.reverse),pointerXDeg:g.types.number(f.spin.pointerXDeg,{range:[-90,90],nudgeMultiplier:1}),pointerXDamping:g.types.number(f.spin.pointerXDamping,{range:[1,40],nudgeMultiplier:1})},A0={durationMs:g.types.number(f.intro.durationMs,{range:[0,1e4],nudgeMultiplier:50}),ease:g.types.string(f.intro.ease)},I0={spinDegPerPx:g.types.number(f.scroll.spinDegPerPx,{range:[-1,1],nudgeMultiplier:.01}),yPerPx:g.types.number(f.scroll.yPerPx,{range:[0,.1],nudgeMultiplier:.001})},U0={enabled:g.types.boolean(f.pointerRepulse.enabled),strength:g.types.number(f.pointerRepulse.strength,{range:[0,20],nudgeMultiplier:.1})},G0={wordStaggerMs:g.types.number(f.reveal.wordStaggerMs,{range:[0,2e3],nudgeMultiplier:10}),letterStaggerMs:g.types.number(f.reveal.letterStaggerMs,{range:[0,500],nudgeMultiplier:5}),slideDurationMs:g.types.number(f.reveal.slideDurationMs,{range:[0,3e3],nudgeMultiplier:10}),wipeDurationMs:g.types.number(f.reveal.wipeDurationMs,{range:[0,2e3],nudgeMultiplier:10}),sweepDeg:g.types.number(f.reveal.sweepDeg,{range:[0,90],nudgeMultiplier:1})},et={spin:g.types.compound(F0,{label:"spin"}),intro:g.types.compound(A0,{label:"intro"}),scroll:g.types.compound(I0,{label:"scroll"}),pointerRepulse:g.types.compound(U0,{label:"pointer repulse"}),reveal:g.types.compound(G0,{label:"reveal"})};function Y0(t){const e=t.split(",").map(n=>parseFloat(n.trim()));return e.length===4&&e.every(Number.isFinite)?[e[0],e[1],e[2],e[3]]:[...r.introBezier]}function tt(){return{spin:{...f.spin},intro:{...f.intro},scroll:{...f.scroll},pointerRepulse:{...f.pointerRepulse},reveal:{...f.reveal}}}function nt(t){const e=t.spin,n=t.intro,i=t.scroll,s=t.pointerRepulse,a=t.reveal;return{...r,ringFromDeg:e?.fromDeg??r.ringFromDeg,ringToDeg:e?.toDeg??r.ringToDeg,introDurationMs:n?.durationMs??r.introDurationMs,introBezier:Y0(n?.ease??r.introBezier.join(", ")),ambientDurationMs:e?.ambientMs??r.ambientDurationMs,scrollSpinDegPerPx:i?.spinDegPerPx??r.scrollSpinDegPerPx,scrollYPerPx:i?.yPerPx??r.scrollYPerPx,pointerRepulseEnabled:s?.enabled??r.pointerRepulseEnabled,pointerRepulseStrength:s?.strength??r.pointerRepulseStrength,pointerXRotationDeg:e?.pointerXDeg??r.pointerXRotationDeg,pointerXRotationDamping:e?.pointerXDamping??r.pointerXRotationDamping,ringTiltDeg:e?.tiltDeg??r.ringTiltDeg,reverseSpin:e?.reverse??r.reverseSpin,wordStaggerMs:a?.wordStaggerMs??r.wordStaggerMs,letterStaggerMs:a?.letterStaggerMs??r.letterStaggerMs,slideDurationMs:a?.slideDurationMs??r.slideDurationMs,wipeDurationMs:a?.wipeDurationMs??r.wipeDurationMs,revealSweepDeg:a?.sweepDeg??r.revealSweepDeg}}export{r as D,K0 as F,K as H,Le as L,Xe as P,Ye as R,ke as W,Q0 as a,F0 as b,tt as c,A0 as d,I0 as e,U0 as f,G0 as g,f as h,et as i,q0 as j,$e as k,Qe as l,qe as m,nt as r,J0 as u};
//# sourceMappingURL=heroRingTheatreControls-CXZse0Qa.js.map
