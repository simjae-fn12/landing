"use client";

import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    eyebrow: "Compliance-First Curation",
    eyebrowKo: "검증된 시장 데이터만을 정제",
    title: "Compliance-by-Design:\nAI-Powered Regulatory Excellence",
    description: "금소법 테두리 안에서 검증된 시장 데이터만을 정제합니다. '단순 종목 추천'의 리스크를 차단하고 법적 가이드라인을 완벽히 준수한 안전한 정보만을 전달합니다.",
    image: "/landing/capability-hover-01.png",
  },
  {
    eyebrow: "Zero-Friction Disclosure Analysis",
    eyebrowKo: "AI 실시간 추적·요약",
    title: "Automated Public Filing Processing &\nReal-time Summarization",
    description: "수십 페이지의 어렵고 복잡한 공시 자료를 AI 백엔드가 실시간으로 추적·요약합니다. 투자자가 직접 정보를 찾고 분석하는 수고를 제로(Zero)화합니다.",
    image: "/landing/capability-hover-02.png",
  },
  {
    eyebrow: "Compliance Curation",
    eyebrowKo: "데이터 정밀 큐레이션",
    title: "Hyper-Personalized Trading Signal &\nRisk Management Engine",
    description: "초보부터 고액 투자자까지 유저 개개인의 매매 스타일과 가용성을 정밀 분석합니다. 시장의 잡음을 걷어내고 최적화된 리스크 관리 신호를 큐레이션합니다.",
    image: "/landing/capability-hover-03.png",
  },
];

export default function CapabilitiesSection({ children }) {
  const [activeCapability, setActiveCapability] = useState(-1);
  const listRef = useRef(null);
  const previewRefs = useRef([]);
  const activeCapabilityRef = useRef(-1);
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
        list.classList.add("is-hovering");
        return;
      }

      if (activeCapabilityRef.current !== -1) {
        activeCapabilityRef.current = -1;
        setActiveCapability(-1);
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
    listRef.current?.classList.add("is-hovering");
  };

  const leaveCapabilities = () => {
    activeCapabilityRef.current = -1;
    setActiveCapability(-1);
    listRef.current?.classList.remove("is-hovering");
  };

  return (
    <section className="capabilities-section" id="services">
      <div
        className="capability-list"
        data-scroll-cursor="down"
        ref={listRef}
        onPointerMove={movePointer}
        onPointerEnter={(event) => {
          movePointer(event);
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
      </div>

      {children}
    </section>
  );
}
