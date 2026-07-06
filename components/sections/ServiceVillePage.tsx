"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { TrustBar } from "@/components/ui/TrustBar";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { ContactForm } from "@/components/sections/ContactForm";
import { getPlomberieContent, getSerrurerieContent } from "@/lib/data/seo-content";
import type { Ville } from "@/lib/villes";

type ServiceVillePageProps = {
  service: "Plombier" | "Serrurier";
  ville: Ville;
  basePath: string;
  heroImageUrl: string;
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
      className="relative flex min-h-[90dvh] w-full flex-col items-center justify-center overflow-hidden bg-michelet-dark px-6 py-20"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-1/3 h-[170%]">
        <Image
          src={heroImageUrl}
          alt={`Intervention Artisans Michelet à ${ville.nom}`}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/80 via-michelet-dark/60 to-michelet-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.4)_0%,rgba(5,11,20,0.95)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <CenterLogo3D />

        <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
          {service} — Hérault (34)
        </span>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={REVEAL_CONTAINER}
          style={{ perspective: 800 }}
          className="flex flex-wrap justify-center gap-x-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
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

      <div className="relative z-10 mt-16 flex w-full justify-center">
        <TrustBar />
      </div>
    </section>
  );
}

function ContentColumn({
  service,
  ville,
}: {
  service: "Plombier" | "Serrurier";
  ville: Ville;
}) {
  const sections =
    service === "Plombier"
      ? getPlomberieContent(ville.nom, ville.codePostal)
      : getSerrurerieContent(ville.nom, ville.codePostal);

  return (
    <div className="lg:col-span-8">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
        >
          <TiltCard
            intensity={4}
            className="group mb-12 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8"
          >
            <div className="relative mb-6 h-64 overflow-hidden rounded-2xl sm:h-80">
              <Image
                src={section.imageUrl}
                alt={section.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            <h2 className="font-display text-2xl font-bold text-blue-400 sm:text-3xl lg:text-4xl">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="mt-4 leading-relaxed text-gray-300"
              >
                {paragraph}
              </p>
            ))}
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}

function Sidebar({
  service,
  ville,
  basePath,
  siblingVilles,
  crossService,
}: {
  service: string;
  ville: Ville;
  basePath: string;
  siblingVilles: Ville[];
  crossService?: { label: string; href: string };
}) {
  const mapQuery = encodeURIComponent(`${ville.nom}, Hérault, France`);

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 p-4 shadow-glow-blue md:p-8">
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          <div className="relative z-10">
            <h3 className="font-display text-xl font-bold text-white">
              Besoin d&apos;un artisan à {ville.nom} ?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100">
              Intervention {service.toLowerCase()} rapide, 7j/7. Devis transparent, sans
              surprise.
            </p>
            <Link
              href="tel:0411939674"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-900 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.45)] active:translate-y-0"
            >
              <Phone className="h-4 w-4" aria-hidden />
              04 11 93 96 74
            </Link>
            {crossService && (
              <p className="mt-4 text-center text-xs text-blue-100">
                Besoin d&apos;un autre service ?{" "}
                <Link href={crossService.href} className="font-semibold text-white underline">
                  {crossService.label}
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title={`Carte ${ville.nom}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=13&output=embed`}
            width="100%"
            height="280"
            loading="lazy"
            style={{
              filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {siblingVilles.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Nous intervenons à
            </p>
            <ul className="mt-4 space-y-1">
              {siblingVilles.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={`${basePath}/${sibling.slug}`}
                    className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-[#0066FF]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-[#0066FF] group-hover:shadow-glow-blue" />
                    {service} {sibling.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

export function ServiceVillePage({
  service,
  ville,
  basePath,
  heroImageUrl,
  siblingVilles,
  crossService,
}: ServiceVillePageProps) {
  const highlights = [
    "Intervention rapide, 7j/7",
    "Artisans qualifiés et assurés",
    "Garantie décennale sur nos réalisations",
    "Devis transparent, sans surprise",
  ];

  return (
    <main className="flex-1 bg-gradient-to-b from-[#050B14] to-[#0A1626]">
      <VilleHero service={service} ville={ville} heroImageUrl={heroImageUrl} />

      <section className="px-6 py-section">
        <div className="mx-auto max-w-6xl">
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 flex flex-wrap gap-x-8 gap-y-4"
          >
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle
                  className="h-5 w-5 shrink-0 text-michelet-blue drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]"
                  aria-hidden
                />
                <span className="text-sm text-gray-200">{item}</span>
              </li>
            ))}
          </motion.ul>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <ContentColumn service={service} ville={ville} />
            <Sidebar
              service={service}
              ville={ville}
              basePath={basePath}
              siblingVilles={siblingVilles}
              crossService={crossService}
            />
          </div>
        </div>
      </section>

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
