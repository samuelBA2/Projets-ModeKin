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
      alt: "Peintre de Mode Kin appliquant une couche de finition sur un mur",
      width: 1600,
      height: 1000,
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
        alt: "Mur intérieur fraîchement peint dans un ton clair",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/services/peinture-2.jpg",
        alt: "Façade de maison ravalée par Mode Kin",
        width: 1200,
        height: 900,
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
      alt: "Carreleur de Mode Kin alignant des carreaux au sol",
      width: 1600,
      height: 1000,
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
        alt: "Sol carrelé en grès cérame posé par Mode Kin",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/services/carrelage-2.jpg",
        alt: "Faïence murale d'une salle de bain rénovée",
        width: 1200,
        height: 900,
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
    relatedSlugs: ["plomberie", "peinture-interieure-exterieure", "decoration-interieure"],
  },
  {
    slug: "plomberie",
    title: "Plomberie",
    shortDescription:
      "Installation, rénovation et dépannage de vos réseaux d'eau et sanitaires, dans les règles de l'art.",
    metaTitle: "Plombier à Kinshasa | Mode Kin",
    metaDescription:
      "Mode Kin assure votre plomberie : installation sanitaire, réseau d'eau, chauffe-eau, dépannage de fuite et salle de bain clé en main. Intervention soignée. Devis gratuit.",
    heroImage: {
      src: "/images/services/plomberie-hero.jpg",
      alt: "Plombier de Mode Kin raccordant une installation sanitaire",
      width: 1600,
      height: 1000,
    },
    intro:
      "Un réseau d'eau fiable est invisible mais essentiel. Nos plombiers dimensionnent, installent et entretiennent vos canalisations, sanitaires et systèmes d'eau chaude avec un souci constant de la conformité et de l'étanchéité. En cas de fuite, nous intervenons rapidement pour limiter les dégâts.",
    benefits: [
      {
        iconName: "Wrench",
        title: "Installations conformes",
        text: "Des réseaux dimensionnés et raccordés dans le respect des normes.",
      },
      {
        iconName: "Droplets",
        title: "Étanchéité contrôlée",
        text: "Chaque raccord est testé pour éviter fuites et infiltrations.",
      },
      {
        iconName: "Clock",
        title: "Dépannage réactif",
        text: "Une intervention rapide pour les urgences et les fuites d'eau.",
      },
    ],
    prestations: [
      "Installation sanitaire complète",
      "Création et rénovation du réseau d'eau",
      "Pose et raccordement de chauffe-eau",
      "Dépannage et recherche de fuite",
      "Salle de bain clé en main",
      "Réseaux d'évacuation et raccordements",
    ],
    gallery: [
      {
        src: "/images/services/plomberie-1.jpg",
        alt: "Installation de robinetterie réalisée par Mode Kin",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/services/plomberie-2.jpg",
        alt: "Réseau de canalisations neuf posé par Mode Kin",
        width: 1200,
        height: 900,
      },
    ],
    faq: [
      {
        question: "Intervenez-vous en urgence pour une fuite ?",
        answer:
          "Oui, nous traitons les fuites en priorité afin de couper le problème à la source et de protéger votre logement.",
      },
      {
        question: "Pouvez-vous installer une salle de bain complète ?",
        answer:
          "Oui, de l'arrivée d'eau aux évacuations et à la pose des sanitaires, en coordination avec nos carreleurs.",
      },
      {
        question: "Posez-vous les chauffe-eau que je fournis ?",
        answer:
          "Nous posons le matériel que vous fournissez ou vous conseillons un modèle adapté à vos besoins et à votre installation.",
      },
    ],
    relatedSlugs: ["carrelage", "menuiserie", "decoration-interieure"],
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
