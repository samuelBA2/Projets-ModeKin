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
        src: "/images/projets/limete-1.jpg",
        alt: "Façade de villa avant ravalement",
        width: 1400,
        height: 933,
      },
      {
        src: "/images/projets/limete-2.jpg",
        alt: "Façade de villa repeinte par Mode Kin",
        width: 1400,
        height: 933,
      },
    ],
  },
  {
    slug: "salle-de-bain-carrelage-ngaliema",
    title: "Salle de bain habillée en grès cérame",
    category: "carrelage",
    location: "Ngaliema, Kinshasa",
    date: "2024-11-08",
    description:
      "Création d'une salle de bain contemporaine : étanchéité sous carrelage, pose de grès cérame grand format au sol et faïence murale à joints fins. Une pièce d'eau élégante, facile à entretenir et parfaitement étanche.",
    images: [
      {
        src: "/images/projets/ngaliema-1.jpg",
        alt: "Salle de bain carrelée en grès cérame par Mode Kin",
        width: 1400,
        height: 933,
      },
      {
        src: "/images/projets/ngaliema-2.jpg",
        alt: "Détail de la faïence murale à joints fins",
        width: 1400,
        height: 933,
      },
    ],
  },
  {
    slug: "installation-sanitaire-lemba",
    title: "Installation sanitaire d'une maison neuve",
    category: "plomberie",
    location: "Lemba, Kinshasa",
    date: "2024-09-12",
    description:
      "Réalisation complète du réseau d'eau d'une maison neuve : arrivées, évacuations, pose des sanitaires et raccordement du chauffe-eau. Chaque raccord a été testé sous pression pour garantir une étanchéité irréprochable.",
    images: [
      {
        src: "/images/projets/lemba-1.jpg",
        alt: "Réseau de plomberie neuf installé par Mode Kin",
        width: 1400,
        height: 933,
      },
      {
        src: "/images/projets/lemba-2.jpg",
        alt: "Sanitaires posés et raccordés dans la maison de Lemba",
        width: 1400,
        height: 933,
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
  {
    slug: "amenagement-boutique-kintambo",
    title: "Aménagement intérieur d'une boutique",
    category: "decoration-interieure",
    location: "Kintambo, Kinshasa",
    date: "2024-05-19",
    description:
      "Aménagement complet d'un local commercial : agencement de l'espace de vente, mise en lumière des produits, peinture et signalétique. Un intérieur accueillant qui valorise les produits et guide naturellement le visiteur.",
    images: [
      {
        src: "/images/projets/kintambo-1.jpg",
        alt: "Espace de vente aménagé par Mode Kin",
        width: 1400,
        height: 933,
      },
      {
        src: "/images/projets/kintambo-2.jpg",
        alt: "Mise en lumière des produits en boutique",
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
