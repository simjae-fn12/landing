"use client";

import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    eyebrow: "Compliance-First Curation",
    eyebrowKo: "검증된 시장 데이터만을 정제",
    title: "Compliance-by-Design:\nAI-Powered Regulatory Excellence",
    description: "금소법 테두리 안에서 검증된 시장 데이터만을 정제합니다. '단순 종목 추천'의 리스크를 차단하고 법적 가이드라인을 완벽히 준수한 안전한 정보만을 전달합니다.",
    image: "/landing/summary-compliance-first.png",
  },
  {
    eyebrow: "Zero-Friction Disclosure Analysis",
    eyebrowKo: "AI 실시간 추적·요약",
    title: "Automated Public Filing Processing &\nReal-time Summarization",
    description: "수십 페이지의 어렵고 복잡한 공시 자료를 AI 백엔드가 실시간으로 추적·요약합니다. 투자자가 직접 정보를 찾고 분석하는 수고를 제로(Zero)화합니다.",
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
    imagePosition: "4.43% 91.87%",
    imageAlt: "푸른 하늘을 배경으로 움직이는 차세대 기술 인재",
    points: ["싱가포르·미국 거점 기반의 AI/IT 핵심 인재 유치", "선진 테크사 출신의 검증된 엔지니어링 리더십", "지속 가능한 글로벌 기술 개발 생태계 구축"],
  },
  {
    title: "Tech-Centric Team &\nRegTech Expertise",
    subtitle: "검증된 핀테크 인재 & Compliance-First",
    imagePosition: "49.93% 91.77%",
    imageAlt: "망원경으로 시장을 탐색하는 기술 전문가",
    points: ["글로벌 규제 테스트베드 연계를 통한 빠른 서비스 검증", "해외 선진 금융 규제 트렌드의 선제적 반영", "COMPLIANCE-BY-DESIGN 프레임워크 기반의 기민성 확보"],
  },
  {
    title: "Data-Driven Personal\n& Risk Management",
    subtitle: "데이터 기반 지능형 리스크 케어",
    imagePosition: "95.57% 91.8%",
    imageAlt: "붓 위에 앉은 새로 표현한 정밀한 데이터 큐레이션",
    points: ["글로벌 거점 간 무마찰(ZERO-FRICTION) 개발 협업 체계", "고성능 AI 인프라 및 데이터 백엔드 글로벌 분산", "엔터프라이즈급 글로벌 보안 및 명문화 규제 준수"],
  },
];

export default function CapabilitiesSection({ children }) {
  const [activeCapability, setActiveCapability] = useState(-1);
  const [activeStrength, setActiveStrength] = useState(0);
  const [activeStrengthPoint, setActiveStrengthPoint] = useState(0);
  const listRef = useRef(null);
  const cursorRef = useRef(null);
  const previewRefs = useRef([]);
  const strengthsRef = useRef(null);
  const strengthLineRefs = useRef([]);
  const activeCapabilityRef = useRef(-1);
  const activeStrengthRef = useRef(0);
  const activeStrengthPointRef = useRef(0);
  const hasPointerRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const easedPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame;
    let hoverFrame;

    const syncHoverFromPoint = () => {
      hoverFrame = undefined;
      if (!hasPointerRef.current || window.matchMedia("(hover: none)").matches) return;

      const { x, y } = pointerRef.current;
      const target = document.elementFromPoint(x, y);
      const row = target?.closest?.("[data-capability-index]");
      const list = listRef.current;

      if (row && list?.contains(row)) {
        const index = Number(row.dataset.capabilityIndex);
        if (activeCapabilityRef.current !== index) {
          activeCapabilityRef.current = index;
          setActiveCapability(index);
        }
        cursorRef.current?.classList.add("is-visible");
        list.classList.add("is-hovering");
        return;
      }

      if (activeCapabilityRef.current !== -1) {
        activeCapabilityRef.current = -1;
        setActiveCapability(-1);
        cursorRef.current?.classList.remove("is-visible");
        list?.classList.remove("is-hovering");
      }
    };

    const scheduleHoverSync = () => {
      if (hoverFrame) return;
      hoverFrame = requestAnimationFrame(syncHoverFromPoint);
    };

    const trackPointer = (event) => {
      hasPointerRef.current = true;
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    const tick = () => {
      const target = pointerRef.current;
      const eased = easedPointerRef.current;
      eased.x += (target.x - eased.x) * 0.12;
      eased.y += (target.y - eased.y) * 0.12;

      const cursor = cursorRef.current;
      if (cursor) {
        const cursorHalf = cursor.offsetWidth * 0.5;
        cursor.style.transform = `translate3d(${eased.x - cursorHalf}px, ${eased.y - cursorHalf}px, 0)`;
      }

      const preview = previewRefs.current[activeCapabilityRef.current];
      if (preview) {
        const previewHalfHeight = preview.offsetHeight * 0.5;
        const lagX = Math.max(-5, Math.min(5, (target.x - eased.x) * 0.03));
        const lagY = Math.max(-5, Math.min(5, (target.y - eased.y) * 0.03));
        preview.style.transform = `translate3d(${eased.x + 84}px, ${eased.y - previewHalfHeight}px, 0) perspective(700px) rotateX(${lagY}deg) rotateY(${-lagX}deg)`;

        const image = preview.querySelector("img");
        if (image) {
          const imageX = Math.max(-2, Math.min(2, (target.x - eased.x) * 0.006));
          const imageY = Math.max(-2, Math.min(2, (target.y - eased.y) * 0.006));
          image.style.transform = `translate(${-imageX}%, ${-imageY}%) scale(1.04)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("scroll", scheduleHoverSync, { passive: true });
    window.addEventListener("resize", scheduleHoverSync);

    return () => {
      cancelAnimationFrame(frame);
      if (hoverFrame) cancelAnimationFrame(hoverFrame);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("scroll", scheduleHoverSync);
      window.removeEventListener("resize", scheduleHoverSync);
    };
  }, []);

  useEffect(() => {
    let frame;

    const updateStrengths = () => {
      frame = undefined;
      const section = strengthsRef.current;
      if (!section) return;

      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range));
      const lineCount = strengthLineRefs.current.length || strengths.length * 3;
      const scaled = progress * lineCount;
      const activeLine = Math.min(lineCount - 1, Math.floor(scaled));
      const lineProgress = progress >= 1 ? 1 : scaled - activeLine;
      const nextStrength = Math.floor(activeLine / 3);
      const nextPoint = activeLine % 3;

      section.style.setProperty("--strengths-progress", progress.toFixed(4));
      strengthLineRefs.current.forEach((line, index) => {
        if (!line) return;
        const value = index < activeLine ? 1 : index === activeLine ? lineProgress : 0;
        line.style.setProperty("--strength-line-progress", value.toFixed(4));
        line.dataset.state = index < activeLine ? "complete" : index === activeLine ? "active" : "pending";
      });

      if (activeStrengthRef.current !== nextStrength) {
        activeStrengthRef.current = nextStrength;
        setActiveStrength(nextStrength);
      }
      if (activeStrengthPointRef.current !== nextPoint) {
        activeStrengthPointRef.current = nextPoint;
        setActiveStrengthPoint(nextPoint);
      }
    };

    const scheduleStrengthsUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateStrengths);
    };

    updateStrengths();
    window.addEventListener("scroll", scheduleStrengthsUpdate, { passive: true });
    window.addEventListener("resize", scheduleStrengthsUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleStrengthsUpdate);
      window.removeEventListener("resize", scheduleStrengthsUpdate);
    };
  }, []);

  const movePointer = (event) => {
    hasPointerRef.current = true;
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;

    const row = event.target.closest?.("[data-capability-index]");
    if (!row) return;

    const index = Number(row.dataset.capabilityIndex);
    if (activeCapabilityRef.current === -1) {
      easedPointerRef.current = { x: event.clientX, y: event.clientY };
    }
    if (activeCapabilityRef.current !== index) {
      activeCapabilityRef.current = index;
      setActiveCapability(index);
    }
    cursorRef.current?.classList.add("is-visible");
    listRef.current?.classList.add("is-hovering");
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
        <div className="capability-list__background" aria-hidden="true">
          <img src="/landing/capabilities-beach-full.png" alt="" />
        </div>
        {capabilities.map((item, index) => (
          <article
            className={`capability-row${activeCapability === index ? " is-active" : ""}`}
            data-capability-index={index}
            key={item.title}
          >
            {index === 0 && (
              <header className="capability-row__section-header">
                <p>STRENGTHS AND KEY ADVANTAGES</p>
              </header>
            )}
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

      {children}

      <div className="strengths-section" ref={strengthsRef}>
        <div className="strengths-section__sticky">
          <header className="strengths-section__header">
            <p className="strengths-section__kicker">STRENGTHS AND KEY ADVANTAGES</p>
            <div className="strengths-section__intro">
              <h2><span>Next-</span><span>Strengths</span></h2>
              <p>싱가포르 및 미국 법인을 중심으로 글로벌 AI/IT 탑 탤런트를 선제적으로 확보합니다. 선진 핀테크 규제 샌드박스를 기민하게 접목하여 독보적인 글로벌 네트워크와 테크 리더십을 구축합니다.</p>
            </div>
          </header>
          <div className="strength-grid">
            {strengths.map((item, index) => (
              <article
                className={`strength-card${activeStrength === index ? " is-active" : ""}`}
                key={item.title}
              >
                <h3>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{item.subtitle}</p>
                <div
                  className="strength-card__image"
                  style={{ "--strength-image-position": item.imagePosition }}
                  role="img"
                  aria-label={item.imageAlt}
                />
                <ul>
                  {item.points.map((point, pointIndex) => (
                    <li
                      key={point}
                      ref={(node) => { strengthLineRefs.current[index * 3 + pointIndex] = node; }}
                      aria-current={activeStrength === index && activeStrengthPoint === pointIndex ? "step" : undefined}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
