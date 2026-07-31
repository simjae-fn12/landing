import {createHash} from "node:crypto";
import {mkdir, readFile, readdir, writeFile} from "node:fs/promises";
import path from "node:path";

const sourceUrl = "https://www.shopify.com/editions/spring2026";
const outputRoot = path.resolve("public/vendor/shopify-s26");
const assetsRoot = path.join(outputRoot, "assets");
let oxygenPrefix = "https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4075897/assets/";
let oxygenRoot = "https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4075897/";
const localPrefix = "/vendor/shopify-s26/assets/";
const remoteRoot = path.join(outputRoot, "remote");
const fixturesRoot = path.join(outputRoot, "fixtures");
const remotePublicPrefix = "/vendor/shopify-s26/remote/";
const shopifyAssetPrefix = "https://cdn.shopify.com/b/shopify-brochure2-assets/";
const remoteAssetExtensions = new Set([
  ".avif", ".bin", ".css", ".drc", ".exr", ".gif", ".glb", ".gltf", ".hdr",
  ".jpeg", ".jpg", ".js", ".json", ".ktx2", ".mdpc", ".mjs", ".mp3", ".mp4",
  ".ogg", ".otf", ".png", ".riv", ".svg", ".ttf", ".txt", ".wasm", ".webm",
  ".webp", ".woff", ".woff2"
]);
const textAssetExtensions = new Set([".css", ".js", ".json", ".mjs", ".svg", ".txt"]);
const riveFixtureSlugs = [
  "agentic-plan",
  "ai-sales-associate-from-shopify-inbox",
  "batch-fulfillment-workflow",
  "better-editing-for-online-store-in-the-shopify-app",
  "cashback-on-ad-spend-from-shopify-balance",
  "international-pricing-strategy-with-managed-markets",
  "introducing-campaign-autopilot",
  "personalized-search-in-the-shop-app",
  "shopify-ai-toolkit-for-developers",
  "shop-pay-available-on-any-platform",
  "sidekick-works-with-apps"
];
const fallbackRemoteByExtension = new Map([
  [".ktx2", "https://cdn.shopify.com/s/files/1/0647/5176/3550/files/06-marketing-frontback.ktx2?v=1780871582"]
]);

await mkdir(assetsRoot, {recursive:true});
await mkdir(remoteRoot, {recursive:true});
await mkdir(fixturesRoot, {recursive:true});

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Source returned ${response.status}`);
let html = await response.text();
const detectedOxygenPrefix = html.match(/https:\/\/cdn\.shopify\.com\/oxygen-v2\/\d+\/\d+\/\d+\/\d+\/assets\//)?.[0];
if (!detectedOxygenPrefix) throw new Error("Shopify Oxygen asset prefix was not found");
oxygenPrefix = detectedOxygenPrefix;
oxygenRoot = oxygenPrefix.slice(0, -"assets/".length);

const queue = [];
const queued = new Set();
function enqueue(url) {
  const pathname = new URL(url).pathname;
  if (
    !url.startsWith(oxygenPrefix) ||
    url.includes("${") ||
    url.includes("%7B") ||
    !/\.[a-z0-9]{2,8}$/i.test(pathname) ||
    queued.has(url)
  ) return;
  queued.add(url);
  queue.push(url);
}

for (const match of html.matchAll(/https:\/\/cdn\.shopify\.com\/oxygen-v2\/\d+\/\d+\/\d+\/\d+\/assets\/[^"' <]+/g)) {
  enqueue(match[0].replace(/&amp;/g, "&"));
}

for (let cursor=0; cursor<queue.length; cursor++) {
  const url = queue[cursor];
  const assetResponse = await fetch(url);
  if (!assetResponse.ok) throw new Error(`${assetResponse.status} ${url}`);
  const bytes = Buffer.from(await assetResponse.arrayBuffer());
  const filename = new URL(url).pathname.split("/").pop();
  await writeFile(path.join(assetsRoot, filename), bytes);

  if (/\.(?:js|css)$/.test(filename)) {
    const text = bytes.toString("utf8");
    for (const match of text.matchAll(/https:\/\/cdn\.shopify\.com\/oxygen-v2\/\d+\/\d+\/\d+\/\d+\/assets\/[^"' <]+/g)) {
      enqueue(match[0].replace(/&amp;/g, "&"));
    }
    for (const match of text.matchAll(/(?:from\s*|import\s*\()\s*["'`]\.\/([^"'`]+)["'`]/g)) {
      enqueue(new URL(match[1], url).href);
    }
    for (const match of text.matchAll(/["'`](?:assets\/)?([^"'`]+-[A-Za-z0-9_-]{8,}\.(?:css|js))["'`]/g)) {
      enqueue(new URL(match[1], url).href);
    }
    for (const match of text.matchAll(/url\((?:["']?)([^)"']+)(?:["']?)\)/g)) {
      const value = match[1];
      if (!value.startsWith("data:")) enqueue(new URL(value, url).href);
    }
  }
}

function normalizeRemoteCandidate(value) {
  return value
    .replaceAll("&amp;", "&")
    .replace(/[),.;]+$/g, "");
}

function isRemoteAsset(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    if (["www.googletagmanager.com"].includes(url.hostname)) return false;
    const extension = path.extname(url.pathname).toLowerCase();
    return remoteAssetExtensions.has(extension);
  } catch {
    return false;
  }
}

function discoverRemoteAssets(text) {
  const found = new Set();
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>\\)`}\]]+/g)) {
    const value = normalizeRemoteCandidate(match[0]);
    if (isRemoteAsset(value)) found.add(value);
  }
  for (const match of text.matchAll(/\b[a-f0-9]{32}\.(?:bin|glb|gltf|hdr|ktx2|mdpc|riv|wasm)\b/gi)) {
    found.add(`${shopifyAssetPrefix}${match[0]}`);
  }
  return found;
}

function remoteLocalTarget(value) {
  const url = new URL(value);
  const basename = path.basename(url.pathname) || "asset";
  const digest = createHash("sha256").update(value).digest("hex").slice(0, 16);
  const relativePath = `${url.hostname}/${digest}-${basename}`;
  return {
    diskPath: path.join(remoteRoot, ...relativePath.split("/")),
    publicPath: `${remotePublicPrefix}${relativePath}`
  };
}

function patchRuntimeText(text) {
  return text
    .replaceAll(oxygenPrefix, localPrefix)
    .replaceAll(oxygenRoot, "/vendor/shopify-s26/")
    .replaceAll(
      "https://www.googletagmanager.com/gtm.js?id=",
      "/vendor/shopify-s26/fixtures/gtm.js?id="
    )
    .replaceAll(
      "https://www.shopify.com/.well-known/dux?v2",
      "/editions/spring2026/api/dux"
    )
    .replaceAll(
      'M.wasmURL="https://unpkg.com/".concat(he.name,"@").concat(he.version,"/rive.wasm")',
      'M.wasmURL="/vendor/shopify-s26/fixtures/rive.wasm"'
    )
    .replaceAll(
      'M.wasmFallbackURL="https://cdn.jsdelivr.net/npm/".concat(he.name,"@").concat(he.version,"/rive_fallback.wasm")',
      'M.wasmFallbackURL="/vendor/shopify-s26/fixtures/rive_fallback.wasm"'
    )
    .replace(
      /([A-Za-z_$][\w$]*)\.wasmURL=`https:\/\/unpkg\.com\/\$\{[^}]+\.name\}@\$\{[^}]+\.version\}\/rive\.wasm`/g,
      '$1.wasmURL="/vendor/shopify-s26/fixtures/rive.wasm"'
    )
    .replace(
      /([A-Za-z_$][\w$]*)\.wasmFallbackURL=`https:\/\/cdn\.jsdelivr\.net\/npm\/\$\{[^}]+\.name\}@\$\{[^}]+\.version\}\/rive_fallback\.wasm`/g,
      '$1.wasmFallbackURL="/vendor/shopify-s26/fixtures/rive_fallback.wasm"'
    )
    .replaceAll('te[Xe].url+`&width=${Te}`', 'te[Xe].url+`?width=${Te}`')
    .replace(
      /([A-Za-z_$][\w$]*\[[A-Za-z_$][\w$]*\]\.url)\+`&width=\$\{([^}]+)\}`/g,
      '$1+`?width=${$2}`'
    )
    .replaceAll(
      'const n=/^(https?|blob):/.test(t),o=(async()=>{if(n)return so(t,e.orientAsConverted);',
      'const n=/^(https?|blob):/.test(t)||t.startsWith("/vendor/shopify-s26/remote/"),o=(async()=>{if(n)return so(t,e.orientAsConverted);'
    )
    .replaceAll(
      ".then(e.onDone).catch(()=>{}).finally",
      ".then(e.onDone).catch(e.onDone).finally"
    )
    .replaceAll(
      ",r=o&&u,e=t.useRef(!1)",
      ",r=!0,e=t.useRef(!1)"
    )
    .replaceAll(
      ",o=t&&a,s=(0,r.useRef)(!1)",
      ",o=!0,s=(0,r.useRef)(!1)"
    )
    .replaceAll(
      "const re=Dr();return l.useEffect",
      "const re=!0;return l.useEffect"
    )
    .replaceAll(
      "let ee=y();return(0,Z.useEffect)",
      "let ee=!0;return(0,Z.useEffect)"
    )
    .replaceAll(
      'e.src.startsWith(`https://`)))',
      'e.src.startsWith(`https://`)||e.src.startsWith(`/vendor/`)))'
    )
    .replace(
      /(\/vendor\/shopify-s26\/remote\/[^"' <]+?\.(?:avif|gif|jpeg|jpg|png|webp))&(?:amp;)?(?=width=|height=|crop=|format=|quality=)/g,
      "$1?"
    )
    .replace(
      /\.then\(([\w$]+)\.onDone\)\.catch\(\(\)=>\{\}\)/g,
      ".then($1.onDone).catch($1.onDone)"
    );
}

async function mirrorRemoteAssets(sourceTexts) {
  const pending = [];
  const queuedRemote = new Set();
  const urlMap = new Map();
  const downloadedTexts = new Map();
  const missingRemote = [];
  const assetManifest = [];
  const enqueueRemote = value => {
    if (!isRemoteAsset(value) || queuedRemote.has(value)) return;
    queuedRemote.add(value);
    pending.push(value);
  };

  for (const text of sourceTexts.values()) {
    for (const value of discoverRemoteAssets(text)) enqueueRemote(value);
  }

  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= pending.length) return;
      const value = pending[index];
      const target = remoteLocalTarget(value);
      let usedPlaceholder = false;
      let bytes;
      try {
        bytes = await readFile(target.diskPath);
      } catch {
        let response = await fetch(value);
        if (!response.ok && new URL(value).hostname === "cdn.shopify.com") {
          const fallbackUrl = new URL(value);
          for (const parameter of ["width", "height", "crop", "format", "quality"]) {
            fallbackUrl.searchParams.delete(parameter);
          }
          if (fallbackUrl.href !== value) response = await fetch(fallbackUrl);
        }
        const extension = path.extname(new URL(value).pathname).toLowerCase();
        if (!response.ok && fallbackRemoteByExtension.has(extension)) {
          response = await fetch(fallbackRemoteByExtension.get(extension));
          usedPlaceholder = response.ok;
        }
        if (!response.ok && [".gif", ".jpeg", ".jpg", ".png", ".webp"].includes(extension)) {
          missingRemote.push({status:response.status, url:value});
          usedPlaceholder = true;
          bytes = Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42mNk+M/wHwAEAQH/6M3xWQAAAABJRU5ErkJggg==",
            "base64"
          );
        } else {
          if (!response.ok) throw new Error(`Remote asset ${response.status}: ${value}`);
          bytes = Buffer.from(await response.arrayBuffer());
        }
      }
      const extension = path.extname(new URL(value).pathname).toLowerCase();
      await mkdir(path.dirname(target.diskPath), {recursive:true});
      const sourceSearch = new URL(value).search;
      urlMap.set(
        value,
        [".bin", ".mdpc"].includes(extension) && sourceSearch
          ? `${target.publicPath}${sourceSearch}`
          : target.publicPath
      );
      assetManifest.push({
        source:value,
        local:target.publicPath,
        size:bytes.length,
        sha256:createHash("sha256").update(bytes).digest("hex"),
        placeholder:usedPlaceholder
      });

      if (textAssetExtensions.has(extension)) {
        const text = bytes.toString("utf8");
        downloadedTexts.set(target.diskPath, text);
        for (const discovered of discoverRemoteAssets(text)) enqueueRemote(discovered);
      } else {
        await writeFile(target.diskPath, bytes);
      }
    }
  }

  await Promise.all(Array.from({length:12}, () => worker()));

  const replaceRemoteUrls = text => {
    let result = text;
    const replacements = [...urlMap.entries()].sort((a, b) => b[0].length - a[0].length);
    for (const [remote, local] of replacements) {
      result = result.replaceAll(remote, local);
      const basename = path.basename(new URL(remote).pathname);
      const escapedBasename = basename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(
        new RegExp(`\\$\\{[A-Za-z_$][\\w$]*\\}${escapedBasename}`, "g"),
        local
      );
    }
    return patchRuntimeText(result);
  };

  for (const [filename, text] of sourceTexts) {
    sourceTexts.set(filename, replaceRemoteUrls(text));
  }
  for (const [filename, text] of downloadedTexts) {
    await writeFile(filename, replaceRemoteUrls(text), "utf8");
  }

  return {urlMap, count:urlMap.size, missingRemote, assetManifest};
}

const springRuntimePath = path.join(assetsRoot, "(_locale).editions.spring2026-BxKRjLcQ.js");
let springRuntimeSource = await readFile(springRuntimePath, "utf8");
springRuntimeSource = springRuntimeSource.replaceAll(
  '"aria-label":"Everywhere"',
  '"aria-label":"NEXT SECURITIES"'
);
springRuntimeSource = springRuntimeSource
  .replaceAll('"Shopify Editions"', '"NEXT Editions"')
  .replaceAll('"Shopify Editions "', '"NEXT Editions "')
  .replaceAll('"Shopify.com"', '"NEXT Securities"')
  .replaceAll('"Start for free"', '"프로젝트 문의"')
  .replaceAll('"Search"', '"Insights"');
springRuntimeSource = await readFile(springRuntimePath, "utf8");
await writeFile(springRuntimePath, springRuntimeSource, "utf8");

const entryClientFilename = html.match(/entry\.client-[A-Za-z0-9_-]+\.js/)?.[0];
if (!entryClientFilename) throw new Error("React Router entry client was not found");
const entryClientPath = path.join(assetsRoot, entryClientFilename);
let entryClientSource = await readFile(entryClientPath, "utf8");
const hydrateCall =
  "O.hydrateRoot(document,p.jsx(u.StrictMode,{children:p.jsx(j,{value:t,children:p.jsx(Y,{})})}))";
if (entryClientSource.includes(hydrateCall)) {
  entryClientSource = entryClientSource.replace(
    hydrateCall,
    `${hydrateCall.slice(0, -1)},{onRecoverableError:()=>{}})`
  );
}
const currentHydrateCall =
  "(0,F.hydrateRoot)(document,(0,I.jsx)(T.StrictMode,{children:(0,I.jsx)(w,{value:e,children:(0,I.jsx)(P,{})})}))";
if (entryClientSource.includes(currentHydrateCall)) {
  entryClientSource = entryClientSource.replace(
    currentHydrateCall,
    `${currentHydrateCall.slice(0, -1)},{onRecoverableError:()=>{}})`
  );
}
await writeFile(entryClientPath, entryClientSource, "utf8");

const bridge = `
<style>
  a[href*="/editions/spring2026"]:has(svg) > svg:first-child{display:none!important}
  a[href*="/editions/spring2026"]:has(svg)::before{content:"N";display:inline-grid;place-items:center;width:18px;height:20px;margin-right:7px;border-radius:4px;background:#fff;color:#111;font:700 11px/1 Inter,Arial,sans-serif}
</style>
<script>
(() => {
  const style = document.createElement("style");
  style.textContent = 'a[href*="/editions/spring2026"]:has(svg) > svg:first-child{display:none!important}a[href*="/editions/spring2026"]:has(svg)::before{content:"N";display:inline-grid;place-items:center;width:18px;height:20px;margin-right:7px;border-radius:4px;background:#fff;color:#111;font:700 11px/1 Inter,Arial,sans-serif}.hero-ring::before{content:"";position:absolute;inset:0;display:block;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 600%27%3E%3Cdefs%3E%3Cpath id=%27p%27 d=%27M300 55a245 245 0 1 1 0 490a245 245 0 1 1 0-490%27/%3E%3C/defs%3E%3Ctext fill=%27white%27 font-family=%27Arial,sans-serif%27 font-size=%2758%27 font-weight=%27400%27 letter-spacing=%271%27%3E%3CtextPath href=%27%23p%27 startOffset=%270%27%3ENEXT SECURITIES  NEXT SECURITIES  %3C/textPath%3E%3C/text%3E%3C/svg%3E")}.hero-ring>span{visibility:hidden!important}';
  document.head.appendChild(style);
  const patchHeroRing = () => {
    const phrase = "NEXT SECURITIES  NEXT SECURITIES  ";
    if (document.querySelector("#next-hero-ring-overlay")) return true;
    const overlay = document.createElement("h1");
    overlay.id = "next-hero-ring-overlay";
    overlay.setAttribute("aria-label", "NEXT SECURITIES");
    overlay.style.cssText = "position:fixed;left:0;right:0;top:9.2vmin;height:74vmin;z-index:999;display:flex;justify-content:center;pointer-events:none;margin:0;perspective:5400px;color:#fff";
    const ring = document.createElement("div");
    ring.style.cssText = "position:relative;width:74vmin;height:74vmin;display:flex;align-items:center;justify-content:center;color:#fff;font:400 9vmin/1 Inter,Arial,sans-serif;letter-spacing:-.06em;text-align:center";
    overlay.appendChild(ring);
    ring.textContent = "NEXT SECURITIES";
    [...[]].forEach((char, index) => {
      const letter = document.createElement("span");
      const angle = index / phrase.length * 360;
      letter.className = "hero-ring-letter hero-t1 text-w100 absolute left-1/2 top-1/2 whitespace-pre text-[length:var(--hero-ring-letter-size)] inline-block";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = char;
      letter.style.letterSpacing = char === " " ? ".5em" : ".015em";
      letter.style.lineHeight = "1.5";
      letter.style.padding = "0.2em 0.2em 0.4em 0.02em";
      letter.style.position = "absolute";
      letter.style.left = "50%";
      letter.style.top = "50%";
      letter.style.display = "inline-block";
      letter.style.fontSize = "12.95vmin";
      letter.style.setProperty("--letter-to", "translate(-50%, -50%) rotateY(" + angle + "deg) translateZ(var(--hero-ring-radius))");
      letter.style.setProperty("--letter-from", "translate(-50%, -50%) rotateY(" + (angle - 14) + "deg) translateZ(var(--hero-ring-radius))");
      letter.style.setProperty("--letter-delay-mobile", "0ms");
      letter.style.setProperty("--letter-delay-desktop", "0ms");
      letter.style.setProperty("--reveal-delay-mobile", index * 18 + "ms");
      letter.style.setProperty("--reveal-delay-desktop", index * 18 + "ms");
      letter.style.setProperty("opacity", "1", "important");
      letter.style.setProperty("display", "block", "important");
      letter.style.setProperty("visibility", "visible", "important");
      letter.style.setProperty("clip-path", "none", "important");
      letter.style.setProperty("animation", "none", "important");
      letter.style.setProperty("color", "#fff", "important");
      letter.style.setProperty("transform", "translate(-50%, -50%) rotateY(" + angle + "deg) translateZ(37vmin)", "important");
      ring.appendChild(letter);
    });
    document.body.appendChild(overlay);
    return true;
  };
  const patchRingUntilReady = () => {
    if (patchHeroRing()) return;
    requestAnimationFrame(patchRingUntilReady);
  };
  const startRingPatch = () => {};
  const patchCopy = () => {
    const replacements = new Map([
      ["Shopify Editions", "NEXT Editions"],
      ["Shopify.com", "NEXT Securities"],
      ["Start for free", "프로젝트 문의"],
      ["Search", "Insights"],
      ["150+ updates to sell, shop, and build everywhere", "금융의 모든 순간을 연결하는 NEXT Everywhere"],
      ["The only platform you need to be in every AI channel", "AI가 시장을 읽고, 검증된 인사이트가 모든 금융 채널로 이어집니다"],
      ["Your products optimized for AI", "준법 체계 위에서 작동하는 AI-Native Intelligence"],
      ["Your products optimized for AI", "준법 체계 위에서 작동하는 AI-Native Intelligence"],
      ["Product data structured for agents", "시장 데이터를 판단 가능한 신호로 구조화"],
      ["Checkout on more surfaces", "인사이트에서 주문까지 Zero-Friction"],
      ["The open protocol for agentic commerce", "금융을 확장하는 Headless Enterprise Architecture"],
      ["Sidekick works with your apps", "AI Intelligence가 모든 금융 시스템과 연결됩니다"],
      ["Actionable guidance from Sidekick", "실행 가능한 데이터 기반 리스크 신호"],
      ["Sidekick on Apple Watch", "어디서나 이어지는 실시간 금융 인텔리전스"],
      ["Your AI sales associate", "당신의 AI 마켓 인텔리전스"],
      ["Storefront search delivers more results", "시장 탐색의 마찰을 최소화"],
      ["AI-powered store analysis on any theme", "AI 기반 시장 데이터 분석"],
      ["Our fastest-ever POS", "가장 빠르고 안정적인 거래 경험"],
      ["Rebuilt POS checkout in action", "Zero-Friction Trading in action"],
      ["Introducing Campaign Autopilot", "Introducing Media-First Trading"],
      ["Run campaigns across channels with AI-powered marketing that learns, optimizes, and drives performance. Set guardrails to stay in control, and track results over time.", "AI가 가공한 숏폼 인사이트가 탐색 마찰 없이 주문과 포트폴리오 맥락으로 연결됩니다. 준법 가이드라인이 모든 흐름의 기본값으로 작동합니다."],
      ["Better context for your store's data", "시장 데이터에 더 선명한 맥락을"],
      ["New data visualizations in analytics", "Living Financial Topology"],
      ["Daily insights in analytics", "검증된 데일리 마켓 인사이트"],
      ["Enhanced inventory management", "데이터 기반 지능형 리스크 관리"],
      ["Batch fulfillment workflow", "100% 자동화 통합 CMS 워크플로"],
      ["Agentic", "AI Native"],
      ["Sidekick", "Intelligence"],
      ["Online", "Media Trading"],
      ["Retail", "Headless"],
      ["Marketing", "Compliance"],
      ["Operations", "Enterprise"],
      ["Shop app", "Risk Signal"],
      ["Payments", "Infrastructure"],
      ["Finance", "Global R&D"],
      ["Developer", "Technology"]
    ]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      let value = node.nodeValue;
      for (const [from, to] of replacements) value = value.replaceAll(from, to);
      if (value !== node.nodeValue) node.nodeValue = value;
    }
    const normalize = value => value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const elements = [...document.body.querySelectorAll("*")];
    for (const [from, to] of replacements) {
      const expected = normalize(from);
      for (const element of elements) {
        if (element.closest(".hero-ring")) continue;
        if (normalize(element.textContent) !== expected) continue;
        const childHasSameCopy = [...element.children].some(child => normalize(child.textContent) === expected);
        if (!childHasSameCopy) element.textContent = to;
      }
    }
  };
  const installConceptLink = () => {
    if (document.querySelector("[data-concept-index-link]")) return;
    const link = document.createElement("a");
    link.href = "/";
    link.dataset.conceptIndexLink = "true";
    link.textContent = "← CONCEPT INDEX";
    link.style.cssText = "position:fixed;right:18px;bottom:16px;z-index:2147483640;padding:10px 16px;border:1px solid currentColor;border-radius:999px;background:rgba(10,10,10,.72);color:#fff;font:500 10px/1 Inter,Arial,sans-serif;letter-spacing:.08em;text-decoration:none;backdrop-filter:blur(10px)";
    document.body.appendChild(link);
  };
  const afterLoad = () => {
    document.title = "NEXT Everywhere — Spring ’26";
    patchCopy();
    startRingPatch();
    installConceptLink();
    let patchQueued = false;
    const observer = new MutationObserver(() => {
      if (patchQueued) return;
      patchQueued = true;
      requestAnimationFrame(() => {
        patchQueued = false;
        patchCopy();
      });
    });
    observer.observe(document.body, {childList:true, subtree:true});
  };
  if (document.readyState === "complete") afterLoad();
  else window.addEventListener("load", afterLoad, {once:true});

})();
</script>`;

html = html
  .replaceAll(oxygenPrefix, localPrefix)
  .replace("<head>", "<head>");

const copyReplacements = [
  ["Shopify Editions", "NEXT Editions"],
  ["Shopify.com", "NEXT Securities"],
  ["Start for free", "프로젝트 문의"],
  ["Search", "Insights"],
  ["150+ updates to sell, shop, and build everywhere", "금융의 모든 순간을 연결하는 NEXT Everywhere"],
  ["The only platform you need to be in every AI channel", "AI가 시장을 읽고, 검증된 인사이트가 모든 금융 채널로 이어집니다"],
  ["Your products optimized for AI", "준법 체계 위에서 작동하는 AI-Native Intelligence"],
  ["Your products optimized for AI", "준법 체계 위에서 작동하는 AI-Native Intelligence"],
  ["Product data structured for agents", "시장 데이터를 판단 가능한 신호로 구조화"],
  ["Checkout on more surfaces", "인사이트에서 주문까지 Zero-Friction"],
  ["The open protocol for agentic commerce", "금융을 확장하는 Headless Enterprise Architecture"],
  ["Sidekick works with your apps", "AI Intelligence가 모든 금융 시스템과 연결됩니다"],
  ["Actionable guidance from Sidekick", "실행 가능한 데이터 기반 리스크 신호"],
  ["Sidekick on Apple Watch", "어디서나 이어지는 실시간 금융 인텔리전스"],
  ["Your AI sales associate", "당신의 AI 마켓 인텔리전스"],
  ["Storefront search delivers more results", "시장 탐색의 마찰을 최소화"],
  ["AI-powered store analysis on any theme", "AI 기반 시장 데이터 분석"],
  ["Our fastest-ever POS", "가장 빠르고 안정적인 거래 경험"],
  ["Rebuilt POS checkout in action", "Zero-Friction Trading in action"],
  ["Introducing Campaign Autopilot", "Introducing Media-First Trading"],
  ["Run campaigns across channels with AI-powered marketing that learns, optimizes, and drives performance. Set guardrails to stay in control, and track results over time.", "AI가 가공한 숏폼 인사이트가 탐색 마찰 없이 주문과 포트폴리오 맥락으로 연결됩니다. 준법 가이드라인이 모든 흐름의 기본값으로 작동합니다."],
  ["Better context for your store's data", "시장 데이터에 더 선명한 맥락을"],
  ["New data visualizations in analytics", "Living Financial Topology"],
  ["Daily insights in analytics", "검증된 데일리 마켓 인사이트"],
  ["Enhanced inventory management", "데이터 기반 지능형 리스크 관리"],
  ["Batch fulfillment workflow", "100% 자동화 통합 CMS 워크플로"],
  ["Agentic", "AI Native"],
  ["Sidekick", "Intelligence"],
  ["Online", "Media Trading"],
  ["Retail", "Headless"],
  ["Marketing", "Compliance"],
  ["Operations", "Enterprise"],
  ["Shop app", "Risk Signal"],
  ["Payments", "Infrastructure"],
  ["Finance", "Global R&D"],
  ["Developer", "Technology"]
];

const hydrationSafeHtml = html;
for (const [from, to] of copyReplacements) {
  html = html.replaceAll(from, to);
}
html = html
  .replaceAll("150+ updates to sell, shop, and build\\u00a0everywhere", "금융의 모든 순간을 연결하는 NEXT Everywhere")
  .replace(/150\+ updates to sell, shop, and build(?:\u00a0| )everywhere/g, "금융의 모든 순간을 연결하는 NEXT Everywhere");

html = hydrationSafeHtml;
const bridgeScript = bridge.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1];
if (!bridgeScript) throw new Error("NEXT content bridge script was not generated");
html = html.replace(
  "</body>",
  '<script src="/vendor/shopify-s26/assets/next-content.js" defer></script></body>'
);
const sourceTexts = new Map([
  ["index.html", html],
  ["assets/next-content.js", bridgeScript]
]);
for (const filename of await readdir(assetsRoot)) {
  const extension = path.extname(filename).toLowerCase();
  if (!textAssetExtensions.has(extension)) continue;
  sourceTexts.set(`assets/${filename}`, await readFile(path.join(assetsRoot, filename), "utf8"));
}
for (const slug of riveFixtureSlugs) {
  const url = `${sourceUrl}/api/rive-runtime/${slug}?media=productMedia`;
  const response = await fetch(url, {headers:{accept:"application/json"}});
  if (!response.ok) throw new Error(`Rive fixture ${response.status}: ${url}`);
  sourceTexts.set(`fixtures/rive/${slug}.json`, await response.text());
}
const merchFixtureUrl = `${sourceUrl}/api/merch.data?_routes=routes%2F%28%24locale%29.editions.spring2026_.api.merch`;
const merchFixtureResponse = await fetch(merchFixtureUrl, {headers:{accept:"text/x-script"}});
if (!merchFixtureResponse.ok) throw new Error(`Merch fixture ${merchFixtureResponse.status}: ${merchFixtureUrl}`);
sourceTexts.set("fixtures/merch.data", await merchFixtureResponse.text());

const remoteResult = await mirrorRemoteAssets(sourceTexts);
const heroPointcloudSources = remoteResult.assetManifest
  .filter(asset => /forest-1024-v3-moretrees-(?:256_2|512_3)\.mdpc/.test(asset.source))
  .sort((a, b) => a.source.includes("256_2") ? -1 : 1);
const sectionModelsKey = [...sourceTexts.keys()].find(key => /sectionModels-[^/]+\.js$/.test(key));
if (!sectionModelsKey || heroPointcloudSources.length !== 2) {
  throw new Error("Current hero pointcloud sources were not mirrored");
}
const sectionModelsSource = sourceTexts.get(sectionModelsKey);
const heroPointcloudPattern = /pointcloud:\{sources:\[\{src:`[^`]+`,resolution:256\},\{src:`[^`]+`,resolution:512\},\{src:`[^`]+`,resolution:1024\}\]/;
if (heroPointcloudPattern.test(sectionModelsSource)) {
  sourceTexts.set(
    sectionModelsKey,
    sectionModelsSource.replace(
      heroPointcloudPattern,
      `pointcloud:{sources:[{src:\`${heroPointcloudSources[0].local}${new URL(heroPointcloudSources[0].source).search}\`,resolution:256},{src:\`${heroPointcloudSources[1].local}${new URL(heroPointcloudSources[1].source).search}\`,resolution:512}]`
    )
  );
}
for (const [relativePath, text] of sourceTexts) {
  const filename = path.join(outputRoot, ...relativePath.split("/"));
  await mkdir(path.dirname(filename), {recursive:true});
  await writeFile(
    filename,
    patchRuntimeText(text),
    "utf8"
  );
}
await writeFile(path.join(fixturesRoot, "gtm.js"), "/* analytics disabled in the offline mirror */\n", "utf8");
for (const [filename, url] of [
  ["rive.wasm", "https://unpkg.com/@rive-app/webgl2@2.38.1/rive.wasm"],
  ["rive_fallback.wasm", "https://cdn.jsdelivr.net/npm/@rive-app/webgl2@2.38.1/rive_fallback.wasm"]
]) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Rive runtime ${response.status}: ${url}`);
  await writeFile(path.join(fixturesRoot, filename), Buffer.from(await response.arrayBuffer()));
}
for (const asset of remoteResult.assetManifest) {
  const filename = path.join(outputRoot, ...asset.local.replace(remotePublicPrefix, "remote/").split("/"));
  const bytes = await readFile(filename);
  asset.size = bytes.length;
  asset.sha256 = createHash("sha256").update(bytes).digest("hex");
}
await writeFile(
  path.join(outputRoot, "remote-manifest.json"),
  JSON.stringify({
    generatedAt:new Date().toISOString(),
    assets:remoteResult.assetManifest.sort((a, b) => a.source.localeCompare(b.source)),
    missing:remoteResult.missingRemote
  }, null, 2),
  "utf8"
);

console.log(`Mirrored ${queue.length} Oxygen assets and ${remoteResult.count} remote assets to ${outputRoot}`);
