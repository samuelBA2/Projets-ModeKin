import { SITE } from "./site.config";

test("la config expose une URL de base absolue sans slash final", () => {
  expect(SITE.url).toMatch(/^https:\/\//);
  expect(SITE.url).not.toMatch(/\/$/);
});
test("les coordonnées essentielles sont présentes", () => {
  expect(SITE.phone).toBeTruthy();
  expect(SITE.email).toContain("@");
  expect(SITE.whatsapp).toMatch(/^\d+$/);
});
test("les trois statistiques de la page d'accueil existent", () => {
  expect(SITE.stats).toHaveLength(3);
  SITE.stats.forEach((s) => expect(s.label && s.value).toBeTruthy());
});
