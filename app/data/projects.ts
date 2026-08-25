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
    slug: "decoration-porte",
    title: "Décoration porte",
    category: "menuiserie",
    date: "2025-05-10",
    description:
      "Fabrication, pose et décoration de portes intérieures et d'entrée sur mesure : portes à panneaux, à rainures, motifs géométriques et poignées assorties. Une sélection de réalisations qui illustrent notre savoir-faire en menuiserie et décoration de portes.",
    images: [
      {
        src: "/images/projets/portes/porte-1.jpg",
        alt: "Porte intérieure en bois à quatre panneaux avec imposte vitrée",
        width: 720,
        height: 1280,
      },
      {
        src: "/images/projets/portes/porte-2.jpg",
        alt: "Porte en bois massif à cinq panneaux, finition vernie",
        width: 2560,
        height: 2560,
      },
      {
        src: "/images/projets/portes/porte-3.jpg",
        alt: "Porte d'intérieur en bois à rainures horizontales, ouverte sur un couloir",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/projets/portes/porte-4.jpg",
        alt: "Porte en bois à rainures courbes noires dans un couloir",
        width: 736,
        height: 1160,
      },
      {
        src: "/images/projets/portes/porte-5.jpg",
        alt: "Porte pivotante à lames horizontales avec longue poignée en inox",
        width: 720,
        height: 1280,
      },
      {
        src: "/images/projets/portes/porte-6.jpg",
        alt: "Couloir équipé de plusieurs portes en chêne clair et boiseries blanches",
        width: 736,
        height: 980,
      },
      {
        src: "/images/projets/portes/porte-7.jpg",
        alt: "Porte en bois foncé à rainures concentriques avec poignée dorée",
        width: 720,
        height: 889,
      },
      {
        src: "/images/projets/portes/porte-8.jpg",
        alt: "Porte en chêne à motif géométrique de rainures noires",
        width: 1254,
        height: 1254,
      },
      {
        src: "/images/projets/portes/porte-9.jpg",
        alt: "Porte d'entrée double en bois à lames horizontales avec poignée verticale",
        width: 600,
        height: 600,
      },
      {
        src: "/images/projets/portes/porte-10.jpg",
        alt: "Porte en chêne à rainures horizontales avec poignée dorée",
        width: 960,
        height: 1280,
      },
    ],
  },
  {
    slug: "faux-plafond-staff",
    title: "Faux plafond & staff décoratif",
    category: "decoration-interieure",
    date: "2025-06-18",
    description:
      "Conception et réalisation de faux plafonds et d'ouvrages en staff : formes géométriques, corniches, gorges lumineuses et éclairage LED intégré. Du plafond central décoratif au couloir mis en scène, chaque volume est pensé pour structurer l'espace et sublimer la lumière.",
    images: [
      {
        src: "/images/projets/plafonds/plafond-1.jpg",
        alt: "Faux plafond circulaire à gradins avec lustre en cristal et spots encastrés",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/plafonds/plafond-2.jpg",
        alt: "Plafond en staff à caissons losangés avec spots ronds sur une terrasse à colonnes",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/plafonds/plafond-3.jpg",
        alt: "Faux plafond géométrique triangulaire avec gorges lumineuses LED et ventilateur",
        width: 735,
        height: 859,
      },
      {
        src: "/images/projets/plafonds/plafond-4.jpg",
        alt: "Couloir habillé d'un faux plafond à décrochements avec éclairage LED et tapis",
        width: 736,
        height: 1308,
      },
      {
        src: "/images/projets/plafonds/plafond-5.jpg",
        alt: "Couloir avec faux plafond en escalier et éclairage LED bleu, boiseries murales",
        width: 736,
        height: 981,
      },
      {
        src: "/images/projets/plafonds/plafond-6.jpg",
        alt: "Salon avec faux plafond circulaire, éclairage LED violet et mur TV décoratif",
        width: 720,
        height: 900,
      },
      {
        src: "/images/projets/plafonds/plafond-7.jpg",
        alt: "Séjour avec faux plafond anguleux et gorges lumineuses au-dessus d'un escalier",
        width: 736,
        height: 920,
      },
      {
        src: "/images/projets/plafonds/plafond-8.jpg",
        alt: "Pièce avec faux plafond à gradins et éclairage LED intégré, sol en marbre",
        width: 736,
        height: 920,
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
