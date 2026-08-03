"use client";

import { useEffect, useRef } from "react";

export default function LandingCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame;
    let visible = false;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const move = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const nextVisible = Boolean(event.target.closest("[data-scroll-cursor='down']"));
      if (nextVisible !== visible) {
        visible = nextVisible;
        cursor.classList.toggle("is-visible", visible);
      }
    };

    const leave = () => {
      visible = false;
      cursor.classList.remove("is-visible");
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="landing-scroll-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 194 194" role="presentation">
        <circle cx="97" cy="97" r="97" />
        <path d="M96 54V141M60 106L96 142L132 106" />
      </svg>
    </div>
  );
}
