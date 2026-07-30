"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    image: "/landing/summary-compliance-first.png",
    title: "Compliance-First Curation",
    label: "Compliance-by-Design: AI-Powered Regulatory Excellence",
    description: "내부 준법 기준을 반영해 시장 데이터를 정제하고, 정보의 출처와 기준 시점을 함께 전달합니다.",
  },
  {
    image: "/landing/summary-disclosure.png",
    title: "Zero-Friction Disclosure Analysis",
    label: "Automated Public Filing Processing & Real-time Summarization",
    description: "복잡한 공시 자료를 구조화해 투자자가 핵심 정보와 관련 위험 요인을 빠르게 탐색하도록 돕습니다.",
  },
  {
    image: "/landing/summary-personalization.png",
    title: "Personalized Information Discovery",
    label: "Data-Driven Personalization & Risk Information",
    description: "사용자의 관심 자산과 탐색 흐름에 따라 필요한 정보의 우선순위와 깊이를 조정합니다.",
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

        cardRefs.current.forEach((card) => {
          card?.style.setProperty("--card-reveal", "1");
          card?.style.setProperty("--card-travel", "0");
        });
        return;
      }

      if (cardsRef.current) cardsRef.current.style.transform = "";

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const bounds = card.getBoundingClientRect();
        const reveal = Math.min(1, Math.max(0, (viewportHeight * 0.85 - bounds.top) / (viewportHeight * 0.25)));
        const travel = Math.min(1, Math.max(0, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
        card.style.setProperty("--card-reveal", reveal.toFixed(4));
        card.style.setProperty("--card-travel", travel.toFixed(4));
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
    <section className="intelligence-section" ref={sectionRef}>
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
            <p className="section-label">AI-NATIVE PLATFORM</p>
            <h2>AI-Native<br />Intelligence Engine</h2>
            <p>
              복잡한 공시를 직접 분석하는 수고를 줄이고, 시장 데이터와 탐색
              패턴을 준법 기준 안에서 구조화합니다. NEXT의 AI 데이터 레이어는
              정답을 대신 제시하기보다 판단에 필요한 정보를 더 명확하게
              전달합니다.
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
