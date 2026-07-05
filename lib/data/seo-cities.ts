export const plomberieCities = [
  "montpellier",
  "beziers",
  "sete",
  "agde",
  "lunel",
  "castelnau-le-lez",
  "frontignan",
  "lattes",
  "mauguio",
  "juvignac",
  "meze",
  "saint-jean-de-vedas",
  "villeneuve-les-maguelone",
  "perols",
  "pezenas",
] as const;

export const serrurerieCities = [
  "montpellier",
  "beziers",
  "sete",
  "agde",
  "lunel",
  "castelnau-le-lez",
  "frontignan",
  "lattes",
  "mauguio",
  "juvignac",
  "meze",
  "saint-jean-de-vedas",
  "clermont-l-herault",
] as const;

export type PlomberieCity = (typeof plomberieCities)[number];
export type SerrurerieCity = (typeof serrurerieCities)[number];
