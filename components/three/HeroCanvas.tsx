"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Mesh } from "three";

function MicheletOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    mesh.rotation.x = t * 0.08 + state.pointer.y * 0.2;
    mesh.rotation.y = t * 0.12 + state.pointer.x * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#0066FF"
          metalness={0.85}
          roughness={0.15}
          distort={0.35}
          speed={1.8}
          emissive="#0a1626"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#b8862a" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#0066FF" />
        <MicheletOrb />
        <Sparkles count={60} scale={7} size={2} speed={0.3} color="#b8862a" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
