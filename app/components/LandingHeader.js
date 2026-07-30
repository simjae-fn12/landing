"use client";

import { useEffect, useRef } from "react";

export default function LandingHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    let frame;

    const update = () => {
      const hero = document.querySelector(".hero-transition");
      const header = headerRef.current;
      if (!hero || !header) return;
      header.classList.toggle("is-light", hero.getBoundingClientRect().bottom <= 84);
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
      <a className="landing-logo" href="/" aria-label="NEXT Securities 홈">
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
    </header>
  );
}
