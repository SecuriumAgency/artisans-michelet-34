"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackgroundCanvas = dynamic(
  () => import("@/components/three/BackgroundCanvas").then((mod) => mod.BackgroundCanvas),
  { ssr: false }
);

/**
 * Defers mounting the WebGL canvas until the browser is idle after first paint,
 * so three.js/@react-three/fiber's bootstrap cost never competes with the LCP
 * element (the logo) for main-thread time.
 */
export function BackgroundCanvasLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <BackgroundCanvas />
    </div>
  );
}
