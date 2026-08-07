import type { PricingTier } from "./types";

// ⚠️ Prix indicatifs, à ajuster selon le projet réel. Remplacez les montants
// par la grille tarifaire réelle de Mode Kin avant mise en production.
export const pricingTiers: PricingTier[] = [
  {
    name: "Diagnostic",
    price: "Sur devis",
    tagline: "Une visite technique pour cadrer votre projet.",
    features: [
      "Visite sur site et prise de cotes",
      "Analyse des besoins et contraintes",
      "Estimation budgétaire indicative",
      "Conseils d'orientation personnalisés",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "À partir de — $",
    tagline: "L'essentiel bien exécuté pour un chantier maîtrisé.",
    features: [
      "Devis détaillé poste par poste",
      "Fourniture et pose des matériaux courants",
      "Suivi de chantier régulier",
      "Nettoyage de fin de chantier",
      "Garantie sur les travaux réalisés",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "Sur devis",
    tagline: "Finitions haut de gamme et accompagnement renforcé.",
    features: [
      "Matériaux et finitions haut de gamme",
      "Conception et planches d'ambiance",
      "Coordination des différents corps de métier",
      "Chef de projet dédié",
      "Suivi photographique du chantier",
    ],
    highlighted: false,
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    tagline: "Pour les professionnels et les projets d'envergure.",
    features: [
      "Chiffrage adapté aux grands volumes",
      "Planning coordonné multi-sites",
      "Interlocuteur unique et reporting",
      "Conditions dédiées aux professionnels",
    ],
    highlighted: false,
  },
];
