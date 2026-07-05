import type { Metadata } from "next";
import { ServiceVillePage } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HIGHLIGHTS = [
  "Intervention rapide, 7j/7",
  "Ouverture de porte & remplacement de serrures",
  "Sécurisation de vos accès",
  "Devis transparent, sans surprise",
];

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
    title: `Serrurier ${ville.nom} | Artisans Michelet`,
    description: `Serrurier qualifié à ${ville.nom} (34). Ouverture de porte, remplacement de serrures et urgence 24h/24, 7j/7. Devis transparent.`,
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
            },
            description: `Serrurier qualifié à ${ville.nom}, intervention rapide et service d'urgence 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Serrurier"
        ville={ville}
        basePath="/serrurier"
        description={`Serrurier qualifié à ${ville.nom}, Artisans Michelet intervient rapidement pour vos urgences de serrurerie : ouverture de porte, remplacement de serrures, sécurisation de vos accès. Service disponible 24h/24 et 7j/7 dans tout le secteur de ${ville.nom} et ses environs.`}
        highlights={HIGHLIGHTS}
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
