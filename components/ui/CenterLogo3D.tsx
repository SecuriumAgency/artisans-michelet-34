"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const INTENSITY = 25;

export function CenterLogo3D() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hovering = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [INTENSITY, -INTENSITY]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-INTENSITY, INTENSITY]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useSpring(hovering, { stiffness: 200, damping: 25 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), transparent 55%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseEnter() {
    hovering.set(1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    hovering.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative mx-auto h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64"
    >
      <div className="relative h-full w-full [filter:drop-shadow(0_0_40px_rgba(0,102,255,0.3))_invert(1)_brightness(2)] transition-[filter] duration-300 hover:[filter:drop-shadow(0_0_60px_rgba(0,102,255,0.5))_invert(1)_brightness(2.1)]">
        <Image
          src="/logo-michelet.png"
          alt="Artisans Michelet"
          fill
          preload
          sizes="256px"
          className="object-contain"
        />
      </div>
      <motion.div
        aria-hidden
        style={{ background: glareBackground, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
      />
    </motion.div>
  );
}
