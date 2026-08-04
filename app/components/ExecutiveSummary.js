"use client";

import { useLayoutEffect, useRef, useState } from "react";

const visuals = [
  "/landing/executive-summary-01.png",
  "/landing/executive-summary-02.png",
  "/landing/executive-summary-03.png",
  "/landing/executive-summary-04.png",
  "/landing/executive-summary-05.png",
  "/landing/executive-summary-06.png",
  "/landing/executive-summary-07.png",
];

const insightLines = ["From Insight", "to Instant Trade"];

function InsightReveal() {
  return (
    <span className="executive-summary__insight-type" aria-hidden="true">
      {insightLines.map((line, lineIndex) => {
        let charIndex = 0;

        return (
          <span className="executive-summary__insight-line" key={line}>
            {line.split(" ").map((word, wordIndex, words) => (
              <span className="executive-summary__insight-word" key={word}>
                {[...word].map((char) => {
                  const index = charIndex;
                  charIndex += 1;

                  return (
                    <span
                      className="executive-summary__insight-char"
                      data-char-index={index}
                      data-line-index={lineIndex}
                      key={`${word}-${index}`}
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span className="executive-summary__insight-space">&nbsp;</span>
                )}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

export default function ExecutiveSummary() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const slotRef = useRef(null);
  const firstRef = useRef(null);
  const tradingRef = useRef(null);
  const cursorRef = useRef(null);
  const progressRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    let frame;
    let cursorFrame;
    const cursorTarget = { x: -120, y: -120 };
    const cursorCurrent = { x: -120, y: -120 };

    const update = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const slot = slotRef.current;
      const first = firstRef.current;
      const trading = tradingRef.current;
      if (!section || !sticky || !slot || !first || !trading) return;

      const sectionBounds = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -sectionBounds.top / scrollDistance));
      const pinProgress = Math.min(1, progress / 0.72);
      const easedPinProgress = pinProgress < 0.5
        ? 2 * pinProgress ** 2
        : 1 - ((-2 * pinProgress + 2) ** 2) / 2;
      // MakeReign HomeHero: start "top top", end "+=100%", scrub true.
      // In this 225vh section, 100vh maps to 80% of the 125vh sticky scroll range.
      const titleProgress = Math.min(1, Math.max(0, progress / 0.8));
      const easedTitleProgress = 1 - (1 - titleProgress) ** 2;
      // First / Trading completes at 80%. Hold the combined title before the
      // supporting line begins its reveal at 86%.
      const insightProgress = Math.min(1, Math.max(0, (progress - 0.86) / 0.14));
      // Resolve the final, untransformed slot coordinates from layout offsets.
      // getBoundingClientRect() includes the title's entrance translation and
      // previously made the video window settle 200px below the headline.
      const targetWidth = slot.offsetWidth;
      const targetHeight = slot.offsetHeight;
      const scaleX = 1 + (targetWidth / window.innerWidth - 1) * easedPinProgress;
      const scaleY = 1 + (targetHeight / window.innerHeight - 1) * easedPinProgress;
      const stickyBounds = sticky.getBoundingClientRect();
      const type = first.closest(".executive-summary__type");
      if (!type) return;
      const typeBounds = type.getBoundingClientRect();
      const typeOffsetX = typeBounds.left - stickyBounds.left;
      const rightGutter = Math.max(18, typeOffsetX);
      const firstFinalX = typeOffsetX + first.offsetLeft;
      const tradingFinalX = typeOffsetX + trading.offsetLeft;
      const firstInitialX = stickyBounds.width - rightGutter - first.offsetWidth;
      const tradingInitialX = stickyBounds.width - rightGutter - trading.offsetWidth;
      const firstTravel = Math.max(0, firstInitialX - firstFinalX);
      const tradingTravel = Math.max(0, tradingInitialX - tradingFinalX);
      const slotCenterX = typeOffsetX + slot.offsetLeft + targetWidth * 0.5;
      const slotCenterY = type.offsetTop
        + slot.offsetTop
        + targetHeight * 0.5;
      const stageCenterX = stickyBounds.width * 0.5;
      const stageCenterY = stickyBounds.height * 0.5;
      const translateX = (slotCenterX - stageCenterX) * easedPinProgress;
      const translateY = (slotCenterY - stageCenterY) * easedPinProgress;
      const cards = sticky.querySelectorAll(".executive-summary__track figure");
      const tunnelOffsets = [
        [-24, -10],
        [18, -14],
        [-12, 13],
        [24, 8],
        [-20, 5],
        [10, -5],
        [0, 16],
      ];
      const tunnelScales = [0.12, 0.08, 0.1, 0.07, 0.11, 0.08, 0.09];

      cards.forEach((card, index) => {
        const staggerDelay = index * 0.035;
        const cardProgress = Math.min(
          1,
          Math.max(0, (pinProgress - staggerDelay) / (1 - staggerDelay * 0.8)),
        );
        const easedCardProgress = cardProgress ** 2 * (3 - 2 * cardProgress);
        const cardCenterX = card.offsetLeft + card.offsetWidth * 0.5;
        const cardCenterY = card.offsetTop + card.offsetHeight * 0.5;
        const [offsetX, offsetY] = tunnelOffsets[index] ?? [0, 0];
        const pinX = (slotCenterX + offsetX - cardCenterX) * easedCardProgress;
        const pinY = (slotCenterY + offsetY - cardCenterY) * easedCardProgress;
        const pinScale = 1 + ((tunnelScales[index] ?? 0.09) - 1) * easedCardProgress;
        const exitProgress = Math.min(1, Math.max(0, (cardProgress - 0.72) / 0.28));

        card.style.setProperty("--pin-x", `${pinX.toFixed(2)}px`);
        card.style.setProperty("--pin-y", `${pinY.toFixed(2)}px`);
        card.style.setProperty("--pin-scale", pinScale.toFixed(4));
        card.style.setProperty("--pin-opacity", (1 - exitProgress).toFixed(4));
        card.style.setProperty("--pin-blur", `${(exitProgress * 5).toFixed(2)}px`);
      });

      const insightChars = sticky.querySelectorAll(".executive-summary__insight-char");
      const insightDuration = 0.6;
      const insightStagger = 0.03;
      const insightLineDelay = 0.1;
      const insightTimelineDuration = 1.09;

      insightChars.forEach((char) => {
        const charIndex = Number(char.dataset.charIndex ?? 0);
        const lineIndex = Number(char.dataset.lineIndex ?? 0);
        const charStart = lineIndex * insightLineDelay + charIndex * insightStagger;
        const charProgress = Math.min(
          1,
          Math.max(
            0,
            (insightProgress * insightTimelineDuration - charStart) / insightDuration,
          ),
        );
        const easedCharProgress = 1 - (1 - charProgress) ** 2;
        char.style.setProperty(
          "--executive-char-y",
          `${((1 - easedCharProgress) * 105).toFixed(3)}%`,
        );
      });

      progressRef.current = progress;
      sticky.style.setProperty("--executive-progress", progress.toFixed(4));
      sticky.style.setProperty("--executive-pin-progress", easedPinProgress.toFixed(4));
      sticky.style.setProperty("--executive-collapse-progress", easedPinProgress.toFixed(4));
      sticky.style.setProperty("--executive-title-progress", easedTitleProgress.toFixed(4));
      sticky.style.setProperty("--executive-insight-progress", insightProgress.toFixed(4));
      sticky.style.setProperty("--executive-first-travel", `${firstTravel.toFixed(2)}px`);
      sticky.style.setProperty("--executive-trading-travel", `${tradingTravel.toFixed(2)}px`);
      sticky.style.setProperty("--executive-scale-x", scaleX.toFixed(5));
      sticky.style.setProperty("--executive-scale-y", scaleY.toFixed(5));
      sticky.style.setProperty("--executive-x", `${translateX.toFixed(2)}px`);
      sticky.style.setProperty("--executive-y", `${translateY.toFixed(2)}px`);
      sticky.dataset.collapsed = pinProgress >= 0.98 ? "true" : "false";
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onPointerMove = (event) => {
      cursorTarget.x = event.clientX;
      cursorTarget.y = event.clientY;
    };

    const showCursor = () => {
      cursorRef.current?.classList.add("is-visible");
    };

    const resetPointer = () => {
      cursorRef.current?.classList.remove("is-visible");
    };

    const renderCursor = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursorCurrent.x += (cursorTarget.x - cursorCurrent.x) * 0.18;
        cursorCurrent.y += (cursorTarget.y - cursorCurrent.y) * 0.18;
        cursor.style.transform = `translate3d(${cursorCurrent.x}px, ${cursorCurrent.y}px, 0) translate(-50%, -50%)`;
      }
      cursorFrame = requestAnimationFrame(renderCursor);
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    stickyRef.current?.addEventListener("pointerenter", showCursor);
    stickyRef.current?.addEventListener("pointermove", onPointerMove);
    stickyRef.current?.addEventListener("pointerleave", resetPointer);
    cursorFrame = requestAnimationFrame(renderCursor);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(cursorFrame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      stickyRef.current?.removeEventListener("pointerenter", showCursor);
      stickyRef.current?.removeEventListener("pointermove", onPointerMove);
      stickyRef.current?.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const startHover = () => {
    if (progressRef.current >= 0.8) setIsHovering(true);
  };

  return (
    <section className="executive-summary" ref={sectionRef} data-nav-theme="light">
      <div
        className={`executive-summary__sticky${isHovering ? " is-hovering" : ""}`}
        ref={stickyRef}
      >
        <div className="executive-summary__light-surface" aria-hidden="true" />
        <header className="executive-summary__header">
          <p>EXECUTIVE SUMMARY</p>
        </header>

        <div className="executive-summary__cursor" ref={cursorRef} aria-hidden="true">
          <svg viewBox="0 0 194 194" role="presentation">
            <circle cx="97" cy="97" r="97" />
            <path d="M96 54V141M60 106L96 142L132 106" />
          </svg>
        </div>

        <div className="executive-summary__type" aria-label="Media-Pipeline. First Trading. From Insight to Instant Trade.">
          <div className="executive-summary__headline">
            <span className="executive-summary__word executive-summary__word--media">Media-</span>
            <i className="executive-summary__slot" ref={slotRef} aria-hidden="true" />
            <span ref={firstRef} className="executive-summary__word executive-summary__word--first">First</span>
          </div>
          <div className="executive-summary__subline">
            <span className="executive-summary__word executive-summary__word--pipeline">Pipeline</span>
            <span ref={tradingRef} className="executive-summary__word executive-summary__word--trading">Trading</span>
          </div>
          <InsightReveal />
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

        <div className="executive-summary__track" aria-hidden="true">
          {visuals.map((image, index) => (
            <figure key={image} className={index % 2 ? "is-even" : "is-odd"}>
              <div className="executive-summary__float">
                <img src={image} alt="" />
              </div>
            </figure>
          ))}
        </div>

        <div
          className="executive-summary__window"
          onPointerEnter={startHover}
          onPointerLeave={() => setIsHovering(false)}
          aria-hidden="true"
        >
          <div className="executive-summary__stage">
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

      </div>
    </section>
  );
}
