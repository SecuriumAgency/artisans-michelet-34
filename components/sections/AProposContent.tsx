"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const HIGHLIGHTS = [
  "Plus de 20 ans d'expérience artisanale",
  "Plombiers & serruriers qualifiés",
  "Service d'urgence 24h/24 et 7j/7",
  "Intervention sur tout le département de l'Hérault",
];

export function AProposContent() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
          À propos
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          L&apos;exigence artisanale, depuis toujours
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            Artisans Michelet accompagne particuliers et professionnels de l&apos;Hérault
            depuis plus de 20 ans, avec une exigence constante : un travail soigné,
            durable, et respectueux de chaque intérieur.
          </p>
          <p>
            Plombiers et serruriers qualifiés, nous intervenons rapidement sur
            l&apos;ensemble du département, avec un service d&apos;urgence disponible
            24h/24 et 7j/7.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_32px_rgba(0,102,255,0.15)] backdrop-blur-xl md:p-8"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
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
  );
}
