"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const strengths = [
  {
    image: "/assets/option-b/next-core-1.png",
    title: "Next-Gen Headless\nEnterprise Architecture",
    description:
      "기술 부채가 없는 클라우드 네이티브 아키텍처로 빠르고 안정적인 금융 서비스를 구현합니다.",
  },
  {
    image: "/assets/option-b/next-core-2.png",
    title: "Tech-Centric Team &\nRegTech Expertise",
    description:
      "검증된 핀테크 인재와 글로벌 규제 전문성을 기반으로 Compliance-First 서비스를 설계합니다.",
  },
  {
    image: "/assets/option-b/next-core-3.png",
    title: "Data-Driven Personalization\n& Risk Care",
    description:
      "데이터 기반 초개인화와 정밀한 리스크 관리로 투자자에게 최적화된 금융 경험을 제공합니다.",
  },
  {
    image: "/assets/option-b/next-core-4.png",
    title: "Global R&D Network\n& Execution Agility",
    description:
      "글로벌 기술 거점과 검증된 실행 체계를 연결해 변화하는 금융 환경에 빠르게 대응합니다.",
  },
];

export default function OptionBCoreStrengths() {
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    setSlot(document.querySelector("#option-b-core-strengths-slot"));
  }, []);

  useEffect(() => {
    if (!slot) return;

    const cards = Array.from(slot.querySelectorAll(".option-b-core-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    const cleanups = [];

    cards.forEach((card, index) => {
      card.classList.add("b-reveal", "reveal-side");
      card.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 70}ms`);
      observer.observe(card);

      const media = card.querySelector(".option-b-core-card__media");
      const image = media?.querySelector("img");
      if (!media || !image) return;

      const onMove = (event) => {
        const rect = media.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        image.style.setProperty("--parallax-x", `${x * 10}px`);
        image.style.setProperty("--parallax-y", `${y * 10}px`);
      };
      const onLeave = () => {
        image.style.setProperty("--parallax-x", "0px");
        image.style.setProperty("--parallax-y", "0px");
      };

      media.addEventListener("pointermove", onMove);
      media.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        media.removeEventListener("pointermove", onMove);
        media.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [slot]);

  if (!slot) return null;

  return createPortal(
    <section className="option-b-core" id="ilwyn-2-2-3" aria-labelledby="option-b-core-title">
      <header className="option-b-core__header">
        <div>
          <p className="option-b-core__eyebrow">ABOUT OUR PLATFORM</p>
          <h2 id="option-b-core-title">Core Strengths</h2>
        </div>
        <p>
          Learn more about the innovative functionalities that drive our
          Next Securities platform.
        </p>
      </header>

      <div className="option-b-core__list">
        {strengths.map((strength, index) => (
          <article className="option-b-core-card" key={strength.title}>
            <div className="option-b-core-card__media">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <img src={strength.image} alt="" loading="lazy" />
            </div>
            <div className="option-b-core-card__copy">
              <p className="option-b-core-card__eyebrow">FEATURE {index + 1}</p>
              <h3>
                {strength.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className="option-b-core-card__description">{strength.description}</p>
              <a className="option-b-core-card__button" href="/trading">
                <span>Get Started</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>,
    slot,
  );
}
