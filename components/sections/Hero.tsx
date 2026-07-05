"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { TrustBar } from "@/components/ui/TrustBar";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050B14_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <span className="inline-block rounded-full border border-michelet-blue/40 bg-michelet-blue/10 px-4 py-1.5 text-sm font-semibold tracking-widest text-white">
          ARTISANS MICHELET — HÉRAULT (34)
        </span>

        <div className="mt-10">
          <CenterLogo3D />
        </div>

        <p className="mt-10 max-w-xl font-sans text-lg text-gray-300 sm:text-xl">
          Plomberie et serrurerie d&apos;exception dans tout le département de l&apos;Hérault.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button
            href="tel:0411939674"
            variant="outline"
            className="border-white/30 text-white hover:border-michelet-blue hover:text-michelet-blue"
          >
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
