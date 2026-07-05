"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { TrustBar } from "@/components/ui/TrustBar";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { ContactForm } from "@/components/sections/ContactForm";
import type { Ville } from "@/lib/villes";

export type ServiceCard = {
  icon: ReactNode;
  title: string;
  description: string;
};

type ServiceVillePageProps = {
  service: string;
  ville: Ville;
  basePath: string;
  heroImageUrl: string;
  description: string;
  highlights: string[];
  cards: ServiceCard[];
  siblingVilles: Ville[];
  crossService?: { label: string; href: string };
};

const REVEAL_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const REVEAL_WORD: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -80 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function VilleHero({
  service,
  ville,
  heroImageUrl,
}: {
  service: string;
  ville: Ville;
  heroImageUrl: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const words = `Intervention Rapide à ${ville.nom}`.split(" ");

  return (
    <section
      ref={sectionRef}
      aria-label={`${service} à ${ville.nom} — Artisans Michelet`}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-michelet-dark"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-1/3 h-[170%]">
        <Image
          src={heroImageUrl}
          alt={`Intervention Artisans Michelet à ${ville.nom}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/80 via-michelet-dark/60 to-michelet-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.4)_0%,rgba(5,11,20,0.95)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 pt-20 text-center">
        <CenterLogo3D />

        <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
          {service} — Hérault (34)
        </span>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={REVEAL_CONTAINER}
          style={{ perspective: 800 }}
          className="flex flex-wrap justify-center gap-x-3 font-display text-4xl font-bold text-white sm:text-5xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={REVEAL_WORD}
              style={{ display: "inline-block", transformStyle: "preserve-3d" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button href="tel:0411939674" variant="outline">
            <Phone className="h-4 w-4" aria-hidden />
            04 11 93 96 74
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center px-6">
        <TrustBar />
      </div>
    </section>
  );
}

function ServiceCards({
  service,
  ville,
  cards,
}: {
  service: string;
  ville: Ville;
  cards: ServiceCard[];
}) {
  return (
    <section aria-label={`Prestations ${service} à ${ville.nom}`} className="px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
            Nos prestations
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {service} à {ville.nom}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {cards.map(({ icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <TiltCard
                intensity={8}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/50"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-michelet-blue/10 text-michelet-blue">
                    {icon}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceVillePage({
  service,
  ville,
  basePath,
  heroImageUrl,
  description,
  highlights,
  cards,
  siblingVilles,
  crossService,
}: ServiceVillePageProps) {
  return (
    <main className="flex-1 bg-gradient-to-b from-michelet-dark to-[#08101E]">
      <VilleHero service={service} ville={ville} heroImageUrl={heroImageUrl} />

      <section className="mx-auto max-w-4xl px-6 py-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300">{description}</p>

          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle
                  className="h-5 w-5 shrink-0 text-michelet-blue drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]"
                  aria-hidden
                />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <ServiceCards service={service} ville={ville} cards={cards} />

      {(siblingVilles.length > 0 || crossService) && (
        <section className="mx-auto max-w-4xl px-6 pb-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-t border-white/10 pt-10"
          >
            {crossService && (
              <p className="text-sm text-gray-400">
                Besoin d&apos;un autre service à {ville.nom} ?{" "}
                <Link
                  href={crossService.href}
                  className="font-semibold text-michelet-blue transition-colors hover:text-blue-400"
                >
                  {crossService.label}
                </Link>
              </p>
            )}

            {siblingVilles.length > 0 && (
              <>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {service} — autres villes du secteur
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {siblingVilles.map((sibling) => (
                    <Link
                      key={sibling.slug}
                      href={`${basePath}/${sibling.slug}`}
                      className="text-sm text-gray-400 transition-transform duration-200 hover:translate-x-1 hover:text-blue-400"
                    >
                      {service} {sibling.nom}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </section>
      )}

      <section className="border-t border-white/10 bg-[#03060C] px-6 py-section">
        <div className="mx-auto max-w-2xl">
          <ContactForm
            title={`Demandez votre devis à ${ville.nom}`}
            description={`Décrivez votre besoin, un artisan Michelet intervenant à ${ville.nom} vous recontacte sous 24h.`}
            defaultService={service === "Plombier" ? "Plomberie" : "Serrurerie"}
          />
        </div>
      </section>
    </main>
  );
}
