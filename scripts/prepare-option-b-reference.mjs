import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://creativemarketing.peachweb.io";
const appDir = path.join(process.cwd(), "app", "option-b");
const assetDir = path.join(process.cwd(), "public", "assets", "option-b", "source");
const publicPrefix = "/assets/option-b/source";

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
      Referer: `${origin}/`,
    },
  });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

const [htmlBuffer, baseCssBuffer, cssBuffer] = await Promise.all([
  fetchBuffer(`${origin}/`),
  fetchBuffer(`${origin}/website-base.css`),
  fetchBuffer(`${origin}/styles.css`),
]);

let html = htmlBuffer.toString("utf8");
let css = `${baseCssBuffer.toString("utf8")}\n${cssBuffer.toString("utf8")}`;
const bodyMatch = html.match(
  /<div id="pwb-body-wrap">([\s\S]*?)<div id="pwb-loading-wrap">/,
);
if (!bodyMatch) throw new Error("Unable to locate reference body markup.");
let markup = bodyMatch[1];

const remotePattern = /https:\/\/files\.peachworlds\.com[^"'\\\s)<]+/g;
const remoteUrls = new Set([
  ...(html.match(remotePattern) || []),
  ...(css.match(remotePattern) || []),
]);

await mkdir(assetDir, { recursive: true });
for (const remote of remoteUrls) {
  const url = new URL(remote);
  const segments = url.pathname.split("/").filter(Boolean);
  const uuid = segments.at(-2);
  const filename = decodeURIComponent(segments.at(-1));
  const localName = `${uuid}-${filename}`;
  const localUrl = `${publicPrefix}/${localName}`;
  await writeFile(path.join(assetDir, localName), await fetchBuffer(remote));
  markup = markup.replaceAll(remote, localUrl);
  css = css.replaceAll(remote, localUrl);
}

markup = markup
  .replace(/<div class="pwb-background[\s\S]*?id="ip1j">[\s\S]*?<\/div><\/div>/, "")
  .replace(/\sdata-gjs-[a-z-]+="[^"]*"/g, "");

const replaceElementContent = (source, id, content) => {
  const pattern = new RegExp(
    `(<([a-z0-9]+)[^>]*id="${id}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`,
  );
  return source.replace(pattern, `$1${content}$3`);
};

const replaceImageSource = (source, id, imageSource) =>
  source.replace(
    new RegExp(`(<img[^>]*\\ssrc=")[^"]*("[^>]*\\sid="${id}"[^>]*>)`),
    `$1${imageSource}$2`,
  );

const contentById = {
  "ispyh-2-3-2-3-3-2": "Next Securities",
  "ispyh-2-3-2-3-3-2-2": "Next Securities",
  "ispyh-2-3-2-3-2-2-2": "Service",
  "ispyh-2-3-2-3-2-2-2-2": "MarketLens",
  "ispyh-2-3-2-3-2-2-2-2-2": "WtS/MTs",
  "ispyh-2-3-2-3-2-2-2-2-2-2": "Research",
  "ispyh-2-3-2-2-2-2": "Trading Portal",
  "ispyh-2-2":
    'From Abstract<br/>Numbers to Living<br/>Financial Topology',
  "ispyh-2-3":
    "넥스트증권은 전통 증권사가 기존 금융에 기술을 덧붙일 때, 기술 위에 금융을 새롭게 정의하여 접속하는 즉시 차세대 글로벌 테크 증권사의 압도적 위상을 전달합니다.",
  "ispyh-2-3-2-2-2-2-4": "Explore Living Topology",
  "ispyh-2-2-2": "Redefining Financial Topology",
  "ispyh-2-3-5":
    "• SYSTEM AVAILABILITY : 99.999%<br/>• REGTECH COMPLIANCE : 100% ACTIVE<br/>• AUTOMATED CMS PIPELINE : READY",
  "ispyh-2-3-2-7": "Get Started",
  "ispyh-2-3-2-6-2": "View Demo",
  "ispyh-2-3-2-3-2-2-2-3-2-2-5": "OUR PARTNERS",
  "ispyh-2-2-2-3-2-5": "Core Differences",
  "ispyh-2-3-2-3-2-2-2-3-2-2": "FEATURES",
  "ispyh-2-2-2-3-2-6": "Next Securities Features",
  "ispyh-2-3-5-2-4": "넥스트증권의 핵심 기능",
  "ispyh-2-2-2-2-2-2-3": "Media-First Trading Pipeline",
  "ispyh-2-2-2-4-4-2": "콘텐츠-트레이딩 무마찰 연계 파이프라인",
  "ispyh-2-2-2-2-2-2-3-2": "AI-Native Intelligence Engine",
  "ispyh-2-2-2-4-4-2-2": "준법 체계 기반 지능형 초개인화",
  "ispyh-2-2-2-2-2-2-3-2-2": "Global Tech Talent & Tech Agility",
  "ispyh-2-2-2-4-4-2-2-2": "글로벌 R&D 거점 기반 테크 리더십",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4": "ABOUT OUR PLATFORM",
  "ispyh-2-2-2-3-2-3": "Core Strengths",
  "ispyh-2-3-5-2-2":
    "Learn more about the innovative functionalities that drive our Next Securities platform.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-3": "FEATURE 1",
  "ispyh-2-2-2-2-2-2-3-4-3":
    "Next-Gen Headless<br/>Enterprise Architecture",
  "ispyh-2-2-2-4-4-2-4-3":
    "기술 부채가 없는 클라우드 네이티브 아키텍처로 빠르고 안정적인 금융 서비스를 구현합니다.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-3-4": "FEATURE 1",
  "ispyh-2-2-2-2-2-2-3-4-3-4":
    "Next-Gen Headless<br/>Enterprise Architecture",
  "ispyh-2-2-2-4-4-2-4-3-4":
    "기술 부채가 없는 클라우드 네이티브 아키텍처로 빠르고 안정적인 금융 서비스를 구현합니다.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-3-2": "FEATURE 2",
  "ispyh-2-2-2-2-2-2-3-4-3-2":
    "Tech-Centric Team &<br/>RegTech Expertise",
  "ispyh-2-2-2-4-4-2-4-3-2":
    "검증된 핀테크 인재와 글로벌 규제 전문성을 기반으로 컴플라이언스 중심의 서비스를 설계합니다.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-3-2-2": "FEATURE 3",
  "ispyh-2-2-2-2-2-2-3-4-3-2-2":
    "Data-Driven Personalization<br/>& Risk Care",
  "ispyh-2-2-2-4-4-2-4-3-2-2":
    "데이터 기반 초개인화와 정밀한 리스크 관리로 투자자에게 최적화된 금융 경험을 제공합니다.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-3-2-2-3": "FEATURE 3",
  "ispyh-2-2-2-2-2-2-3-4-3-2-2-3":
    "Data-Driven Personalization<br/>& Risk Care",
  "ispyh-2-2-2-4-4-2-4-3-2-2-3":
    "데이터 기반 초개인화와 정밀한 리스크 관리로 투자자에게 최적화된 금융 경험을 제공합니다.",
  "ispyh-2-3-2-3-2-2-2-3-2-2-4-2": "QUANTITATIVE",
  "ispyh-2-2-2-3-2-3-2": "Quantitative<br/>Proofs",
  "ispyh-2-2-2-2-2-2-3-4-2-3": "99.999%",
  "ispyh-2-2-2-4-4-2-4-2-3": "Headless MSA 기반 무중단 거래 시스템",
  "ispyh-2-2-2-2-2-2-3-4-2-2": "Compliance-First",
  "ispyh-2-2-2-4-4-2-4-2-2": "글로벌 금융 규제 100% 준수",
  "ispyh-2-2-2-2-2-2-3-4-2": "Zero-Friction",
  "ispyh-2-2-2-4-4-2-4-2": "탐색과 판단 사이 마찰 최소화",
  "ispyh-2-2-2-2-2-2-3-4-2-2-2": "100% Auto",
  "ispyh-2-2-2-4-4-2-4-2-2-2": "미디어-트레이딩 완전 자동화 CMS",
  "ispyh-2-2-3-2": "Redefining Finance,<br/>Built on Compliance-by-Design",
  "ispyh-2-3-2-2-2-2-3-2": "Trading Portal",
  "i5gga9-3": "Next Securities",
  "ispyh-2-3-3-4": "MASTER@NEXTSECURITIES.COM",
  "ispyh-2-3-3-2-5": "Service",
  "ispyh-2-3-3-2-2-5": "MarketLens",
  "ispyh-2-3-3-2-2-2-5": "WtS/MTs",
  "ispyh-2-3-3-2-2-2-3-3": "Research",
  "igl11n-3-2-3": "Social Media",
  "ispyh-2-3-3-2-3-3": "LinkedIn",
  "ispyh-2-3-3-2-2-3-3": "Facebook",
  "ispyh-2-3-3-2-2-2-2-3": "Instagram",
};
for (const [id, content] of Object.entries(contentById)) {
  markup = replaceElementContent(markup, id, content);
}
markup = replaceImageSource(
  markup,
  "iry0if-3",
  "/assets/option-b/next-feature-1.png",
);
markup = replaceImageSource(
  markup,
  "idghoz-3",
  "/assets/option-b/next-feature-2.png",
);
markup = replaceImageSource(
  markup,
  "icg3p7-3",
  "/assets/option-b/next-feature-3.png",
);
markup = replaceImageSource(
  markup,
  "icg3p7-2-3",
  "/assets/option-b/next-core-1.png",
);
markup = replaceImageSource(
  markup,
  "icg3p7-2-2-3",
  "/assets/option-b/next-core-2.png",
);
markup = replaceImageSource(
  markup,
  "icg3p7-2-2-2-3",
  "/assets/option-b/next-core-3.png",
);
const fourthCoreMarkup = `
<section id="next-core-fourth" aria-label="Core Strength 4">
  <div class="next-core-fourth__inner">
    <div class="next-core-fourth__media">
      <img src="/assets/option-b/next-core-4.png" alt="" loading="lazy" />
    </div>
    <div class="next-core-fourth__copy">
      <p class="next-core-fourth__eyebrow">FEATURE 4</p>
      <h2>Global R&amp;D Network<br/>&amp; Execution Agility</h2>
      <p>글로벌 기술 거점과 검증된 실행 체계를 연결해 변화하는 금융 환경에 빠르게 대응합니다.</p>
      <span class="next-core-fourth__button">Get Started&nbsp; →</span>
    </div>
  </div>
</section>`;
markup = markup.replace(
  '<div class="pwb-flex-grid-wrap" id="ilwyn-2-2-4">',
  `${fourthCoreMarkup}<div class="pwb-flex-grid-wrap" id="ilwyn-2-2-4">`,
);

const fourthCoreRowMarkup = `
<div class="pwb-flex-grid-wrap" id="next-core-fourth" aria-label="Core Strength 4">
  <div class="pw-block-style next-core-fourth__media">
    <div class="pw-block-style next-core-fourth__number"><p>04</p></div>
    <img src="/assets/option-b/next-core-4.png" alt="" loading="lazy" />
  </div>
  <div class="pw-block-style next-core-fourth__copy">
    <div class="pw-block-style next-core-fourth__heading">
      <h4>FEATURE 4</h4>
      <h1>Global R&amp;D Network<br/>&amp; Execution Agility</h1>
    </div>
    <div class="pw-block-style next-core-fourth__description">
      <p>글로벌 기술 거점과 검증된 실행 체계를 연결해 변화하는 금융 환경에 빠르게 대응합니다.</p>
    </div>
    <div class="next-core-fourth__button"><span>Get Started</span><span aria-hidden="true">→</span></div>
  </div>
</div>`;
markup = markup.replace(fourthCoreMarkup, "");
markup = markup.replace(
  '</div></div></div></div></div></div><div class="pwb-flex-grid-wrap" id="ilwyn-2-2-4">',
  `</div></div></div>${fourthCoreRowMarkup}</div></div></div><div class="pwb-flex-grid-wrap" id="ilwyn-2-2-4">`,
);

const coreSectionStart = markup.indexOf(
  '<div class="pwb-flex-grid-wrap" id="ilwyn-2-2-3">',
);
const coreSectionEnd = markup.indexOf(
  '<div class="pwb-flex-grid-wrap" id="ilwyn-2-2-4">',
  coreSectionStart,
);
if (coreSectionStart !== -1 && coreSectionEnd !== -1) {
  markup =
    markup.slice(0, coreSectionStart) +
    '<div id="option-b-core-strengths-slot"></div>' +
    markup.slice(coreSectionEnd);
}

css += `
@font-face{font-family:"DM Sans";src:url("/assets/option-b/dm-sans.woff2") format("woff2");font-style:normal;font-weight:100 1000;font-display:swap}
body{background:#050b24}
#pwb-body-wrap{position:relative;z-index:1;opacity:1!important;max-width:none;max-height:none;overflow:visible}
.hero-canvas{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;background:radial-gradient(circle at 68% 28%,#c6ddff 0,#8fb9f2 24%,#536ac1 55%,#111b58 100%)}
#ieupsz,#pwb-loading-wrap{display:none!important}
:root{
  --pw-user-color-style-fc61959b-4221-42ed-bf99-4851044c8563:#b9d8ff;
  --pw-user-color-style-a38946c7-57f1-49e9-bbc9-7b70eda7278e:#7185ff;
  --pw-user-color-style-a7cde41e-0f7f-4095-a882-a21affbb5c85:#9cbcff;
  --pw-user-color-style-c7660bd1-fc29-453a-9b4b-efed684e5ce6:#5368ee;
  --pw-user-color-style-5a32ccd6-d93e-4186-b25d-38c5b172d933:#3546b8;
}
@media (min-width:993px){
  #i1lwz{align-items:flex-end;gap:8vw}
  #i1lwz-2{width:54%;max-width:760px}
  #ispyh-2-2{width:100%;font-size:clamp(58px,4.25vw,78px);line-height:1.02}
  #i1lwz-2-2{width:34%;max-width:470px}
}
/* Option B blue financial theme */
#ilwyn-2-2-3,
#ilwyn-2-2-2{
  background:#030a2c;
}
#ilwyn-2-2{
  background:#fff;
}
#ilwyn-2-2-4{
  background:linear-gradient(180deg,#030a2c 0%,#071443 100%);
}
#ilwyn-2-2-3-2{
  background:linear-gradient(180deg,#071443 0%,#0c1d59 100%);
}
#ilwyn-2-2-2-3{
  background:#050d32;
}
#injpw{
  background:linear-gradient(180deg,rgba(5,13,50,0) 0%,#050d32 76%);
}
#ipgqtg{
  background:linear-gradient(135deg,rgba(28,48,126,.76),rgba(89,107,184,.58));
  border:1px solid rgba(194,220,255,.2);
}
#i1lwz-2-4-2-2-3-4-3,
#i1lwz-2-4-2-2-3-4-3-2,
#i1lwz-2-4-2-2-3-4-3-2-2{
  background:linear-gradient(145deg,#08133e,#111f60);
  border:1px solid rgba(153,190,255,.16);
}
#i1lwz-2-4-2-2-3-3-3,
#i1lwz-2-4-2-2-3-3-2-3,
#i1lwz-2-4-2-2-3-3-2-2-2,
#i1lwz-2-4-2-2-3-3-3-2-3,
#i1lwz-2-4-2-2-3-3-3-2-2-3,
#i1lwz-2-4-2-2-3-3-3-2-2-2-2{
  background:linear-gradient(145deg,#09143f,#152867);
  border:1px solid rgba(167,201,255,.14);
}
#iqypqm,#i1naqa,#ijtbth,#is888l,#is888l-2,#is888l-2-2,#is888l-2-2-2,#is888l-2-2-2-2{
  background:rgba(37,61,140,.34);
  border:1px solid rgba(190,216,255,.12);
}
#i1lwz-2-4-2-2-3,
#i1lwz-2-4-2-2-3-2,
#i1lwz-2-4-2-2-3-2-2{
  background:rgba(43,70,158,.22);
  border:1px solid rgba(169,201,255,.13);
}
#ilwyn-2-2 h1,#ilwyn-2-2 h2,#ilwyn-2-2 h3,#ilwyn-2-2 h4,#ilwyn-2-2 p{
  color:#0a1026!important;
}
#ilwyn-2-2 #i1lwz-2-4-2-2-3,
#ilwyn-2-2 #i1lwz-2-4-2-2-3-2,
#ilwyn-2-2 #i1lwz-2-4-2-2-3-2-2{
  background:#f3f6ff;
  border-color:#dce6ff;
}
#ispyh-2-2-2-3-2-5::after{
  content:"3대 결정적 차별점";
  display:block;
  margin-top:14px;
  font-size:14px;
  font-weight:300;
  text-align:center;
}
#iod904>div>img{display:none}
#iqypqm::after{content:"All Strategy"}
#i1naqa::after{content:"Media-First Pipeline"}
#ijtbth::after{content:"AI-Native Engine"}
#is888l::after{content:"Global Tech Talent"}
#is888l-2::after{content:"Compliance-by-Design"}
#is888l-2-2::after{content:"Zero-Friction UX"}
#is888l-2-2-2::after{content:"RegTech Agility"}
#is888l-2-2-2-2{display:none}
#iod904>div::after{
  color:#fff;
  font-family:"DM Sans",sans-serif;
  font-size:14px;
  line-height:1.2;
  text-align:center;
}
#iry0if-3,#idghoz-3,#icg3p7-3,
#icg3p7-2-3,#icg3p7-2-2-3,#icg3p7-2-2-2-3,
#iry0if-2,#idghoz-2,#idghoz-2-3{
  filter:hue-rotate(178deg) saturate(1.12) contrast(1.04);
}
#i81y03-2,#i1lwz-2-2-2-5{display:none}
#ispyh-2-2-2::after{
  content:"Zero-Friction 미디어 트레이딩 UX로 증권사의 표준을 완성";
  display:block;
  margin-top:14px;
  font-size:14px;
  line-height:1.45;
  font-weight:300;
  letter-spacing:-.02em;
}
/* Compact Next Securities feature index */
#ilwyn-2-2{
  min-height:auto;
  height:auto;
  padding:112px 0 128px;
  pointer-events:auto;
}
#i1lwz-5-2{
  width:100%;
  max-width:1160px;
  padding:0 32px;
  align-items:center;
}
#i1lwz-2-6-2{
  width:100%;
  gap:16px;
  text-align:center;
}
#i1lwz-2-6-2-6{
  gap:8px;
  align-items:center;
}
#ispyh-2-2-2-3-2-6{
  width:100%;
  font-size:34px;
  line-height:1.08;
}
#ispyh-2-3-5-2-4{
  width:100%;
  font-size:14px;
  line-height:1.4;
  text-align:center;
}
#i1lwz-2-4-2-3{
  width:100%;
  max-width:1160px;
  padding:68px 32px 0;
  gap:28px;
  align-items:flex-start;
}
#ilwyn-2-2 #i1lwz-2-4-2-2-3,
#ilwyn-2-2 #i1lwz-2-4-2-2-3-2,
#ilwyn-2-2 #i1lwz-2-4-2-2-3-2-2{
  padding:0;
  gap:10px;
  background:transparent;
  border:0;
  border-radius:0;
}
#ipkvji-4-4,#ipkvji-4-2-4,#ipkvji-4-2-2-2{
  min-height:0;
}
#ilwyn-2-2 #iry0if-3,
#ilwyn-2-2 #idghoz-3,
#ilwyn-2-2 #icg3p7-3{
  display:block;
  width:100%;
  height:auto;
  aspect-ratio:1/1;
  object-fit:cover;
  border-radius:6px;
  filter:none;
}
#ilwyn-2-2 #ipkvji-4-3,
#ilwyn-2-2 #ipkvji-4-3-2,
#ilwyn-2-2 #ipkvji-4-3-2-2{
  gap:4px;
}
#ilwyn-2-2 #ispyh-2-2-2-2-2-2-3,
#ilwyn-2-2 #ispyh-2-2-2-2-2-2-3-2,
#ilwyn-2-2 #ispyh-2-2-2-2-2-2-3-2-2{
  font-size:18px;
  line-height:1.2;
}
#ilwyn-2-2 #ispyh-2-2-2-4-4-2,
#ilwyn-2-2 #ispyh-2-2-2-4-4-2-2,
#ilwyn-2-2 #ispyh-2-2-2-4-4-2-2-2{
  font-size:12px;
  line-height:1.45;
  color:#575b66!important;
}
@media(max-width:720px){
  #ilwyn-2-2{padding:84px 0 92px}
  #i1lwz-5-2{padding:0 20px}
  #ispyh-2-2-2-3-2-6{font-size:28px}
  #i1lwz-2-4-2-3{padding:48px 20px 0;gap:36px;flex-direction:column}
}
/* Next Securities Core Strengths */
#ilwyn-2-2-3{
  background:#fff;
  color:#0a1026;
}
#ilwyn-2-2-3 h1,#ilwyn-2-2-3 h2,#ilwyn-2-2-3 h3,
#ilwyn-2-2-3 h4,#ilwyn-2-2-3 p{
  color:#0a1026!important;
}
#ilwyn-2-2-3 #icg3p7-2-3,
#ilwyn-2-2-3 #icg3p7-2-2-3,
#ilwyn-2-2-3 #icg3p7-2-2-2-3{
  filter:none;
  object-fit:cover;
}
#ilwyn-2-2-3 #i1lwz-2-4-2-2-3-4-3,
#ilwyn-2-2-3 #i1lwz-2-4-2-2-3-4-3-2,
#ilwyn-2-2-3 #i1lwz-2-4-2-2-3-4-3-2-2{
  background:transparent;
  border:0;
  box-shadow:none;
}
#ilwyn-2-2-3 #i1lwz-2-2-2-2-2-2-6,
#ilwyn-2-2-3 #i1lwz-2-2-2-2-2-2-6-2,
#ilwyn-2-2-3 #i1lwz-2-2-2-2-2-2-6-3,
#ilwyn-2-2-3 #i1lwz-2-2-2-2-2-2-6-5,
#ilwyn-2-2-3 #i1lwz-2-2-2-2-2-2-6-3-3{
  background:#00e65a;
  border:0;
}
#ilwyn-2-2-3 #ispyh-2-3-2-2-2-2-6,
#ilwyn-2-2-3 #ispyh-2-3-2-2-2-2-6-2,
#ilwyn-2-2-3 #ispyh-2-3-2-2-2-2-6-3,
#ilwyn-2-2-3 #ispyh-2-3-2-2-2-2-6-5,
#ilwyn-2-2-3 #ispyh-2-3-2-2-2-2-6-3-3{
  color:#071128!important;
}
/* Core image tiles must stay square at every desktop width */
#ilwyn-2-2-3 #iktmiu-2-3,
#ilwyn-2-2-3 #iktmiu-2-2-3,
#ilwyn-2-2-3 #iktmiu-2-2-2-3{
  width:50%;
  height:auto;
  aspect-ratio:1/1;
  flex:0 0 50%;
  overflow:hidden;
}
#ilwyn-2-2-3 #icg3p7-2-3,
#ilwyn-2-2-3 #icg3p7-2-2-3,
#ilwyn-2-2-3 #icg3p7-2-2-2-3{
  width:100%;
  height:100%;
  aspect-ratio:1/1;
}
#next-core-fourth{width:100%;padding:20px 40px 150px;background:#fff;color:#0a1026}
.next-core-fourth__inner{display:flex;align-items:center;gap:7%;width:100%;max-width:1160px;margin:0 auto}
.next-core-fourth__media{order:2;width:50%;aspect-ratio:1/1;overflow:hidden;border-radius:8px}
.next-core-fourth__media img{width:100%;height:100%;object-fit:cover;transform:translate(var(--parallax-x,0),var(--parallax-y,0)) scale(1.04);transition:transform .45s cubic-bezier(.2,.75,.2,1)}
.next-core-fourth__copy{order:1;width:43%}
.next-core-fourth__eyebrow{margin-bottom:28px;font:500 11px/1 "DM Sans",sans-serif;letter-spacing:.28em}
.next-core-fourth__copy h2{font:500 clamp(30px,3vw,44px)/1.02 "DM Sans",sans-serif;letter-spacing:-.045em}
.next-core-fourth__copy>p:not(.next-core-fourth__eyebrow){margin-top:18px;font:300 15px/1.55 "DM Sans",sans-serif}
.next-core-fourth__button{display:inline-flex;margin-top:28px;padding:12px 16px;background:#00e65a;border-radius:4px;font:600 12px/1 "DM Sans",sans-serif}
/* Fourth item is part of the original Core Strengths stack. */
#ilwyn-2-2-3 #next-core-fourth{
  width:100%;height:70vh;display:flex;padding:24px;position:relative;
  align-items:start;flex-direction:row;justify-content:space-between;
  background:transparent;border:0;border-radius:12px;
}
#ilwyn-2-2-3 .next-core-fourth__media{
  order:initial;width:50%;height:100%;min-height:0;position:relative;overflow:hidden;border-radius:8px;
}
#ilwyn-2-2-3 .next-core-fourth__media img{
  width:100%;height:100%;object-fit:cover;
  transform:translate(var(--parallax-x,0),var(--parallax-y,0)) scale(1.04);
  transition:transform .45s cubic-bezier(.2,.75,.2,1);
}
#ilwyn-2-2-3 .next-core-fourth__number{
  position:absolute;z-index:2;top:24px;left:24px;width:auto;min-height:0;
  color:rgba(10,16,38,.38);font:300 16px/1 "DM Sans",sans-serif;
}
#ilwyn-2-2-3 .next-core-fourth__copy{
  order:initial;width:50%;height:100%;min-height:0;padding:48px;display:flex;
  align-items:start;flex-direction:column;justify-content:center;gap:12px;
}
#ilwyn-2-2-3 .next-core-fourth__heading{
  min-height:0;display:flex;flex-direction:column;align-items:start;gap:40px;
}
#ilwyn-2-2-3 .next-core-fourth__heading h4{
  font:500 12px/1 "DM Sans",sans-serif;letter-spacing:.3em;
}
#ilwyn-2-2-3 .next-core-fourth__heading h1{
  font:500 48px/1.1 "DM Sans",sans-serif;letter-spacing:-.03em;
}
#ilwyn-2-2-3 .next-core-fourth__description{min-height:0;max-width:500px}
#ilwyn-2-2-3 .next-core-fourth__description p{
  font:300 16px/1.35 "DM Sans",sans-serif;letter-spacing:-.03em;
}
#ilwyn-2-2-3 .next-core-fourth__button{
  display:inline-flex;align-items:center;gap:10px;width:auto;margin-top:28px;padding:16px 18px;
  color:#071128;background:#00e65a;border-radius:8px;font:600 12px/1 "DM Sans",sans-serif;
  pointer-events:auto;transition:transform .3s ease,background-color .3s ease;
}
#ilwyn-2-2-3 .next-core-fourth__button:hover{transform:translateY(-3px);background:#10f06a}
/* B proposal: source-only sections are not part of the approved storyboard */
#ilwyn-2-2-4,#ilwyn-2-2-2,#ilwyn-2-2-2-3{display:none!important}
/* Quantitative Proofs */
#ilwyn-2-2-3-2{
  display:block;min-height:0;height:400vh;padding:0;color:#fff;
  background:radial-gradient(circle at 16% 68%,rgba(34,54,195,.58) 0 15%,transparent 32%),
    radial-gradient(circle at 88% 20%,rgba(32,22,140,.54) 0 18%,transparent 36%),
    linear-gradient(125deg,rgba(37,92,197,.82) 0%,rgba(128,185,241,.78) 58%,rgba(189,222,251,.76) 100%);
}
#i1lwz-5-2-3-2{
  position:sticky;top:0;display:flex;flex-direction:row;justify-content:space-between;
  width:100%;max-width:1160px;height:100vh;margin:0 auto;padding:clamp(80px,10vh,130px) 40px;
  align-items:center;
}
#i1lwz-2-6-2-3-2{position:static;width:35%;color:#fff}
#i1lwz-2-6-2-3-2::after{content:"Get Started  →";display:inline-flex;margin-top:8px;padding:12px 18px;color:#071128;background:#00e65a;border-radius:4px;font:600 12px/1 "DM Sans",sans-serif}
#ilwyn-2-2-3-2 h1,#ilwyn-2-2-3-2 h4{color:#fff!important}
#ilwyn-2-2-3-2 #ispyh-2-3-2-3-2-2-2-3-2-2-4-2{
  font-size:11px;line-height:1;letter-spacing:.28em;
}
#ilwyn-2-2-3-2 #ispyh-2-2-2-3-2-3-2{
  width:100%;font-size:clamp(44px,4.2vw,64px);line-height:.98;letter-spacing:-.045em;
}
#i1lwz-2-4-2-3-3-2{width:48%}
#iryxrh{gap:8px}
#i1lwz-2-4-2-2-3-4-2-3,#i1lwz-2-4-2-2-3-4-2-2,#i1lwz-2-4-2-2-3-4-2,#i1lwz-2-4-2-2-3-4-2-2-2{height:auto;min-height:128px;padding:24px;background:rgba(21,42,104,.48);border:1px solid rgba(255,255,255,.15);color:#fff}
#iryxrh>div.is-active{background:#fff;color:#10182c;transform:translateX(-10px)}
#iryxrh>div.is-active h1,#iryxrh>div.is-active h4{color:#10182c!important}
#ilwyn-2-2-3-2 #iryxrh>div:not(.is-active) h1,#ilwyn-2-2-3-2 #iryxrh>div:not(.is-active) h4{color:#fff!important}
#ilwyn-2-2-3-2 #ispyh-2-2-2-2-2-2-3-4-2-3,
#ilwyn-2-2-3-2 #ispyh-2-2-2-2-2-2-3-4-2-2,
#ilwyn-2-2-3-2 #ispyh-2-2-2-2-2-2-3-4-2,
#ilwyn-2-2-3-2 #ispyh-2-2-2-2-2-2-3-4-2-2-2{
  font-size:clamp(30px,3vw,46px);line-height:1;letter-spacing:-.045em;
}
#ilwyn-2-2-3-2 #ispyh-2-2-2-4-4-2-4-2-3,
#ilwyn-2-2-3-2 #ispyh-2-2-2-4-4-2-4-2-2,
#ilwyn-2-2-3-2 #ispyh-2-2-2-4-4-2-4-2,
#ilwyn-2-2-3-2 #ispyh-2-2-2-4-4-2-4-2-2-2{
  margin-top:10px;font-size:13px;line-height:1.4;letter-spacing:-.02em;
}
/* Final statement and footer */
#injpw{min-height:760px;height:auto;padding:120px 0 48px;color:#101521;background:#fff}
#i1lwz-4{width:100%;max-width:1160px;height:auto;min-height:600px;padding:0 40px}
#i1lwz-2-5-2{width:100%;max-width:760px}
#ispyh-2-2-3-2{
  width:100%;color:#101521!important;font-size:clamp(42px,4.1vw,62px);
  line-height:1.02;letter-spacing:-.05em;
}
#i1lwz-2-2-2-2-2-2-3-2{background:#00e65a}
#ispyh-2-3-2-2-2-2-3-2{color:#071128!important}
#injpw #i1lwz-2-5-3{color:#101521}
#injpw #i5gga9-3{font-size:24px;line-height:1.1;letter-spacing:-.03em}
#injpw #ispyh-2-3-3-4{font-size:12px;line-height:1.4;letter-spacing:0}
#injpw #i3n84f-3 p,#injpw #igl11n-3-2-3{
  font-size:12px;line-height:1.45;letter-spacing:0;
}
#injpw::after{content:"서울특별시 영등포구 국제금융로 10 THREE IFC 15층  ·  COPYRIGHT © 2026 NEXT SECURITIES. ALL RIGHTS RESERVED.";display:block;width:min(1080px,calc(100% - 80px));margin:80px auto 0;padding-top:24px;border-top:1px solid #d8dadd;color:#4d535f;font:400 11px/1.6 "DM Sans",sans-serif}
/* The mirrored shell is replaced by reusable Next.js components. */
#ihkww7,#injpw #i1lwz-2-5-3{display:none!important}
#injpw::after{content:none!important;display:none!important}
#injpw{min-height:560px;padding-bottom:0}
#i1lwz-4{min-height:520px;justify-content:center}
/* Shared interaction layer */
html{scroll-behavior:smooth}
.b-reveal{opacity:0;transform:translate3d(0,46px,0);transition:opacity .8s cubic-bezier(.2,.75,.2,1) var(--reveal-delay,0ms),transform .9s cubic-bezier(.2,.75,.2,1) var(--reveal-delay,0ms)}
.b-reveal.reveal-side:nth-child(odd){transform:translate3d(-58px,0,0)}
.b-reveal.reveal-side:nth-child(even){transform:translate3d(58px,0,0)}
.b-reveal.is-visible{opacity:1;transform:translate3d(0,0,0)}
#iod904>div{transition:transform .35s ease,background-color .35s ease,border-color .35s ease}
#iod904>div:hover{transform:translateY(-8px);background:rgba(83,108,215,.52);border-color:rgba(225,238,255,.45)}
#ilwyn-2-2 #i1lwz-2-4-2-3>div{transition:transform .4s ease}
#ilwyn-2-2 #i1lwz-2-4-2-3>div:hover{transform:translateY(-8px)}
#ilwyn-2-2 #i1lwz-2-4-2-3>div img{transition:transform .65s cubic-bezier(.2,.75,.2,1)}
#ilwyn-2-2 #i1lwz-2-4-2-3>div:hover img{transform:scale(1.045)}
#ilwyn-2-2-3 img{transform:translate(var(--parallax-x,0),var(--parallax-y,0)) scale(1.04);transition:transform .45s cubic-bezier(.2,.75,.2,1)}
#iryxrh>div{transition:transform .45s cubic-bezier(.2,.75,.2,1),background-color .45s ease,color .45s ease}
#iryxrh>div:hover{transform:translateX(-10px);background:rgba(28,52,133,.65)}
#iryxrh>div.is-active:hover{background:#fff}
#ispyh-2-3-2-3-2-2-2,#ispyh-2-3-2-3-2-2-2-2,#ispyh-2-3-2-3-2-2-2-2-2,#ispyh-2-3-2-3-2-2-2-2-2-2{position:relative;cursor:pointer}
#ispyh-2-3-2-3-2-2-2::after,#ispyh-2-3-2-3-2-2-2-2::after,#ispyh-2-3-2-3-2-2-2-2-2::after,#ispyh-2-3-2-3-2-2-2-2-2-2::after{content:"";position:absolute;left:0;right:100%;bottom:-7px;height:1px;background:#fff;transition:right .3s ease}
#ispyh-2-3-2-3-2-2-2:hover::after,#ispyh-2-3-2-3-2-2-2-2:hover::after,#ispyh-2-3-2-3-2-2-2-2-2:hover::after,#ispyh-2-3-2-3-2-2-2-2-2-2:hover::after,
#ispyh-2-3-2-3-2-2-2.is-active::after,#ispyh-2-3-2-3-2-2-2-2.is-active::after,#ispyh-2-3-2-3-2-2-2-2-2.is-active::after,#ispyh-2-3-2-3-2-2-2-2-2-2.is-active::after{right:0}
@media(max-width:720px){
  #ilwyn-2-2-3 #iktmiu-2-3,
  #ilwyn-2-2-3 #iktmiu-2-2-3,
  #ilwyn-2-2-3 #iktmiu-2-2-2-3{width:100%;flex-basis:auto}
  #ilwyn-2-2-3-2{min-height:0;height:400vh;padding:0}
  #i1lwz-5-2-3-2{
    position:sticky;top:0;height:100vh;padding:72px 20px 28px;gap:24px;
    flex-direction:column;justify-content:center;overflow:hidden;
  }
  #i1lwz-2-6-2-3-2,#i1lwz-2-4-2-3-3-2{width:100%}
  #injpw{padding-top:88px}
  #i1lwz-4{padding:0 20px}
  #injpw::after{width:calc(100% - 40px)}
  #ispyh-2-2-3-2{font-size:38px}
  #next-core-fourth{padding:20px 20px 90px}
  .next-core-fourth__inner{flex-direction:column;gap:28px}
  .next-core-fourth__media,.next-core-fourth__copy{order:initial;width:100%}
  #ilwyn-2-2-3 #next-core-fourth{
    height:auto;min-height:0;padding:20px;align-items:start;flex-direction:column;gap:24px;
  }
  #ilwyn-2-2-3 .next-core-fourth__media{width:100%;height:auto;aspect-ratio:1/1}
  #ilwyn-2-2-3 .next-core-fourth__copy{width:100%;height:auto;padding:0}
  #ilwyn-2-2-3 .next-core-fourth__heading{gap:24px}
  #ilwyn-2-2-3 .next-core-fourth__heading h1{font-size:28px}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .b-reveal{opacity:1;transform:none;transition:none}
  #ilwyn-2-2 img,.next-core-fourth__media img,#ilwyn-2-2-3 img{transform:none!important;transition:none}
}
`;

await writeFile(path.join(appDir, "reference-markup.html"), markup);
await writeFile(path.join(appDir, "reference.css"), css);
console.log(`Prepared reference DOM and ${remoteUrls.size} local assets.`);
