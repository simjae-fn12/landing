"use client";

import { useEffect, useRef } from "react";
import CommandCanvas from "./CommandCanvas";

const services = [
  ["01", "AI 시장 인사이트", "시장 데이터와 공시를 요청하면 출처와 기준 시점이 연결된 정보로 정리합니다.", "이번 분기 주요 시장 변화를 요약해줘"],
  ["02", "리스크 데이터 정리", "분산된 리스크 정보를 하나의 흐름으로 모아 검토 가능한 데이터로 제공합니다.", "포트폴리오의 주요 위험 요인을 분류해줘"],
  ["03", "콘텐츠 승인 워크플로", "AI가 만든 금융 콘텐츠를 데이터 확인과 준법 승인 과정으로 연결합니다.", "이번 주 인사이트 카드의 승인 상태를 보여줘"],
  ["04", "업무 권한과 실행", "기존 권한과 통제 체계를 유지한 채 필요한 금융 업무를 자연어로 탐색합니다.", "승인 대기 중인 업무를 정리해줘"],
  ["05", "구조화된 CMS 운영", "콘텐츠, 데이터 출처, 게시 일정과 감사 이력을 하나의 대화에서 확인합니다.", "내일 발행할 콘텐츠의 검토 이력을 확인해줘"]
];

const capabilities = ["시장 데이터 탐색", "공시 정보 구조화", "AI 인사이트 생성", "데이터 출처 추적", "리스크 신호 확인", "준법 승인 요청", "콘텐츠 예약 발행", "감사 로그 확인", "채널별 콘텐츠 배포", "권한별 업무 실행", "Headless API 연결", "운영 상태 모니터링"];

export default function MercuryCommandConcept() {
  const heroRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".mc-reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: .15 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mc-page">
      <header className="mc-nav">
        <a href="/" className="mc-logo">NEXT</a>
        <nav><a href="#capabilities">기능</a><a href="#trust">신뢰</a><a href="#platform">플랫폼</a></nav>
        <a href="#contact" className="mc-pill mc-pill--dark">파트너십 문의 <span>↗</span></a>
      </header>

      <section className="mc-hero" ref={heroRef}>
        <div className="mc-sticky">
          <CommandCanvas stageRef={heroRef} />
          <div className="mc-hero-copy">
            <p className="mc-command-label"><span>⌁</span> NEXT COMMAND</p>
            <h1>금융 업무를<br />오케스트레이션합니다</h1>
            <p>데이터 탐색부터 준법 승인과 운영까지.<br />금융 업무 전반을 연결하는 AI 오퍼레이터.</p>
            <a href="#capabilities" className="mc-pill mc-pill--light">Command 살펴보기 <span>↓</span></a>
          </div>

          <div className="mc-hero-lines" aria-hidden="true">
            <span>말하면, 필요한 데이터가 연결됩니다.</span>
            <span>모든 실행은 검토와 승인을 거칩니다.</span>
            <span>전환 없이 하나의 흐름으로.</span>
          </div>

          <div className="mc-chat-shell">
            <div className="mc-chat-head"><div><b>⌁ Command</b><small>NEXT 금융 오퍼레이터</small></div><span>•••</span></div>
            <div className="mc-chat-body">
              <div className="mc-user-message">이번 분기 주요 시장 변화와 리스크 요인을 정리해줘.</div>
              <div className="mc-thinking"><i /><span>시장 데이터와 공시를 확인하고 있습니다</span></div>
              <div className="mc-result">
                <span className="mc-check">✓</span>
                <div><b>시장 인사이트 초안이 준비되었습니다</b><small>3개 데이터 출처 · 기준 시점 확인 · 준법 검토 대기</small></div>
              </div>
            </div>
            <div className="mc-chat-input">무엇이 필요한지 말씀해 주세요 <span>↑</span></div>
          </div>

          <div className="mc-scroll-hint">SCROLL TO COMMAND <span>↓</span></div>
        </div>
      </section>

      <section className="mc-intro" id="capabilities">
        <div className="mc-section-no">01 / 04</div>
        <div className="mc-intro-copy mc-reveal">
          <p className="mc-eyebrow">AI FINANCIAL OPERATOR</p>
          <h2>말하면,<br />금융 업무가<br />연결됩니다.</h2>
          <p>자연어 요청을 데이터 탐색, 콘텐츠 생성, 권한 확인과 준법 승인으로 연결합니다. Command는 답변을 넘어 검토 가능한 금융 업무 흐름을 만듭니다.</p>
        </div>
      </section>

      <section className="mc-services">
        {services.map((service, index) => (
          <article className="mc-service mc-reveal" key={service[0]}>
            <div className="mc-service-copy">
              <span>{service[0]}</span>
              <h3>{service[1]}</h3>
              <p>{service[2]}</p>
              <div className="mc-prompt">{service[3]} <b>↑</b></div>
            </div>
            <div className={`mc-service-visual mc-service-visual--${index + 1}`}>
              {index < 2 ? (
                <video autoPlay muted loop playsInline src={index === 0 ? "/assets/mercury-command/unusual-transaction.mp4" : "/assets/mercury-command/confirm-payment.mp4"} />
              ) : (
                <div className="mc-mini-ui">
                  <small>NEXT COMMAND</small>
                  <strong>{["준법 검토 3건", "권한 확인 완료", "예약 발행 준비"][index - 2]}</strong>
                  <div><i /><span>데이터 출처 연결</span><b>완료</b></div>
                  <div><i /><span>담당자 승인</span><b>{index === 2 ? "대기" : "완료"}</b></div>
                  <div><i /><span>감사 로그 기록</span><b>활성</b></div>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="mc-universe" id="platform">
        <p className="mc-eyebrow">THE NEXT UNIVERSE</p>
        <h2 className="mc-reveal">금융 업무 전반을<br />하나의 Command로.</h2>
        <div className="mc-capability-loop">
          {[...capabilities, ...capabilities].map((item, index) => <span key={`${item}-${index}`}>{item} <b>✦</b></span>)}
        </div>
      </section>

      <section className="mc-trust" id="trust">
        <div className="mc-section-no">02 / 04</div>
        <div className="mc-trust-head mc-reveal">
          <p className="mc-eyebrow">CONTROL BY DEFAULT</p>
          <h2>정확성은 설계에서.<br />통제권은 언제나 사용자에게.</h2>
          <p>모든 답변은 연결된 데이터와 기준 시점을 바탕으로 생성되며, 모든 실행은 기존 권한과 명시적인 승인 과정을 존중합니다.</p>
        </div>
        <div className="mc-trust-grid">
          <article><span>01</span><h3>출처까지 추적 가능</h3><p>답변과 시각화에 사용된 데이터의 출처, 기준 시점과 처리 이력을 함께 제공합니다.</p></article>
          <article><span>02</span><h3>승인 후에만 실행</h3><p>Command는 사용자의 명시적인 검토와 승인 없이 금융 업무를 실행하지 않습니다.</p></article>
          <article><span>03</span><h3>기존 권한을 그대로</h3><p>조직의 접근 권한, 역할 분리와 내부 통제 정책을 AI 업무 흐름 안에서도 유지합니다.</p></article>
        </div>
      </section>

      <section className="mc-further">
        <div className="mc-section-no">03 / 04</div>
        <div className="mc-further-head"><p className="mc-eyebrow">GO FURTHER</p><h2 className="mc-reveal">NEXT 플랫폼을<br />더 깊게 연결하세요.</h2></div>
        <div className="mc-further-grid">
          <article><div className="mc-orb">AI</div><h3>AI-Native Intelligence</h3><p>공시, 뉴스와 시장 데이터를 준법 체계 안에서 구조화합니다.</p><span>↗</span></article>
          <article><div className="mc-api-lines">API<br/>MCP<br/>CLI</div><h3>Headless Architecture</h3><p>API와 도구를 통해 필요한 채널에서 NEXT 데이터와 업무를 연결합니다.</p><span>↗</span></article>
          <article><div className="mc-cms-card"><b>CMS</b><small>Approved · Scheduled</small></div><h3>Governed CMS</h3><p>미리보기, 준법 승인, 예약 발행과 감사 이력을 하나로 관리합니다.</p><span>↗</span></article>
        </div>
      </section>

      <section className="mc-final" id="contact">
        <div className="mc-section-no">04 / 04</div>
        <p className="mc-command-label"><span>⌁</span> NEXT COMMAND</p>
        <h2 className="mc-reveal">금융은 이제,<br />생각의 속도로 움직입니다.</h2>
        <p>차세대 금융 업무 경험을 NEXT 증권과 함께 설계하세요.</p>
        <a href="mailto:recruit@nextsecurities.com" className="mc-pill mc-pill--light">파트너십 문의 <span>↗</span></a>
      </section>

      <footer className="mc-footer">
        <a href="/" className="mc-logo">NEXT</a>
        <div><b>PLATFORM</b><a href="#capabilities">Command</a><a href="#platform">Architecture</a><a href="#trust">Compliance</a></div>
        <div><b>COMPANY</b><a href="#">About</a><a href="#">LinkedIn</a><a href="#">Newsroom</a></div>
        <p>© 2026 NEXT Securities · 데이터 화면은 이해를 돕기 위한 샘플입니다.</p>
      </footer>
    </main>
  );
}
