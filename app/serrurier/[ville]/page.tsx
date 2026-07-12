import type { Metadata } from "next";
import { ServiceVillePage } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200";

type Props = {
  params: Promise<{ ville: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return VILLES_SERRURERIE.map((ville) => ({ ville: ville.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = findVille(VILLES_SERRURERIE, slug)!;

  return {
    title: `Serrurier d'Urgence à ${ville.nom} (${ville.codePostal})`,
    description: `Serrurier d'urgence à ${ville.nom} (${ville.codePostal}) : ouverture de porte, blindage, changement de serrure, rideaux métalliques. Intervention rapide 24h/24, 7j/7. Devis transparent.`,
    alternates: { canonical: `/serrurier/${slug}` },
  };
}

export default async function SerrurierVillePage({ params }: Props) {
  const { ville: slug } = await params;
  const ville = findVille(VILLES_SERRURERIE, slug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Serrurerie",
            provider: {
              "@type": "LocalBusiness",
              name: "Artisans Michelet",
              telephone: "04 11 93 96 74",
            },
            areaServed: {
              "@type": "City",
              name: ville.nom,
              postalCode: ville.codePostal,
            },
            description: `Serrurier d'urgence à ${ville.nom} (${ville.codePostal}), intervention rapide 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Serrurier"
        ville={ville}
        basePath="/serrurier"
        heroImageUrl={HERO_IMAGE_URL}
        siblingVilles={VILLES_SERRURERIE.filter((v) => v.slug !== slug)}
        crossService={
          findVille(VILLES_PLOMBERIE, slug)
            ? { label: `Plombier à ${ville.nom}`, href: `/plombier/${slug}` }
            : undefined
        }
      />
    </>
  );
}
