"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    key: "cloud",
    eyebrow: "NEXT-GEN ARCHITECTURE · 01",
    title: <>Cloud-Native Agility for<br />Frictionless Capital Growth</>,
    description: "레거시 부담을 최소화한 클라우드 아키텍처 기반의 유연한 자산 경험",
  },
  {
    key: "compliance",
    eyebrow: "COMPLIANCE-BY-DESIGN · 02",
    title: <>Compliance-by-Design:<br />AI-Powered Regulatory Excellence</>,
    description: "복잡한 금융 규제를 설계 단계부터 반영하는 AI 기반 준법 지원 시스템",
  },
  {
    key: "intelligence",
    eyebrow: "DATA INTELLIGENCE · 03",
    title: <>Precision Intelligence<br />Data-Driven Hyper</>,
    description: "빅데이터 인프라를 통한 정밀한 시장 신호 분석 및 리스크 정보",
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function HeroTransition() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const activeRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame;

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

      const nextScene = Math.min(2, Math.round(progressRef.current * 2));
      if (nextScene !== activeRef.current) {
        activeRef.current = nextScene;
        setActiveScene(nextScene);
      }
      animationFrame = requestAnimationFrame(render);
    };

    measure();
    animationFrame = requestAnimationFrame(render);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(animationFrame);
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
              className={`hero-scene hero-scene--${scene.key}${activeScene === index ? " is-active" : ""}`}
              key={scene.key}
              aria-hidden={activeScene !== index}
            >
              <div className="hero-scene__visual">
                <div className="hero-scene__image" />
                <div className="hero-scene__shade" />
              </div>
              <div className="hero-scene__content">
                <p className="eyebrow">{scene.eyebrow}</p>
                {index === 0 ? <h1>{scene.title}</h1> : <h2>{scene.title}</h2>}
                <p>{scene.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="hero-transition__footer">
          <span>Scroll to explore</span>
          <div className="hero-transition__progress">
            <i />
          </div>
          <span>0{activeScene + 1} / 03</span>
        </div>
      </div>
    </section>
  );
}
