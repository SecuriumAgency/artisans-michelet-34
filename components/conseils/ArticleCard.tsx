import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import type { ConseilArticle } from "@/app/conseils/types";
import { formatFrenchDate } from "@/lib/dates";

const SAFE_SLUG = /^[a-z0-9-]+$/;

export function ArticleCard({ article }: { article: ConseilArticle }) {
  if (!SAFE_SLUG.test(article.slug)) return null;

  const formattedDate = formatFrenchDate(article.date);

  return (
    <TiltCard
      intensity={6}
      className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-blue-500/50"
    >
      <Link href={`/conseils/${article.slug}`} className="flex h-full flex-col p-6 md:p-8">
        {article.category && (
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-michelet-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-michelet-blue">
            {article.category}
          </span>
        )}
        <h2 className="line-clamp-2 font-display text-xl font-bold text-white">{article.title}</h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400">{article.description}</p>
        <div className="mt-6 flex items-center justify-between gap-4 text-sm">
          {formattedDate ? (
            <time dateTime={article.date ?? undefined} className="text-gray-400">
              {formattedDate}
            </time>
          ) : (
            <span />
          )}
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-michelet-blue transition-all duration-300 group-hover:gap-2">
            Lire l&apos;article <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
