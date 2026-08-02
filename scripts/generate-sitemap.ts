import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { SITE } from "../app/data/site.config.ts";
import { SERVICE_SLUGS } from "../app/data/services.ts";
import { PROJECT_SLUGS } from "../app/data/projects.ts";

const STATIC = [
  "/",
  "/services",
  "/realisations",
  "/tarifs",
  "/contact",
  "/devis",
  "/mentions-legales",
  "/politique-confidentialite",
  "/conditions-utilisation",
];

export function buildSitemapUrls(): string[] {
  return [
    ...STATIC,
    ...SERVICE_SLUGS.map((s) => `/services/${s}`),
    ...PROJECT_SLUGS.map((s) => `/realisations/${s}`),
  ];
}

export function renderSitemap(paths: string[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const body = paths
    .map((p) => `  <url><loc>${SITE.url}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;

// Exécution directe en script (vrai quand lancé par tsx/node, faux à l'import des tests)
const isEntry = process.argv.some((a) => a.endsWith("generate-sitemap.ts"));
if (isEntry) {
  const xml = renderSitemap(buildSitemapUrls());
  for (const dir of ["public", "build/client"]) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/sitemap.xml`, xml);
    writeFileSync(`${dir}/robots.txt`, robots);
  }
  console.log(`sitemap.xml : ${buildSitemapUrls().length} URLs`);
}
