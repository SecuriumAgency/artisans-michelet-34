"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { TrustBar } from "@/components/ui/TrustBar";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={sectionRef}
      aria-label="Artisans Michelet — Plomberie et Serrurerie dans l'Hérault"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-michelet-dark px-6 py-28"
    >
      {!prefersReducedMotion && (
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 h-full w-full"
        >
          <HeroCanvas />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/80 via-michelet-dark/60 to-michelet-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.4)_0%,rgba(5,11,20,0.95)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <CenterLogo3D />

        <p className="max-w-2xl text-center font-sans text-sm font-light leading-relaxed tracking-wide text-gray-300 md:text-base">
          Plomberie et serrurerie d&apos;exception dans tout le département de l&apos;Hérault.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button href="tel:0411939674" variant="outline">
            Appeler l&apos;expert 04 11 93 96 74
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-16 flex w-full justify-center">
        <TrustBar />
      </div>
    </section>
  );
}
