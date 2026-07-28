"use client";

import { useEffect } from "react";
import SleepCanvas from "./SleepCanvas";

const tips = [
  ["01", "공시를 구조화합니다.", "복잡한 원문을 판단 가능한 데이터 레이어로 전환합니다.", "sunset.webm"],
  ["02", "시장의 소음을 낮춥니다.", "AI가 뉴스와 가격 움직임에서 객관적인 리스크 신호를 분리합니다.", "candle.webm"],
  ["03", "관점을 연결합니다.", "서로 다른 투자자의 해석을 하나의 맥락 안에서 탐색합니다.", "bedroom.webm"],
  ["04", "마찰을 줄입니다.", "콘텐츠 탐색에서 거래 화면까지 끊김 없는 흐름을 설계합니다.", "mug.webm"],
  ["05", "준법을 먼저 설계합니다.", "모든 콘텐츠와 기능은 승인·권한·감사 기록 위에서 작동합니다.", "running.webm"],
  ["06", "다음 판단을 준비합니다.", "개인의 매매 패턴에 맞춘 정보 탐색 환경을 완성합니다.", "book.webm"]
];

export default function SleepWellConcept() {
  useEffect(() => {
    const els = document.querySelectorAll(".sw-reveal");
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("is-in", e.isIntersecting)), { threshold: .15 });
    els.forEach(e => io.observe(e));
    const solution = document.querySelector(".sw-solution");
    const tipEls = [...document.querySelectorAll(".sw-tip")];
    const updateTips = () => {
      const distance = Math.max(solution.offsetHeight - innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -solution.getBoundingClientRect().top / distance));
      const position = progress * (tipEls.length - 1);
      tipEls.forEach((tip, index) => {
        const delta = index - position;
        tip.style.opacity = String(Math.max(0, 1 - Math.abs(delta) * 1.7));
        tip.style.transform = `translateY(${delta * 42}vh)`;
        tip.style.pointerEvents = Math.abs(delta) < .45 ? "auto" : "none";
      });
    };
    addEventListener("scroll", updateTips, { passive: true });
    updateTips();
    return () => { io.disconnect(); removeEventListener("scroll", updateTips); };
  }, []);

  return (
    <main className="sw-page">
      <SleepCanvas />
      <header className="sw-nav"><a href="/">NEXT</a><span>LIVING FINANCIAL SYSTEM</span><a href="#note">THE NOTE <i>••</i></a></header>

      <section className="sw-hero sw-blue">
        <div className="sw-hero-copy"><p>THE GUIDE TO A BETTER INVESTING</p><h1>NEXT FINANCIAL STANDARD</h1></div>
        <div className="sw-figure"><span></span></div>
        <p className="sw-side-note">데이터가 흐르고<br/>판단이 선명해지는<br/>차세대 금융 환경</p>
      </section>

      <section className="sw-intro sw-cream sw-reveal">
        <span className="sw-index">01 — A NEW STANDARD</span>
        <h2>숫자를 보여주는 것을 넘어,<br/>자본의 흐름을 이해하게 합니다.</h2>
        <p>넥스트증권은 미디어, AI, 투자 경험을 하나의 시스템으로 연결합니다. 방대한 시장 데이터는 입체적인 맥락이 되고, 모든 접점은 준법 체계 안에서 작동합니다.</p>
      </section>

      <section className="sw-reboot sw-blue sw-reveal">
        <span className="sw-index">02 — REDEFINE THE SYSTEM</span>
        <h2>Rebuilding<br/>the standard.</h2>
        <div className="sw-clock"><b>99.999%</b><span>TRADING CONTINUITY</span></div>
      </section>

      <section className="sw-tunnel sw-blue">
        <div className="sw-sticky"><p>LEGACY-FREE</p><h2>기술 위에 금융을<br/>새롭게 정의합니다.</h2><span>HEADLESS · CLOUD NATIVE · API FIRST</span></div>
      </section>

      <section className="sw-importance sw-cream sw-reveal">
        <span className="sw-index">03 — WHY IT MATTERS</span>
        <h2>중요한 것은<br/>더 많은 정보가 아니라<br/>더 선명한 판단입니다.</h2>
      </section>

      <section className="sw-woman sw-blue">
        <div className="sw-person"><i></i></div>
        <div className="sw-caption"><span>AI-NATIVE INTELLIGENCE</span><p>공시, 뉴스, 시장 데이터를 준법 가이드라인 안에서 구조화합니다.</p></div>
      </section>

      <section className="sw-clock-section sw-cream sw-reveal">
        <span className="sw-index">04 — THE PIPELINE</span>
        <h2>Explore. Understand.<br/>Decide. Connect.</h2>
        <div className="sw-orbit-copy"><span>CONTENT</span><span>INSIGHT</span><span>RISK</span><span>ACTION</span></div>
      </section>

      <section className="sw-encounter sw-cream">
        <p>콘텐츠와 거래 사이의 마찰을 줄이고</p><p>탐색과 판단 사이의 맥락을 연결합니다.</p>
      </section>

      <section className="sw-cans sw-blue sw-reveal">
        <span className="sw-index">05 — MEDIA-FIRST TRADING</span>
        <h2>From insight<br/>to action.</h2>
        <div className="sw-cards"><i>MARKET</i><i>RISK</i><i>DISCLOSURE</i></div>
      </section>

      <section className="sw-type sw-blue"><div className="sw-sticky"><h2>The signal<br/>beyond the noise.</h2><p>AI가 가공한 시장 토폴로지 시뮬레이션</p></div></section>

      <section className="sw-phone sw-cream">
        <div className="sw-phone-copy sw-reveal"><span>ONE CONTINUOUS EXPERIENCE</span><h2>모든 금융 여정을<br/>하나의 흐름으로.</h2><p>콘텐츠, 리스크 정보, 거래 접근을 분리하지 않는 Zero-Friction 파이프라인.</p></div>
      </section>

      <section className="sw-balance sw-blue sw-reveal">
        <span className="sw-index">06 — COMPLIANCE-BY-DESIGN</span>
        <h2>Innovation,<br/>with control.</h2>
        <p>권한, 승인, 감사 기록과 망분리 운영 환경을 제품 구조에 처음부터 내장합니다.</p>
      </section>

      <section className="sw-lamp sw-blue">
        <div className="sw-lamp-object"><i></i><b></b></div>
        <div className="sw-caption"><span>AI MARKET LENS</span><p>객관적 데이터와 리스크 신호가 필요한 순간을 밝힙니다.</p></div>
      </section>

      <section className="sw-cycle sw-blue sw-reveal">
        <span className="sw-index">07 — THE INTELLIGENCE CYCLE</span>
        <h2>A system that<br/>keeps learning.</h2>
        <p>DATA → CONTEXT → COMPLIANCE → EXPERIENCE</p>
      </section>

      <section className="sw-solution sw-blue">
        <div className="sw-sticky sw-tip-stage">
          {tips.map(tip => <article className="sw-tip" key={tip[0]}><div className="sw-tip-art"><video src={`/sleep-well/media/${tip[3]}`} autoPlay muted loop playsInline/><b>{tip[0]}</b></div><div><span>{tip[0]} — SYSTEM PRINCIPLE</span><h3>{tip[1]}</h3><p>{tip[2]}</p></div></article>)}
        </div>
      </section>

      <section className="sw-ender sw-blue">
        <div className="sw-sticky"><span>NEXT SECURITIES</span><h2>Build the next<br/>financial standard.</h2><a href="#contact">프로젝트 문의하기 ↗</a></div>
      </section>

      <footer id="contact" className="sw-footer sw-cream"><a href="/">NEXT</a><h2>투자의 다음을,<br/>함께.</h2><div><span>SEOUL, KOREA</span><span>COMPLIANCE-BY-DESIGN</span><span>© 2026 NEXT SECURITIES</span></div></footer>
    </main>
  );
}
