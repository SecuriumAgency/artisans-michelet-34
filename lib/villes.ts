export type Ville = {
  slug: string;
  nom: string;
};

export const VILLES_PLOMBERIE: Ville[] = [
  { slug: "montpellier", nom: "Montpellier" },
  { slug: "beziers", nom: "Béziers" },
  { slug: "sete", nom: "Sète" },
  { slug: "lunel", nom: "Lunel" },
  { slug: "mauguio", nom: "Mauguio" },
  { slug: "pezenas", nom: "Pézenas" },
];

export const VILLES_SERRURERIE: Ville[] = [
  { slug: "montpellier", nom: "Montpellier" },
  { slug: "agde", nom: "Agde" },
  { slug: "gignac", nom: "Gignac" },
  { slug: "clermont-l-herault", nom: "Clermont-l'Hérault" },
  { slug: "lodeve", nom: "Lodève" },
  { slug: "frontignan", nom: "Frontignan" },
];

export function findVille(villes: Ville[], slug: string): Ville | undefined {
  return villes.find((ville) => ville.slug === slug);
}
