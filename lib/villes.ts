import { plomberieCities, serrurerieCities } from "@/lib/data/seo-cities";

export type Ville = {
  slug: string;
  nom: string;
  codePostal: string;
};

const NOMS_VILLES: Record<string, string> = {
  montpellier: "Montpellier",
  beziers: "Béziers",
  sete: "Sète",
  agde: "Agde",
  lunel: "Lunel",
  "castelnau-le-lez": "Castelnau-le-Lez",
  frontignan: "Frontignan",
  lattes: "Lattes",
  mauguio: "Mauguio",
  juvignac: "Juvignac",
  meze: "Mèze",
  "saint-jean-de-vedas": "Saint-Jean-de-Védas",
  "villeneuve-les-maguelone": "Villeneuve-lès-Maguelone",
  perols: "Pérols",
  pezenas: "Pézenas",
  "clermont-l-herault": "Clermont-l'Hérault",
};

const CODES_POSTAUX: Record<string, string> = {
  montpellier: "34000",
  beziers: "34500",
  sete: "34200",
  agde: "34300",
  lunel: "34400",
  "castelnau-le-lez": "34170",
  frontignan: "34110",
  lattes: "34970",
  mauguio: "34130",
  juvignac: "34990",
  meze: "34140",
  "saint-jean-de-vedas": "34430",
  "villeneuve-les-maguelone": "34750",
  perols: "34470",
  pezenas: "34120",
  "clermont-l-herault": "34800",
};

function toVilles(slugs: readonly string[]): Ville[] {
  return slugs.map((slug) => ({
    slug,
    nom: NOMS_VILLES[slug] ?? slug,
    codePostal: CODES_POSTAUX[slug] ?? "34000",
  }));
}

export const VILLES_PLOMBERIE: Ville[] = toVilles(plomberieCities);
export const VILLES_SERRURERIE: Ville[] = toVilles(serrurerieCities);

export function findVille(villes: Ville[], slug: string): Ville | undefined {
  return villes.find((ville) => ville.slug === slug);
}
