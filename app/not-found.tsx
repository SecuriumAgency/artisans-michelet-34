import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou plus. Retournez à l'accueil d'Artisans Michelet.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center bg-michelet-dark px-6 py-32 text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-blue-500">
        Erreur 404
      </span>
      <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-gray-400">
        La page que vous recherchez n&apos;existe pas ou a été déplacée. Retrouvez nos
        prestations de plomberie et serrurerie dans l&apos;Hérault depuis l&apos;accueil.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
        <Link
          href="/contact"
          className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-michelet-blue hover:underline"
        >
          Contactez-nous
        </Link>
      </div>
    </main>
  );
}
