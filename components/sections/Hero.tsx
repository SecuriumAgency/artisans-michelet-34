"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Services d'artisanat dans l'Hérault"
      className="relative flex min-h-screen items-center overflow-hidden bg-trust-900"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-1/4 h-[125%]">
        <Image
          src="/hero/hero-michelet.jpg"
          alt="Réalisation artisanale Michelet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-trust-900/60" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <TiltCard intensity={5} className="mx-auto rounded-3xl px-6 py-section text-center text-white sm:px-12">
          <span className="inline-block rounded-full border border-action-400/50 bg-action-900/40 px-4 py-1.5 text-sm font-semibold tracking-widest text-action-200">
            ARTISANS MICHELET — HÉRAULT (34)
          </span>

          <h1 className="mt-8 font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="reveal-line block" style={{ animationDelay: "0.1s" }}>
                Plomberie et Serrurerie
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-line block" style={{ animationDelay: "0.25s" }}>
                dans l&apos;Hérault (34)
              </span>
            </span>
          </h1>

          <p
            className="reveal-line mx-auto mt-6 max-w-2xl font-sans text-lg text-trust-100 sm:text-xl"
            style={{ animationDelay: "0.4s" }}
          >
            Un savoir-faire d&apos;exception au service de vos projets, dans tout le
            département de l&apos;Hérault.
          </p>

          <div
            className="reveal-line mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.55s" }}
          >
            <Button href="/contact" variant="primary">
              Demander un devis
            </Button>
            <Button
              href="tel:0411939674"
              variant="outline"
              className="border-action-400 text-action-300 hover:border-action-300 hover:text-action-200"
            >
              Appeler l&apos;expert 04 11 93 96 74
            </Button>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
