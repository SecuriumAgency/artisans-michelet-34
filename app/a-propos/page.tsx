import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Artisans Michelet",
  description:
    "Le savoir-faire artisanal Michelet, une histoire d'exigence et de confiance dans l'Hérault.",
};

export default function AProposPage() {
  return (
    <main className="flex-1 bg-white pt-20">
      <section className="mx-auto max-w-4xl px-6 py-section">
        <span className="text-sm font-semibold uppercase tracking-widest text-action-500">
          À propos
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-trust-900 sm:text-5xl">
          L&apos;exigence artisanale, depuis toujours
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-trust-600">
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
      </section>
    </main>
  );
}
