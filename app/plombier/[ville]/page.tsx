import type { Metadata } from "next";
import { ServiceVillePage } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=2070";

type Props = {
  params: Promise<{ ville: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return VILLES_PLOMBERIE.map((ville) => ({ ville: ville.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = findVille(VILLES_PLOMBERIE, slug)!;

  return {
    title: `Plombier d'Urgence à ${ville.nom} (${ville.codePostal}) | Artisans Michelet`,
    description: `Plombier d'urgence à ${ville.nom} (${ville.codePostal}) : recherche de fuite, débouchage, chauffe-eau, installation. Intervention rapide 24h/24, 7j/7. Devis transparent, garantie décennale.`,
  };
}

export default async function PlombierVillePage({ params }: Props) {
  const { ville: slug } = await params;
  const ville = findVille(VILLES_PLOMBERIE, slug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Plomberie",
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
            description: `Plombier d'urgence à ${ville.nom} (${ville.codePostal}), intervention rapide 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Plombier"
        ville={ville}
        basePath="/plombier"
        heroImageUrl={HERO_IMAGE_URL}
        siblingVilles={VILLES_PLOMBERIE.filter((v) => v.slug !== slug)}
        crossService={
          findVille(VILLES_SERRURERIE, slug)
            ? { label: `Serrurier à ${ville.nom}`, href: `/serrurier/${slug}` }
            : undefined
        }
      />
    </>
  );
}
