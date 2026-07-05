"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { TrustBar } from "@/components/ui/TrustBar";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

function RevealText3D({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) {
  return (
    <span className="inline-block [perspective:800px]">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="reveal-letter-3d inline-block"
          style={{ animationDelay: `${baseDelay + index * 0.012}s` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

const LINE_1 = "Plomberie et Serrurerie";
const LINE_2 = "dans l'Hérault (34)";
const LINE_2_DELAY = 0.1 + LINE_1.length * 0.012 + 0.05;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Services d'artisanat dans l'Hérault"
      className="relative flex min-h-screen items-center overflow-hidden bg-michelet-dark"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-1/4 h-[135%]">
        <Image
          src={HERO_IMAGE_URL}
          alt="Réalisation artisanale Michelet"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/90 via-michelet-dark/70 to-michelet-dark/95" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <TiltCard intensity={5} className="mx-auto rounded-3xl px-6 py-section text-center text-white sm:px-12">
          <span className="inline-block rounded-full border border-michelet-blue/40 bg-michelet-blue/10 px-4 py-1.5 text-sm font-semibold tracking-widest text-white">
            ARTISANS MICHELET — HÉRAULT (34)
          </span>

          <h1 className="mt-8 font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block">
              <RevealText3D text={LINE_1} baseDelay={0.1} />
            </span>
            <span className="block">
              <RevealText3D text={LINE_2} baseDelay={LINE_2_DELAY} />
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
              className="border-white/30 text-white hover:border-michelet-blue hover:text-michelet-blue"
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
