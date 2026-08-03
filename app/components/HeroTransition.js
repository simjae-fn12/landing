"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    key: "cloud",
    eyebrow: "NEXT-GEN ARCHITECTURE · 01",
    title: ["Cloud-Native Agility for", "Frictionless Capital Growth"],
    description: "레거시 부담을 최소화한 클라우드 아키텍처 기반의 유연한 자산 경험",
  },
  {
    key: "compliance",
    eyebrow: "COMPLIANCE-BY-DESIGN · 02",
    title: ["Compliance-by-Design:", "AI-Powered Regulatory Excellence"],
    description: "복잡한 금융 규제를 설계 단계부터 반영하는 AI 기반 준법 지원 시스템",
  },
  {
    key: "intelligence",
    eyebrow: "DATA INTELLIGENCE · 03",
    title: ["Precision Intelligence", "Data-Driven Hyper"],
    description: "빅데이터 인프라를 통한 정밀한 시장 신호 분석 및 리스크 정보",
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function HeroTitle({ as: Tag, lines }) {
  let wordIndex = 0;

  return (
    <Tag aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => (
        <span className="hero-title__line" aria-hidden="true" key={line}>
          {line.split(" ").map((word) => {
            const index = wordIndex;
            wordIndex += 1;

            return (
              <span
                className="hero-title__word"
                style={{ "--hero-word-delay": `${0.35 + index * 0.02}s` }}
                key={`${lineIndex}-${index}-${word}`}
              >
                {word}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export default function HeroTransition() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const activeRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const header = document.querySelector(".landing-nav");
    if (!root || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame;
    let readyFrame;

    const measure = () => {
      const start = root.offsetTop;
      const distance = root.offsetHeight - window.innerHeight;
      targetRef.current = clamp((window.scrollY - start) / Math.max(distance, 1));
    };

    const render = () => {
      const target = targetRef.current;
      const current = reducedMotion
        ? target
        : progressRef.current + (target - progressRef.current) * 0.1;

      progressRef.current = Math.abs(target - current) < 0.0001 ? target : current;
      frame.style.setProperty("--hero-progress", progressRef.current.toFixed(4));
      header?.style.setProperty("--hero-progress", progressRef.current.toFixed(4));

      const nextScene = Math.min(2, Math.round(progressRef.current * 2));
      if (nextScene !== activeRef.current) {
        activeRef.current = nextScene;
        setActiveScene(nextScene);
      }
      animationFrame = requestAnimationFrame(render);
    };

    measure();
    readyFrame = requestAnimationFrame(() => setIsReady(true));
    animationFrame = requestAnimationFrame(render);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(readyFrame);
      header?.style.removeProperty("--hero-progress");
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="hero-transition" ref={rootRef} aria-label="NEXT 핵심 기술">
      <div className="hero-transition__sticky" ref={frameRef}>
        <div className="hero-transition__scenes">
          {scenes.map((scene, index) => (
            <article
              className={`hero-scene hero-scene--${scene.key}${isReady && activeScene === index ? " is-active" : ""}`}
              key={scene.key}
              aria-hidden={activeScene !== index}
            >
              <div className="hero-scene__visual">
                <div className="hero-scene__image" />
              </div>
              <div className="hero-scene__content">
                <p className="eyebrow">{scene.eyebrow}</p>
                <HeroTitle as={index === 0 ? "h1" : "h2"} lines={scene.title} />
                <p>{scene.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="hero-transition__explore" aria-hidden="true">
          <svg viewBox="0 0 18 24" role="presentation">
            <path d="M9 1V21M2 14L9 21L16 14" />
          </svg>
          <span>Scroll to explore</span>
        </div>

      </div>
    </section>
  );
}
