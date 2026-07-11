import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Prestations | Artisans Michelet",
  description:
    "Plomberie, serrurerie et interventions sur-mesure dans l'Hérault (34), par les Artisans Michelet.",
};

export default function PrestationsPage() {
  return (
    <main className="flex-1 bg-michelet-dark pt-20">
      <div className="mx-auto max-w-6xl px-6 pt-16 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-michelet-blue">
          Prestations
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          Plomberie &amp; Serrurerie dans l&apos;Hérault
        </h1>
      </div>
      <Services />
    </main>
  );
}
