# Mode Kin — Site vitrine premium : spécification de conception

**Date :** 2026-07-30
**Statut :** Validé
**Langue du site :** Français (fr-FR)

---

## 1. Objectif

Créer un site vitrine haut de gamme et exploitable en production pour **Mode Kin**, entreprise de travaux du bâtiment (décoration intérieure, peinture, carrelage, plomberie, menuiserie).

Le site doit :

- présenter les cinq métiers de l'entreprise sur des pages réelles et indépendantes ;
- générer des demandes de devis (objectif de conversion principal) ;
- être techniquement irréprochable pour le référencement naturel ;
- inspirer confiance dès la première visite par la qualité de sa finition.

### Critères de réussite

| Critère | Cible |
|---|---|
| Routes réelles prérendues en HTML statique | 21 fichiers |
| Meta, canonical, Open Graph, JSON-LD uniques par page | 100 % des pages |
| Contraste texte / fond | ≥ 4,5:1 |
| Cibles tactiles | ≥ 44 × 44 px |
| Débordement horizontal à 375 px | Aucun |
| `prefers-reduced-motion` respecté | Toutes les animations |
| Formulaires : validation, erreurs, états de chargement | Contact + Devis |

**Note sur Lighthouse :** l'objectif est > 95 sur les quatre catégories. Ce score dépend du poids final des images fournies et de l'intégration Google Maps. Le score sera mesuré, pas supposé, et communiqué tel quel.

---

## 2. Principe directeur : les routes dérivent des données

C'est la décision d'architecture centrale. Elle garantit qu'aucune page n'est « simulée ».

Une seule source de vérité par domaine métier, dans `src/data/`. Ces fichiers alimentent **simultanément** :

1. le routeur (les routes existent parce que la donnée existe) ;
2. la navigation et le maillage interne ;
3. le générateur de `sitemap.xml` ;
4. le balisage schema.org ;
5. les fils d'Ariane (breadcrumbs).

Conséquence pratique : ajouter un service dans `services.ts` crée automatiquement sa route, son entrée de sitemap, son fil d'Ariane et ses liens croisés. **Aucune désynchronisation n'est possible entre le contenu et la structure du site.**

---

## 3. Stack technique

| Domaine | Choix | Version |
|---|---|---|
| Framework | React + TypeScript | 19.2 / 7.0 |
| Build | Vite | 8.2 |
| Routing + prérendu | React Router (mode framework) | 8.3 |
| Styles | Tailwind CSS (`@theme` en CSS) | 4.3 |
| Animations | Framer Motion | 12.43 |
| Formulaires | React Hook Form + Zod | 7.83 / 4.4 |
| Icônes | Lucide React | 1.28 |
| Tests | Vitest + Testing Library | 4.1 / 16.3 |
| Polices | `@fontsource` (auto-hébergées) | 5.3 |
| Qualité | ESLint + Prettier | 10.8 / 3.9 |
| Hébergement | Vercel (statique) | — |

### Justification du prérendu

Une SPA Vite classique envoie aux robots d'indexation une coquille HTML vide (`<div id="root"></div>`). Les balises meta injectées côté client arrivent **après** l'exécution du JavaScript, ce qui limite l'indexation réelle même si le score Lighthouse SEO reste bon.

React Router en **mode framework** avec `ssr: false` + `prerender` génère un fichier `.html` complet par route au moment du build. Les robots reçoivent le balisage intégral ; les visiteurs bénéficient de la navigation SPA après hydratation. Aucun serveur à héberger.

**Décision révisée (2026-07-31).** Le spec initial prévoyait `vite-react-ssg`. Vérification faite, cette bibliothèque ne supporte pas React 19 (annoncé comme « roadmap ») et sa propre documentation recommande d'utiliser le SSG natif de React Router. Le prérendu passe donc par React Router 8, officiellement maintenu.

**Conséquence : React Helmet Async est supprimé.** Le mode framework fournit un export `meta` par route, évalué au moment du prérendu. Les balises `title`, `description`, Open Graph et Twitter sont donc écrites directement dans le HTML statique, sans dépendre du JavaScript — strictement meilleur pour le référencement que Helmet.

---

## 4. Arborescence des URLs

21 pages prérendues.

| URL | Page | Origine |
|---|---|---|
| `/` | Accueil | statique |
| `/services` | Liste des services | statique |
| `/services/decoration-interieure` | Décoration intérieure | `services.ts` |
| `/services/peinture-interieure-exterieure` | Peinture | `services.ts` |
| `/services/carrelage` | Carrelage | `services.ts` |
| `/services/plomberie` | Plomberie | `services.ts` |
| `/services/menuiserie` | Menuiserie | `services.ts` |
| `/realisations` | Galerie des projets | statique |
| `/realisations/[slug]` | Page projet (× 6) | `projects.ts` |
| `/tarifs` | Offres tarifaires | statique |
| `/contact` | Contact | statique |
| `/devis` | Demande de devis | statique |
| `/mentions-legales` | Mentions légales | statique |
| `/politique-confidentialite` | Politique de confidentialité | statique |
| `/conditions-utilisation` | Conditions d'utilisation | statique |
| `*` | Page 404 | statique |

Routing SPA sur Vercel géré par `vercel.json` (rewrites), avec priorité aux fichiers statiques prérendus.

---

## 5. Couche de données

```
src/data/
├── site.config.ts     # Coordonnées, horaires, réseaux, statistiques, URL de base, endpoint formulaire
├── services.ts        # 5 objets Service
├── projects.ts        # 6 objets Project
├── pricing.ts         # 4 offres tarifaires
└── testimonials.ts    # Avis clients
```

### Types principaux

```ts
type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: ImageAsset;
  intro: string;
  benefits: { icon: LucideIcon; title: string; text: string }[];
  prestations: string[];
  gallery: ImageAsset[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];   // maillage interne
};

type Project = {
  slug: string;
  title: string;
  category: ServiceSlug;    // lie le projet à un service réel
  location: string;
  date: string;             // ISO
  description: string;
  images: ImageAsset[];
};

type ImageAsset = {
  src: string;              // /images/...
  alt: string;              // obligatoire, non vide
  width: number;
  height: number;           // réservation d'espace → CLS = 0
};
```

`ImageAsset` impose `alt`, `width` et `height` au niveau du type. Une image sans texte alternatif ou sans dimensions ne compile pas.

### Données à compléter par le client

Un seul fichier de configuration et un seul dossier d'images, entièrement balisés :

- **`site.config.ts`** — adresse, téléphone, email, horaires, numéro WhatsApp, réseaux sociaux, lien Google Maps, statistiques réelles (projets réalisés, années d'expérience, satisfaction).
- **`public/images/`** — structure de dossiers documentée avec les dimensions requises pour chaque emplacement.

Le contenu rédactionnel des cinq services et des pages légales est rédigé en français dans le cadre du projet. Les descriptions de projets, les avis clients et les statistiques sont structurellement réels mais leurs valeurs sont à remplacer par les données authentiques de Mode Kin.

---

## 6. Système de design

### Palette

| Jeton | Valeur | Usage |
|---|---|---|
| `--ink` | `#0C0A09` | Noir, texte principal |
| `--navy` | `#0F1E3D` | Bleu foncé, sections sombres, pied de page |
| `--gold` | `#A16207` | Doré, boutons d'appel à l'action, accents |
| `--gold-light` | `#CA8A04` | Doré clair — décoration et grands textes uniquement |
| `--bg` | `#FAFAF9` | Blanc cassé, fond de page |
| `--surface` | `#FFFFFF` | Cartes, surfaces élevées |
| `--muted` | `#E8ECF0` | Gris clair, fonds secondaires |
| `--border` | `#D6D3D1` | Bordures et séparateurs |

Le doré principal a été ajusté de `#CA8A04` à `#A16207` pour atteindre le ratio de contraste WCAG de 3:1. `--gold-light` est réservé aux éléments décoratifs et aux textes de grande taille, où le seuil est plus permissif.

### Typographie

- **Titres :** Playfair Display (400–700) — serif éditorial, registre haut de gamme
- **Texte courant :** Inter (300–700)
- **Hébergement :** auto-hébergé via `@fontsource`, avec `font-display: swap`

L'auto-hébergement supprime la requête vers Google Fonts, ce qui protège le LCP et évite une pénalité en Bonnes Pratiques.

Échelle typographique : 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 px. Taille de base 16 px sur mobile (évite le zoom automatique iOS). Interlignage 1,5–1,75 pour le texte courant. Longueur de ligne limitée à 65–75 caractères.

### Espacement

Échelle aérée : 24 / 32 / 48 / 64 / 96 / 128 px. Conteneur `max-w-7xl` centré sur grand écran, marges latérales adaptatives selon le point de rupture.

### Glassmorphisme — application ciblée

L'effet de verre est appliqué **délibérément et de façon limitée** :

- barre de navigation ;
- groupe de boutons flottants ;
- habillage de la visionneuse d'images (lightbox) ;
- superposition au survol des cartes de service.

`backdrop-filter` est coûteux en performance. Il n'est jamais appliqué à de grandes surfaces défilantes. C'est un écart assumé par rapport à un usage généralisé de l'effet, afin de protéger l'objectif Lighthouse.

### Points de rupture

375 / 768 / 1024 / 1440 px. Conception mobile d'abord.

---

## 7. Animations (Framer Motion)

| Effet | Détail |
|---|---|
| Apparition au défilement | `useInView` + variants, décalage de 40 ms entre éléments |
| Transition de route | `AnimatePresence`, fondu + glissement, 300 ms |
| Parallaxe | `useScroll` / `useTransform`, image du hero uniquement, amplitude 0–15 % |
| Micro-interactions | Survol : échelle 1,02 + balayage d'un soulignement doré |
| Menu mobile | Hamburger animé, panneau en glissement |

Toutes les animations sont encadrées par un `MotionConfig` global qui respecte `useReducedMotion`. Une seule protection centralisée, pas de vérification composant par composant.

Durées : 150–300 ms pour les micro-interactions, 400 ms maximum pour les transitions complexes. Sortie plus rapide que l'entrée (environ 60–70 %). Animation exclusive de `transform` et `opacity` — jamais de `width`, `height`, `top` ou `left`.

---

## 8. Couche SEO

### Export `meta` par route

Chaque module de route exporte une fonction `meta` évaluée au prérendu. Un utilitaire partagé `buildMeta()` produit de façon uniforme : `title`, `description`, `canonical`, Open Graph complet, Twitter Cards et directives `robots`. Aucune bibliothèque tierce.

### Générateurs schema.org (`src/seo/schema.ts`)

| Type | Portée |
|---|---|
| `LocalBusiness` | Ensemble du site (avec `geo`, horaires, zone desservie) |
| `Organization` + `WebSite` | Accueil |
| `Service` | Chaque page service |
| `CreativeWork` | Chaque page projet |
| `BreadcrumbList` | Toutes les pages de niveau 2 et 3 |
| `FAQPage` | Chaque page service disposant d'une FAQ |

### Génération du sitemap

`scripts/generate-sitemap.ts` s'exécute au build, lit **les mêmes fichiers de données** que le routeur, et produit `sitemap.xml` et `robots.txt`. Le sitemap ne peut pas diverger des routes réelles.

### Maillage interne

- Chaque page service renvoie vers les services liés via `relatedSlugs`.
- Chaque projet renvoie vers son service parent via `category`.
- Chaque page service liste les projets de sa catégorie.
- Fils d'Ariane sur toutes les pages profondes.

---

## 9. Formulaires

Deux formulaires : `/contact` (nom, téléphone, email, service, message) et `/devis` (formulaire complet avec service, description du projet, budget estimé, délai souhaité).

**Validation :** React Hook Form + résolveur Zod. Validation au `blur`, pas à chaque frappe.

**Soumission :** service typé `src/services/formSubmit.ts` qui envoie vers `siteConfig.forms.endpoint`. Compatible Formspree / EmailJS — il suffit de renseigner la clé ou l'URL dans la configuration pour activer l'envoi réel.

**Expérience utilisateur :**

- libellés visibles (jamais de placeholder seul) ;
- messages d'erreur sous le champ concerné, avec cause et solution ;
- région `aria-live` pour l'annonce aux lecteurs d'écran ;
- focus automatique sur le premier champ invalide après soumission ;
- états de chargement, succès et échec explicites ;
- bouton désactivé pendant l'envoi ;
- champ honeypot anti-spam ;
- types d'input sémantiques (`tel`, `email`) pour déclencher le bon clavier mobile ;
- hauteur des champs ≥ 44 px.

---

## 10. Accessibilité (WCAG 2.2 AA)

- Lien d'évitement vers le contenu principal.
- Repères sémantiques : `header`, `nav`, `main`, `footer`, `article`, `section`.
- Anneaux de focus visibles : doré, 2 px, avec décalage.
- Hiérarchie des titres séquentielle, un seul `h1` par page.
- Visionneuse d'images : piège à focus, fermeture par `Échap`, navigation au clavier.
- Accordéon FAQ : `aria-expanded`, `aria-controls`, pilotable au clavier.
- Toutes les icônes seules porteuses de sens disposent d'un `aria-label`.
- L'information n'est jamais transmise par la couleur seule.
- Boutons flottants positionnés dans les zones sûres (`safe-area-inset`).

---

## 11. Performance

| Technique | Mise en œuvre |
|---|---|
| Découpage du code | `lazy` + `Suspense` par route, avec indicateur de chargement réel |
| Images | `<picture>` AVIF / WebP / JPEG, `srcset` responsive |
| Décalage de mise en page | `width` / `height` obligatoires via le type `ImageAsset` → CLS ≈ 0 |
| Image du hero | Préchargée, `fetchpriority="high"` |
| Images sous la ligne de flottaison | `loading="lazy"` |
| Polices | Auto-hébergées, `font-display: swap`, préchargement des variantes critiques uniquement |
| Google Maps | Façade cliquable — l'iframe n'est chargée qu'après interaction |

**Sur Google Maps :** une iframe Maps intégrée directement coûte typiquement 10 à 20 points de performance. La façade cliquable (image statique + bouton) préserve la fonctionnalité tout en supprimant ce coût au chargement initial.

---

## 12. Fonctionnalités transverses

- Barre de navigation fixe avec transition au défilement (transparente → verre opaque).
- Menu hamburger animé sur mobile.
- Bouton de retour en haut de page.
- Groupe de boutons flottants : WhatsApp (`wa.me` depuis la configuration), appel direct (`tel:`), retour en haut.
- Visionneuse d'images accessible sur les pages projets.
- Accordéon FAQ par service.
- Restauration de la position de défilement à la navigation arrière.

---

## 13. Structure du projet

```
ModeKin/
├── docs/superpowers/{specs,plans}/
├── public/
│   ├── images/            # structure documentée, dimensions indiquées
│   ├── robots.txt         # généré au build
│   └── sitemap.xml        # généré au build
├── scripts/
│   └── generate-sitemap.ts
├── app/
│   ├── root.tsx           # document HTML, Layout, ErrorBoundary
│   ├── routes.ts          # configuration des routes
│   ├── app.css            # @theme Tailwind 4 + polices
│   ├── routes/            # un module par route (meta + loader + composant)
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, FloatingActions, Breadcrumbs
│   │   ├── ui/            # Button, Card, Accordion, Lightbox, Field, GlassPanel
│   │   └── sections/      # Hero, Stats, ServicesPreview, Testimonials, CtaBand
│   ├── data/
│   ├── seo/               # meta.ts, schema.ts
│   ├── services/          # formSubmit.ts
│   └── hooks/
├── react-router.config.ts # ssr:false + prerender
├── vite.config.ts
├── vercel.json
└── README.md
```

Le thème Tailwind 4 (palette, typographie, échelle d'espacement) est déclaré dans `app/app.css` via la directive `@theme`. Il n'y a pas de `tailwind.config.ts`.

---

## 14. Livrables

1. Projet complet, prêt pour la production, buildable et déployable sur Vercel.
2. 21 pages prérendues avec métadonnées, canonical et JSON-LD uniques.
3. Contenu rédactionnel français pour les cinq services et les trois pages légales.
4. `site.config.ts` documenté, à compléter avec les données réelles de Mode Kin.
5. `public/images/` structuré avec les dimensions requises par emplacement.
6. `README.md` : installation, développement, build, déploiement, procédure de remplacement du contenu.
7. Rapport Lighthouse mesuré sur le build de production, communiqué tel quel.

---

## 15. Hors périmètre

- Interface d'administration ou CMS.
- Multilingue (le site est en français uniquement).
- Espace client ou authentification.
- Paiement en ligne.
- Backend hébergé (les formulaires passent par un service externe configurable).
