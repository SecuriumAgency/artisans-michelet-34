import type { Metadata } from "next";
import { ServiceVillePage } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HIGHLIGHTS = [
  "Intervention rapide, 7j/7",
  "Dépannage fuites, chauffe-eau, canalisations",
  "Garantie décennale sur nos réalisations",
  "Devis transparent, sans surprise",
];

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
    title: `Plombier ${ville.nom} | Artisans Michelet`,
    description: `Plombier qualifié à ${ville.nom} (34). Dépannage, installation et urgence 24h/24, 7j/7. Devis transparent, garantie décennale.`,
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
            },
            description: `Plombier qualifié à ${ville.nom}, intervention rapide et service d'urgence 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Plombier"
        ville={ville}
        basePath="/plombier"
        description={`Plombier qualifié à ${ville.nom}, Artisans Michelet intervient rapidement pour vos urgences et travaux de plomberie : fuites, chauffe-eau, canalisations, installations sanitaires. Service disponible 24h/24 et 7j/7 dans tout le secteur de ${ville.nom} et ses environs.`}
        highlights={HIGHLIGHTS}
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
