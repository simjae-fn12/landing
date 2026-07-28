"use client";

import { useEffect, useRef, useState } from "react";
import CommandCanvas from "./CommandCanvas";

const ringLabels = [
  ["송금 실행", .105, .155],
  ["카드 관리", .155, .185],
  ["시장 인사이트", .185, .215],
  ["콘텐츠 발행", .215, .245],
  ["사용자 초대", .245, .315]
];

const slides = [
  {
    title: "AI가 필요한 금융 업무를 구조화합니다.",
    type: "chat",
    prompt: "이번 분기 시장 데이터와 공시를 한 번에 정리해줘.",
    status: "시장 인사이트 초안 작성 중"
  },
  {
    title: "모든 결과를 검토하고 승인합니다.",
    type: "review",
    prompt: "어떤 기준으로 검토할까요?",
    status: "출처 · 준법 기준 · 게시 권한"
  },
  {
    title: "화면 전환 없이 하나의 흐름으로 완료합니다.",
    type: "done",
    prompt: "승인된 인사이트를 채널에 발행했습니다.",
    status: "검토 기록과 발행 이력이 저장되었습니다."
  }
];

const capabilities = [
  ["AI 시장 인사이트", "공시와 시장 데이터를 검증 가능한 인사이트로 구조화합니다."],
  ["대규모 콘텐츠 정리", "자동 분류에서 놓친 데이터까지 일관된 체계로 정돈합니다."],
  ["사용자와 권한 관리", "조직별 권한과 역할 분리를 그대로 유지합니다."],
  ["준법 검토와 승인", "명시적인 검토와 승인 이후에만 업무가 실행됩니다."],
  ["예약 발행과 배포", "승인된 콘텐츠를 필요한 채널과 시간에 연결합니다."]
];

function DemoPanel({ slide }) {
  return (
    <div className={`mc-demo mc-demo--${slide.type}`}>
      {slide.type === "chat" && <div className="mc-demo-brand"><i>›_</i><span>Command<small>NEXT 금융 오퍼레이터</small></span></div>}
      <div className="mc-demo-prompt">{slide.prompt}</div>
      <strong>{slide.status}</strong>
      {slide.type === "review" && (
        <div className="mc-demo-options">
          <span>1　데이터 출처와 기준 시점</span><span className="active">2　준법 가이드라인</span><span>3　발행 권한</span>
        </div>
      )}
      {slide.type === "done" && (
        <div className="mc-demo-result"><small>NEXT MARKET LENS</small><b>글로벌 유동성 브리핑</b><span>발행 내역 보기　›</span></div>
      )}
    </div>
  );
}

export default function MercuryCommandConcept() {
  const heroRef = useRef(null);
  const [activeCapability, setActiveCapability] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: .12 });
    document.querySelectorAll(".mc-reveal").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mc-page">
      <header className="mc-nav">
        <a href="/" className="mc-logo"><i>◉</i> NEXT</a>
        <nav><a href="#capabilities">기능⌄</a><a href="#platform">솔루션⌄</a><a href="#trust">리소스⌄</a><a href="#company">회사⌄</a><a href="#contact">문의</a></nav>
        <div className="mc-nav-actions"><a href="#contact">로그인</a><a href="#contact" className="mc-open">파트너십 문의</a></div>
      </header>

      <section className="mc-journey" ref={heroRef}>
        <div className="mc-journey-sticky">
          <CommandCanvas stageRef={heroRef} />

          <div className="mc-opening">
            <h1>금융 업무를<br />하나의 흐름으로</h1>
            <p>AI가 시장 데이터 탐색부터 준법 검토와 운영까지 연결합니다.</p>
            <form onSubmit={event => event.preventDefault()}><input type="email" placeholder="파트너십 이메일" /><button>문의하기</button></form>
          </div>

          <div className="mc-ring-labels" aria-hidden="true">
            {ringLabels.map(([label, from, to]) => <span key={label} style={{ "--from": from, "--to": to }}>{label}</span>)}
          </div>

          <div className="mc-letter-mask" aria-hidden="true">
            <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask id="next-command-mask">
                  <rect width="1920" height="1080" fill="white" />
                  <text x="-1350" y="700" fill="black">All of NEXT, on Command.</text>
                </mask>
              </defs>
              <rect width="1920" height="1080" fill="#101018" mask="url(#next-command-mask)" />
            </svg>
          </div>

          <h2 className="mc-bridge">All of NEXT, on Command.</h2>

          <div className="mc-slide-stage">
            <h2>All of NEXT, on Command.</h2>
            <div className="mc-slide-rail">
              {slides.map(slide => (
                <article className="mc-slide" key={slide.type}>
                  <DemoPanel slide={slide} />
                  <h3>{slide.title}</h3>
                </article>
              ))}
            </div>
            <div className="mc-slide-controls">
              <form onSubmit={event => event.preventDefault()}><input placeholder="NEXT Command 체험" /><button>파트너십 문의</button></form>
              <div><b className="mc-page-count"><span>1 / 3</span><span>2 / 3</span><span>3 / 3</span></b><button>←</button><button>→</button></div>
            </div>
          </div>

          <div className="mc-compliance">본 화면의 데이터는 이해를 돕기 위한 샘플 시뮬레이션입니다.</div>
        </div>
      </section>

      <section className="mc-capabilities" id="capabilities">
        <header className="mc-reveal">
          <h2>말하면,<br />금융 업무가 완료됩니다</h2>
          <p>자연어 요청을 데이터 탐색, 검토, 승인과 실행으로 연결합니다.</p>
        </header>
        <div className="mc-capability-layout">
          <div className="mc-accordion">
            {capabilities.map((item, index) => (
              <button key={item[0]} onClick={() => setActiveCapability(index)} className={activeCapability === index ? "active" : ""}>
                <span><b>{item[0]}</b>{activeCapability === index && <small>{item[1]}</small>}</span><i>{activeCapability === index ? "↑" : "↓"}</i>
              </button>
            ))}
          </div>
          <div className="mc-capability-demo">
            <div className="mc-demo-query">{["이번 분기 시장 변화 요약", "미분류 데이터를 기준별로 정리", "콘텐츠 담당자 권한 확인", "준법 검토 요청", "내일 오전 8시 예약 발행"][activeCapability]}</div>
            <div className="mc-chart"><span style={{height:"48%"}}/><span style={{height:"73%"}}/><span style={{height:"41%"}}/><span style={{height:"84%"}}/><span style={{height:"57%"}}/></div>
            <strong>{capabilities[activeCapability][0]}</strong>
          </div>
        </div>
      </section>

      <section className="mc-products" id="platform">
        <h2 className="mc-reveal">NEXT와 함께<br />더 깊게 연결하세요</h2>
        <div>
          <article><i>AI</i><h3>AI-Native Intelligence</h3><p>시장 데이터와 공시를 준법 체계 안에서 구조화합니다.</p></article>
          <article><i>API</i><h3>Headless Architecture</h3><p>필요한 채널과 금융 업무를 API로 연결합니다.</p></article>
          <article><i>CMS</i><h3>Governed CMS</h3><p>미리보기, 승인, 예약 발행과 감사 이력을 통합합니다.</p></article>
        </div>
      </section>

      <section className="mc-final" id="contact">
        <h2>금융은 이제,<br />생각의 속도로 움직입니다.</h2>
        <p>차세대 금융 업무 경험을 NEXT증권과 함께 설계하세요.</p>
        <a href="mailto:recruit@nextsecurities.com">파트너십 문의　↗</a>
      </section>

      <footer className="mc-footer" id="company"><b>NEXT</b><span>© 2026 NEXT Securities</span><span>Compliance-by-Design · AI-Native · Headless</span></footer>
    </main>
  );
}
