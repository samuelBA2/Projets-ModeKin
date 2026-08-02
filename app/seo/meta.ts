import type { MetaDescriptor } from "react-router";
import { SITE } from "~/data/site.config";

export type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

const abs = (p: string) => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

/**
 * Construit le tableau de descripteurs meta attendu par l'export `meta`
 * d'une route React Router : title, description, Open Graph et Twitter Card,
 * toutes les URLs étant absolues (basées sur SITE.url) pour le partage social.
 */
export function buildMeta({ title, description, path, image, noindex }: MetaInput): MetaDescriptor[] {
  const url = abs(path);
  const img = abs(image ?? "/images/og-default.jpg");
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex, nofollow" });
  return tags;
}

/** Descripteur `<link rel="canonical">` avec URL absolue, pour l'export `links` d'une route. */
export const canonical = (path: string) => ({ rel: "canonical" as const, href: abs(path) });
