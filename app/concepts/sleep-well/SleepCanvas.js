"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const BLUE = 0x1734ab;
const CREAM = 0xf3ecc8;
const YELLOW = 0xf1da21;
const modelFiles = [
  ["intro", "IntroScene2.glb", 0, .029],
  ["pills", "Pills.glb", .087, .176],
  ["pills2", "Pills2.glb", .087, .176],
  ["pills3", "Pills3.glb", .087, .176],
  ["woman", "SceneWoman.glb", .211, .243],
  ["can", "CanCoffee2.glb", .321, .36],
  ["phone", "HandsPhone.glb", .36, .486],
  ["phoneAssets", "AssetsPhoneScene.glb", .36, .486],
  ["lamp", "SceneLamp.glb", .532, .595],
  ["rope", "Rope.glb", .595, .62],
  ["book", "BookRiggedwithTexture.glb", .915, .937],
  ["butterfly", "Butterfly.glb", .60, .635]
];

function normalize(object, targetSize = 4.2) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale = targetSize / Math.max(size.x, size.y, size.z, .001);
  object.scale.setScalar(scale);
  object.position.sub(center.multiplyScalar(scale));
  return object;
}

export default function SleepCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.HemisphereLight(CREAM, BLUE, 3.3));
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(4, 6, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(YELLOW, 2.7);
    rim.position.set(-6, 1, -3);
    scene.add(rim);

    const roots = new Map();
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("/sleep-well/draco/");
    loader.setDRACOLoader(draco);

    modelFiles.forEach(([keyName, file]) => {
      loader.load(`/sleep-well/models/${file}`, gltf => {
        let root = gltf.scene;
        if (keyName === "can") {
          const bounds = new THREE.Box3().setFromObject(root);
          const canWidth = bounds.max.x - bounds.min.x;
          const carousel = new THREE.Group();
          for (let i = 0; i < 64; i++) {
            const clone = root.clone(true);
            clone.position.x = (i - 31.5) * canWidth * 1.1;
            carousel.add(clone);
          }
          root = carousel;
        }
        root.userData.baseScale = root.scale.x;
        root.visible = false;
        root.traverse(node => {
          if (keyName === "intro" && node.name === "BG") {
            node.visible = false;
            return;
          }
          if (!node.isMesh) return;
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.envMapIntensity = .45;
            node.material.needsUpdate = true;
          }
        });
        scene.add(root);
        roots.set(keyName, root);
      }, undefined, error => console.warn(`Model load failed: ${file}`, error));
    });

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      starPositions[i * 3] = (Math.random() - .5) * 22;
      starPositions[i * 3 + 1] = (Math.random() - .5) * 13;
      starPositions[i * 3 + 2] = (Math.random() - .5) * 8 - 2;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: YELLOW, size: .018, transparent: true, opacity: .86 }));
    scene.add(stars);

    const tunnel = new THREE.Group();
    for (let i = 0; i < 26; i++) {
      const geometry = new THREE.RingGeometry(2.33, 2.82, 72);
      geometry.scale(1, .62, 1);
      const ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: i % 2 ? CREAM : BLUE,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: .96
      }));
      ring.position.z = -i * .7;
      ring.rotation.z = Math.sin(i * .8) * .045;
      tunnel.add(ring);
    }
    tunnel.visible = false;
    scene.add(tunnel);

    let target = 0, progress = 0, pointerX = 0, pointerY = 0, easedX = 0, easedY = 0, frame;
    const resize = () => {
      const width = innerWidth, height = innerHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, width < 760 ? 1.15 : 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const updateScroll = () => {
      target = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      document.documentElement.style.setProperty("--sw-progress", target);
    };
    const updatePointer = event => {
      pointerX = event.clientX / innerWidth - .5;
      pointerY = event.clientY / innerHeight - .5;
    };
    const active = (p, from, to) => p >= from && p < to;
    const animate = time => {
      progress += (target - progress) * .14;
      easedX += (pointerX - easedX) * .045;
      easedY += (pointerY - easedY) * .045;
      const p = progress;
      const creamBackground = active(p, .029, .057) || active(p, .176, .211) || active(p, .243, .321) || active(p, .36, .486);
      renderer.setClearColor(creamBackground ? CREAM : BLUE, creamBackground ? 1 : 0);
      camera.position.z = 6;
      camera.position.x = easedX * .65;
      camera.position.y = .2 - easedY * .42;
      camera.lookAt(0, 0, 0);
      stars.visible = !creamBackground;
      stars.rotation.z = time * .000025;
      stars.position.x = easedX * .25;

      tunnel.visible = active(p, .087, .176);
      if (tunnel.visible) {
        tunnel.position.z = ((p - .087) / .089) * 12;
        tunnel.rotation.z = easedX * .12;
      }

      modelFiles.forEach(([name, , from, to], index) => {
        const root = roots.get(name);
        if (!root) return;
        root.visible = active(p, from, to);
        if (!root.visible) return;
        const local = (p - from) / (to - from);
        root.rotation.y = (local - .5) * 1.4 + easedX * .32;
        root.rotation.x = easedY * .16 + Math.sin(time * .00035 + index) * .025;
        root.position.y = Math.sin(local * Math.PI) * .28 - .15;
        root.position.x = name === "phoneAssets" ? .2 : name.includes("pills") ? (index - 2) * .55 : 0;
        if (name === "intro") {
          root.position.y = -.6 + local * 1.5;
          root.rotation.x = local * Math.PI * .1 + easedY * .08;
          root.rotation.y = -local * Math.PI * .1 + easedX * .16;
          root.scale.setScalar(root.userData.baseScale * (1 + local * .1));
        }
        if (name === "phone") {
          root.position.set(1.25, -.15 + local * .4, local < .48 ? -1.4 + local * 2.8 : 0);
          root.rotation.set(
            THREE.MathUtils.lerp(1.56, .43, Math.max(0, (local - .45) / .55)),
            THREE.MathUtils.lerp(0, .9, Math.max(0, (local - .45) / .55)) + easedX * .1,
            Math.PI + local * Math.PI
          );
          root.scale.setScalar(THREE.MathUtils.lerp(3.57, .47, Math.min(1, local / .45)));
        }
        if (name === "phoneAssets") {
          root.position.set(1.25, .25, 0);
          root.rotation.set(.47 + easedY * .08, .4 + easedX * .1, .02);
          root.scale.setScalar(.27);
        }
        if (name === "can") {
          root.position.x = -((time * .00035) % 1.1);
          root.position.y = THREE.MathUtils.lerp(-6.5, 2.5, local);
          root.rotation.set(.3, -.5, 0);
          root.scale.setScalar(.18);
        }
        if (name === "woman") {
          root.position.y = THREE.MathUtils.lerp(-1.5, .75, local);
          root.rotation.y = -local * Math.PI * .1 + easedX * .05;
          root.scale.setScalar(1 + local * .1);
        }
        if (name === "lamp") {
          root.position.y = THREE.MathUtils.lerp(-1.5, 0, local);
          root.rotation.y = THREE.MathUtils.lerp(-Math.PI * .1, 0, local) + easedX * .1;
          root.scale.setScalar(1 + local * .2);
        }
      });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize(); updateScroll(); animate(0);
    addEventListener("resize", resize);
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("scroll", updateScroll);
      removeEventListener("pointermove", updatePointer);
      renderer.dispose();
      draco.dispose();
      scene.traverse(node => {
        node.geometry?.dispose?.();
        if (Array.isArray(node.material)) node.material.forEach(material => material.dispose());
        else node.material?.dispose?.();
      });
    };
  }, []);

  return <canvas ref={ref} className="sw-canvas" aria-label="NEXT 금융 데이터 3D 장면" />;
}
