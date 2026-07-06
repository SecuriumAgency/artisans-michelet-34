"use client";

import { motion } from "framer-motion";
import { Droplets, KeyRound, ShieldCheck, Wrench } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

const SERVICES = [
  {
    icon: Droplets,
    title: "Plomberie",
    description:
      "Dépannage, installation et rénovation de vos systèmes sanitaires, avec une exigence de finition irréprochable.",
  },
  {
    icon: KeyRound,
    title: "Serrurerie",
    description:
      "Ouverture de porte, remplacement de serrures et sécurisation de vos accès, 24h/24 et 7j/7.",
  },
  {
    icon: Wrench,
    title: "Interventions sur-mesure",
    description:
      "Diagnostic précis et solutions adaptées à chaque configuration, dans le respect de votre habitat.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & suivi",
    description:
      "Un accompagnement post-intervention et une garantie décennale sur l'ensemble de nos réalisations.",
  },
];

export function Services() {
  return (
    <section aria-label="Nos prestations" className="bg-michelet-dark px-6 py-section">
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
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Un savoir-faire artisanal à votre service
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            >
              <TiltCard
                intensity={8}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/50 md:p-8"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-michelet-blue/10 text-michelet-blue">
                    <Icon className="h-6 w-6" aria-hidden />
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
