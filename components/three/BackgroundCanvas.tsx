"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

function TubeField() {
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

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[6, 4, 5]} intensity={1.4} color="#0AA8C2" />
      <directionalLight position={[-6, -3, 4]} intensity={1.1} color="#C08A52" />
      <pointLight position={[0, 0, 8]} intensity={0.4} color="#ffffff" />
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

export function BackgroundCanvas() {
  const isPageVisible = useIsPageVisible();

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 50 }}
      frameloop={isPageVisible ? "always" : "never"}
    >
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 18]} />
      <Lighting />
      <TubeField />
    </Canvas>
  );
}
