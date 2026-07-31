"use client";

import { useEffect } from "react";

const REVEAL_GROUPS = [
  ["#ipgqtg", "reveal-up"],
  ["#iod904 > div", "reveal-up"],
  ["#i1lwz-2-4-2-3 > div", "reveal-up"],
  ["#iryxrh > div", "reveal-up"],
  ["#i1lwz-2-5-2, #i1lwz-2-5-3", "reveal-up"],
];

const NAV_ITEMS = [
  ['[data-option-b-target="#ilwyn"]', "#ilwyn"],
  ['[data-option-b-target="#ilwyn-2-2-2-2"]', "#ilwyn-2-2-2-2"],
  ['[data-option-b-target="#ilwyn-2-2"]', "#ilwyn-2-2"],
  [
    '[data-option-b-target="#option-b-core-strengths-slot"]',
    "#option-b-core-strengths-slot",
  ],
];

export default function OptionBInteractions() {
  useEffect(() => {
    const cleanups = [];
    const revealElements = [];

    REVEAL_GROUPS.forEach(([selector, className]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add("b-reveal", className);
        element.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
        revealElements.push(element);
      });
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
          else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
    cleanups.push(() => revealObserver.disconnect());

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          NAV_ITEMS.forEach(([navSelector, sectionSelector]) => {
            document
              .querySelector(navSelector)
              ?.classList.toggle("is-active", sectionSelector === `#${entry.target.id}`);
          });
        });
      },
      { threshold: 0.22, rootMargin: "-20% 0px -55% 0px" },
    );

    NAV_ITEMS.forEach(([navSelector, sectionSelector]) => {
      const nav = document.querySelector(navSelector);
      const section = document.querySelector(sectionSelector);
      if (!nav || !section) return;
      nav.setAttribute("role", "link");
      nav.tabIndex = 0;
      const activate = (event) => {
        if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      nav.addEventListener("click", activate);
      nav.addEventListener("keydown", activate);
      sectionObserver.observe(section);
      cleanups.push(() => {
        nav.removeEventListener("click", activate);
        nav.removeEventListener("keydown", activate);
      });
    });
    cleanups.push(() => sectionObserver.disconnect());

    const proofSection = document.querySelector("#ilwyn-2-2-3-2");
    const proofCards = Array.from(document.querySelectorAll("#iryxrh > div"));
    if (proofSection && proofCards.length) {
      let proofFrame;

      const updateActiveProof = () => {
        proofFrame = undefined;
        const sectionRect = proofSection.getBoundingClientRect();
        if (sectionRect.bottom <= 0 || sectionRect.top >= window.innerHeight) return;

        const scrollRange = Math.max(
          proofSection.offsetHeight - window.innerHeight,
          1,
        );
        const progress = Math.min(
          1,
          Math.max(0, -sectionRect.top / scrollRange),
        );
        const activeIndex = Math.min(
          proofCards.length - 1,
          Math.floor(progress * proofCards.length),
        );

        proofCards.forEach((card, index) => {
          card.classList.toggle("is-active", index === activeIndex);
        });
      };

      const queueProofUpdate = () => {
        if (proofFrame) return;
        proofFrame = requestAnimationFrame(updateActiveProof);
      };

      proofCards[0].classList.add("is-active");
      updateActiveProof();
      window.addEventListener("scroll", queueProofUpdate, { passive: true });
      window.addEventListener("resize", queueProofUpdate);
      cleanups.push(() => {
        if (proofFrame) cancelAnimationFrame(proofFrame);
        window.removeEventListener("scroll", queueProofUpdate);
        window.removeEventListener("resize", queueProofUpdate);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
