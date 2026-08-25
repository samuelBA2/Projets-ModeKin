export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type ServiceSlug =
  | "decoration-interieure"
  | "peinture-interieure-exterieure"
  | "carrelage"
  | "habillage-mur-television"
  | "menuiserie"
  | "decoration-cuisine";

export type Benefit = { iconName: string; title: string; text: string };
export type FaqItem = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: ImageAsset;
  intro: string;
  benefits: Benefit[];
  prestations: string[];
  gallery: ImageAsset[];
  faq: FaqItem[];
  relatedSlugs: ServiceSlug[];
};

export type Project = {
  slug: string;
  title: string;
  category: ServiceSlug;
  location?: string;
  date: string; // ISO 8601
  description: string;
  images: ImageAsset[];
};

export type PricingTier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
};

export type Testimonial = { name: string; city: string; text: string; rating: number };

export type SiteConfig = {
  name: string;
  legalName: string;
  url: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string; // chiffres uniquement, format international
  address: { street: string; city: string; region: string; postalCode: string; country: string };
  geo: { lat: number; lng: number };
  hours: { days: string; open: string }[];
  socials: { label: string; href: string }[];
  mapsUrl: string;
  stats: { value: string; label: string }[];
  forms: { endpoint: string };
};
