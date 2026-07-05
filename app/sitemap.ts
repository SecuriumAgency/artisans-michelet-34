import type { MetadataRoute } from "next";
import { plomberieCities, serrurerieCities } from "@/lib/data/seo-cities";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  ];

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

  return [...staticRoutes, ...plombierRoutes, ...serrurierRoutes];
}
