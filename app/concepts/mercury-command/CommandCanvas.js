"use client";

import { useEffect, useRef } from "react";

function seeded(index) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export default function CommandCanvas({ stageRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    const particles = Array.from({ length: 2600 }, (_, index) => {
      const latitude = (seeded(index) - .5) * Math.PI;
      const longitude = seeded(index + 7000) * Math.PI * 2;
      return {
        sphereX: Math.cos(latitude) * Math.cos(longitude),
        sphereY: Math.sin(latitude),
        sphereZ: Math.cos(latitude) * Math.sin(longitude),
        offset: seeded(index + 14000),
        size: .45 + seeded(index + 21000) * 1.3
      };
    });

    let width = 0;
    let height = 0;
    let targetScroll = 0;
    let smoothScroll = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let frame;
    let previous = performance.now();

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio, width < 768 ? 1 : 1.45);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const updateScroll = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const top = stage.getBoundingClientRect().top + scrollY;
      targetScroll = Math.max(0, Math.min(1, (scrollY - top) / Math.max(stage.offsetHeight - innerHeight, 1)));
      document.documentElement.style.setProperty("--mc-progress", targetScroll);
    };
    const updatePointer = event => {
      pointerX = event.clientX / width - .5;
      pointerY = event.clientY / height - .5;
    };
    const render = now => {
      const delta = Math.min((now - previous) / 1000, .05);
      previous = now;
      const damping = 1 - Math.exp(-7 * delta);
      smoothScroll += (targetScroll - smoothScroll) * damping;
      smoothX += (pointerX - smoothX) * damping;
      smoothY += (pointerY - smoothY) * damping;

      const gradient = context.createRadialGradient(width * (.52 + smoothX * .08), height * (.42 + smoothY * .05), 10, width * .5, height * .45, Math.max(width, height) * .78);
      gradient.addColorStop(0, "#4f506f");
      gradient.addColorStop(.34, "#27283f");
      gradient.addColorStop(1, "#11111d");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const morph = Math.min(1, Math.max(0, (smoothScroll - .12) / .63));
      const fade = 1 - Math.max(0, (smoothScroll - .84) / .16);
      const radius = Math.min(width, height) * (.32 + morph * .13);
      const rotation = smoothScroll * 4.7 + now * .000035;

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rotatedX = particle.sphereX * cos - particle.sphereZ * sin;
        const rotatedZ = particle.sphereX * sin + particle.sphereZ * cos;
        const sphereScreenX = width * .5 + rotatedX * radius * (1 + rotatedZ * .2);
        const sphereScreenY = height * .5 + particle.sphereY * radius;
        const waveX = particle.offset * width * 1.25 - width * .12;
        const waveY = height * .58 + Math.sin(particle.offset * 18 + now * .00035) * height * .19 + (particle.sphereY * height * .12);
        const x = sphereScreenX + (waveX - sphereScreenX) * morph + smoothX * 45;
        const y = sphereScreenY + (waveY - sphereScreenY) * morph + smoothY * 30;
        const depth = Math.max(.15, .55 + rotatedZ * .45);
        const pulse = .55 + Math.sin(now * .0015 + particle.offset * 16) * .35;
        context.globalAlpha = depth * pulse * fade;
        context.fillStyle = index % 11 === 0 ? "#a7a3d8" : "#f5f3ea";
        context.beginPath();
        context.arc(x, y, particle.size * (1 + depth), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(render);
    };

    resize();
    updateScroll();
    addEventListener("resize", resize);
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("pointermove", updatePointer, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("scroll", updateScroll);
      removeEventListener("pointermove", updatePointer);
    };
  }, [stageRef]);

  return <canvas ref={canvasRef} className="mc-canvas" aria-hidden="true" />;
}
