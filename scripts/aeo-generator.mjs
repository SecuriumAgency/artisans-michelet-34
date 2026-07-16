#!/usr/bin/env node
// Rédaction IA d'un article SEO (Plomberie/Serrurerie/Vitrerie) via l'API Anthropic.
// Écrit un fichier Markdown avec frontmatter (title/description/category/date) dans content/conseils/.
// Usage : node scripts/aeo-generator.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "conseils");

const TOPICS = [
  { category: "Plomberie", subject: "Que faire en cas de fuite d'eau sous l'évier" },
  { category: "Plomberie", subject: "Pourquoi mon chauffe-eau fait du bruit et quand le remplacer" },
  { category: "Plomberie", subject: "Canalisation bouchée : les bons réflexes avant d'appeler un plombier" },
  { category: "Plomberie", subject: "Chasse d'eau qui fuit en continu : diagnostic et solutions" },
  { category: "Serrurerie", subject: "Porte claquée avec les clés à l'intérieur : comment réagir" },
  { category: "Serrurerie", subject: "Serrure qui force ou tourne dans le vide : causes et solutions" },
  { category: "Serrurerie", subject: "Comment choisir une serrure certifiée A2P après une tentative d'effraction" },
  { category: "Vitrerie", subject: "Vitre cassée en urgence : sécuriser son logement avant réparation" },
  { category: "Vitrerie", subject: "Double vitrage embué : signe de panne et solutions de réparation" },
];

function fail(message) {
  console.error(`${RED}✖ ${message}${RESET}`);
  process.exit(1);
}

const COMBINING_DIACRITICS = /[̀-ͯ]/g;
function slugify(value) {
  return value
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SYSTEM_PROMPT = `Tu es rédacteur SEO technique pour Artisans Michelet, plombier et serrurier dans l'Hérault (34).
Tu rédiges un article de blog en français, informatif et concret, pour la section "Conseils" du site.

Format de sortie STRICT — réponds uniquement avec ce contenu, sans commentaire ni bloc de code autour :

---
title: <titre SEO percutant, sans les guillemets>
description: <résumé de 140 à 160 caractères maximum, sans guillemets>
category: <catégorie fournie telle quelle>
---

<corps de l'article en Markdown>

Règles de formatage Markdown à respecter STRICTEMENT (le parseur en aval ne supporte que ceci) :
- Titres avec "# ", "## " ou "### " uniquement (jamais "#### " ou plus)
- Paragraphes en texte simple séparés par une ligne vide
- Listes avec "- " ou "1. "
- Gras avec **texte**, italique avec *texte*
- Liens avec [texte](url) uniquement vers des chemins relatifs commençant par "/" — n'invente jamais d'URL externe
- Pas de tableaux, pas de blocs de code, pas de citations imbriquées
- Termine l'article par une section "## FAQ" contenant 2 à 3 sous-questions au format "### Question ?" suivies chacune d'un paragraphe de réponse concis

Contraintes de contenu :
- 500 à 800 mots dans le corps de l'article (hors frontmatter)
- Ton professionnel, rassurant, orienté conseil pratique — jamais de discours commercial appuyé
- N'invente aucun chiffre, prix, certification ou texte réglementaire précis que tu ne peux pas garantir exact ; reste général et prudent sur ces points
- Ne cite jamais le nom d'un concurrent`;

async function generateArticle() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const client = new Anthropic();

  const userPrompt = `Sujet imposé : "${topic.subject}"\nCatégorie imposée : ${topic.category}\n\nRédige l'article maintenant, en respectant exactement le format demandé.`;

  let finalMessage;
  try {
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });
    finalMessage = await stream.finalMessage();
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      throw new Error("Clé API Anthropic invalide ou manquante (401).");
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new Error("Limite de débit Anthropic atteinte (429) — réessayer plus tard.");
    }
    if (error instanceof Anthropic.APIConnectionError) {
      throw new Error(`Impossible de joindre l'API Anthropic : ${error.message}`);
    }
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Erreur API Anthropic (statut ${error.status}) : ${error.message}`);
    }
    throw error;
  }

  if (finalMessage.stop_reason === "refusal") {
    throw new Error("Le modèle a refusé de générer ce contenu (stop_reason: refusal).");
  }
  if (finalMessage.stop_reason === "max_tokens") {
    throw new Error("Réponse tronquée (max_tokens atteint) — article potentiellement incomplet, abandon.");
  }

  const textBlock = finalMessage.content.find((b) => b.type === "text");
  if (!textBlock || !textBlock.text.trim()) {
    throw new Error("Réponse vide de l'API Anthropic.");
  }

  return { markdown: textBlock.text.trim(), topic };
}

function extractTitle(markdown) {
  const match = markdown.match(/^title:\s*(.+)$/m);
  if (!match) throw new Error("Frontmatter invalide : champ 'title' introuvable dans la réponse générée.");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    fail("ANTHROPIC_API_KEY n'est pas définie dans l'environnement.");
  }

  const { markdown, topic } = await generateArticle();

  if (!markdown.startsWith("---\n")) {
    fail("La réponse générée ne commence pas par un frontmatter valide (---), abandon.");
  }

  const title = extractTitle(markdown);
  const slug = slugify(title);
  if (!slug) fail("Impossible de dériver un slug depuis le titre généré.");

  const today = new Date().toISOString().slice(0, 10);
  const withDate = markdown.includes("\ndate:") ? markdown : markdown.replace(/^---\n/, `---\ndate: ${today}\n`);

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, `${withDate}\n`, "utf8");

  console.log(`${GREEN}✔ Article généré (${topic.category}) : content/conseils/${slug}.md${RESET}`);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
