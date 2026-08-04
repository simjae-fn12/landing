"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    image: "/landing/summary-compliance-first.png",
    title: "Compliance-First Curation",
    label: "Compliance-by-Design: AI-Powered Regulatory Excellence",
    description: "금소법 테두리 안에서 검증된 시장 데이터만을 정제합니다. 법적 가이드라인을 완벽히 준수한 안전한 정보만을 전달합니다.",
  },
  {
    image: "/landing/summary-disclosure.png",
    title: "Zero-Friction Disclosure Analysis",
    label: "Automated Public Filing Processing & Real-time Summarization",
    description: "수십 페이지의 어렵고 복잡한 공시 자료를 AI 백엔드가 실시간으로 추적·요약합니다. 투자자가 직접 정보를 찾고 분석하는 수고를 줄입니다.",
  },
  {
    image: "/landing/summary-personalization.png",
    title: "Compliance",
    label: "Hyper-Personalized Trading Signal & Risk Management Engine",
    description: "초보부터 고액 투자자까지 유저 개개인의 매매 스타일과 가용성을 정밀 분석합니다. 최적화된 리스크 관리 신호를 큐레이션합니다.",
  },
];

export default function IntelligenceSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const cardRefs = useRef([]);
  const activeRef = useRef(0);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    let frame;

    const update = () => {
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 800;

      if (isMobile) {
        const section = sectionRef.current;
        const cardTrack = cardsRef.current;
        if (!section || !cardTrack) return;

        const distance = section.offsetHeight - viewportHeight;
        const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(distance, 1)));
        const availableWidth = section.clientWidth - 32;
        const maxTranslate = Math.max(0, cardTrack.scrollWidth - availableWidth);
        cardTrack.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;

        const nextCard = Math.min(cards.length - 1, Math.floor(progress * cards.length));
        if (nextCard !== activeRef.current) {
          activeRef.current = nextCard;
          setActiveCard(nextCard);
        }

        cardRefs.current.forEach((card, index) => {
          card?.style.setProperty("--card-reveal", "1");
          card?.style.setProperty("--card-travel", "0");
          card?.style.setProperty("--card-stage-reveal", "1");
          card?.style.setProperty("--card-line-progress", index <= nextCard ? "1" : "0");
        });
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      if (cardsRef.current) cardsRef.current.style.transform = "";

      const clamp = (value) => Math.min(1, Math.max(0, value));
      const scrollDistance = Math.max(1, section.offsetHeight - viewportHeight);
      const sectionProgress = clamp(-section.getBoundingClientRect().top / scrollDistance);
      const stagedProgress = sectionProgress * cards.length;
      const nextCard = Math.min(cards.length - 1, Math.floor(stagedProgress));
      const localProgress = nextCard === cards.length - 1 && sectionProgress === 1
        ? 1
        : clamp(stagedProgress - nextCard);

      if (nextCard !== activeRef.current) {
        activeRef.current = nextCard;
        setActiveCard(nextCard);
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const isActive = index === nextCard;
        const isComplete = index < nextCard;
        const lineProgress = isComplete ? 1 : isActive ? localProgress : 0;

        card.style.setProperty("--card-line-progress", lineProgress.toFixed(4));
        card.style.setProperty("--card-stage-reveal", isActive ? "1" : "0");
        card.style.setProperty("--card-reveal", isActive ? "1" : "0");
        card.style.setProperty("--card-travel", "0");
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToNextCard = () => {
    const nextCard = cardRefs.current.find(
      (card) => card && card.getBoundingClientRect().top > window.innerHeight * 0.42,
    );

    if (nextCard) {
      nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    sectionRef.current?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="intelligence-section" ref={sectionRef} data-scroll-cursor="down" data-nav-theme="light">
      <header className="summary-section__header intelligence-section__header">
        <p>DATA &amp; INTELLIGENCE PLATFORM</p>
      </header>

      <div className="intelligence-section__outer">
        <div className="intelligence-section__intro">
          <div
            data-scroll-cursor="down"
            onClick={scrollToNextCard}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") scrollToNextCard();
            }}
            role="button"
            tabIndex={0}
            aria-label="다음 Intelligence 카드로 이동"
          >
            <h2>AI-Native<br />Intelligence Engine</h2>
            <p className="intelligence-section__description">
              투자자가 직접 복잡한 공시 분석을 최소화하고,
              AI 백엔드가 준법 가이드라인 안에서 시장 데이터와
              매매 패턴을 추적해 검증된 인사이트만을 큐레이션하는
              AI-Native 플랫폼 아키텍처로 명확히 정의합니다.
            </p>
          </div>
        </div>

        <div className="intelligence-section__right">
          <div className="intelligence-section__pagination">
            <span>0{activeCard + 1} / 03</span>
            <div>
              {cards.map((card, index) => (
                <i className={index <= activeCard ? "is-active" : ""} key={card.title} />
              ))}
            </div>
          </div>

          <div className="intelligence-section__cards" ref={cardsRef}>
            {cards.map((card, index) => (
              <article
                className="intelligence-card"
                key={card.title}
                ref={(element) => { cardRefs.current[index] = element; }}
                aria-hidden={activeCard !== index}
              >
                <div className="intelligence-card__image">
                  <img src={card.image} alt="" />
                </div>
                <div className="intelligence-card__info">
                  <h3>{card.title}</h3>
                  <div className="intelligence-card__meta">
                    <p>{card.label}</p>
                    <p>{card.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
