import type { MetadataRoute } from "next";
import { plomberieCities, serrurerieCities } from "@/lib/data/seo-cities";
import conseilsArticlesData from "@/app/conseils/articles.json";
import type { ConseilArticle } from "@/app/conseils/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const conseilsArticles = conseilsArticlesData as ConseilArticle[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/prestations`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/a-propos`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/conseils`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const conseilsRoutes: MetadataRoute.Sitemap = conseilsArticles.map((article) => {
    const parsedDate = article.date ? new Date(article.date) : undefined;
    const lastModified = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : undefined;
    return {
      url: `${BASE_URL}/conseils/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const plombierRoutes: MetadataRoute.Sitemap = plomberieCities.map((slug) => ({
    url: `${BASE_URL}/plombier/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serrurierRoutes: MetadataRoute.Sitemap = serrurerieCities.map((slug) => ({
    url: `${BASE_URL}/serrurier/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...conseilsRoutes, ...plombierRoutes, ...serrurierRoutes];
}
