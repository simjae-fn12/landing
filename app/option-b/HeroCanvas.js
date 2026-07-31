"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const MODEL_V3 = "/assets/peach/coin-v3.glb";
const ENVIRONMENT = "/assets/peach/environment.jpg";
const NORMAL = "/assets/peach/normal.jpg";
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
    scene.add(coinGroup);
    const middleGroup = new THREE.Group();
    const footerGroup = new THREE.Group();
    const quantitativeGroup = new THREE.Group();
    quantitativeGroup.visible = false;
    scene.add(middleGroup, footerGroup, quantitativeGroup);

    const warmLight = new THREE.DirectionalLight(0xb9d8ff, 5.2);
    warmLight.position.set(2.15, 5.93, .45);
    scene.add(warmLight);
    const fillLight = new THREE.PointLight(0x6757ff, 10, 15);
    fillLight.position.set(-.15, -.56, 1);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0x78c8ff, 7, 18);
    rimLight.position.set(3.5, 1.5, 2);
    scene.add(rimLight);
    scene.add(new THREE.AmbientLight(0xdce9ff, .42));

    let material;
    let disposed = false;
    const textureLoader = new THREE.TextureLoader();
    const environment = textureLoader.load(ENVIRONMENT);
    environment.mapping = THREE.EquirectangularReflectionMapping;
    environment.colorSpace = THREE.SRGBColorSpace;
    scene.environment = environment;
    const normalMap = textureLoader.load(NORMAL);

    material = new THREE.MeshPhysicalMaterial({
      color: 0x315ee7,
      roughness: .16,
      metalness: .18,
      transmission: .12,
      thickness: 1.8,
      ior: 1.42,
      attenuationColor: new THREE.Color(0x2444c7),
      attenuationDistance: .85,
      clearcoat: .82,
      clearcoatRoughness: .1,
      reflectivity: .5,
      specularColor: new THREE.Color(0xb8d7ff),
      specularIntensity: .9,
      envMapIntensity: .08,
      normalMap,
      side: THREE.DoubleSide,
      transparent: true
    });

    const topologyMaterials = {
      deep: new THREE.MeshPhysicalMaterial({
        color: 0x24106f,
        roughness: .22,
        metalness: .08,
        clearcoat: .65,
        clearcoatRoughness: .14,
      }),
      blue: new THREE.MeshPhysicalMaterial({
        color: 0x3859e8,
        roughness: .18,
        metalness: .04,
        clearcoat: .75,
        clearcoatRoughness: .1,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x819cff,
        roughness: .08,
        transmission: .55,
        thickness: 1.2,
        ior: 1.38,
        transparent: true,
        opacity: .82,
        clearcoat: .7,
      }),
      pearl: new THREE.MeshPhysicalMaterial({
        color: 0xe8f1ff,
        roughness: .12,
        transmission: .18,
        clearcoat: .9,
      }),
    };
    const coinFaceGeometry = new THREE.CylinderGeometry(1, 1, .18, 64, 4);
    const coinRimGeometry = new THREE.TorusGeometry(.91, .065, 16, 64);
    const coinMarkGeometry = new THREE.CircleGeometry(.58, 64);
    const coinMarkTextures = [];
    const coinMarkMaterials = [];
    const makeCoinMarkMaterial = symbol => {
      const markCanvas = document.createElement("canvas");
      markCanvas.width = 512;
      markCanvas.height = 512;
      const context = markCanvas.getContext("2d");
      context.clearRect(0, 0, 512, 512);
      context.fillStyle = "#dceaff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "700 340px Arial";
      context.shadowColor = "rgba(18, 42, 150, .5)";
      context.shadowBlur = 18;
      context.fillText(symbol, 256, 272);
      const texture = new THREE.CanvasTexture(markCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const markMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      coinMarkTextures.push(texture);
      coinMarkMaterials.push(markMaterial);
      return markMaterial;
    };
    const addTopologyCoin = ({
      position,
      scale,
      rotation,
      material: coinMaterial,
      symbol,
      parent = coinGroup,
    }) => {
      const group = new THREE.Group();
      const face = new THREE.Mesh(coinFaceGeometry, coinMaterial);
      const frontRim = new THREE.Mesh(coinRimGeometry, topologyMaterials.pearl);
      const backRim = frontRim.clone();
      const markMaterial = makeCoinMarkMaterial(symbol);
      const frontMark = new THREE.Mesh(coinMarkGeometry, markMaterial);
      const backMark = frontMark.clone();
      frontRim.rotation.x = Math.PI / 2;
      backRim.rotation.x = Math.PI / 2;
      frontMark.rotation.x = -Math.PI / 2;
      backMark.rotation.x = Math.PI / 2;
      frontRim.position.y = .105;
      backRim.position.y = -.105;
      frontMark.position.y = .116;
      backMark.position.y = -.116;
      group.add(face, frontRim, backRim, frontMark, backMark);
      group.position.fromArray(position);
      group.userData.baseY = position[1];
      group.scale.setScalar(scale);
      group.rotation.fromArray(rotation);
      parent.add(group);
      return group;
    };
    const topologyShapes = [
      addTopologyCoin({ position: [-4.15, 1.05, -1.3], scale: 1.48, material: topologyMaterials.deep, rotation: [1.08, .28, -.12], symbol: "₩" }),
      addTopologyCoin({ position: [4.35, 2.05, -1.55], scale: 1.62, material: topologyMaterials.deep, rotation: [1.14, -.24, .1], symbol: "$" }),
      addTopologyCoin({ position: [-.55, -3.05, .05], scale: .52, material: topologyMaterials.pearl, rotation: [1.02, -.24, .08], symbol: "$" }),
      addTopologyCoin({ position: [-.35, 1.35, .15], scale: .74, material: topologyMaterials.blue, rotation: [.95, -.4, -.2], symbol: "₩" }),
      addTopologyCoin({ position: [1.35, .2, .3], scale: .58, material: topologyMaterials.blue, rotation: [1.18, .3, -.14], symbol: "$" }),
      addTopologyCoin({ position: [3.85, -2.45, -.05], scale: .54, material: topologyMaterials.blue, rotation: [.9, -.22, .1], symbol: "₩" }),
      addTopologyCoin({ position: [-3.85, -2.65, -.55], scale: .5, material: topologyMaterials.glass, rotation: [1.12, .2, -.16], symbol: "$" }),
    ];
    const quantitativeShapes = [
      addTopologyCoin({
        parent: quantitativeGroup,
        position: [-4.45, 1.7, -1.5],
        scale: 1.35,
        material: topologyMaterials.deep,
        rotation: [1.05, .2, -.18],
        symbol: "\u20A9",
      }),
      addTopologyCoin({
        parent: quantitativeGroup,
        position: [4.35, 2.35, -1.75],
        scale: 1.15,
        material: topologyMaterials.blue,
        rotation: [.92, -.28, .16],
        symbol: "$",
      }),
      addTopologyCoin({
        parent: quantitativeGroup,
        position: [-3.15, -2.55, -.45],
        scale: .62,
        material: topologyMaterials.glass,
        rotation: [1.2, .22, -.12],
        symbol: "$",
      }),
      addTopologyCoin({
        parent: quantitativeGroup,
        position: [3.55, -2.75, -.35],
        scale: .72,
        material: topologyMaterials.pearl,
        rotation: [1.02, -.34, .12],
        symbol: "\u20A9",
      }),
      addTopologyCoin({
        parent: quantitativeGroup,
        position: [.15, 2.85, -.95],
        scale: .58,
        material: topologyMaterials.blue,
        rotation: [1.14, .16, -.08],
        symbol: "$",
      }),
    ];

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/assets/peach/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
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
      const hero = document.querySelector("#i84ba");
      const solutions = document.querySelector("#ilwyn");
      const features = document.querySelector("#ilwyn-2-2");
      const benefits = document.querySelector("#ilwyn-2-2-3-2");
      const cta = document.querySelector("#injpw");
      sectionBounds = {
        heroStart: absoluteTop(hero),
        heroEnd: absoluteTop(solutions),
        middleStart: absoluteTop(features) - innerHeight * .35,
        middleEnd: absoluteTop(benefits) - innerHeight * .25,
        footerStart: absoluteTop(benefits) - innerHeight * .35,
        footerEnd: absoluteTop(cta) + (cta?.offsetHeight || innerHeight),
        quantitativeStart: absoluteTop(benefits) - innerHeight * .45,
        quantitativeEnd: absoluteTop(cta) - innerHeight * .08,
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
      footerGroup.visible = false;
      quantitativeGroup.visible =
        smoothScroll >= sectionBounds.quantitativeStart &&
        smoothScroll < sectionBounds.quantitativeEnd;
      setTimelineTransform(coinGroup, heroProgress, {
        x: [[0, 0], [.1, -.12], [.206, .65]], y: [[0, .1], [.1, .32], [.206, 4.8]], z: [[0, .25], [.1, -.2], [.206, -4.6]],
        rx: [[0, 0], [.1, .025], [.206, .12]], ry: [[0, 0], [.1, -.04], [.206, -.18]], rz: [[0, 0], [.1, .015], [.206, .08]]
      });
      topologyShapes.forEach((shape, index) => {
        shape.rotation.y += Math.sin(elapsed * (.18 + index * .015) + index) * .0012;
        shape.position.y = shape.userData.baseY + Math.sin(elapsed * (.32 + index * .025) + index * .8) * .035;
      });
      quantitativeShapes.forEach((shape, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        shape.rotation.y += delta * (.22 + index * .035) * direction;
        shape.rotation.z += delta * .035 * direction;
        shape.position.y =
          shape.userData.baseY +
          Math.sin(elapsed * (.42 + index * .04) + index * 1.15) * .12;
      });
      quantitativeGroup.rotation.x = pointer.y * .07;
      quantitativeGroup.rotation.y = pointer.x * .1;
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
      coinFaceGeometry.dispose();
      coinRimGeometry.dispose();
      coinMarkGeometry.dispose();
      coinMarkTextures.forEach(item => item.dispose());
      coinMarkMaterials.forEach(item => item.dispose());
      Object.values(topologyMaterials).forEach(item => item.dispose());
      environment.dispose();
      normalMap.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
