"use client";

import { useEffect, useRef } from "react";

export default function ClosingVisionSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const bounds = section.getBoundingClientRect();
      const distance = window.innerHeight - bounds.top;
      const range = window.innerHeight + bounds.height;
      const progress = Math.max(0, Math.min(1, distance / range));
      section.style.setProperty("--closing-progress", progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="closing-vision" ref={sectionRef}>
      <div className="closing-vision__media" aria-hidden="true">
        <img src="/landing/closing-desert.png" alt="" />
      </div>
      <div className="closing-vision__shade" aria-hidden="true" />
      <div className="closing-vision__content">
        <h2>
          <span>Redefining Finance, Built on</span>
          <span>Compliance-by-Design</span>
        </h2>
        <p>처음부터 바르게 설계된 기술로, 자본을 다루는 길을 새롭게 다듭니다</p>
      </div>
    </section>
  );
}
