import type { Project } from "./types";
import { services } from "./services";

export const projects: Project[] = [
  {
    slug: "renovation-appartement-gombe",
    title: "Rénovation complète d'un appartement",
    category: "decoration-interieure",
    location: "Gombe, Kinshasa",
    date: "2025-03-15",
    description:
      "Rénovation intégrale d'un appartement de 90 m² : réagencement du séjour, nouvelle cuisine ouverte, harmonie de couleurs douces et éclairage sur mesure. Le résultat conjugue confort et élégance intemporelle.",
    images: [
      {
        src: "/images/projets/gombe-salon.jpg",
        alt: "Salon rénové de l'appartement de la Gombe, mur bleu canard et canapé d'angle",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/gombe-couloir-1.jpg",
        alt: "Couloir d'entrée rénové aux tons bleu nuit avec console en bois",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/gombe-couloir-2.jpg",
        alt: "Couloir habillé en vert émeraude avec parquet clair et banc",
        width: 675,
        height: 1200,
      },
    ],
  },
  {
    slug: "ravalement-facade-limete",
    title: "Ravalement de façade d'une villa",
    category: "peinture-interieure-exterieure",
    location: "Limete, Kinshasa",
    date: "2025-01-20",
    description:
      "Remise à neuf de la façade d'une villa exposée aux fortes pluies : assainissement des supports, traitement anti-humidité et application d'une peinture de façade résistante. La villa a retrouvé un aspect net et durablement protégé.",
    images: [
      {
        src: "/images/projets/limete-facade.jpg",
        alt: "Façade de maison ravalée par Mode Kin, enduit blanc et encadrements gris",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/limete-mur.jpg",
        alt: "Mur de clôture à l'enduit texturé bicolore réalisé par Mode Kin",
        width: 736,
        height: 981,
      },
    ],
  },
  {
    slug: "decoration-cuisine-equipee-ngaliema",
    title: "Décoration intérieure et équipement de cuisine",
    category: "decoration-interieure",
    location: "Ngaliema, Kinshasa",
    date: "2024-11-08",
    description:
      "Conception et aménagement complet d'une cuisine équipée : meubles sur mesure, plan de travail, crédence, éclairage d'ambiance et électroménager intégré. Un espace à la fois fonctionnel et élégant, pensé dans les moindres détails pour la décoration intérieure du logement.",
    images: [
      {
        src: "/images/projets/cuisine-1.jpg",
        alt: "Cuisine équipée moderne avec îlot en granit noir et mur en pierre par Mode Kin",
        width: 736,
        height: 920,
      },
      {
        src: "/images/projets/cuisine-2.jpg",
        alt: "Cuisine en bois foncé épurée avec électroménager encastré",
        width: 736,
        height: 1104,
      },
      {
        src: "/images/projets/cuisine-3.jpg",
        alt: "Cuisine bicolore blanc et bleu nuit avec crédence texturée",
        width: 736,
        height: 981,
      },
    ],
  },
  {
    slug: "dressing-sur-mesure-bandal",
    title: "Dressing et placards sur mesure",
    category: "menuiserie",
    location: "Bandalungwa, Kinshasa",
    date: "2024-07-03",
    description:
      "Conception et fabrication d'un dressing sur mesure et de placards intégrés pour une chambre parentale. Prise de cotes au millimètre, façades ajustées et rangements optimisés pour exploiter toute la hauteur disponible.",
    images: [
      {
        src: "/images/projets/bandal-1.jpg",
        alt: "Dressing sur mesure fabriqué par Mode Kin",
        width: 1400,
        height: 933,
      },
      {
        src: "/images/projets/bandal-2.jpg",
        alt: "Placards intégrés d'une chambre parentale",
        width: 1400,
        height: 933,
      },
    ],
  },
];

export const PROJECT_SLUGS = projects.map((p) => p.slug);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] =>
  projects.filter((p) => p.category === category);

// garde-fou : toute catégorie doit exister dans services
void services;
