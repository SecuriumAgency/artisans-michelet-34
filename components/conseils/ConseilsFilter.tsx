"use client";

import { useState } from "react";
import type { ConseilArticle } from "@/app/conseils/types";
import { ArticleCard } from "./ArticleCard";

const CATEGORIES = ["Plomberie", "Serrurerie", "Vitrerie"] as const;

export function ConseilsFilter({ articles }: { articles: ConseilArticle[] }) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? articles.filter((article) => article.category === active) : articles;

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <FilterPill label="Tous" active={active === null} onClick={() => setActive(null)} />
        {CATEGORIES.map((category) => (
          <FilterPill
            key={category}
            label={category}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-white/60">Aucun article dans cette catégorie pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active ? "bg-michelet-blue text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
