#!/usr/bin/env node
// Compilateur AEO local : Markdown -> app/conseils/<slug>/page.tsx (Server Component statique, SSG).
// Usage (fichier unique) : node scripts/generate-aeo.mjs "<Titre SEO>" <chemin/vers/fichier.md> [slug-personnalise]
// Usage (lot)            : node scripts/generate-aeo.mjs --dir <dossier-de-.md>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONSEILS_DIR = path.join(ROOT, "app", "conseils");
const MANIFEST_PATH = path.join(CONSEILS_DIR, "articles.json");

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

function truncate(text, max) {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(text) {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/\b_([^_]+)_\b/g, "<em>$1</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    if (!/^(https?:|mailto:|tel:|\/|#)/i.test(url)) return label;
    const safeUrl = url.replace(/"/g, "%22");
    const external = /^https?:\/\//.test(url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${safeUrl}"${attrs}>${label}</a>`;
  });
  return out;
}

function deriveTitle(meta, body, mdPath) {
  if (meta.title) return meta.title;
  const h1Match = body.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  const base = path.basename(mdPath, path.extname(mdPath));
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rawValue = line.slice(idx + 1).trim();
    const quoted = rawValue.match(/^(['"])(.*)\1$/);
    meta[key] = quoted ? quoted[2] : rawValue;
  }
  return { meta, body: raw.slice(match[0].length) };
}

// Parser Markdown -> HTML minimal (titres, paragraphes, listes, citations, liens, gras/italique).
// Détecte aussi les blocs "## FAQ" / "## Questions fréquentes" pour extraire des paires Q/R (H3 + paragraphe).
function parseMarkdown(body) {
  const blocks = body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  let html = "";
  let firstParagraph = "";
  let faqMode = false;
  let pendingQuestion = null;
  const faqItems = [];

  const flushFaq = () => {
    if (pendingQuestion) {
      faqItems.push(pendingQuestion);
      pendingQuestion = null;
    }
  };

  for (const block of blocks) {
    const headingMatch = block.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushFaq();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      if (level === 2 && /^(faq|questions?\s+fr[ée]quentes?)/i.test(text)) {
        faqMode = true;
      } else if (level <= 2) {
        faqMode = false;
      }
      html += `<h${level}>${renderInline(text)}</h${level}>\n`;
      if (faqMode && level === 3) {
        pendingQuestion = { question: text, answer: "" };
      }
      continue;
    }

    if (/^>\s?/.test(block)) {
      html += `<blockquote><p>${renderInline(block.replace(/^>\s?/gm, ""))}</p></blockquote>\n`;
      continue;
    }

    if (/^[-*]\s+/.test(block)) {
      const items = block.split("\n").map((l) => l.replace(/^[-*]\s+/, ""));
      html += `<ul>${items.map((i) => `<li>${renderInline(i)}</li>`).join("")}</ul>\n`;
      continue;
    }

    if (/^\d+\.\s+/.test(block)) {
      const items = block.split("\n").map((l) => l.replace(/^\d+\.\s+/, ""));
      html += `<ol>${items.map((i) => `<li>${renderInline(i)}</li>`).join("")}</ol>\n`;
      continue;
    }

    if (/^-{3,}$/.test(block)) {
      html += "<hr />\n";
      continue;
    }

    const text = block.replace(/\n/g, " ");
    html += `<p>${renderInline(text)}</p>\n`;
    if (pendingQuestion) {
      pendingQuestion.answer += (pendingQuestion.answer ? " " : "") + text;
    } else if (!firstParagraph) {
      firstParagraph = text;
    }
  }
  flushFaq();

  return { html, firstParagraph, faqItems };
}

function buildSchema({ title, description, canonicalPath, faqItems, dateISO }) {
  if (faqItems.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "Artisans Michelet" },
    publisher: { "@type": "Organization", name: "Artisans Michelet" },
    ...(dateISO ? { datePublished: dateISO } : {}),
    mainEntityOfPage: canonicalPath,
  };
}

// Typographie encapsulée en utilitaires Tailwind natifs (couleurs du thème existant uniquement) :
// fonctionne même sans le plugin @tailwindcss/typography, et en profite s'il est ajouté un jour.
const ARTICLE_WRAPPER_CLASS = [
  "prose prose-invert prose-lg max-w-none",
  "[&_h2]:font-display [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl",
  "[&_h3]:font-display [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl",
  "[&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-white/85",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2",
  "[&_a]:text-michelet-blue [&_a]:underline [&_strong]:text-white",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-michelet-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/80",
].join(" ");

function buildPageSource({ title, description, canonicalPath, html, schema, category, slug }) {
  return `import type { Metadata } from "next";
import Link from "next/link";
import articlesData from "../articles.json";
import type { ConseilArticle } from "../types";

const articles = articlesData as ConseilArticle[];

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  alternates: { canonical: ${JSON.stringify(canonicalPath)} },
};

const ARTICLE_HTML = ${JSON.stringify(html)};
const ARTICLE_SCHEMA = ${JSON.stringify(JSON.stringify(schema).replace(/</g, "\\u003c"))};
const CATEGORY = ${JSON.stringify(category)};
const SLUG = ${JSON.stringify(slug)};

export default function ConseilPage() {
  const related = CATEGORY
    ? articles.filter((article) => article.category === CATEGORY && article.slug !== SLUG).slice(0, 3)
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }}
      />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div
          className=${JSON.stringify(ARTICLE_WRAPPER_CLASS)}
          dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }}
        />
        {related.length > 0 && (
          <aside className="mt-16 border-t border-white/10 pt-8">
            <h2 className="font-display text-2xl mb-4">Articles liés</h2>
            <ul className="space-y-3">
              {related.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={\`/conseils/\${article.slug}\`}
                    className="text-michelet-blue underline hover:text-white transition"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
    </>
  );
}
`;
}

function upsertManifest(entry) {
  let list = [];
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      list = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    } catch {
      list = [];
    }
  }
  const idx = list.findIndex((a) => a.slug === entry.slug);
  if (idx >= 0) list[idx] = entry;
  else list.push(entry);
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(list, null, 2)}\n`, "utf8");
}

// Génère une page pour un fichier Markdown. Lance une erreur (à charge de l'appelant de la gérer)
// plutôt que d'appeler fail()/exit() directement, pour rester réutilisable en mode lot.
function processFile(mdPath, { titleArg, slugArg, seenSlugs } = {}) {
  let raw;
  try {
    raw = fs.readFileSync(mdPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(`Fichier Markdown introuvable : ${mdPath}`);
    throw new Error(`Impossible de lire le fichier ${mdPath} : ${error.message}`);
  }
  raw = raw.replace(/\r\n/g, "\n");

  const { meta, body } = parseFrontmatter(raw);
  const title = titleArg || deriveTitle(meta, body, mdPath);
  const slug = slugify(slugArg || meta.slug || title);
  if (!slug) throw new Error(`Impossible de générer un slug pour ${mdPath}`);
  if (seenSlugs) {
    if (seenSlugs.has(slug)) {
      throw new Error(
        `Slug "${slug}" en collision avec un autre fichier de ce lot (ajoutez un champ "slug" ou "title" distinct en frontmatter)`,
      );
    }
    seenSlugs.add(slug);
  }

  const { html, firstParagraph, faqItems } = parseMarkdown(body);
  const description = meta.description || truncate(firstParagraph || title, 160);
  const category = meta.category || null;
  const canonicalPath = `/conseils/${slug}`;

  const schema = buildSchema({
    title,
    description,
    canonicalPath,
    faqItems,
    dateISO: meta.date || undefined,
  });

  fs.mkdirSync(CONSEILS_DIR, { recursive: true });
  const pageDir = path.join(CONSEILS_DIR, slug);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(
    path.join(pageDir, "page.tsx"),
    buildPageSource({ title, description, canonicalPath, html, schema, category, slug }),
    "utf8",
  );

  upsertManifest({ slug, title, description, category, date: meta.date || null });

  return { slug, type: schema["@type"] };
}

function runSingle(title, mdPathArg, slugArg) {
  const mdPath = path.resolve(process.cwd(), mdPathArg);
  let result;
  try {
    result = processFile(mdPath, { titleArg: title, slugArg });
  } catch (error) {
    fail(error.message);
    return;
  }
  console.log(`${GREEN}✔ Article AEO généré : app/conseils/${result.slug}/page.tsx (${result.type})${RESET}`);
}

function runBatch(dirArg) {
  const dir = path.resolve(process.cwd(), dirArg);
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") fail(`Dossier introuvable : ${dir}`);
    fail(`Impossible de lire le dossier ${dir} : ${error.message}`);
    return;
  }

  const mdFiles = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"));
  if (mdFiles.length === 0) fail(`Aucun fichier .md trouvé dans ${dir}`);

  let successCount = 0;
  const seenSlugs = new Set();
  for (const entry of mdFiles) {
    const mdPath = path.join(dir, entry.name);
    try {
      const result = processFile(mdPath, { seenSlugs });
      successCount += 1;
      console.log(`${GREEN}✔ app/conseils/${result.slug}/page.tsx (${result.type})${RESET}`);
    } catch (error) {
      console.error(`${RED}✖ ${entry.name} : ${error.message}${RESET}`);
    }
  }

  if (successCount === 0) fail("Aucun article n'a pu être généré.");
  console.log(`${GREEN}✔ ${successCount}/${mdFiles.length} article(s) généré(s) depuis ${dir}${RESET}`);
}

function main() {
  const [, , arg1, arg2, arg3] = process.argv;

  if (arg1 === "--dir") {
    if (!arg2) fail("Usage : node scripts/generate-aeo.mjs --dir <dossier-de-.md>");
    runBatch(arg2);
    return;
  }

  if (!arg1 || !arg2) {
    fail('Usage : node scripts/generate-aeo.mjs "<Titre SEO>" <chemin/fichier.md> [slug]');
  }
  runSingle(arg1, arg2, arg3);
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
