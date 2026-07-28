"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const MODEL = "/assets/peach/coin-v2.glb";
const MODEL_V3 = "/assets/peach/coin-v3.glb";
const ENVIRONMENT = "/assets/peach/environment.jpg";
const NORMAL = "/assets/peach/normal.jpg";
const COIN_ROTATIONS = [.349, 1.155, 1.84, .745, .127, -.723, -1.456, -1.043, -.411];
const MIDDLE_COINS = [
  { p: [-.036, .906, .904], r: [-.466, .014, -.078], s: [.84, .63, .84] },
  { p: [.058, 1.967, .331], r: [-.643, .027, -.075], s: [.74, .55, .74] },
  { p: [-.125, -1.003, 1.715], r: [-.346, .006, -.041], s: [.79, .59, .79] }
];
const FOOTER_COINS = [
  { p: [.727, .892, -.423], r: [.2, -.008, -.137], s: .92 },
  { p: [.971, 3.071, -.813], r: [.196, -.004, -.235], s: 1.47 },
  { p: [.589, -3.729, -.869], r: [.573, 0, -.085], s: 1.05 },
  { p: [-.828, -3.875, -4.246], r: [.595, 0, .078], s: 1.83 },
  { p: [-.57, -7.196, -6.495], r: [.595, 0, -.199], s: 2.55 },
  { p: [.894, 6.137, -.378], r: [.196, -.004, -.309], s: 2.13 }
];

const sample = (keys, progress) => {
  if (progress <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (progress <= keys[i][0]) {
      const [aTime, aValue] = keys[i - 1];
      const [bTime, bValue] = keys[i];
      return THREE.MathUtils.lerp(aValue, bValue, (progress - aTime) / (bTime - aTime));
    }
  }
  return keys.at(-1)[1];
};

const setTimelineTransform = (group, progress, tracks) => {
  group.position.set(sample(tracks.x, progress), sample(tracks.y, progress), sample(tracks.z, progress));
  group.rotation.set(sample(tracks.rx, progress), sample(tracks.ry, progress), sample(tracks.rz, progress));
};

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 1000);
    camera.position.set(0, -.021, 8.392);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    const renderRatio = innerWidth < 768 ? 1.15 : 1.4;
    renderer.setPixelRatio(Math.min(devicePixelRatio, renderRatio));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const coinGroup = new THREE.Group();
    coinGroup.scale.setScalar(.8);
    scene.add(coinGroup);
    const middleGroup = new THREE.Group();
    const footerGroup = new THREE.Group();
    scene.add(middleGroup, footerGroup);

    const warmLight = new THREE.DirectionalLight(0xffd6b2, 4.7);
    warmLight.position.set(2.15, 5.93, .45);
    scene.add(warmLight);
    const fillLight = new THREE.PointLight(0xff8a50, 8, 15);
    fillLight.position.set(-.15, -.56, 1);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0xffffff, .28));

    let material;
    let disposed = false;
    const textureLoader = new THREE.TextureLoader();
    const environment = textureLoader.load(ENVIRONMENT);
    environment.mapping = THREE.EquirectangularReflectionMapping;
    environment.colorSpace = THREE.SRGBColorSpace;
    scene.environment = environment;
    const normalMap = textureLoader.load(NORMAL);

    material = new THREE.MeshPhysicalMaterial({
      color: 0xffd6b2,
      roughness: 0,
      metalness: 0,
      transmission: 1,
      thickness: 4,
      ior: 1.5,
      clearcoat: .44,
      clearcoatRoughness: .16,
      reflectivity: .14,
      specularIntensity: .27,
      normalMap,
      side: THREE.DoubleSide,
      transparent: true
    });

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/assets/peach/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(MODEL, gltf => {
      if (disposed) return;
      const source = gltf.scene;
      COIN_ROTATIONS.forEach((rotation, index) => {
        const coin = source.clone(true);
        coin.traverse(child => {
          if (child.isMesh) material && (child.material = material);
        });
        coin.rotation.y = rotation;
        if (index > 2 && index < 7) {
          coin.rotation.x = -Math.PI;
          coin.rotation.z = -Math.PI;
        }
        coinGroup.add(coin);
      });
    });
    gltfLoader.load(MODEL_V3, gltf => {
      if (disposed) return;
      const makeCoin = config => {
        const coin = gltf.scene.clone(true);
        coin.traverse(child => {
          if (child.isMesh) child.material = material;
        });
        coin.position.fromArray(config.p);
        coin.rotation.fromArray(config.r);
        Array.isArray(config.s) ? coin.scale.fromArray(config.s) : coin.scale.setScalar(config.s);
        return coin;
      };
      MIDDLE_COINS.forEach(config => middleGroup.add(makeCoin(config)));
      FOOTER_COINS.forEach(config => footerGroup.add(makeCoin(config)));
    });

    const pointer = new THREE.Vector2();
    const target = new THREE.Vector2();
    let targetScroll = scrollY;
    let smoothScroll = scrollY;
    let sectionBounds = {};
    const measureSections = () => {
      const absoluteTop = element => element ? element.getBoundingClientRect().top + scrollY : 0;
      const hero = document.querySelector(".hero");
      const features = document.querySelector("#features");
      const benefits = document.querySelector("#benefits");
      const cta = document.querySelector(".cta");
      sectionBounds = {
        heroStart: absoluteTop(hero),
        heroEnd: absoluteTop(hero) + (hero?.offsetHeight || innerHeight),
        middleStart: absoluteTop(features) - innerHeight * .35,
        middleEnd: absoluteTop(benefits) - innerHeight * .25,
        footerStart: absoluteTop(benefits) - innerHeight * .35,
        footerEnd: absoluteTop(cta) + (cta?.offsetHeight || innerHeight)
      };
    };
    const sectionProgress = (scrollPosition, start, end, from, to) => {
      const value = THREE.MathUtils.clamp((scrollPosition - start) / Math.max(end - start, 1), 0, 1);
      return THREE.MathUtils.lerp(from, to, value);
    };
    const onPointer = event => {
      target.x = event.clientX / innerWidth * 2 - 1;
      target.y = -(event.clientY / innerHeight * 2 - 1);
    };
    const onScroll = () => {
      targetScroll = scrollY;
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);
      measureSections();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });

    let frame;
    const clock = new THREE.Clock();
    let elapsed = 0;
    const render = () => {
      const delta = Math.min(clock.getDelta(), .05);
      elapsed += delta;
      pointer.x = THREE.MathUtils.damp(pointer.x, target.x, 7, delta);
      pointer.y = THREE.MathUtils.damp(pointer.y, target.y, 7, delta);
      smoothScroll = THREE.MathUtils.damp(smoothScroll, targetScroll, 8, delta);
      const heroProgress = sectionProgress(smoothScroll, sectionBounds.heroStart, sectionBounds.heroEnd, 0, .206);
      const middleProgress = sectionProgress(smoothScroll, sectionBounds.middleStart, sectionBounds.middleEnd, .205, .407);
      const footerProgress = sectionProgress(smoothScroll, sectionBounds.footerStart, sectionBounds.footerEnd, .406, .498);
      camera.rotation.x = pointer.y * .01745;
      camera.rotation.y = -pointer.x * .01745;
      coinGroup.visible = smoothScroll < sectionBounds.heroEnd;
      middleGroup.visible = smoothScroll >= sectionBounds.middleStart && smoothScroll < sectionBounds.middleEnd;
      footerGroup.visible = smoothScroll >= sectionBounds.footerStart;
      setTimelineTransform(coinGroup, heroProgress, {
        x: [[0, 2.539], [.1, .909], [.206, 3.366]], y: [[0, .394], [.1, 1.032], [.206, 6.051]], z: [[0, -1.391], [.1, -2.258], [.206, -5.854]],
        rx: [[0, .667], [.1, 1.696], [.206, 1.778]], ry: [[0, -.458], [.1, .688], [.206, .755]], rz: [[0, 0], [.1, -.721], [.206, -.775]]
      });
      const heroTurn = THREE.MathUtils.clamp(heroProgress / .206, 0, 1);
      coinGroup.rotation.y += heroTurn * Math.PI * 1.35;
      coinGroup.rotation.z += heroTurn * .45;
      setTimelineTransform(middleGroup, middleProgress, {
        x: [[.204, .28], [.272, .141], [.407, .222]], y: [[.204, .254], [.272, .239], [.407, .378]], z: [[.204, 1.918], [.272, 1.766], [.407, 2.252]],
        rx: [[.204, 1.043], [.272, .988], [.407, .846]], ry: [[.204, -.104], [.272, -.109], [.407, -.537]], rz: [[.204, 1.001], [.272, .857], [.407, .35]]
      });
      setTimelineTransform(footerGroup, footerProgress, {
        x: [[.403, 3.52], [.45, 1.473], [.498, .808]], y: [[.403, 1.078], [.45, .393], [.498, .305]], z: [[.403, 7.16], [.45, -1.949], [.498, -2.822]],
        rx: [[.403, .138], [.45, .04], [.498, -.167]], ry: [[.403, -.34], [.45, -.102], [.498, .415]], rz: [[.403, -1.171], [.45, -1.185], [.498, -1.174]]
      });
      coinGroup.rotation.x += pointer.y * .08 + Math.sin(elapsed * .45) * .025;
      coinGroup.rotation.y += pointer.x * .1;
      middleGroup.rotation.y += pointer.x * .06;
      footerGroup.rotation.x += pointer.y * .04;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    resize();
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("pointermove", onPointer);
      removeEventListener("scroll", onScroll);
      renderer.dispose();
      dracoLoader.dispose();
      material.dispose();
      environment.dispose();
      normalMap.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
