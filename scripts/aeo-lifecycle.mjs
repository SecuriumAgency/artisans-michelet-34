#!/usr/bin/env node
// Garbage collection AEO : purge les articles (page générée + source .md + entrée manifeste)
// dont la date dépasse la durée de vie optimale (180 jours). Ne casse jamais le build CI.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const MAX_AGE_DAYS = 180;
const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONSEILS_DIR = path.join(ROOT, "app", "conseils");
const MANIFEST_PATH = path.join(CONSEILS_DIR, "articles.json");
const CONTENT_DIR = path.join(ROOT, "content", "conseils");

function fail(message) {
  console.error(`${RED}✖ ${message}${RESET}`);
  process.exit(1);
}

function warn(message) {
  console.warn(`${YELLOW}⚠ ${message}${RESET}`);
}

function daysSince(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return (Date.now() - date.getTime()) / 86_400_000;
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.log(`${GREEN}✔ Aucun manifeste trouvé, rien à nettoyer.${RESET}`);
    return;
  }

  let articles;
  try {
    articles = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch (error) {
    fail(`Manifeste illisible (${MANIFEST_PATH}) : ${error.message}`);
    return;
  }

  const kept = [];
  let removedCount = 0;

  for (const article of articles) {
    const age = article.date ? daysSince(article.date) : null;
    if (age === null) {
      warn(`Pas de date exploitable pour "${article.slug}", conservé par précaution.`);
      kept.push(article);
      continue;
    }
    if (age <= MAX_AGE_DAYS) {
      kept.push(article);
      continue;
    }

    const pageDir = path.join(CONSEILS_DIR, article.slug);
    try {
      fs.rmSync(pageDir, { recursive: true, force: true });
    } catch (error) {
      warn(`Impossible de supprimer ${pageDir} : ${error.message}`);
    }

    const sourcePath = path.join(CONTENT_DIR, `${article.slug}.md`);
    try {
      fs.rmSync(sourcePath, { force: true });
    } catch (error) {
      warn(`Impossible de supprimer ${sourcePath} : ${error.message}`);
    }

    removedCount += 1;
    console.log(`${GREEN}✔ Article expiré supprimé (${Math.round(age)} jours) : ${article.slug}${RESET}`);
  }

  if (removedCount > 0) {
    fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(kept, null, 2)}\n`, "utf8");
  }

  console.log(
    `${GREEN}✔ Cycle de vie AEO : ${removedCount} article(s) supprimé(s), ${kept.length} conservé(s).${RESET}`,
  );
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
