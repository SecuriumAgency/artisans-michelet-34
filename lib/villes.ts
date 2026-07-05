import { plomberieCities, serrurerieCities } from "@/lib/data/seo-cities";

export type Ville = {
  slug: string;
  nom: string;
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

function toVilles(slugs: readonly string[]): Ville[] {
  return slugs.map((slug) => ({ slug, nom: NOMS_VILLES[slug] ?? slug }));
}

export const VILLES_PLOMBERIE: Ville[] = toVilles(plomberieCities);
export const VILLES_SERRURERIE: Ville[] = toVilles(serrurerieCities);

export function findVille(villes: Ville[], slug: string): Ville | undefined {
  return villes.find((ville) => ville.slug === slug);
}
