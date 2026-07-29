import{_ as g}from"./preload-helper-DO1ztSUD.js";const r=560,p=300,f=-135,a="rotateX(18deg) rotateY(-295deg)",s="animation:spring-2026-console-art-spin 120s linear infinite",_="color: #1a1a1a; color: CanvasText;",u="Shopify Editions | Spring ’26",S=`███████╗██╗   ██╗███████╗██████╗ ██╗   ██╗██╗    ██╗██╗  ██╗███████╗██████╗ ███████╗
██╔════╝██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝██║    ██║██║  ██║██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██████╔╝ ╚████╔╝ ██║ █╗ ██║███████║█████╗  ██████╔╝█████╗  
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗  ╚██╔╝  ██║███╗██║██╔══██║██╔══╝  ██╔══██╗██╔══╝  
███████╗ ╚████╔╝ ███████╗██║  ██║   ██║   ╚███╔███╔╝██║  ██║███████╗██║  ██║███████╗
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝`;let i=!1;function m(o){const e=encodeURIComponent(o).replace(/%([0-9A-F]{2})/g,(n,t)=>String.fromCharCode(parseInt(t,16)));return`data:image/svg+xml;base64,${btoa(e)}`}function O(o,e){const n=e?`transform:${a}`:`transform:${a};${s}`;return o.replace("<style>","<style>:root{color-scheme:light dark}").replace("color:#000;",_).replace(s,n)}async function R(o){if(i||typeof window>"u")return;i=!0;const e=o?.trim()||u,n=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches===!0,t=window.navigator.userAgent.toLowerCase();if(t.includes("safari")&&!t.includes("chrome"))console.log(`%c${S}`,"font-family: monospace; font-size: 11px; line-height: 1;");else{const{default:c}=await g(async()=>{const{default:d}=await import("./heroRingConsole-CD3Du-H2.js");return{default:d}},[]),l=m(O(c,n));console.log("%c ",`
      color: transparent;
      display: inline-block;
      font-size: 1px;
      line-height: 0;
      padding: 0 0 ${p}px ${r}px;
      background-image: url(${l});
      background-position: left ${f}px;
      background-repeat: no-repeat;
      background-size: ${r}px ${r}px;
      `)}console.log("%c%s","font-family: monospace; font-size: 16px;",e)}export{R as logConsoleArt};
//# sourceMappingURL=logConsoleArt-DPImMray.js.map
