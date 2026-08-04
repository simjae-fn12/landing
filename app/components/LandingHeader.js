"use client";

import { useEffect, useRef } from "react";

export default function LandingHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    let frame;
    let lastScrollY = Math.max(0, window.scrollY);
    let lastDirection = 0;
    let directionTravel = 0;

    const update = () => {
      const hero = document.querySelector(".hero-transition");
      const header = headerRef.current;
      if (!hero || !header) return;

      const scrollY = Math.max(0, window.scrollY);
      const delta = scrollY - lastScrollY;
      const heroRect = hero.getBoundingClientRect();
      const isInsideHero = heroRect.bottom > 0;
      const probeY = Math.min(header.offsetHeight / 2, window.innerHeight - 1);
      const themeSurface = [...document.querySelectorAll("[data-nav-theme]")].find((surface) => {
        const rect = surface.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      const isLightTheme = themeSurface?.dataset.navTheme === "light";

      if (isInsideHero) {
        header.classList.remove("is-hidden");
        lastDirection = 0;
        directionTravel = 0;
      } else if (Math.abs(delta) > 1) {
        const direction = delta > 0 ? 1 : -1;

        if (direction !== lastDirection) {
          lastDirection = direction;
          directionTravel = 0;
        }

        directionTravel += Math.abs(delta);

        if (scrollY <= 16) {
          header.classList.remove("is-hidden");
        } else if (directionTravel >= 24) {
          header.classList.toggle("is-hidden", direction > 0);
          directionTravel = 0;
        }
      }

      lastScrollY = scrollY;
      header.classList.toggle("is-hero", isInsideHero);
      header.classList.toggle("is-light", isLightTheme);
      header.classList.toggle("is-dark", !isLightTheme);
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  return (
    <header className="landing-nav" ref={headerRef}>
      <a className="landing-logo" href="/option-a" aria-label="NEXT Securities A안 메인 포탈">
        <img src="/landing/logo.svg" alt="Next Securities" />
      </a>

      <nav aria-label="Primary navigation">
        <a href="#services">Service</a>
        <a href="#services">MarketLens</a>
        <a href="#services">WTS/MTS</a>
        <a href="#services">Research</a>
      </nav>

      <div className="landing-nav__actions">
        <a className="landing-nav__language" href="#contact" lang="en">EN</a>
        <a className="nav-cta" href="/trading">Trading Portal</a>
      </div>

      <span className="landing-nav__progress" aria-hidden="true">
        <i />
      </span>
    </header>
  );
}
