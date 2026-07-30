"use client";

import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    eyebrow: "Compliance-First Curation",
    eyebrowKo: "검증된 시장 데이터만을 정제",
    title: "Compliance-by-Design:\nAI-Powered Regulatory Excellence",
    description: "금소법 테두리 안에서 검증된 시장 데이터만을 정제합니다. 단순 종목 추천의 리스크를 차단하고 법적 가이드라인을 완벽히 준수한 안전한 정보만을 전달합니다.",
    image: "/landing/summary-compliance-first.png",
  },
  {
    eyebrow: "Zero-Friction Disclosure Analysis",
    eyebrowKo: "AI 실시간 추적·요약",
    title: "Automated Public Filing Processing &\nReal-time Summarization",
    description: "수십 페이지의 어렵고 복잡한 공시 자료를 AI 백엔드가 실시간으로 추적·요약합니다. 투자자가 직접 정보를 찾고 분석하는 수고를 제로로 만듭니다.",
    image: "/landing/summary-disclosure.png",
  },
  {
    eyebrow: "Compliance Curation",
    eyebrowKo: "데이터 정밀 큐레이션",
    title: "Hyper-Personalized Trading Signal &\nRisk Management Engine",
    description: "초보부터 고액 투자자까지 유저 개개인의 매매 스타일과 가용성을 정밀 분석합니다. 시장의 잡음을 걷어내고 최적화된 리스크 관리 신호를 큐레이션합니다.",
    image: "/landing/summary-personalization.png",
  },
];

const strengths = [
  {
    title: "Next-Gen Headless\nEnterprise Architecture",
    subtitle: "기술 부채 제로 (Legacy-Free)",
    image: "/landing/content-pipeline.png",
    points: ["싱가포르·미국 거점 기반의 AI/IT 혁신 인재 유치", "선진 테크사 출신의 검증된 엔지니어링 리더십", "지속 가능한 글로벌 기술 개발 생태계 구축"],
  },
  {
    title: "Tech-Centric Team &\nRegTech Expertise",
    subtitle: "검증된 핀테크 인재 & Compliance-First",
    image: "/landing/content-ai-native.png",
    points: ["글로벌 규제 테스트베드 연계를 통한 빠른 서비스 검증", "해외 선진 금융 규제 트렌드의 선제적 반영", "COMPLIANCE-BY-DESIGN 프레임워크 기반의 기민성 확보"],
  },
  {
    title: "Data-Driven Personal\n& Risk Management",
    subtitle: "데이터 기반 지능형 리스크 케어",
    image: "/landing/content-closing.png",
    points: ["글로벌 거래 간 무마찰 금융 경험 설계", "고성능 AI 인프라 및 데이터 백엔드의 글로벌 분산", "엔터프라이즈급 글로벌 보안 및 컴플라이언스 준수"],
  },
];

export default function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState(-1);
  const [activeStrength, setActiveStrength] = useState(1);
  const listRef = useRef(null);
  const cursorRef = useRef(null);
  const previewRefs = useRef([]);
  const activeCapabilityRef = useRef(-1);
  const pointerRef = useRef({ x: 0, y: 0 });
  const easedPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame;

    const tick = () => {
      const target = pointerRef.current;
      const eased = easedPointerRef.current;
      eased.x += (target.x - eased.x) * 0.12;
      eased.y += (target.y - eased.y) * 0.12;

      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${eased.x - 32}px, ${eased.y - 32}px, 0)`;
      }

      const preview = previewRefs.current[activeCapabilityRef.current];
      if (preview) {
        const ratio = window.innerWidth / 1728;
        const lagX = Math.max(-15, Math.min(15, (target.x - eased.x) * 0.1));
        const lagY = Math.max(-15, Math.min(15, (target.y - eased.y) * 0.1));
        preview.style.transform = `translate3d(${eased.x + 120 * ratio}px, ${eased.y - 263 * ratio}px, 0) perspective(500px) rotateX(${lagY}deg) rotateY(${-lagX}deg) rotateZ(0deg)`;

        const image = preview.querySelector("img");
        if (image) {
          const imageX = Math.max(-5, Math.min(5, (target.x - eased.x) * 0.01));
          const imageY = Math.max(-5, Math.min(5, (target.y - eased.y) * 0.01));
          image.style.transform = `translate(${-imageX}%, ${-imageY}%) scale(1.05)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const movePointer = (event) => {
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
  };

  const enterCapability = (index, event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    easedPointerRef.current = { x: event.clientX, y: event.clientY };
    activeCapabilityRef.current = index;
    setActiveCapability(index);
  };

  const leaveCapabilities = () => {
    activeCapabilityRef.current = -1;
    setActiveCapability(-1);
    cursorRef.current?.classList.remove("is-visible");
    listRef.current?.classList.remove("is-hovering");
  };

  return (
    <section className="capabilities-section" id="services">
      <div
        className="capability-list"
        ref={listRef}
        onPointerMove={movePointer}
        onPointerEnter={(event) => {
          movePointer(event);
          cursorRef.current?.classList.add("is-visible");
          listRef.current?.classList.add("is-hovering");
        }}
        onPointerLeave={leaveCapabilities}
      >
        {capabilities.map((item, index) => (
          <article
            className={`capability-row${activeCapability === index ? " is-active" : ""}`}
            key={item.title}
            onPointerEnter={(event) => enterCapability(index, event)}
          >
            <div className="capability-row__badge">
              <i aria-hidden="true">◐</i>
              <span><strong>{item.eyebrow}</strong>{item.eyebrowKo}</span>
            </div>
            <div className="capability-row__content">
              <h2>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
              <p>{item.description}</p>
              <footer><span>MISSION</span><span>COMPASSION</span><time>2027.SEPT</time></footer>
            </div>
            <div
              className="capability-row__preview"
              ref={(node) => { previewRefs.current[index] = node; }}
              aria-hidden="true"
            >
              <img src={item.image} alt="" />
            </div>
          </article>
        ))}
        <span className="capability-cursor" ref={cursorRef} aria-hidden="true">+</span>
      </div>

      <div className="strengths-section">
        <header>
          <h2>Core Strengths</h2>
          <p>싱가포르 및 미국 법인을 중심으로 글로벌 AI/IT 탤런트를 선제적으로 확보합니다. 선진 핀테크 규제 샌드박스를 기민하게 접목하여 독보적인 글로벌 R&amp;D 네트워크와 테크 리더십을 구축합니다.</p>
        </header>
        <div className="strength-grid">
          {strengths.map((item, index) => (
            <article
              className={`strength-card${activeStrength === index ? " is-active" : ""}`}
              key={item.title}
              onPointerEnter={() => setActiveStrength(index)}
            >
              <h3>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
              <p>{item.subtitle}</p>
              <div><img src={item.image} alt="" /></div>
              <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
