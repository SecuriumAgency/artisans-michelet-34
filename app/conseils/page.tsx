import type { Metadata } from "next";
import articlesData from "./articles.json";
import type { ConseilArticle } from "./types";
import { ConseilsFilter } from "@/components/conseils/ConseilsFilter";

const articles = articlesData as ConseilArticle[];

export const metadata: Metadata = {
  title: "Conseils d'artisans",
  description:
    "Guides pratiques et réponses aux questions fréquentes sur la plomberie et la serrurerie, par les artisans Michelet dans l'Hérault.",
  alternates: { canonical: "/conseils" },
};

export default function ConseilsIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="font-display text-3xl md:text-4xl mb-8">Conseils d&apos;artisans</h1>
      {articles.length === 0 ? (
        <p className="text-white/70">Les premiers articles arrivent bientôt.</p>
      ) : (
        <ConseilsFilter articles={articles} />
      )}
    </main>
  );
}
