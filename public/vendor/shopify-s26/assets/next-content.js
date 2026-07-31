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
