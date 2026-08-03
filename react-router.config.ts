import type { Config } from "@react-router/dev/config";
import { SERVICE_SLUGS } from "./app/data/services";
import { PROJECT_SLUGS } from "./app/data/projects";

export default {
  ssr: false,
  async prerender() {
    return [
      "/",
      "/services",
      ...SERVICE_SLUGS.map((s) => `/services/${s}`),
      "/realisations",
      ...PROJECT_SLUGS.map((s) => `/realisations/${s}`),
      "/tarifs",
      "/contact",
      "/devis",
      "/mentions-legales",
      "/politique-confidentialite",
      "/conditions-utilisation",
    ];
  },
} satisfies Config;
