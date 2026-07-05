"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

type Testimonial = {
  name: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Baptiste B.",
    quote: "[Avis client à intégrer]",
    rating: 5,
  },
  {
    name: "Rosie P.",
    quote: "[Avis client à intégrer]",
    rating: 5,
  },
  {
    name: "[Nom du client]",
    quote: "[Avis client à intégrer]",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      aria-label="Témoignages clients"
      className="bg-[#08101E] px-6 py-section"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
            Témoignages
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            La confiance de nos clients
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <TiltCard
                intensity={6}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-blue-500/50 hover:bg-white/[0.07]"
              >
                <div className="flex gap-1" aria-label={`Note ${testimonial.rating} sur 5`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-6 font-display text-sm font-bold text-white">
                  {testimonial.name}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
