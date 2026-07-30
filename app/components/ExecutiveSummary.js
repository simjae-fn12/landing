"use client";

import { useEffect, useRef, useState } from "react";

const visuals = [
  "/landing/executive-summary-01.png",
  "/landing/executive-summary-02.png",
  "/landing/executive-summary-03.png",
  "/landing/executive-summary-04.png",
  "/landing/executive-summary-05.png",
  "/landing/executive-summary-06.png",
  "/landing/executive-summary-07.png",
];

export default function ExecutiveSummary() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const slotRef = useRef(null);
  const progressRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let frame;

    const update = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const slot = slotRef.current;
      if (!section || !sticky || !slot) return;

      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / window.innerHeight));
      const slotBounds = slot.getBoundingClientRect();
      const targetWidth = slotBounds.width;
      const targetHeight = slotBounds.height;
      const scaleX = 1 + (targetWidth / window.innerWidth - 1) * progress;
      const scaleY = 1 + (targetHeight / window.innerHeight - 1) * progress;
      const stickyBounds = sticky.getBoundingClientRect();
      const slotCenterX = slotBounds.left - stickyBounds.left + slotBounds.width * 0.5;
      const slotCenterY = slotBounds.top - stickyBounds.top + slotBounds.height * 0.5;
      const translateX = (slotCenterX - window.innerWidth * 0.5) * progress;
      const translateY = (slotCenterY - window.innerHeight * 0.5) * progress;

      progressRef.current = progress;
      sticky.style.setProperty("--executive-progress", progress.toFixed(4));
      sticky.style.setProperty("--executive-scale-x", scaleX.toFixed(5));
      sticky.style.setProperty("--executive-scale-y", scaleY.toFixed(5));
      sticky.style.setProperty("--executive-x", `${translateX.toFixed(2)}px`);
      sticky.style.setProperty("--executive-y", `${translateY.toFixed(2)}px`);
      sticky.dataset.collapsed = progress >= 0.8 ? "true" : "false";
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onPointerMove = (event) => {
      const sticky = stickyRef.current;
      if (!sticky) return;
      const bounds = sticky.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const strength = Math.sin(progressRef.current * Math.PI) * 45;
      sticky.style.setProperty("--executive-rotate-x", `${(-y * strength).toFixed(2)}deg`);
      sticky.style.setProperty("--executive-rotate-y", `${(x * strength).toFixed(2)}deg`);
    };

    const resetPointer = () => {
      stickyRef.current?.style.setProperty("--executive-rotate-x", "0deg");
      stickyRef.current?.style.setProperty("--executive-rotate-y", "0deg");
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    stickyRef.current?.addEventListener("pointermove", onPointerMove);
    stickyRef.current?.addEventListener("pointerleave", resetPointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      stickyRef.current?.removeEventListener("pointermove", onPointerMove);
      stickyRef.current?.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const startHover = () => {
    if (progressRef.current >= 0.8) setIsHovering(true);
  };

  const advanceSummary = () => {
    const section = sectionRef.current;
    if (!section) return;

    const end = section.offsetTop + section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: Math.min(end, window.scrollY + window.innerHeight * 0.9),
      behavior: "smooth",
    });
  };

  return (
    <section className="executive-summary" ref={sectionRef}>
      <div
        className={`executive-summary__sticky${isHovering ? " is-hovering" : ""}`}
        ref={stickyRef}
      >
        <div className="executive-summary__light-surface" aria-hidden="true" />
        <p className="executive-summary__label">EXECUTIVE SUMMARY · 2026</p>

        <div
          className="executive-summary__intro-type"
          data-scroll-cursor="down"
          onClick={advanceSummary}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") advanceSummary();
          }}
          role="button"
          tabIndex={0}
          aria-label="Executive Summary 전환 진행"
        >
          <img src="/landing/type-media-pipeline-initial.svg" alt="" />
          <i aria-hidden="true" />
          <img src="/landing/type-first-trading-initial.svg" alt="" />
        </div>

        <div className="executive-summary__type" aria-label="Media-First Pipeline Trading. From Insight to Instant Trade.">
          <div className="executive-summary__headline">
            <img src="/landing/type-media-final.svg" alt="" />
            <i className="executive-summary__slot" ref={slotRef} aria-hidden="true" />
            <img src="/landing/type-first-final.svg" alt="" />
          </div>
          <div className="executive-summary__subline">
            <img src="/landing/type-pipeline-final.svg" alt="" />
            <img src="/landing/type-trading-final.svg" alt="" />
          </div>
          <img className="executive-summary__insight-type" src="/landing/type-insight-trade-final.svg" alt="" />
        </div>

        <div className="executive-summary__player" aria-hidden="true">
          <video
            src="/landing/executive-summary-play.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div
          className="executive-summary__window"
          onPointerEnter={startHover}
          onPointerLeave={() => setIsHovering(false)}
          aria-hidden="true"
        >
          <div className="executive-summary__stage">
            <div className="executive-summary__track">
              {visuals.map((image, index) => (
                <figure key={image} className={index % 2 ? "is-even" : "is-odd"}>
                  <div className="executive-summary__float">
                    <img src={image} alt="" />
                  </div>
                </figure>
              ))}
            </div>
            <video
              className="executive-summary__video"
              src="/landing/executive-summary-play.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="executive-summary__hover-label">
            <span>Explore</span>
            <span>Pipeline</span>
          </div>
        </div>

        <div className="executive-summary__copy">
          <p>
            콘텐츠와 시장 데이터, 투자자 정보를 하나의 흐름으로 연결합니다.
            NEXT는 탐색과 판단 사이의 마찰을 줄이는 Media-First 금융 경험을 설계합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
