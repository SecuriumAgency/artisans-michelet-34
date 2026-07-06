"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ABOUT_IMAGE_URL =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200";

const HIGHLIGHTS = [
  "Intervention rapide, 7j/7",
  "Plombiers & serruriers qualifiés",
  "Garantie décennale sur nos réalisations",
  "Devis transparent, sans surprise",
];

export function About() {
  return (
    <section
      aria-label="À propos d'Artisans Michelet"
      className="relative overflow-hidden bg-gradient-to-b from-michelet-dark to-[#08101E] px-6 py-section"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={ABOUT_IMAGE_URL}
              alt="Artisan Michelet au travail"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover brightness-[0.55] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-michelet-dark/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -right-4 -top-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-[0_8px_32px_rgba(0,102,255,0.2)] backdrop-blur-xl sm:-right-8 sm:-top-8">
            <p className="font-display text-3xl font-bold text-white">
              +20 <span className="text-michelet-blue">Ans</span>
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-300">D&apos;expérience</p>
          </div>

          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0A1626]/80 p-4 shadow-[0_4px_30px_rgba(0,102,255,0.15)] backdrop-blur-xl sm:-bottom-6 sm:left-8">
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.6H1.27A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.27 5.4l4-3.11Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4 3.11c.95-2.85 3.6-4.96 6.73-4.96Z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-white">Avis vérifiés Google</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-bold text-white">4.8</span>
                <div className="flex gap-0.5" aria-label="Note 4.8 sur 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-400">sur +55 avis</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
            À propos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            L&apos;exigence artisanale, depuis toujours
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Artisans Michelet accompagne particuliers et professionnels de l&apos;Hérault avec une
            exigence constante : un travail soigné, durable, et respectueux de chaque intérieur.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Plombiers et serruriers qualifiés, nous intervenons rapidement sur l&apos;ensemble du
            département, avec un service d&apos;urgence disponible 24h/24 et 7j/7.
          </p>

          <ul className="mt-8 space-y-4">
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

          <Button href="/contact" variant="primary" className="mt-10">
            Contactez-nous
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
