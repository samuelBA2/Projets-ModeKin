import { projects, getProject, PROJECT_SLUGS, getProjectsByCategory } from "./projects";
import { SERVICE_SLUGS } from "./services";

test("il y a 4 projets aux slugs uniques", () => {
  expect(projects).toHaveLength(4);
  expect(new Set(PROJECT_SLUGS).size).toBe(4);
});
test("la catégorie de chaque projet référence un service réel", () => {
  for (const p of projects) expect(SERVICE_SLUGS).toContain(p.category);
});
test("chaque projet a au moins 2 images valides, un lieu et une date ISO", () => {
  for (const p of projects) {
    expect(p.images.length).toBeGreaterThanOrEqual(2);
    p.images.forEach((i) => expect(i.alt.trim() && i.width && i.height).toBeTruthy());
    expect(p.location.trim().length).toBeGreaterThan(0);
    expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});
test("getProjectsByCategory filtre correctement", () => {
  const cat = projects[0].category;
  expect(getProjectsByCategory(cat).every((p) => p.category === cat)).toBe(true);
});
test("getProject retrouve par slug", () => {
  expect(getProject(projects[0].slug)).toBeDefined();
  expect(getProject("inexistant")).toBeUndefined();
});
