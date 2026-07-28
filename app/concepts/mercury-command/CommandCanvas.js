"use client";

import { useEffect, useRef } from "react";

const LEVELS = [-.07, -.06, -.05, -.04, -.03, .03, .04, .05, .06, .07];
const COUNT = 900;

function random(index) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function smoothstep(from, to, value) {
  const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
  return t * t * (3 - 2 * t);
}

export default function CommandCanvas({ stageRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    const rings = LEVELS.map((level, ringIndex) =>
      Array.from({ length: COUNT }, (_, pointIndex) => {
        const index = ringIndex * COUNT + pointIndex;
        return {
          angle: pointIndex / COUNT * Math.PI * 2,
          level,
          phase: random(index + 19000) * Math.PI * 2,
          drift: random(index + 33000),
          size: .28 + Math.pow(random(index + 51000), 3) * 1.8,
          bright: random(index + 76000)
        };
      })
    );

    let width = 0;
    let height = 0;
    let targetProgress = 0;
    let progress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedPointerX = 0;
    let easedPointerY = 0;
    let frame = 0;
    let lastTime = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, width < 760 ? 1 : 1.35);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const updateProgress = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const bounds = stage.getBoundingClientRect();
      const distance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      targetProgress = Math.max(0, Math.min(1, -bounds.top / distance));
      document.documentElement.style.setProperty("--mc-p", targetProgress.toFixed(4));
      const slideDistance = Math.max(0, targetProgress - .53) * window.innerWidth * 2.78;
      document.documentElement.style.setProperty("--mc-slide-x", `${slideDistance.toFixed(1)}px`);
    };

    const updatePointer = event => {
      pointerX = event.clientX / Math.max(width, 1) - .5;
      pointerY = event.clientY / Math.max(height, 1) - .5;
    };

    const render = now => {
      const delta = Math.min((now - lastTime) / 1000, .05);
      lastTime = now;
      const ease = 1 - Math.exp(-8 * delta);
      progress += (targetProgress - progress) * ease;
      easedPointerX += (pointerX - easedPointerX) * ease;
      easedPointerY += (pointerY - easedPointerY) * ease;

      const background = context.createRadialGradient(
        width * (.52 + easedPointerX * .025), height * (.48 + easedPointerY * .018), 0,
        width * .5, height * .5, Math.max(width, height) * .78
      );
      background.addColorStop(0, "#29293c");
      background.addColorStop(.48, "#1b1b2b");
      background.addColorStop(1, "#101019");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const reveal = 1 - smoothstep(.42, .455, progress);
      const scatter = 1 - smoothstep(.075, .155, progress);
      const radiusX = Math.min(width * .29, height * .55);
      const radiusY = radiusX * .245;
      const stackHeight = Math.min(height * .24, 230);
      const centerX = width * .5 + easedPointerX * 18;
      const centerY = height * (.515 + progress * .018) + easedPointerY * 11;
      const rotation = now * .000025 + progress * 1.08;

      context.lineWidth = .55;
      rings.forEach((ring, ringIndex) => {
        context.beginPath();
        ring.forEach((point, pointIndex) => {
          const angle = point.angle + rotation;
          const strand = .28 + Math.pow(Math.max(0, Math.cos(angle - .22)), 2.4);
          const noise = Math.sin(angle * 8 + point.phase + now * .00038) * scatter;
          const x = centerX + Math.cos(angle) * radiusX
            + scatter * (point.drift - .5) * width * 1.15 + scatter * strand * width * .12 + noise * 52;
          const y = centerY + point.level / .14 * stackHeight + Math.sin(angle) * radiusY
            + scatter * (random(Math.round(point.phase * 10000)) - .5) * height * 1.15 - scatter * strand * height * .18 + noise * 36;
          if (pointIndex === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.globalAlpha = reveal * (.055 + ringIndex * .003) * (1 - scatter * .72);
        context.strokeStyle = "#d7d5ea";
        context.stroke();
      });

      rings.forEach(ring => ring.forEach(point => {
        const angle = point.angle + rotation;
        const depth = (Math.sin(angle) + 1) * .5;
        const strand = .28 + Math.pow(Math.max(0, Math.cos(angle - .22)), 2.4);
        const noise = Math.sin(angle * 8 + point.phase + now * .00038) * scatter;
        const x = centerX + Math.cos(angle) * radiusX
          + scatter * (point.drift - .5) * width * 1.15 + scatter * strand * width * .12 + noise * 52;
        const y = centerY + point.level / .14 * stackHeight + Math.sin(angle) * radiusY
          + scatter * (random(Math.round(point.phase * 10000)) - .5) * height * 1.15 - scatter * strand * height * .18 + noise * 36;
        const pulse = .72 + Math.sin(now * .0013 + point.phase) * .28;
        context.globalAlpha = reveal * (.18 + depth * .5) * (.7 + point.bright * .3) * pulse;
        context.fillStyle = point.bright > .96 ? "#fff" : "#d9d7e6";
        context.beginPath();
        context.arc(x, y, point.size * (.72 + depth * .7), 0, Math.PI * 2);
        context.fill();
      }));

      context.globalAlpha = 1;
      frame = requestAnimationFrame(render);
    };

    resize();
    updateProgress();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [stageRef]);

  return <canvas ref={canvasRef} className="mc-canvas" aria-hidden="true" />;
}
