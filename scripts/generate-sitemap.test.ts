import { buildSitemapUrls, renderSitemap } from "./generate-sitemap";
import { SERVICE_SLUGS } from "~/data/services";
import { PROJECT_SLUGS } from "~/data/projects";

test("le sitemap contient les 19 URLs attendues", () => {
  const urls = buildSitemapUrls();
  expect(urls).toContain("/");
  expect(urls).toContain("/services");
  SERVICE_SLUGS.forEach((s) => expect(urls).toContain(`/services/${s}`));
  PROJECT_SLUGS.forEach((s) => expect(urls).toContain(`/realisations/${s}`));
  expect(urls).toContain("/devis");
  // 9 statiques indexables + 5 services + 5 projets = 19 URLs de contenu
  expect(urls).toHaveLength(19);
  expect(new Set(urls).size).toBe(urls.length); // pas de doublon
});
test("le XML rendu est bien formé et absolu", () => {
  const xml = renderSitemap(["/", "/contact"]);
  expect(xml).toContain("<?xml");
  expect(xml).toContain("<loc>");
  expect(xml).toMatch(/https:\/\/[^<]+\/contact/);
});
