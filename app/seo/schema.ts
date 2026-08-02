import { SITE } from "~/data/site.config";
import type { Service, Project, FaqItem } from "~/data/types";

const abs = (p: string) => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

/** Fiche établissement pour l'ensemble du site (SEO local). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: SITE.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      description: `${h.days} : ${h.open}`,
    })),
  };
}

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
});

export const serviceSchema = (s: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.metaDescription,
  url: abs(`/services/${s.slug}`),
  provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
  areaServed: SITE.address.city,
});

export const projectSchema = (p: Project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: p.title,
  description: p.description,
  dateCreated: p.date,
  locationCreated: p.location,
  image: p.images.map((i) => abs(i.src)),
  url: abs(`/realisations/${p.slug}`),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqSchema = (faq: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
