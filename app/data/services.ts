import type { Service, ServiceSlug } from "./types";

export const services: Service[] = [
  {
    slug: "decoration-interieure",
    title: "Décoration intérieure",
    shortDescription:
      "Aménagement et mise en scène de vos espaces : matières, couleurs et lumière au service d'une ambiance sur mesure.",
    metaTitle: "Décoration intérieure à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin conçoit et réalise votre décoration intérieure : conseil en agencement, harmonies de couleurs, mobilier et éclairage. Demandez un devis gratuit.",
    heroImage: {
      src: "/images/services/decoration-hero.jpg",
      alt: "Salon vert canard décoré par Mode Kin, fauteuils en velours et tapis graphique",
      width: 736,
      height: 969,
    },
    intro:
      "La décoration intérieure transforme un logement en lieu de vie. Nos décorateurs vous accompagnent du premier croquis à la pose finale : étude des volumes, choix des matières, palette chromatique et mise en lumière. Chaque projet est pensé pour vous ressembler tout en valorisant durablement votre bien.",
    benefits: [
      {
        iconName: "Palette",
        title: "Conseil sur mesure",
        text: "Une étude personnalisée de vos espaces, de vos usages et de vos goûts.",
      },
      {
        iconName: "Ruler",
        title: "Agencement optimisé",
        text: "Une circulation fluide et un rangement pensé au centimètre près.",
      },
      {
        iconName: "Sparkles",
        title: "Finitions haut de gamme",
        text: "Des matériaux sélectionnés et une pose soignée jusqu'au dernier détail.",
      },
    ],
    prestations: [
      "Conseil en décoration et planche d'ambiance",
      "Aménagement et optimisation des espaces",
      "Harmonies de couleurs et choix des matières",
      "Sélection de mobilier et d'accessoires",
      "Mise en lumière et éclairage d'ambiance",
    ],
    gallery: [
      {
        src: "/images/services/decoration-1.jpg",
        alt: "Séjour aux tons mauves avec canapé et cadres décoratifs par Mode Kin",
        width: 736,
        height: 920,
      },
      {
        src: "/images/services/decoration-2.jpg",
        alt: "Cage d'escalier aux murs vert canard et menuiseries blanches",
        width: 736,
        height: 1104,
      },
    ],
    faq: [
      {
        question: "Proposez-vous un accompagnement complet ?",
        answer:
          "Oui, de la conception au suivi de chantier, nous gérons l'ensemble du projet ou seulement les étapes de votre choix.",
      },
      {
        question: "Travaillez-vous avec un budget imposé ?",
        answer:
          "Absolument. Nous adaptons nos propositions à votre budget et vous indiquons clairement les postes de dépense.",
      },
      {
        question: "Intervenez-vous dans les logements occupés ?",
        answer:
          "Oui, nous organisons le chantier pour limiter la gêne et protégeons vos espaces pendant les travaux.",
      },
    ],
    relatedSlugs: ["peinture-interieure-exterieure", "carrelage", "menuiserie"],
  },
  {
    slug: "peinture-interieure-exterieure",
    title: "Peinture intérieure & extérieure",
    shortDescription:
      "Préparation soignée des supports et application de peintures durables, à l'intérieur comme sur vos façades.",
    metaTitle: "Peinture intérieure et extérieure à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin réalise vos travaux de peinture intérieure et extérieure : préparation des supports, peinture décorative, ravalement de façade et traitement anti-humidité. Devis gratuit.",
    heroImage: {
      src: "/images/services/peinture-hero.jpg",
      alt: "Chambre aux murs peints en vert canard et gris avec décoration colorée par Mode Kin",
      width: 720,
      height: 1280,
    },
    intro:
      "Une belle peinture commence par une préparation irréprochable. Nos peintres traitent d'abord les supports — rebouchage, ponçage, enduit — avant d'appliquer des produits adaptés à chaque pièce et à chaque exposition. À l'extérieur, nous protégeons durablement vos façades contre l'humidité et les intempéries.",
    benefits: [
      {
        iconName: "PaintRoller",
        title: "Préparation rigoureuse",
        text: "Des supports assainis et lissés pour une finition nette et durable.",
      },
      {
        iconName: "Brush",
        title: "Finitions maîtrisées",
        text: "Mat, satiné, laqué : le rendu exact que vous recherchez, sans trace ni coulure.",
      },
      {
        iconName: "ShieldCheck",
        title: "Protection durable",
        text: "Des peintures et traitements résistants à l'humidité et au soleil.",
      },
    ],
    prestations: [
      "Préparation et assainissement des supports",
      "Peinture intérieure décorative",
      "Ravalement et peinture de façade",
      "Application d'enduits décoratifs",
      "Laque et vernis sur boiseries",
      "Traitement anti-humidité et anti-moisissures",
    ],
    gallery: [
      {
        src: "/images/services/peinture-1.jpg",
        alt: "Façade extérieure à l'enduit crépi brun avec soubassement en pierre",
        width: 736,
        height: 736,
      },
      {
        src: "/images/services/peinture-2.jpg",
        alt: "Mur de clôture à l'enduit texturé bicolore réalisé par Mode Kin",
        width: 736,
        height: 981,
      },
    ],
    faq: [
      {
        question: "Quelle peinture choisissez-vous pour les pièces humides ?",
        answer:
          "Nous utilisons des peintures spéciales anti-humidité et lessivables, adaptées aux salles de bain et aux cuisines.",
      },
      {
        question: "Faut-il libérer complètement les pièces ?",
        answer:
          "Non, nous protégeons le mobilier et les sols. Un dégagement partiel suffit pour travailler proprement.",
      },
      {
        question: "Combien de temps sèche une façade avant la couche suivante ?",
        answer:
          "Cela dépend du produit et de la météo ; nous respectons systématiquement les temps de séchage pour garantir la tenue.",
      },
    ],
    relatedSlugs: ["decoration-interieure", "carrelage", "menuiserie"],
  },
  {
    slug: "carrelage",
    title: "Carrelage & revêtements",
    shortDescription:
      "Pose précise de carrelage, faïence et grès cérame, avec étanchéité soignée pour sols et murs.",
    metaTitle: "Pose de carrelage à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin pose votre carrelage sol et mur : faïence, mosaïque, grès cérame, joints et étanchéité, rénovation de salle de bain. Travail précis et durable. Devis gratuit.",
    heroImage: {
      src: "/images/services/carrelage-hero.jpg",
      alt: "Escalier habillé de marbre par Mode Kin, murs à moulures et rampe noire",
      width: 736,
      height: 1308,
    },
    intro:
      "Le carrelage se joue au millimètre. Nos carreleurs préparent la chape, calibrent les découpes et soignent l'alignement des joints pour un rendu impeccable et pérenne. Nous portons une attention particulière à l'étanchéité des sols et des pièces d'eau, gage de tranquillité pour les années à venir.",
    benefits: [
      {
        iconName: "Grid3x3",
        title: "Pose au cordeau",
        text: "Des lignes parfaitement droites et des joints réguliers sur tous vos supports.",
      },
      {
        iconName: "Droplets",
        title: "Étanchéité garantie",
        text: "Une préparation qui protège durablement sols et pièces humides.",
      },
      {
        iconName: "Layers",
        title: "Large choix de matériaux",
        text: "Grès cérame, faïence, mosaïque : nous vous conseillons la meilleure option.",
      },
    ],
    prestations: [
      "Pose de carrelage au sol et au mur",
      "Pose de faïence et de mosaïque",
      "Grès cérame grand format",
      "Réalisation des joints et de l'étanchéité",
      "Rénovation complète de salle de bain",
      "Ragréage et préparation des supports",
    ],
    gallery: [
      {
        src: "/images/services/carrelage-1.jpg",
        alt: "Couloir au sol en marbre blanc et murs à moulures posé par Mode Kin",
        width: 736,
        height: 981,
      },
      {
        src: "/images/services/carrelage-2.jpg",
        alt: "Cuisine avec crédence en marbre et sol grès cérame effet marbre par Mode Kin",
        width: 735,
        height: 919,
      },
    ],
    faq: [
      {
        question: "Pouvez-vous carreler par-dessus un ancien sol ?",
        answer:
          "Dans certains cas oui, après vérification de la planéité et de la solidité du support. Sinon, nous réalisons un ragréage.",
      },
      {
        question: "Gérez-vous aussi l'étanchéité de la douche ?",
        answer:
          "Oui, nous appliquons un système d'étanchéité sous carrelage avant la pose pour éviter toute infiltration.",
      },
      {
        question: "Quel format de carreau recommandez-vous ?",
        answer:
          "Cela dépend de la pièce et de l'effet recherché ; nous vous orientons selon l'entretien, la surface et le style souhaité.",
      },
    ],
    relatedSlugs: ["habillage-mur-television", "peinture-interieure-exterieure", "decoration-interieure"],
  },
  {
    slug: "habillage-mur-television",
    title: "Habillage & revêtement mur télévision",
    shortDescription:
      "Création de murs TV décoratifs : panneaux, pierre, bois, lamelles et éclairage LED pour un salon spectaculaire.",
    metaTitle: "Habillage mur TV à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin conçoit et réalise votre mur télévision décoratif : habillage en panneaux, pierre, bois et lamelles, niches et éclairage LED intégré. Demandez un devis gratuit.",
    heroImage: {
      src: "/images/services/habillage-hero.jpg",
      alt: "Mur télévision en lamelles de bois avec vitrine éclairée par Mode Kin",
      width: 736,
      height: 981,
    },
    intro:
      "Le mur de la télévision est devenu la pièce maîtresse du salon. Mode Kin conçoit des habillages sur mesure qui structurent l'espace et mettent votre écran en valeur : panneaux muraux, parement en pierre ou en bois, lamelles décoratives, niches de rangement et éclairage LED d'ambiance. Un rendu haut de gamme, du dessin à la pose.",
    benefits: [
      {
        iconName: "Tv",
        title: "Design sur mesure",
        text: "Un mur conçu autour de votre écran, de vos rangements et de votre style.",
      },
      {
        iconName: "Layers",
        title: "Matériaux variés",
        text: "Panneaux, pierre, bois, lamelles ou gypse : le rendu exact que vous recherchez.",
      },
      {
        iconName: "Lightbulb",
        title: "Éclairage intégré",
        text: "Des LED d'ambiance qui subliment le mur et créent une atmosphère chaleureuse.",
      },
    ],
    prestations: [
      "Conception et plan du mur télévision",
      "Habillage en panneaux décoratifs et gypse",
      "Parement en pierre ou en bois",
      "Lamelles et tasseaux décoratifs",
      "Niches, rangements et supports d'écran",
      "Éclairage LED d'ambiance intégré",
    ],
    gallery: [
      {
        src: "/images/services/habillage-1.jpg",
        alt: "Mur TV en lamelles bois et panneau marbre avec meuble suspendu par Mode Kin",
        width: 736,
        height: 981,
      },
      {
        src: "/images/services/habillage-2.jpg",
        alt: "Mur télévision gris à panneau marbre et éclairage LED d'ambiance",
        width: 736,
        height: 920,
      },
      {
        src: "/images/services/habillage-3.jpg",
        alt: "Mur télévision en lamelles sombres rétroéclairées avec meuble bas",
        width: 736,
        height: 552,
      },
    ],
    faq: [
      {
        question: "Pouvez-vous intégrer les câbles et la box ?",
        answer:
          "Oui, nous prévoyons le passage des câbles en toute discrétion et des niches ventilées pour la box et les appareils.",
      },
      {
        question: "Travaillez-vous à partir d'une photo d'inspiration ?",
        answer:
          "Absolument. Nous partons de vos références, adaptons le design à votre mur et vous proposons un rendu avant réalisation.",
      },
      {
        question: "Quels matériaux proposez-vous pour le mur TV ?",
        answer:
          "Panneaux décoratifs, parement pierre ou brique, bois et lamelles, gypse moulé : nous vous conseillons selon le style et le budget.",
      },
    ],
    relatedSlugs: ["decoration-interieure", "menuiserie", "carrelage"],
  },
  {
    slug: "menuiserie",
    title: "Menuiserie",
    shortDescription:
      "Fabrication et pose de menuiseries bois sur mesure : portes, fenêtres, placards, parquet et agencements.",
    metaTitle: "Menuiserie sur mesure à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin conçoit vos menuiseries sur mesure : portes et fenêtres, placards, dressing, parquet et agencement bois. Fabrication soignée et pose précise. Devis gratuit.",
    heroImage: {
      src: "/images/services/menuiserie-hero.jpg",
      alt: "Menuisier de Mode Kin ajustant un aménagement en bois sur mesure",
      width: 1600,
      height: 1000,
    },
    intro:
      "Le bois apporte chaleur et durabilité à vos intérieurs. Notre atelier conçoit des menuiseries sur mesure — portes, fenêtres, placards, dressings et agencements — ajustées au millimètre à vos espaces. De la prise de cotes à la pose finale, nous soignons chaque assemblage et chaque finition.",
    benefits: [
      {
        iconName: "Hammer",
        title: "Sur mesure",
        text: "Des ouvrages conçus et fabriqués aux dimensions exactes de vos pièces.",
      },
      {
        iconName: "DoorOpen",
        title: "Ajustement précis",
        text: "Portes et fenêtres parfaitement d'aplomb, sans jeu ni frottement.",
      },
      {
        iconName: "TreePine",
        title: "Bois sélectionné",
        text: "Des essences choisies pour leur tenue et leur rendu esthétique.",
      },
    ],
    prestations: [
      "Fabrication et pose de portes et fenêtres",
      "Placards et dressings sur mesure",
      "Pose de parquet et de lambris",
      "Agencement bois et mobilier intégré",
      "Plans de travail et éléments de cuisine",
      "Réparation et rénovation de menuiseries",
    ],
    gallery: [
      {
        src: "/images/services/menuiserie-1.jpg",
        alt: "Dressing sur mesure en bois réalisé par Mode Kin",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/services/menuiserie-2.jpg",
        alt: "Parquet en bois posé dans un séjour",
        width: 1200,
        height: 900,
      },
    ],
    faq: [
      {
        question: "Fabriquez-vous les meubles dans votre atelier ?",
        answer:
          "Oui, nous concevons et fabriquons sur mesure, puis nous posons chez vous après un ajustement précis.",
      },
      {
        question: "Quelles essences de bois proposez-vous ?",
        answer:
          "Nous vous conseillons selon l'usage, le budget et le style : bois massif, contreplaqué ou panneaux plaqués.",
      },
      {
        question: "Pouvez-vous rénover d'anciennes menuiseries ?",
        answer:
          "Oui, nous réparons, ajustons et remettons en état portes, fenêtres et placards existants lorsque c'est possible.",
      },
    ],
    relatedSlugs: ["decoration-interieure", "carrelage", "peinture-interieure-exterieure"],
  },
];

export const SERVICE_SLUGS = services.map((s) => s.slug) as ServiceSlug[];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
