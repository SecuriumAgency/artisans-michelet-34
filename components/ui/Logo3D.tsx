"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const INTENSITY = 18;

export function Logo3D() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [INTENSITY, -INTENSITY]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-INTENSITY, INTENSITY]), springConfig);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="relative h-12 w-12 [filter:drop-shadow(0_8px_16px_rgba(0,102,255,0.35))] transition-[filter] duration-300 hover:[filter:drop-shadow(0_16px_28px_rgba(0,102,255,0.65))]"
    >
      <Image
        src="/logo-michelet.png"
        alt="Artisans Michelet"
        fill
        sizes="48px"
        className="object-contain"
        preload
      />
      <motion.span
        aria-hidden
        variants={{ rest: { x: "-140%", opacity: 0 }, hover: { x: "140%", opacity: 1 } }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay"
      />
    </motion.div>
  );
}
