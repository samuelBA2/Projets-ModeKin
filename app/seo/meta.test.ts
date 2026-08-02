import { buildMeta, canonical } from "./meta";
import { SITE } from "~/data/site.config";

test("buildMeta produit title, description et Open Graph absolus", () => {
  const m = buildMeta({ title: "Contact", description: "Contactez Mode Kin", path: "/contact" });
  expect(m).toContainEqual({ title: "Contact" });
  expect(m).toContainEqual({ name: "description", content: "Contactez Mode Kin" });
  expect(m).toContainEqual({ property: "og:url", content: `${SITE.url}/contact` });
  expect(m.find((d) => "property" in d && d.property === "og:type")).toBeTruthy();
  expect(m).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
});
test("noindex ajoute la directive robots", () => {
  const m = buildMeta({ title: "T", description: "D", path: "/x", noindex: true });
  expect(m).toContainEqual({ name: "robots", content: "noindex, nofollow" });
});
test("canonical renvoie une URL absolue", () => {
  expect(canonical("/tarifs")).toEqual({ rel: "canonical", href: `${SITE.url}/tarifs` });
});
