"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type TubeConfig = {
  points: [number, number, number][];
  radius: number;
  color: string;
  bobSpeed: number;
  bobAmount: number;
  phase: number;
};

const TUBES: TubeConfig[] = [
  {
    points: [
      [-6, -2.5, -3],
      [-3, 1.5, -1],
      [0, -1.5, 0],
      [3, 2, 1.5],
      [6.5, -1, 0],
    ],
    radius: 0.32,
    color: "#0AA8C2",
    bobSpeed: 0.14,
    bobAmount: 0.18,
    phase: 0,
  },
  {
    points: [
      [6, 3.5, -4],
      [2.5, 0.5, -1.5],
      [-1, 2.5, 0],
      [-4.5, -1, 1.5],
      [-7, 2.5, -1],
    ],
    radius: 0.24,
    color: "#C08A52",
    bobSpeed: 0.11,
    bobAmount: 0.22,
    phase: 2.1,
  },
  {
    points: [
      [-4, -4.5, 1],
      [-1, -2, -1.5],
      [2.5, -3.5, 0.5],
      [6, -1.5, 2],
    ],
    radius: 0.2,
    color: "#0AA8C2",
    bobSpeed: 0.17,
    bobAmount: 0.15,
    phase: 4.3,
  },
];

function Tube({ points, radius, color, bobSpeed, bobAmount, phase }: TubeConfig) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = useRef(0);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    );
    return new THREE.TubeGeometry(curve, 64, radius, 12, false);
  }, [points, radius]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    mesh.position.y = baseY.current + Math.sin(t * bobSpeed + phase) * bobAmount;
    mesh.rotation.z = Math.sin(t * bobSpeed * 0.6 + phase) * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.15}
        reflectivity={0.6}
      />
    </mesh>
  );
}

/** Fallback scene — cheap, no transmission/post-processing. Used on mobile/low-end devices. */
function MetalTubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.015;
  });

  return (
    <group ref={groupRef}>
      {TUBES.map((tube, i) => (
        <Tube key={i} {...tube} />
      ))}
    </group>
  );
}

const PIPE_POINTS: [number, number, number][] = [
  [-7, -2.5, -3],
  [-3.5, 1.8, -1],
  [0, -1.6, 0.5],
  [3.5, 2, 1.5],
  [7, -1, -1],
];

/** Procedural flowing normal map — generated on canvas at runtime, no network fetch. */
function generateWaterNormalMap(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * Math.PI * 2;
      const v = (y / size) * Math.PI * 2;
      let n = 0;
      n += Math.sin(u * 4 + v * 1.3) * 0.5;
      n += Math.sin(v * 5.5 - u * 2.1) * 0.32;
      n += Math.sin((u + v) * 7.3) * 0.14;
      height[y * size + x] = n;
    }
  }

  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const x1 = (x + 1) % size;
      const y1 = (y + 1) % size;
      const hC = height[y * size + x];
      const hX = height[y * size + x1];
      const hY = height[y1 * size + x];
      const dx = (hX - hC) * 2.2;
      const dy = (hY - hC) * 2.2;
      const nx = -dx;
      const ny = -dy;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const i = (y * size + x) * 4;
      img.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 1);
  return texture;
}

/** Outer glass/metal shell (transmission) + inner flowing-water core. High-end devices only. */
function GlassPipe() {
  const groupRef = useRef<THREE.Group>(null);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(PIPE_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    []
  );
  const outerGeometry = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.55, 24, false), [curve]);
  const innerGeometry = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.34, 20, false), [curve]);
  const waterNormalMap = useMemo(() => generateWaterNormalMap(), []);

  useFrame((state, delta) => {
    waterNormalMap.offset.x -= delta * 0.5;

    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={innerGeometry}>
        <meshPhysicalMaterial
          color="#0AA8C2"
          roughness={0.12}
          metalness={0.05}
          transmission={0.55}
          ior={1.33}
          normalMap={waterNormalMap}
          normalScale={new THREE.Vector2(0.7, 0.7)}
          emissive="#0AA8C2"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh geometry={outerGeometry}>
        <MeshTransmissionMaterial
          transmission={1}
          ior={1.33}
          thickness={1.5}
          chromaticAberration={0.05}
          roughness={0.05}
          background={new THREE.Color("#020617")}
          resolution={512}
          samples={2}
          anisotropicBlur={0.1}
        />
      </mesh>
    </group>
  );
}

function Lighting({ premium }: { premium: boolean }) {
  if (!premium) {
    return (
      <>
        <ambientLight intensity={0.18} />
        <directionalLight position={[6, 4, 5]} intensity={1.4} color="#0AA8C2" />
        <directionalLight position={[-6, -3, 4]} intensity={1.1} color="#C08A52" />
        <pointLight position={[0, 0, 8]} intensity={0.4} color="#ffffff" />
      </>
    );
  }
  return (
    <>
      <ambientLight intensity={0.08} />
      <spotLight
        position={[6, 5, 6]}
        angle={0.5}
        penumbra={0.6}
        intensity={4}
        color="#0AA8C2"
      />
      <spotLight
        position={[-6, -3, 5]}
        angle={0.5}
        penumbra={0.6}
        intensity={3}
        color="#C08A52"
      />
      <pointLight position={[0, 0, 6]} intensity={0.3} color="#ffffff" />
    </>
  );
}

function useIsPageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handler = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return visible;
}

/** Gates the expensive transmission + post-processing path to capable desktop hardware. */
function useHighEndDevice() {
  const [highEnd, setHighEnd] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setHighEnd(!reducedMotion && !coarsePointer && cores >= 6 && memory >= 4);
  }, []);
  return highEnd;
}

export function BackgroundCanvas() {
  const isPageVisible = useIsPageVisible();
  const isHighEnd = useHighEndDevice();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 50 }}
      frameloop={isPageVisible ? "always" : "never"}
    >
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 20]} />
      <Lighting premium={isHighEnd} />
      <Suspense fallback={null}>
        {isHighEnd ? (
          <>
            <GlassPipe />
            <EffectComposer multisampling={0}>
              <Bloom
                luminanceThreshold={0.35}
                luminanceSmoothing={0.4}
                intensity={0.6}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.25} darkness={0.65} />
            </EffectComposer>
          </>
        ) : (
          <MetalTubes />
        )}
      </Suspense>
    </Canvas>
  );
}
