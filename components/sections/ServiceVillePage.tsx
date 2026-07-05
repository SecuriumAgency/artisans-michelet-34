"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Ville } from "@/lib/villes";

type ServiceVillePageProps = {
  service: string;
  ville: Ville;
  basePath: string;
  description: string;
  highlights: string[];
  siblingVilles: Ville[];
  crossService?: { label: string; href: string };
};

export function ServiceVillePage({
  service,
  ville,
  basePath,
  description,
  highlights,
  siblingVilles,
  crossService,
}: ServiceVillePageProps) {
  return (
    <main className="flex-1 bg-gradient-to-b from-michelet-dark to-[#08101E] pt-32">
      <section className="mx-auto max-w-4xl px-6 py-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
            {service} — Hérault (34)
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            {service} à {ville.nom}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300">{description}</p>

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

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Demander un devis
            </Button>
            <Button href="tel:0411939674" variant="outline">
              <Phone className="h-4 w-4" aria-hidden />
              04 11 93 96 74
            </Button>
          </div>
        </motion.div>

        {(siblingVilles.length > 0 || crossService) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-20 border-t border-white/10 pt-10"
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
        )}
      </section>
    </main>
  );
}
