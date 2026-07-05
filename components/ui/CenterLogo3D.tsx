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

const INTENSITY = 10;
const LOGO_WIDTH = 411;
const LOGO_HEIGHT = 133;

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
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative mx-auto w-56 md:w-72 lg:w-80"
    >
      <div className="[filter:invert(1)_hue-rotate(180deg)_brightness(1.1)_contrast(1.05)_drop-shadow(0_10px_20px_rgba(0,102,255,0.25))] transition-[filter] duration-300 hover:[filter:invert(1)_hue-rotate(180deg)_brightness(1.15)_contrast(1.1)_drop-shadow(0_12px_28px_rgba(0,102,255,0.4))]">
        <Image
          src="/logo-michelet.png"
          alt="Artisans Michelet"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          preload
          sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, 14rem"
          className="h-auto w-full object-contain"
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
