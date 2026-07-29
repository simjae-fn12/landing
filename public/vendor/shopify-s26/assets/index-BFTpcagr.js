import{s as O}from"./index-BsuVXJ23.js";import{g as j,D as J,a as k,r as V,s as D}from"./deploy-urls-BqJLL-2u.js";const F=`
  .vc-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace;
  }
  .vc-modal {
    background: #111;
    border: 1px solid #333;
    padding: 24px;
    min-width: 450px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .vc-modal h2 {
    margin: 0 0 8px 0;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .vc-sheet-label {
    color: #666;
    font-size: 11px;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-changed-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 10px 0 16px;
  }
  .vc-changed-tag {
    display: inline-block;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid;
  }
  .vc-no-changes {
    color: #555;
    font-size: 11px;
    margin: 10px 0 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #333;
    background: #0a0a0a;
    color: #fff;
    font-size: 13px;
    font-family: inherit;
    margin-bottom: 12px;
    outline: none;
    transition: border-color 0.15s;
  }
  .vc-input:focus {
    border-color: #fff;
  }
  .vc-input::placeholder {
    color: #555;
  }
  .vc-btn {
    padding: 10px 20px;
    border: 1px solid #333;
    background: #111;
    color: #fff;
    font-size: 12px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-btn:hover {
    background: #222;
    border-color: #555;
  }
  .vc-btn-primary {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
  .vc-btn-primary:hover {
    background: #ddd;
    border-color: #ddd;
  }
  .vc-btn-row {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .vc-section-title {
    color: #666;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .vc-unsaved-dot {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: #f44;
    border-radius: 50%;
    pointer-events: none;
  }
  .vc-select {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #333;
    background: #0a0a0a;
    color: #fff;
    font-size: 12px;
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }
  .vc-select:focus {
    border-color: #fff;
  }
  .vc-select option {
    background: #111;
    color: #fff;
  }
  .vc-state-list {
    max-height: 340px;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  .vc-state-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid #222;
    margin-bottom: 4px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  .vc-state-row:hover {
    border-color: #444;
    background: #1a1a1a;
  }
  .vc-state-row.selected {
    border-color: #fff;
    background: #1a1a1a;
  }
  .vc-state-row .vc-state-name {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
  }
  .vc-state-row .vc-state-meta {
    color: #555;
    font-size: 10px;
  }
  .vc-state-row .vc-state-section-tag {
    padding: 2px 6px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid #444;
    color: #999;
    white-space: nowrap;
  }
  .vc-empty {
    color: #555;
    font-size: 11px;
    text-align: center;
    padding: 24px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-filter-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .vc-deploy-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border: 1px solid #333;
    margin-bottom: 16px;
  }
  .vc-deploy-row .vc-deploy-label {
    color: #999;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-btn-deploy {
    padding: 6px 14px;
    border: 1px solid #555;
    background: transparent;
    color: #fff;
    font-size: 11px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .vc-btn-deploy:hover {
    background: #222;
    border-color: #888;
  }
  .vc-btn-deploy:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;let $=!1;function Y(){if($||typeof document>"u")return;const e=document.createElement("style");e.textContent=F,document.head.appendChild(e);const t=document.createElement("style");t.textContent=`
    @keyframes slideUp {
      from { transform: translate(-50%, 20px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `,document.head.appendChild(t),$=!0}function z(){const e=document.createElement("div");e.className="vc-overlay",e.style.zIndex="999999",document.body.appendChild(e);const t=document.createElement("div");t.className="vc-modal",e.appendChild(t);const o=()=>e.remove();return e.addEventListener("click",s=>{s.target===e&&o()}),{modal:t,close:o,overlay:e}}function m(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function R(){return window.location.pathname.replace(/\/theatre$/,"")}function P(e){try{return O.createContentOfSaveFile(e)}catch{return}}function _(e){const t=document.createElement("div");t.style.cssText=`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    color: #000;
    padding: 12px 24px;
    font-family: 'SF Mono', monospace;
    font-size: 12px;
    z-index: 999999;
    animation: slideUp 0.3s ease;
  `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>t.remove(),300)},2e3)}const c={PULL_STATE_URL:"theatre-pull-state-url",PULL_STATE_NAME:"theatre-pull-state-name",PULL_SECTION:"theatre-pull-section",PULL_CURRENT_STATE:"theatre-pull-current-state",PULL_STATE_JSON:"theatre-pull-state-json",LAST_AUTHOR:"theatre-last-author"},G="theatre",K=new Set(Object.values(c));function X(){return typeof window>"u"?"":localStorage.getItem(c.LAST_AUTHOR)||""}function Q(e){typeof window>"u"||localStorage.setItem(c.LAST_AUTHOR,e)}function A(){if(typeof localStorage>"u")return;const e=[];for(let t=0;t<localStorage.length;t++){const o=localStorage.key(t);!o||K.has(o)||o.includes(G)&&e.push(o)}e.forEach(t=>localStorage.removeItem(t))}function de(){return typeof window>"u"?!1:!!localStorage.getItem(c.PULL_STATE_URL)}function ue(){if(typeof window>"u")return null;const e=localStorage.getItem(c.PULL_STATE_URL);if(!e)return null;const t=localStorage.getItem(c.PULL_STATE_NAME)||"unknown",o=localStorage.getItem(c.PULL_SECTION)||null;let s=null;const l=localStorage.getItem(c.PULL_CURRENT_STATE);if(l)try{s=JSON.parse(l)}catch{}return localStorage.removeItem(c.PULL_STATE_URL),localStorage.removeItem(c.PULL_STATE_NAME),localStorage.removeItem(c.PULL_SECTION),localStorage.removeItem(c.PULL_CURRENT_STATE),{url:e,name:t,section:o,currentState:s}}function U(e){localStorage.setItem(c.PULL_STATE_JSON,JSON.stringify(e))}function pe(){const e=localStorage.getItem(c.PULL_STATE_JSON);if(localStorage.removeItem(c.PULL_STATE_JSON),!e)return null;try{return JSON.parse(e)}catch{return null}}function C(e,t,o,s){localStorage.setItem(c.PULL_STATE_URL,e),localStorage.setItem(c.PULL_STATE_NAME,t),o&&localStorage.setItem(c.PULL_SECTION,o),s&&localStorage.setItem(c.PULL_CURRENT_STATE,JSON.stringify(s))}async function W(e){try{return await(await fetch(`${R()}/theatre-api`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}catch(t){return{success:!1,error:t.message}}}function Z(e,t){const{modal:o,close:s}=z(),l=X(),{changedSections:a,onPushSuccess:d}=t,b=P(e.address.projectId),L=Object.keys(b?.sheetsById??{});let r=t.activeSheetId,u=!1;const h=()=>{const E=a.length>0?`<div class="vc-changed-sections">
          ${a.map(i=>`<span class="vc-changed-tag" style="border-color:#66666655; background:#66666614; color:#999; opacity:${r===i||r==="all"?"1":"0.35"}">${i}</span>`).join("")}
        </div>`:'<div class="vc-no-changes">No sections changed since last load.</div>';o.innerHTML=`
      <h2>Push Version</h2>

      <div class="vc-section-title">Section to push</div>
      <select class="vc-select" id="vc-section-select" style="width:100%;margin-bottom:16px">
        ${L.map(i=>`
          <option value="${i}" ${r===i?"selected":""}>
            ${i}${a.includes(i)?" ●":""}
          </option>
        `).join("")}
        <option value="all" ${r==="all"?"selected":""}>
          All Sections
        </option>
      </select>

      <div class="vc-section-title">Changed sections</div>
      ${E}

      <input type="text" class="vc-input" id="vc-author" placeholder="Your name" value="${m(l)}" />
      <input type="text" class="vc-input" id="vc-name" placeholder="Version name" />
      <input type="text" class="vc-input" id="vc-key" placeholder="Preview key (auto-generated)" />

      <div class="vc-btn-row" style="flex-wrap: wrap; gap: 8px;">
        <button class="vc-btn" id="vc-cancel">Cancel</button>
        <button class="vc-btn vc-btn-primary" id="vc-push-shopify" ${u?"disabled":""}>
          ${u?"Pushing...":r==="all"?"Push All":`Push ${r}`}
        </button>
      </div>
    `;const f=o.querySelector("#vc-section-select");f.addEventListener("change",()=>{r=f.value,h()}),o.querySelector("#vc-cancel").addEventListener("click",s);const p=o.querySelector("#vc-name"),y=o.querySelector("#vc-key");p&&p.addEventListener("input",()=>{if(y&&!y.dataset.manual){const i=p.value.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),g=(r==="all"?"all":r).toLowerCase();y.value=i?`${g}-${i}`:""}}),y&&y.addEventListener("input",()=>{y.dataset.manual="true"}),o.querySelector("#vc-push-shopify").addEventListener("click",async()=>{const i=o.querySelector("#vc-author").value.trim(),g=o.querySelector("#vc-name").value.trim(),n=o.querySelector("#vc-key").value.trim();if(!i||!g){alert("Please fill in both fields");return}u=!0,h();const v=P(e.address.projectId)??{};let w,x;if(r==="all")w=v,x="all";else{const H=v.sheetsById;w={sheetsById:{[r]:H?.[r]},definitionVersion:v.definitionVersion,revisionHistory:v.revisionHistory},x=r}const S=await W({state:w,name:g,section:x,author:i,projectName:e.address.projectId,key:n||void 0});S.success?(Q(i),d(),s(),_(r==="all"?"Pushed all sections to Shopify!":`Pushed ${r} to Shopify!`)):(u=!1,h(),alert(`Push failed: ${S.error}`))})};h(),o.querySelector("#vc-author")?.focus()}async function ee(e){try{const t=new URLSearchParams({action:"list"});e&&t.set("section",e);const o=await fetch(`${R()}/theatre-api?${t}`);return o.ok?await o.json():{success:!1,error:`HTTP ${o.status}`}}catch(t){return{success:!1,error:t.message}}}function te(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.sheetsById=="object"&&t.sheetsById!==null}async function oe(){const e=j();if(e.size===0)return null;const t=await Promise.all(Array.from(e.entries()).map(async([s,l])=>{try{const a=await fetch(l);if(!a.ok)return null;const d=await a.json();return te(d)?{name:s,state:d}:null}catch{return null}})),o={};for(const s of t){if(!s)continue;const{name:l,state:a}=s,d=a.sheetsById[l]??a.sheetsById.Scene??Object.values(a.sheetsById)[0];d&&(o[l]=d)}return Object.keys(o).length===0?null:{definitionVersion:J,revisionHistory:[],sheetsById:o}}function ne(e,t){const{modal:o,close:s}=z();let l=[],a=null;const d=t??"all";let b=!0,L=!1,r=!1,u=null;const h=t??null,E=j().size>0,f=()=>{const p=d==="all"?l:l.filter(n=>n.section===d||n.section==="all"),y=p.length>0?p.map(n=>`
              <div class="vc-state-row ${n.handle===a?"selected":""}" data-handle="${m(n.handle)}">
                <span class="vc-state-section-tag" style="border-color:#66666655; color:#999">${m(n.section||"—")}</span>
                <div style="flex:1;min-width:0">
                  <div class="vc-state-name">${m(n.name)}</div>
                  <div class="vc-state-meta">${m(n.author)} · ${m(n.version)}${n.key?` · key: ${m(n.key)}`:""}</div>
                </div>
              </div>`).join(""):`<div class="vc-empty">${b?"Loading…":`No versions found for ${h??"this section"}`}</div>`,i=h?`<div style="color:#fff;font-size:12px;font-weight:600;margin-bottom:12px;font-family:'SF Mono',monospace;text-transform:uppercase;letter-spacing:0.5px">${m(h)}</div>`:"",g=E?`<div class="vc-deploy-row">
          <span class="vc-deploy-label">Current production state</span>
          <button class="vc-btn-deploy" id="vc-match-deploy" ${r?"disabled":""}>
            ${r?"Loading…":"Match Deploy"}
          </button>
        </div>`:"";o.innerHTML=`
      <h2>Pull Version</h2>
      ${i}
      ${g}
      <div class="vc-section-title">${E?"Or select":"Select"} a version to load into the editor</div>
      ${u?`<div style="color:#f44;font-size:11px;margin-bottom:12px">${m(u)}</div>`:""}
      <div class="vc-state-list">${y}</div>
      <div class="vc-btn-row">
        <button class="vc-btn" id="vc-cancel">Cancel</button>
        <button class="vc-btn vc-btn-primary" id="vc-pull-confirm" ${!a||L?"disabled":""}>
          ${L?"Pulling…":"Pull"}
        </button>
      </div>
    `,o.querySelectorAll(".vc-state-row").forEach(n=>{n.addEventListener("click",()=>{a=n.getAttribute("data-handle"),f()})}),o.querySelector("#vc-cancel").addEventListener("click",s),o.querySelector("#vc-match-deploy")?.addEventListener("click",async()=>{r=!0,u=null,f();const n=await oe();if(!n){r=!1,u="Failed to fetch deployed state from CDN",f();return}s(),_("Loading deployed state…"),A(),U({...n}),C("deploy","Production Deploy"),setTimeout(()=>window.location.reload(),100)}),o.querySelector("#vc-pull-confirm").addEventListener("click",async()=>{if(!a)return;L=!0,u=null,f();const n=l.find(S=>S.handle===a);if(!n||!n.fileUrl){L=!1,u="No file URL available for this version",f();return}const v=n.section!=="all";s(),_(v?`Loading ${n.section} from "${n.name}"…`:`Loading "${n.name}"…`);let w;v&&(w=P(e.address.projectId));let x;try{const S=await fetch(n.fileUrl);S.ok&&(x=await S.json())}catch{}A(),x&&U(x),C(n.fileUrl,n.name,v?n.section:void 0,w),setTimeout(()=>window.location.reload(),100)})};f(),ee(t).then(p=>{b=!1,p.success&&p.states?l=p.states:u=p.error||"Failed to load states",f()})}let T=!1,I=null;function se(e){I=e}function ae(e){if(!I)return[];const o=P(e.address.projectId)?.sheetsById;if(!o)return[];const s=new Set([...Object.keys(I),...Object.keys(o)]),l=[];for(const a of s){const d=JSON.stringify(I[a]||null),b=JSON.stringify(o[a]||null);d!==b&&l.push(a)}return l}function M(){const e=document.querySelector("[data-vc-push-button]");if(!e)return;let t=e.querySelector(".vc-unsaved-dot");T&&!t?(t=document.createElement("span"),t.className="vc-unsaved-dot",e.appendChild(t),e.style.position="relative"):!T&&t&&t.remove()}function B(){T||(T=!0,M())}function q(){T=!1,M()}function re(){const e=()=>{const o=document.querySelector('[title="Push Version"]');if(!o)return!1;const s=document.createElement("span");return s.style.cssText=`
      color: #666;
      font-family: 'SF Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    `,s.textContent=`SECTION: ${k}`,o.parentElement?.insertBefore(s,o),V(s),!0};if(e())return;const t=new MutationObserver(()=>{e()&&t.disconnect()});t.observe(document.body,{childList:!0,subtree:!0})}let N=!1;function ce(e){N||(N=!0,Y(),setTimeout(()=>{document.addEventListener("pointerup",t=>{const o=t.target;(o.closest('[class*="theatre"]')||o.closest("[data-theatre]")||o.closest(".vc-")===null)&&!o.closest(".vc-overlay")&&o.closest('[class*="theatre"]')&&B()})},1e3),O.extend({id:"version-control",toolbars:{global(t){return t([{type:"Icon",title:"Pull Version",svgSource:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',onClick:()=>ne(e,k)},{type:"Icon",title:"Push Version",svgSource:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',onClick:()=>Z(e,{activeSheetId:k,changedSections:ae(e),onPushSuccess:q})}]),()=>{}}}}),setTimeout(()=>{document.querySelectorAll('[class*="theatre"] button').forEach(o=>{o.getAttribute("title")==="Push Version"&&o.setAttribute("data-vc-push-button","true")})},500),re())}const fe=Object.freeze(Object.defineProperty({__proto__:null,clearUnsavedChanges:q,initVersionControlExtension:ce,markUnsavedChanges:B,setActiveSheetId:D,setInitialSheetsById:se},Symbol.toStringTag,{value:"Module"}));export{ue as a,pe as b,A as c,P as g,de as h,fe as i,se as s};
//# sourceMappingURL=index-BFTpcagr.js.map
