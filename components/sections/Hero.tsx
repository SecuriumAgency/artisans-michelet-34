"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { TrustBar } from "@/components/ui/TrustBar";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=2070";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Artisans Michelet — Plomberie et Serrurerie dans l'Hérault"
      className="relative flex min-h-screen items-center overflow-hidden bg-michelet-dark"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-1/3 h-[170%]">
        <Image
          src={HERO_IMAGE_URL}
          alt="Réalisation artisanale Michelet"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/80 via-michelet-dark/60 to-michelet-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.4)_0%,rgba(5,11,20,0.95)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 text-center">
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

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <TrustBar />
      </div>
    </section>
  );
}
