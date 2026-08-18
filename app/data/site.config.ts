import type { SiteConfig } from "./types";

// ⚠️ À REMPLACER par les données réelles de Mode Kin (voir README, section « Personnalisation »).
export const SITE: SiteConfig = {
  name: "Mode Kin",
  legalName: "Mode Kin SARL", // ⚠️ raison sociale exacte
  url: "https://www.modekin.com", // ⚠️ domaine de production, sans slash final
  description:
    "Mode Kin, entreprise de travaux du bâtiment : décoration intérieure, peinture, carrelage, plomberie et menuiserie.",
  phone: "+243 837165780",
  email: "modekinsarl@gmail.com",
  whatsapp: "243837165780", // format international sans +
  address: {
    street: "15ᵉ Rue, Poids Lourds, Limete",
    city: "Kinshasa",
    region: "Kinshasa", // ville-province de Kinshasa
    postalCode: "",
    country: "RD Congo",
  },
  geo: { lat: -4.325, lng: 15.322 }, // ⚠️ coordonnées réelles
  hours: [
    { days: "Lundi – Vendredi", open: "08:00 – 17:00" }, // ⚠️
    { days: "Samedi", open: "09:00 – 13:00" }, // ⚠️
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100063904751353" },
    { label: "Instagram", href: "https://instagram.com/" }, // ⚠️ lien Instagram réel à fournir
  ],
  mapsUrl: "https://www.google.com/maps", // ⚠️ lien Google Maps de l'établissement
  stats: [
    { value: "+500", label: "projets réalisés" }, // ⚠️
    { value: "+10 ans", label: "d'expérience" }, // ⚠️
    { value: "98 %", label: "de clients satisfaits" }, // ⚠️
  ],
  forms: { endpoint: "" }, // ⚠️ URL Formspree/EmailJS — vide = mode simulation (voir forms/submit.ts)
};
