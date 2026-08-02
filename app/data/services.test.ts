import { services, getService, SERVICE_SLUGS } from "./services";

test("il y a exactement 5 services aux slugs figés", () => {
  expect(services).toHaveLength(5);
  expect(SERVICE_SLUGS).toEqual([
    "decoration-interieure",
    "peinture-interieure-exterieure",
    "carrelage",
    "plomberie",
    "menuiserie",
  ]);
});

test("les slugs sont uniques", () => {
  expect(new Set(services.map((s) => s.slug)).size).toBe(5);
});

test("chaque relatedSlug pointe vers un service existant et jamais vers soi-même", () => {
  for (const s of services) {
    for (const r of s.relatedSlugs) {
      expect(SERVICE_SLUGS).toContain(r);
      expect(r).not.toBe(s.slug);
    }
  }
});

test("chaque image a un alt non vide et des dimensions positives", () => {
  for (const s of services) {
    for (const img of [s.heroImage, ...s.gallery]) {
      expect(img.alt.trim().length).toBeGreaterThan(0);
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  }
});

test("chaque service a du contenu SEO, des prestations, des avantages et une FAQ", () => {
  for (const s of services) {
    expect(s.metaTitle.length).toBeGreaterThan(10);
    expect(s.metaDescription.length).toBeGreaterThan(50);
    expect(s.prestations.length).toBeGreaterThanOrEqual(4);
    expect(s.benefits.length).toBeGreaterThanOrEqual(3);
    expect(s.faq.length).toBeGreaterThanOrEqual(3);
  }
});

test("getService retrouve par slug", () => {
  expect(getService("carrelage")?.title).toBeTruthy();
  expect(getService("inexistant" as never)).toBeUndefined();
});
