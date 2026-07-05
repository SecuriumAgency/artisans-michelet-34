import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Prestations | Artisans Michelet",
  description:
    "Plomberie, serrurerie et interventions sur-mesure dans l'Hérault (34), par les Artisans Michelet.",
};

export default function PrestationsPage() {
  return (
    <main className="flex-1 bg-white pt-20">
      <Services />
    </main>
  );
}
