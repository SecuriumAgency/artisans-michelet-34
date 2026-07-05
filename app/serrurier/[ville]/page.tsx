import type { Metadata } from "next";
import { DoorOpen, Lock, ShieldCheck } from "lucide-react";
import { ServiceVillePage, type ServiceCard } from "@/components/sections/ServiceVillePage";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE, findVille } from "@/lib/villes";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200";

const HIGHLIGHTS = [
  "Intervention rapide, 7j/7",
  "Ouverture de porte & remplacement de serrures",
  "Sécurisation de vos accès",
  "Devis transparent, sans surprise",
];

const CARDS: ServiceCard[] = [
  {
    icon: <DoorOpen className="h-6 w-6" aria-hidden />,
    title: "Ouverture de porte",
    description: "Ouverture rapide et sans dégât en cas de porte claquée ou de perte de clés.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    title: "Blindage de porte",
    description: "Renforcement de vos accès pour une sécurité optimale contre les effractions.",
  },
  {
    icon: <Lock className="h-6 w-6" aria-hidden />,
    title: "Changement de serrure",
    description: "Remplacement de serrures classiques ou haute sécurité, sur mesure.",
  },
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
    title: `Serrurier d'Urgence à ${ville.nom} | Artisans Michelet`,
    description: `Serrurier d'urgence à ${ville.nom} (34) : ouverture de porte, blindage, changement de serrure. Intervention rapide 24h/24, 7j/7. Devis transparent.`,
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
            description: `Serrurier d'urgence à ${ville.nom}, intervention rapide 24h/24, 7j/7.`,
          }),
        }}
      />
      <ServiceVillePage
        service="Serrurier"
        ville={ville}
        basePath="/serrurier"
        heroImageUrl={HERO_IMAGE_URL}
        description={`Serrurier qualifié à ${ville.nom}, Artisans Michelet intervient rapidement pour vos urgences de serrurerie : ouverture de porte, remplacement de serrures, sécurisation de vos accès. Service disponible 24h/24 et 7j/7 dans tout le secteur de ${ville.nom} et ses environs.`}
        highlights={HIGHLIGHTS}
        cards={CARDS}
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
