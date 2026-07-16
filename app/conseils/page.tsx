import type { Metadata } from "next";
import articlesData from "./articles.json";
import type { ConseilArticle } from "./types";
import { ConseilsFilter } from "@/components/conseils/ConseilsFilter";
import { parseSafeDate } from "@/lib/dates";

const articles = articlesData as ConseilArticle[];

export const metadata: Metadata = {
  title: "Nos Conseils d'Experts",
  description:
    "Guides pratiques et astuces en plomberie, serrurerie et vitrerie, rédigés par les artisans Michelet dans l'Hérault.",
  alternates: { canonical: "/conseils" },
};

function sortByDateDesc(list: ConseilArticle[]): ConseilArticle[] {
  return [...list].sort((a, b) => {
    const dateA = parseSafeDate(a.date);
    const dateB = parseSafeDate(b.date);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateB.getTime() - dateA.getTime();
  });
}

export default function ConseilsIndexPage() {
  const sortedArticles = sortByDateDesc(articles);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Nos Conseils d&apos;Experts</h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-400">
          Guides pratiques et astuces en plomberie, serrurerie et vitrerie.
        </p>
      </div>

      {sortedArticles.length === 0 ? (
        <p className="text-center text-white/60">Les premiers articles arrivent bientôt.</p>
      ) : (
        <ConseilsFilter articles={sortedArticles} />
      )}
    </main>
  );
}
