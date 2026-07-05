"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { TrustBar } from "@/components/ui/TrustBar";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

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
          src={HERO_IMAGE_URL}
          alt="Réalisation artisanale Michelet"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-trust-900/85 via-trust-900/60 to-trust-900/95" />

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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-trust-700 px-8 py-3 font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(197,160,89,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-trust-600 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] active:translate-y-0 active:scale-95"
            >
              Demander un devis
            </Link>
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

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <TrustBar />
      </div>
    </section>
  );
}
