import {
  localBusinessSchema,
  serviceSchema,
  projectSchema,
  breadcrumbSchema,
  faqSchema,
  websiteSchema,
} from "./schema";
import { services } from "~/data/services";
import { projects } from "~/data/projects";

test("LocalBusiness contient nom, geo et horaires", () => {
  const s = localBusinessSchema();
  expect(s["@type"]).toBe("LocalBusiness");
  expect(s.geo["@type"]).toBe("GeoCoordinates");
  expect(Array.isArray(s.openingHoursSpecification)).toBe(true);
});
test("WebSite expose une URL", () => {
  expect(websiteSchema()["@type"]).toBe("WebSite");
});
test("Service référence le prestataire et le nom", () => {
  const s = serviceSchema(services[0]);
  expect(s["@type"]).toBe("Service");
  expect(s.name).toBe(services[0].title);
  expect(s.provider["@type"]).toBe("LocalBusiness");
});
test("CreativeWork pour un projet inclut lieu et date", () => {
  const s = projectSchema(projects[0]);
  expect(s["@type"]).toBe("CreativeWork");
  expect(s.dateCreated).toBe(projects[0].date);
});
test("BreadcrumbList numérote les positions à partir de 1", () => {
  const b = breadcrumbSchema([
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
  ]);
  expect(b.itemListElement[0].position).toBe(1);
  expect(b.itemListElement[1].position).toBe(2);
});
test("FAQPage mappe les questions", () => {
  const f = faqSchema(services[0].faq);
  expect(f["@type"]).toBe("FAQPage");
  expect(f.mainEntity).toHaveLength(services[0].faq.length);
});
