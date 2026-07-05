import type { Metadata } from "next";
import { Droplets, Flame, Search } from "lucide-react";
import { ServiceVillePage, type ServiceCard } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=2070";

const HIGHLIGHTS = [
  "Intervention rapide, 7j/7",
  "Dépannage fuites, chauffe-eau, canalisations",
  "Garantie décennale sur nos réalisations",
  "Devis transparent, sans surprise",
];

const CARDS: ServiceCard[] = [
  {
    icon: <Search className="h-6 w-6" aria-hidden />,
    title: "Recherche de fuite",
    description: "Détection précise des fuites d'eau, sans dégât inutile sur vos murs ou sols.",
  },
  {
    icon: <Droplets className="h-6 w-6" aria-hidden />,
    title: "Débouchage & canalisations",
    description:
      "Intervention rapide sur canalisations bouchées, éviers, WC et descentes d'eaux usées.",
  },
  {
    icon: <Flame className="h-6 w-6" aria-hidden />,
    title: "Chauffe-eau & sanitaires",
    description:
      "Installation, dépannage et remplacement de vos équipements sanitaires et chauffe-eau.",
  },
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
    title: `Plombier d'Urgence à ${ville.nom} | Artisans Michelet`,
    description: `Plombier d'urgence à ${ville.nom} (34) : recherche de fuite, débouchage, chauffe-eau. Intervention rapide 24h/24, 7j/7. Devis transparent, garantie décennale.`,
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
            description: `Plombier d'urgence à ${ville.nom}, intervention rapide 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Plombier"
        ville={ville}
        basePath="/plombier"
        heroImageUrl={HERO_IMAGE_URL}
        description={`Plombier qualifié à ${ville.nom}, Artisans Michelet intervient rapidement pour vos urgences et travaux de plomberie : fuites, chauffe-eau, canalisations, installations sanitaires. Service disponible 24h/24 et 7j/7 dans tout le secteur de ${ville.nom} et ses environs.`}
        highlights={HIGHLIGHTS}
        cards={CARDS}
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
