"use client";

import { useState } from "react";
import Link from "next/link";
import type { ConseilArticle } from "@/app/conseils/types";

export function ConseilsFilter({ articles }: { articles: ConseilArticle[] }) {
  const categories = Array.from(
    new Set(articles.map((a) => a.category).filter((c): c is string => Boolean(c))),
  ).sort();
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? articles.filter((a) => a.category === active) : articles;

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              active === null ? "bg-michelet-blue text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                active === category ? "bg-michelet-blue text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="text-white/70">Aucun article dans cette catégorie pour le moment.</p>
      ) : (
        <ul className="space-y-6">
          {filtered.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/conseils/${article.slug}`}
                className="block rounded-lg border border-white/10 p-5 transition hover:border-michelet-blue"
              >
                <h2 className="font-display text-xl mb-2">{article.title}</h2>
                <p className="text-white/70">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
