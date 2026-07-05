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
    <section aria-label="Nos prestations" className="bg-white px-6 py-section">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-action-500">
            Nos prestations
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-trust-900 sm:text-4xl">
            Un savoir-faire artisanal à votre service
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <TiltCard
              key={title}
              intensity={8}
              className="group relative overflow-hidden rounded-2xl border border-trust-100 bg-gradient-to-b from-white to-trust-50 p-8 shadow-floating transition-shadow duration-300 hover:shadow-glow-gold"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-trust-900 text-action-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-trust-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-trust-500">{description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
