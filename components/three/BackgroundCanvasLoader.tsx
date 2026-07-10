"use client";

import dynamic from "next/dynamic";

const BackgroundCanvas = dynamic(
  () => import("@/components/three/BackgroundCanvas").then((mod) => mod.BackgroundCanvas),
  { ssr: false }
);

export function BackgroundCanvasLoader() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <BackgroundCanvas />
    </div>
  );
}
