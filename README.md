# Mode Kin — Site vitrine

Site vitrine premium de **Mode Kin**, entreprise de travaux du bâtiment à Kinshasa
(décoration intérieure, peinture, carrelage, plomberie, menuiserie).

Application React prérendue en HTML statique, pensée pour le référencement,
l'accessibilité et la performance. Chaque page correspond à une **vraie route**
avec sa propre URL, ses métadonnées et son balisage schema.org.

## Stack technique

| Domaine | Choix |
|---|---|
| Framework | React 19 + TypeScript |
| Build & routage | React Router 8 (mode framework, `ssr: false` + `prerender`) |
| Prérendu | HTML statique généré au build (1 fichier `.html` par route) |
| Styles | Tailwind CSS 4 (thème `@theme` en CSS) |
| Animations | Framer Motion (respecte `prefers-reduced-motion`) |
| Formulaires | React Hook Form + Zod |
| Icônes | Lucide React |
| Tests | Vitest + Testing Library |
| Hébergement | Vercel (statique) |

> **Architecture pilotée par les données.** Les routes, la navigation, le
> `sitemap.xml`, les fils d'Ariane et le balisage schema.org sont tous dérivés
> des fichiers de `app/data/`. Ajouter un service ou un projet dans ces fichiers
> crée automatiquement sa page et l'inscrit partout — aucune désynchronisation
> possible entre le contenu et la structure du site.

## Prérequis

- **Node ≥ 22.22** (la chaîne d'outils React Router 8 l'exige). Un fichier
  `.nvmrc` est fourni : `nvm use` sélectionne la bonne version.
- npm.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site est servi sur `http://localhost:5173` avec rechargement à chaud.

## Tests & qualité

```bash
npm test           # suite Vitest complète
npm run typecheck  # vérification TypeScript (0 erreur attendue)
npm run lint       # ESLint
npm run format     # Prettier (écriture)
```

## Build de production

```bash
npm run build
```

Génère les pages statiques dans `build/client/` (un dossier `index.html` par
route) ainsi que `sitemap.xml` et `robots.txt`. Pour prévisualiser le build :

```bash
npm start
```

## Déploiement (Vercel)

Le fichier `vercel.json` configure tout :

- `buildCommand` : `npm run build`
- `outputDirectory` : `build/client`
- `cleanUrls` : URLs sans extension
- un `rewrite` de repli qui ne s'applique **qu'aux chemins sans fichier
  statique** (Vercel sert d'abord les pages prérendues ; les chemins inconnus
  retombent sur le shell et affichent la route 404 côté client).

Connectez le dépôt à Vercel : la configuration est détectée automatiquement,
aucune variable d'environnement n'est requise pour un déploiement de base.

## Personnalisation (à faire avant mise en production)

Tout le contenu à remplacer est balisé par un marqueur `⚠️` dans le code.

### 1. Coordonnées et informations de l'entreprise

Éditez **`app/data/site.config.ts`** : nom, adresse, téléphone, email, numéro
WhatsApp (format international, chiffres uniquement), horaires, réseaux sociaux,
lien Google Maps (`mapsUrl`, URL d'intégration/embed), coordonnées géographiques
et statistiques (projets réalisés, années d'expérience, satisfaction).

Cette valeur `url` sert de base aux URLs canoniques, à l'Open Graph et au
`sitemap.xml` : renseignez le domaine réel.

### 2. Images

Déposez vos fichiers dans **`public/images/`** en respectant les chemins et
**dimensions** documentés dans [`public/images/README.md`](public/images/README.md).
Les dimensions sont importantes : elles sont déclarées dans le code pour réserver
l'espace et garantir un décalage de mise en page (CLS) proche de zéro.

### 3. Contenu métier

- **Services** : `app/data/services.ts` (descriptions, prestations, FAQ, SEO).
- **Réalisations** : `app/data/projects.ts` (titres, lieux, dates, images).
- **Tarifs** : `app/data/pricing.ts` (prix indicatifs).
- **Avis clients** : `app/data/testimonials.ts` (remplacer par de vrais
  témoignages, avec accord des clients).

### 4. Activer l'envoi réel des formulaires

Par défaut, `site.config.ts` a `forms.endpoint: ""`, ce qui met les formulaires
de contact et de devis en **mode démonstration** (succès simulé, aucun envoi
réseau). Pour recevoir réellement les messages, renseignez `forms.endpoint` avec
l'URL d'un service comme **Formspree** ou **EmailJS** :

```ts
forms: { endpoint: "https://formspree.io/f/VOTRE_ID" }
```

Les données sont alors envoyées en JSON par POST, sans autre modification de code.

## Performance (à mesurer)

Conformément au principe « mesuré, pas supposé », les scores Lighthouse doivent
être relevés sur le **build de production servi localement**, une fois les vraies
images optimisées déposées (le poids des images conditionne fortement le score) :

```bash
npm run build && npm start
# puis lancer Lighthouse sur http://localhost:4173/ et une page /services/...
```

Reportez ici les quatre scores réellement obtenus (Performance, Accessibilité,
Bonnes pratiques, SEO). Le site est conçu pour les viser (> 95) — prérendu HTML,
images dimensionnées et en `lazy`, polices auto-hébergées, façade cliquable pour
Google Maps — mais le chiffre final dépend des assets fournis.

## Structure du projet

```
app/
├── components/   # layout, primitives UI, sections, formulaires
├── data/         # source de vérité : services, projets, tarifs, avis, config
├── forms/        # schémas Zod + service d'envoi
├── routes/       # une route = une page réelle
├── seo/          # construction des meta + générateurs schema.org
├── root.tsx      # layout racine (skip-link, MotionConfig, PageLayout)
└── routes.ts     # déclaration des routes
scripts/
└── generate-sitemap.ts   # sitemap.xml + robots.txt au build
public/images/    # emplacements documentés pour les visuels
```
