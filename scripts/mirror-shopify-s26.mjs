import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const sourceUrl = "https://www.shopify.com/editions/spring2026";
const outputRoot = path.resolve("public/vendor/shopify-s26");
const assetsRoot = path.join(outputRoot, "assets");
const oxygenPrefix = "https://cdn.shopify.com/oxygen-v2/51271/91735/189252/4075897/assets/";
const localPrefix = "/vendor/shopify-s26/assets/";

await mkdir(assetsRoot, {recursive:true});

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Source returned ${response.status}`);
let html = await response.text();

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

for (const match of html.matchAll(/https:\/\/cdn\.shopify\.com\/oxygen-v2\/51271\/91735\/189252\/4075897\/assets\/[^"' <]+/g)) {
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
    for (const match of text.matchAll(/(?:from\s*|import\s*\()\s*["']\.\/([^"']+)["']/g)) {
      enqueue(new URL(match[1], url).href);
    }
    for (const match of text.matchAll(/url\((?:["']?)([^)"']+)(?:["']?)\)/g)) {
      const value = match[1];
      if (!value.startsWith("data:")) enqueue(new URL(value, url).href);
    }
  }
}

const heroRingFilename = "heroRingTheatreControls-CXZse0Qa.js";
const heroRingPath = path.join(assetsRoot, heroRingFilename);
let heroRingSource = await readFile(heroRingPath, "utf8");
const ringStart = heroRingSource.indexOf('Z=[{char:"E"');
const ringEndMarker = ",Q=[Z,Z,Z],K=Q.flatMap";
const ringEnd = heroRingSource.indexOf(ringEndMarker, ringStart);
if (ringStart < 0 || ringEnd < 0) throw new Error("Hero ring letter data was not found");
heroRingSource =
  heroRingSource.slice(0, ringStart) +
  'Z=[..."NEXT SECURITIES"].map(t=>({char:t,trackingEm:t===" "?.5:.015}))' +
  heroRingSource.slice(ringEnd);
heroRingSource = heroRingSource
  .replace(",Q=[Z,Z,Z],K=Q.flatMap", ",Q=[Z,Z],K=Q.flatMap")
  .replaceAll("G.uniforms.uOpacity.value=w*R", "G.uniforms.uOpacity.value=0")
  .replaceAll("G.uniforms.uOpacity.value=w;", "G.uniforms.uOpacity.value=0;");
await writeFile(heroRingPath, heroRingSource, "utf8");

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
springRuntimeSource = springRuntimeSource.replaceAll(
  './heroRingTheatreControls-CXZse0Qa.js',
  './heroRingTheatreControls-CXZse0Qa.js?v=next-ring-3'
);
await writeFile(springRuntimePath, springRuntimeSource, "utf8");

const bridge = `
<style>
  a[href*="/editions/spring2026"]:has(svg) > svg:first-child{display:none!important}
  a[href*="/editions/spring2026"]:has(svg)::before{content:"N";display:inline-grid;place-items:center;width:18px;height:20px;margin-right:7px;border-radius:4px;background:#fff;color:#111;font:700 11px/1 Inter,Arial,sans-serif}
</style>
<script>
(() => {
  const upstream = "https://www.shopify.com";
  const nativeFetch = window.fetch.bind(window);
  const shouldProxy = url =>
    url.origin === location.origin &&
    !url.pathname.startsWith("/vendor/") &&
    !url.pathname.startsWith("/_next/") &&
    !url.pathname.startsWith("/shopify-upstream");
  window.fetch = (input, init) => {
    const raw = typeof input === "string" ? input : input.url;
    const url = new URL(raw, location.href);
    if (shouldProxy(url)) {
      return nativeFetch("/shopify-upstream?path=" + encodeURIComponent(url.pathname + url.search), init);
    }
    return nativeFetch(input, init);
  };
  const NativeXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = class extends NativeXHR {
    open(method, raw, ...rest) {
      const url = new URL(raw, location.href);
      const next = shouldProxy(url)
        ? "/shopify-upstream?path=" + encodeURIComponent(url.pathname + url.search)
        : raw;
      return super.open(method, next, ...rest);
    }
  };

  const patchHeroRing = () => {
    const ring = document.querySelector(".hero-ring");
    if (!ring || ring.dataset.nextPatched === "true") return false;
    const phrase = "NEXT SECURITIES  NEXT SECURITIES  ";
    ring.replaceChildren();
    [...phrase].forEach((char, index) => {
      const letter = document.createElement("span");
      const angle = index / phrase.length * 360;
      letter.className = "hero-ring-letter hero-t1 text-w100 absolute left-1/2 top-1/2 whitespace-pre text-[length:var(--hero-ring-letter-size)] inline-block";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = char;
      letter.style.letterSpacing = char === " " ? ".5em" : ".015em";
      letter.style.lineHeight = "1.5";
      letter.style.padding = "0.2em 0.2em 0.4em 0.02em";
      letter.style.setProperty("--letter-to", "translate(-50%, -50%) rotateY(" + angle + "deg) translateZ(var(--hero-ring-radius))");
      letter.style.setProperty("--letter-from", "translate(-50%, -50%) rotateY(" + (angle - 14) + "deg) translateZ(var(--hero-ring-radius))");
      letter.style.setProperty("--letter-delay-mobile", "0ms");
      letter.style.setProperty("--letter-delay-desktop", "0ms");
      letter.style.setProperty("--reveal-delay-mobile", index * 18 + "ms");
      letter.style.setProperty("--reveal-delay-desktop", index * 18 + "ms");
      ring.appendChild(letter);
    });
    ring.dataset.nextPatched = "true";
    ring.dataset.revealed = "true";
    ring.closest("h1")?.setAttribute("aria-label", "NEXT SECURITIES");
    return true;
  };
  const patchRingUntilReady = () => {
    if (patchHeroRing()) return;
    requestAnimationFrame(patchRingUntilReady);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchRingUntilReady, {once:true});
  } else {
    patchRingUntilReady();
  }

})();
</script>`;

html = html
  .replaceAll(oxygenPrefix, localPrefix)
  .replaceAll(
    "/vendor/shopify-s26/assets/(_locale).editions.spring2026-BxKRjLcQ.js",
    "/vendor/shopify-s26/assets/(_locale).editions.spring2026-BxKRjLcQ.js?v=next-ring-3"
  )
  .replace("<head>", `<head>${bridge}`);

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

for (const [from, to] of copyReplacements) {
  html = html.replaceAll(from, to);
}
html = html
  .replaceAll("150+ updates to sell, shop, and build\\u00a0everywhere", "금융의 모든 순간을 연결하는 NEXT Everywhere")
  .replace(/150\+ updates to sell, shop, and build(?:\u00a0| )everywhere/g, "금융의 모든 순간을 연결하는 NEXT Everywhere");

html = html.replace(
  "</body>",
  '<a href="/" style="position:fixed;right:18px;bottom:16px;z-index:2147483640;padding:10px 16px;border:1px solid currentColor;border-radius:999px;background:rgba(10,10,10,.72);color:#fff;font:500 10px/1 Inter,Arial,sans-serif;letter-spacing:.08em;text-decoration:none;backdrop-filter:blur(10px)">← CONCEPT INDEX</a></body>'
);

await writeFile(path.join(outputRoot, "index.html"), html, "utf8");
console.log(`Mirrored ${queue.length} Oxygen assets to ${outputRoot}`);
