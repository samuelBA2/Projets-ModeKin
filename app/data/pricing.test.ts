import { pricingTiers } from "./pricing";
import { testimonials } from "./testimonials";

test("4 offres dont exactement une mise en avant", () => {
  expect(pricingTiers).toHaveLength(4);
  expect(pricingTiers.filter((t) => t.highlighted)).toHaveLength(1);
  expect(pricingTiers.map((t) => t.name)).toEqual(["Diagnostic", "Standard", "Premium", "Entreprise"]);
});
test("chaque offre a des prestations", () => {
  pricingTiers.forEach((t) => expect(t.features.length).toBeGreaterThanOrEqual(3));
});
test("les avis ont une note 1–5 et un texte", () => {
  expect(testimonials.length).toBeGreaterThanOrEqual(3);
  testimonials.forEach((a) => {
    expect(a.rating).toBeGreaterThanOrEqual(1);
    expect(a.rating).toBeLessThanOrEqual(5);
    expect(a.text.length).toBeGreaterThan(20);
  });
});
