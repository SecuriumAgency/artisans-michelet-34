import type { Metadata } from "next";
import { AProposContent } from "@/components/sections/AProposContent";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Le savoir-faire artisanal Michelet, une histoire d'exigence et de confiance dans l'Hérault.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <main className="flex-1 bg-michelet-dark pt-20">
      <AProposContent />
    </main>
  );
}
