import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service-detail.tsx"),
  route("realisations", "routes/realisations.tsx"),
  route("realisations/:slug", "routes/project-detail.tsx"),
  route("tarifs", "routes/tarifs.tsx"),
  route("contact", "routes/contact.tsx"),
  route("devis", "routes/devis.tsx"),
  route("mentions-legales", "routes/mentions-legales.tsx"),
  route("politique-confidentialite", "routes/politique-confidentialite.tsx"),
  route("conditions-utilisation", "routes/conditions-utilisation.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
