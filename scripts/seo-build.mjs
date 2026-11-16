#!/usr/bin/env node
/**
 * SEO and GEO build step for Mawaddah.
 *
 *   node scripts/seo-build.mjs assets  -> public/sitemap.xml, public/llms.txt, public/llms-full.txt
 *   node scripts/seo-build.mjs pages   -> dist/<route>.html with per page meta, JSON-LD and crawlable content
 *                                         (served at /<route> through `cleanUrls` in vercel.json)
 *
 * Content comes from src/seo/routes.ts and src/data/*.ts so it always matches the app.
 * Runs automatically through the `prebuild` and `postbuild` npm scripts.
 */
import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] ?? "assets";
const today = new Date().toISOString().slice(0, 10);

async function loadContent() {
  const outfile = join(root, "node_modules/.cache/mawaddah-seo/content.mjs");
  await build({
    stdin: {
      contents: `
        export * from "./src/seo/routes.ts";
        export { faqs } from "./src/data/faq.ts";
        export { categories } from "./src/data/categories.ts";
        export { assessmentQuestions } from "./src/data/assessmentQuestions.ts";
      `,
      resolveDir: root,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });
  const mod = await import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
  await rm(dirname(outfile), { recursive: true, force: true });
  return mod;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const indexable = (routes) => routes.filter((r) => !r.noindex);
const shortTitle = (r) => r.title.split(" | ")[0];

/* ---------- public assets ---------- */

function sitemap({ SITE, routes }) {
  const urls = indexable(routes)
    .map(
      (r) => `  <url>
    <loc>${SITE.url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function llms({ SITE, routes, categories }) {
  const page = (p) => routes.find((r) => r.path === p);
  const areas = Object.values(categories)
    .map((c) => c.label)
    .join(", ");
  return `# ${SITE.name}

> ${SITE.name} is a free, open source couple health assessment for Muslim couples, married or engaged. It scores six areas of marriage (${areas}) and gives a full report with practical steps and a reminder from the Quran or Sunnah for each area. Results can be downloaded as PNG or PDF. It runs entirely in the browser with no sign up, and answers are never stored on a server.

Key facts:
- Name: ${SITE.name}, from the Arabic word for affection or love between spouses in Quran 30:21 ("He placed between you affection (mawaddah) and mercy (rahmah)")
- Website: ${SITE.url}
- Price: free, including the full report. Optional donations support the project
- Time: about 5 minutes
- Privacy: no account, no email needed, answers stay in the browser tab
- Creator: ${SITE.author} (${SITE.authorUrl})
- Source code: ${SITE.repo} (MIT License)
- It is a guidance tool and does not replace a scholar, counselor or family elders

## Main pages

- [Couple Health Assessment](${SITE.url}/assessment): ${page("/assessment").summary}
- [About](${SITE.url}/about): ${page("/about").summary}
- [FAQ](${SITE.url}/faq): ${page("/faq").summary}
- [Privacy](${SITE.url}/privacy): ${page("/privacy").summary}

## More detail

- [Full reference for AI assistants](${SITE.url}/llms-full.txt): every question, the scoring rules, guidance per area and all FAQ answers

## Open source

- [GitHub repository](${SITE.repo}): React, TypeScript, Tailwind CSS, Vite
- [Contributing guide](${SITE.repo}/blob/main/CONTRIBUTING.md)

## Optional

- [Sitemap](${SITE.url}/sitemap.xml)
`;
}

function llmsFull(c) {
  const { SITE, routes, faqs, categories, assessmentQuestions } = c;
  const scale = "Always (5), Sometimes (3), Rarely (1)";
  const questions = assessmentQuestions
    .map((q) => {
      const opts =
        q.answerType === "scale"
          ? scale
          : q.options.map((o) => (o.points ? `${o.text} (${o.points})` : o.text)).join(", ");
      const cond = q.showIf ? ` [only asked if question ${q.showIf.questionId} is "${q.showIf.value}"]` : "";
      return `${q.id}. [${q.category}] ${q.question}${cond}\n   Answers: ${opts}`;
    })
    .join("\n");
  const areas = Object.values(categories)
    .map(
      (cat) => `### ${cat.label}

${cat.description}

- Strong (80% and above): ${cat.insight.strong} Steps: ${cat.actions.strong.join(" ")}
- Growing (60% to 79%): ${cat.insight.growing} Steps: ${cat.actions.growing.join(" ")}
- Needs care (below 60%): ${cat.insight.care} Steps: ${cat.actions.care.join(" ")}
- Reminder: "${cat.reminder.text}" (${cat.reminder.source})`
    )
    .join("\n\n");

  return `${llms(c)}
---

# ${SITE.name} full reference

## Pages

${indexable(routes)
  .map((r) => `- ${SITE.url}${r.path}\n  ${r.title}\n  ${r.description}`)
  .join("\n")}

## How scoring works

- Questions in the "demographics" category describe the couple and are not scored.
- Every other question is worth up to 5 points: 5 for the healthiest answer, 3 for the middle answer, 1 for the lowest.
- Overall score = points earned divided by points possible, as a percentage.
- Each of the six areas gets its own percentage the same way.
- Overall labels: Exemplary (85% and above), Strong (70% to 84%), Growing (50% to 69%), Requires Attention (below 50%).
- Area labels in the full report: Strong (80% and above), Growing (60% to 79%), Needs care (below 60%).
- The report highlights the lowest scoring area as the place to start.

## Questions

${questions}

## Guidance by area

${areas}

## Frequently asked questions

${faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}
`;
}

/* ---------- per route HTML ---------- */

const ldScript = (data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

function faqJsonLd({ faqs }) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

function breadcrumbJsonLd(SITE, route) {
  if (route.path === "/") return "";
  return ldScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: shortTitle(route), item: `${SITE.url}${route.path}` },
    ],
  });
}

function quizJsonLd({ SITE, categories }) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Mawaddah Couple Health Assessment",
    url: `${SITE.url}/assessment`,
    description: "A free self assessment for Muslim couples covering six areas of marriage.",
    about: Object.values(categories).map((c) => ({ "@type": "Thing", name: c.label })),
    educationalUse: "self assessment",
    isAccessibleForFree: true,
    inLanguage: "en",
  });
}

function crawlableContent(c, route) {
  const { SITE, routes, faqs, categories, assessmentQuestions } = c;
  const nav = indexable(routes)
    .map((r) => `<li><a href="${r.path}">${esc(shortTitle(r))}</a></li>`)
    .join("");
  let body = `<h1>${esc(shortTitle(route))}</h1><p>${esc(route.summary)}</p>`;
  if (route.path === "/" || route.path === "/assessment") {
    body += `<h2>Areas the assessment covers</h2><ul>${Object.values(categories)
      .map((cat) => `<li><strong>${esc(cat.label)}</strong>: ${esc(cat.description)}</li>`)
      .join("")}</ul>`;
  }
  if (route.path === "/assessment") {
    body += `<h2>Questions</h2><ol>${assessmentQuestions.map((q) => `<li>${esc(q.question)}</li>`).join("")}</ol>`;
  }
  if (route.path === "/faq" || route.path === "/") {
    body += `<h2>Frequently asked questions</h2>${faqs
      .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
      .join("")}`;
  }
  return `<main>${body}<nav><ul>${nav}</ul></nav><p>Open source: <a href="${SITE.repo}">${SITE.repo}</a></p></main>`;
}

function renderRoute(html, c, route) {
  const { SITE } = c;
  const url = `${SITE.url}${route.path === "/" ? "/" : route.path}`;
  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/<!--SEO:CONTENT-->.*?<!--\/SEO:CONTENT-->/s, `<!--SEO:CONTENT-->${crawlableContent(c, route)}<!--/SEO:CONTENT-->`);
  if (route.noindex) {
    out = out.replace(/(<meta name="robots" content=")[^"]*(")/, `$1noindex, follow$2`);
  }
  const ld =
    (route.path === "/" || route.path === "/faq" ? faqJsonLd(c) : "") +
    (route.path === "/assessment" ? quizJsonLd(c) : "") +
    breadcrumbJsonLd(SITE, route);
  return out.replace("<!--SEO:LD-->", ld);
}

/* ---------- main ---------- */

const content = await loadContent();

if (mode === "assets") {
  const pub = join(root, "public");
  await writeFile(join(pub, "sitemap.xml"), sitemap(content));
  await writeFile(join(pub, "llms.txt"), llms(content));
  await writeFile(join(pub, "llms-full.txt"), llmsFull(content));
  console.log("seo: wrote public/sitemap.xml, public/llms.txt, public/llms-full.txt");
} else if (mode === "pages") {
  const dist = join(root, "dist");
  const template = await readFile(join(dist, "index.html"), "utf8");
  for (const route of content.routes) {
    const file = route.path === "/" ? join(dist, "index.html") : join(dist, `${route.path.slice(1)}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderRoute(template, content, route));
  }
  console.log(`seo: wrote ${content.routes.length} prerendered route files to dist/`);
} else {
  console.error(`Unknown mode "${mode}". Use "assets" or "pages".`);
  process.exit(1);
}
