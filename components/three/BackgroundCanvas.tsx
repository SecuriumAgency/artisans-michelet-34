"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { MetalTubes } from "@/components/three/MetalTubes";

const GlassPipeScene = dynamic(() => import("@/components/three/GlassPipeScene"), {
  ssr: false,
});

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
      <spotLight position={[6, 5, 6]} angle={0.35} penumbra={0.4} intensity={5} color="#ffffff" />
      <spotLight position={[-6, -3, 5]} angle={0.35} penumbra={0.4} intensity={4} color="#00E5FF" />
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

/**
 * Gates the expensive transmission + post-processing path to capable desktop hardware.
 * Starts `false` so mobile/low-end devices never trigger the dynamic import of
 * GlassPipeScene (drei's MeshTransmissionMaterial + @react-three/postprocessing) at all.
 */
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
      <Suspense fallback={null}>{isHighEnd ? <GlassPipeScene /> : <MetalTubes />}</Suspense>
    </Canvas>
  );
}
