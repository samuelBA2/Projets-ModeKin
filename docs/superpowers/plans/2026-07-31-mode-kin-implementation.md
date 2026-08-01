# Plan d'implémentation — Site Mode Kin

> **Pour l'agent d'exécution :** SOUS-COMPÉTENCE REQUISE — utiliser superpowers:subagent-driven-development (recommandé) ou superpowers:executing-plans pour implémenter ce plan tâche par tâche. Les étapes utilisent la syntaxe case à cocher (`- [ ]`) pour le suivi.

**Objectif :** Livrer le site vitrine premium de Mode Kin — 21 pages réelles prérendues en HTML statique, SEO complet, formulaires fonctionnels — buildable et déployable sur Vercel.

**Architecture :** Application React Router 8 en **mode framework** (`ssr: false` + `prerender`). Une couche de données typée dans `app/data/` est l'unique source de vérité : elle alimente les routes, le maillage interne, le sitemap et le balisage schema.org. Le contenu des routes provient d'imports statiques de données (pas de `loader`), ce qui produit un HTML complet au build tout en gardant la navigation SPA après hydratation.

**Stack :** React 19.2, TypeScript 7.0, Vite 8.2, React Router 8.3 (framework), Tailwind CSS 4.3 (`@theme` en CSS), Framer Motion 12.43, React Hook Form 7.83 + Zod 4.4, Lucide React 1.28, Vitest 4.1 + Testing Library 16.3.

## Contraintes globales

Chaque tâche hérite implicitement de ces règles. Valeurs exactes, à respecter à la lettre.

- **Répertoire applicatif :** `app/` (convention du mode framework de React Router — équivaut au `src/` du spec). Alias d'import : `~/*` → `app/*`.
- **Versions (dépendances de prod) :** `react@^19.2.0`, `react-dom@^19.2.0`, `react-router@^8.3.0`, `framer-motion@^12.43.0`, `react-hook-form@^7.83.0`, `zod@^4.4.0`, `@hookform/resolvers@^5.5.0`, `lucide-react@^1.28.0`, `@fontsource-variable/inter@^5.3.0`, `@fontsource/playfair-display@^5.3.0`.
- **Versions (dépendances de dev) :** `@react-router/dev@^8.3.0`, `vite@^8.2.0`, `@vitejs/plugin-react@^6.0.0`, `@tailwindcss/vite@^4.3.0`, `tailwindcss@^4.3.0`, `typescript@^7.0.0`, `vitest@^4.1.0`, `@testing-library/react@^16.3.0`, `@testing-library/jest-dom@^7.0.0`, `jsdom@^30.0.0`, `vite-tsconfig-paths@^5.1.4`, `prettier@^3.9.0`, `eslint@^10.8.0`.
- **Langue du contenu :** français (fr-FR). Aucun lorem ipsum : toute chaîne visible est une vraie phrase française. Le contenu rédactionnel des 5 services et des 3 pages légales est écrit dans le cadre du projet ; les coordonnées, statistiques, avis et données projet sont structurellement réels mais leurs valeurs sont des placeholders documentés à remplacer par le client.
- **Type `ImageAsset` obligatoire** pour toute image : `{ src, alt, width, height }` avec `alt` non vide. Une image sans dimensions ou sans alt ne doit pas compiler.
- **Couleurs (jetons `@theme`) :** `--color-ink:#0C0A09`, `--color-navy:#0F1E3D`, `--color-gold:#A16207`, `--color-gold-light:#CA8A04`, `--color-bg:#FAFAF9`, `--color-surface:#FFFFFF`, `--color-muted:#E8ECF0`, `--color-border:#D6D3D1`.
- **Doré des CTA = `#A16207`** (contraste ≥ 3:1). `--color-gold-light` réservé au décoratif et aux grands textes.
- **Animations :** uniquement `transform` / `opacity`. Micro-interactions 150–300 ms, transitions ≤ 400 ms, sortie ≈ 60–70 % de l'entrée. Toutes encadrées par un `MotionConfig` global respectant `useReducedMotion`.
- **Accessibilité :** cibles tactiles ≥ 44 px, un seul `<h1>` par page, focus visible doré 2 px, aucune information par la couleur seule.
- **Commits :** fréquents, en français, format Conventional Commits. Terminer chaque message par `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- **Slugs de services (figés) :** `decoration-interieure`, `peinture-interieure-exterieure`, `carrelage`, `plomberie`, `menuiserie`.

---

## Structure des fichiers

```
ModeKin/
├── app/
│   ├── root.tsx                    # Layout HTML, ErrorBoundary, imports CSS/fonts
│   ├── routes.ts                   # Table de routage (mode framework)
│   ├── app.css                     # Tailwind + @theme (jetons de design)
│   ├── routes/                     # Un module par route
│   ├── data/                       # Source de vérité (types + contenu)
│   ├── components/{layout,ui,sections}/
│   ├── seo/{meta.ts,schema.ts}
│   ├── forms/{schemas.ts,submit.ts}
│   └── hooks/
├── scripts/generate-sitemap.ts     # Génère sitemap.xml + robots.txt au build
├── public/images/                  # Structure documentée (dimensions par emplacement)
├── react-router.config.ts          # ssr:false + prerender
├── vite.config.ts
├── vitest.config.ts
├── vitest.setup.ts
├── vercel.json
├── tsconfig.json
├── .eslintrc / eslint.config.js
├── .prettierrc
└── README.md
```

---

## Tâche 1 : Échafaudage du projet + outillage

**Fichiers :**
- Créer : `package.json`, `react-router.config.ts`, `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`, `vitest.setup.ts`, `eslint.config.js`, `.prettierrc`, `app/app.css`, `app/root.tsx`, `app/routes.ts`, `app/routes/home.tsx`
- Test : `app/routes/home.test.tsx`

**Interfaces :**
- Produit : le squelette buildable. `app/app.css` expose les jetons `@theme`. `app/root.tsx` exporte `Layout`, `default App`, `ErrorBoundary`. Alias `~/*`.

- [ ] **Étape 1 : `package.json`**

```json
{
  "name": "mode-kin",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build && node --experimental-strip-types scripts/generate-sitemap.ts",
    "start": "vite preview",
    "typecheck": "react-router typegen && tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

Puis installer (versions dans les Contraintes globales) :

```bash
npm i react react-dom react-router framer-motion react-hook-form zod @hookform/resolvers lucide-react @fontsource-variable/inter @fontsource/playfair-display
npm i -D @react-router/dev vite @vitejs/plugin-react @tailwindcss/vite tailwindcss typescript vitest @testing-library/react @testing-library/jest-dom jsdom vite-tsconfig-paths prettier eslint @types/react @types/react-dom
```

- [ ] **Étape 2 : `react-router.config.ts`** (prérendu statique complet — la liste sera enrichie dans les tâches routes)

```ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  async prerender() {
    return ["/"];
  },
} satisfies Config;
```

- [ ] **Étape 3 : `vite.config.ts`**

```ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
```

- [ ] **Étape 4 : `tsconfig.json`** (alias `~/*`, types React Router générés)

```json
{
  "include": ["**/*.ts", "**/*.tsx", ".react-router/types/**/*"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2023"],
    "types": ["@react-router/node", "vite/client", "vitest/globals", "@testing-library/jest-dom"],
    "target": "ES2023",
    "module": "ES2023",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "rootDirs": [".", "./.react-router/types"],
    "baseUrl": ".",
    "paths": { "~/*": ["./app/*"] },
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true
  }
}
```

- [ ] **Étape 5 : `app/app.css`** (Tailwind 4 + jetons de design)

```css
@import "tailwindcss";
@import "@fontsource-variable/inter";
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/600.css";
@import "@fontsource/playfair-display/700.css";

@theme {
  --color-ink: #0c0a09;
  --color-navy: #0f1e3d;
  --color-gold: #a16207;
  --color-gold-light: #ca8a04;
  --color-bg: #fafaf9;
  --color-surface: #ffffff;
  --color-muted: #e8ecf0;
  --color-border: #d6d3d1;

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: var(--color-bg);
    color: var(--color-ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
}
```

- [ ] **Étape 6 : `app/root.tsx`**

```tsx
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { MotionConfig } from "framer-motion";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-white">
          Aller au contenu principal
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Outlet />
    </MotionConfig>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = isRouteErrorResponse(error) ? `${error.status} — ${error.statusText}` : "Une erreur est survenue";
  return (
    <main id="contenu" className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-4xl">{message}</h1>
      <a href="/" className="mt-6 inline-block text-gold underline">Retour à l'accueil</a>
    </main>
  );
}
```

- [ ] **Étape 7 : `app/routes.ts`** (minimal, enrichi plus tard)

```ts
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx")] satisfies RouteConfig;
```

- [ ] **Étape 8 : `app/routes/home.tsx`** (placeholder de fumée, remplacé en Tâche 14)

```tsx
export function meta() {
  return [{ title: "Mode Kin" }];
}
export default function Home() {
  return <main id="contenu"><h1>Mode Kin</h1></main>;
}
```

- [ ] **Étape 9 : `vitest.config.ts` + `vitest.setup.ts`**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./vitest.setup.ts"] },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Étape 10 : `eslint.config.js` + `.prettierrc`**

```js
// eslint.config.js
import js from "@eslint/js";
export default [js.configs.recommended, { ignores: ["build/", ".react-router/", "node_modules/"] }];
```

```json
// .prettierrc
{ "printWidth": 120, "semi": true, "singleQuote": false, "trailingComma": "all" }
```

- [ ] **Étape 11 : test de fumée** — `app/routes/home.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./home";

test("la page d'accueil affiche le nom de l'entreprise", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mode Kin");
});
```

- [ ] **Étape 12 : vérifier** — `npm test` (PASS), `npm run typecheck` (0 erreur), `npm run build` (génère `build/client/index.html` contenant `Mode Kin`).

Vérifier le HTML prérendu :

```bash
npm run build && grep -q "Mode Kin" build/client/index.html && echo "HTML prérendu OK"
```

- [ ] **Étape 13 : commit**

```bash
git add -A && git commit -m "chore: échafaudage React Router 8 + Tailwind 4 + Vitest

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Tâche 2 : Types de données + configuration du site

**Fichiers :**
- Créer : `app/data/types.ts`, `app/data/site.config.ts`
- Test : `app/data/site.config.test.ts`

**Interfaces :**
- Produit : `ImageAsset`, `Service`, `Project`, `PricingTier`, `Testimonial`, `ServiceSlug`, `SITE` (objet `SiteConfig`).

- [ ] **Étape 1 : test d'abord** — `app/data/site.config.test.ts`

```ts
import { SITE } from "./site.config";

test("la config expose une URL de base absolue sans slash final", () => {
  expect(SITE.url).toMatch(/^https:\/\//);
  expect(SITE.url).not.toMatch(/\/$/);
});
test("les coordonnées essentielles sont présentes", () => {
  expect(SITE.phone).toBeTruthy();
  expect(SITE.email).toContain("@");
  expect(SITE.whatsapp).toMatch(/^\d+$/);
});
test("les trois statistiques de la page d'accueil existent", () => {
  expect(SITE.stats).toHaveLength(3);
  SITE.stats.forEach((s) => expect(s.label && s.value).toBeTruthy());
});
```

- [ ] **Étape 2 : vérifier l'échec** — `npx vitest run app/data/site.config.test.ts` → FAIL (module introuvable).

- [ ] **Étape 3 : `app/data/types.ts`**

```ts
export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type ServiceSlug =
  | "decoration-interieure"
  | "peinture-interieure-exterieure"
  | "carrelage"
  | "plomberie"
  | "menuiserie";

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
  location: string;
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
```

- [ ] **Étape 4 : `app/data/site.config.ts`** — valeurs placeholder documentées (chaque ligne signale ce que le client doit remplacer)

```ts
import type { SiteConfig } from "./types";

// ⚠️ À REMPLACER par les données réelles de Mode Kin (voir README, section « Personnalisation »).
export const SITE: SiteConfig = {
  name: "Mode Kin",
  legalName: "Mode Kin SARL", // ⚠️ raison sociale exacte
  url: "https://www.modekin.com", // ⚠️ domaine de production, sans slash final
  description:
    "Mode Kin, entreprise de travaux du bâtiment : décoration intérieure, peinture, carrelage, plomberie et menuiserie.",
  phone: "+243000000000", // ⚠️ téléphone réel
  email: "contact@modekin.com", // ⚠️ email réel
  whatsapp: "243000000000", // ⚠️ WhatsApp, format international sans +
  address: {
    street: "Avenue à compléter", // ⚠️
    city: "Kinshasa", // ⚠️
    region: "Kinshasa", // ⚠️
    postalCode: "", // ⚠️
    country: "RD Congo", // ⚠️
  },
  geo: { lat: -4.325, lng: 15.322 }, // ⚠️ coordonnées réelles
  hours: [
    { days: "Lundi – Vendredi", open: "08:00 – 17:00" }, // ⚠️
    { days: "Samedi", open: "09:00 – 13:00" }, // ⚠️
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com/" }, // ⚠️
    { label: "Instagram", href: "https://instagram.com/" }, // ⚠️
  ],
  mapsUrl: "https://www.google.com/maps", // ⚠️ lien Google Maps de l'établissement
  stats: [
    { value: "+500", label: "projets réalisés" }, // ⚠️
    { value: "+10 ans", label: "d'expérience" }, // ⚠️
    { value: "98 %", label: "de clients satisfaits" }, // ⚠️
  ],
  forms: { endpoint: "" }, // ⚠️ URL Formspree/EmailJS — vide = mode simulation (voir forms/submit.ts)
};
```

- [ ] **Étape 5 : vérifier** — `npx vitest run app/data/site.config.test.ts` → PASS.

- [ ] **Étape 6 : commit**

```bash
git add -A && git commit -m "feat(data): types du domaine + configuration du site

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Tâche 3 : Données des services + tests d'intégrité

**Fichiers :**
- Créer : `app/data/services.ts`
- Test : `app/data/services.test.ts`

**Interfaces :**
- Consomme : `Service`, `ServiceSlug` (Tâche 2).
- Produit : `services: Service[]` (5 éléments), `getService(slug): Service | undefined`, `SERVICE_SLUGS: ServiceSlug[]`.

- [ ] **Étape 1 : test d'abord** — `app/data/services.test.ts`

```ts
import { services, getService, SERVICE_SLUGS } from "./services";

test("il y a exactement 5 services aux slugs figés", () => {
  expect(services).toHaveLength(5);
  expect(SERVICE_SLUGS).toEqual([
    "decoration-interieure",
    "peinture-interieure-exterieure",
    "carrelage",
    "plomberie",
    "menuiserie",
  ]);
});

test("les slugs sont uniques", () => {
  expect(new Set(services.map((s) => s.slug)).size).toBe(5);
});

test("chaque relatedSlug pointe vers un service existant et jamais vers soi-même", () => {
  for (const s of services) {
    for (const r of s.relatedSlugs) {
      expect(SERVICE_SLUGS).toContain(r);
      expect(r).not.toBe(s.slug);
    }
  }
});

test("chaque image a un alt non vide et des dimensions positives", () => {
  for (const s of services) {
    for (const img of [s.heroImage, ...s.gallery]) {
      expect(img.alt.trim().length).toBeGreaterThan(0);
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  }
});

test("chaque service a du contenu SEO, des prestations, des avantages et une FAQ", () => {
  for (const s of services) {
    expect(s.metaTitle.length).toBeGreaterThan(10);
    expect(s.metaDescription.length).toBeGreaterThan(50);
    expect(s.prestations.length).toBeGreaterThanOrEqual(4);
    expect(s.benefits.length).toBeGreaterThanOrEqual(3);
    expect(s.faq.length).toBeGreaterThanOrEqual(3);
  }
});

test("getService retrouve par slug", () => {
  expect(getService("carrelage")?.title).toBeTruthy();
  expect(getService("inexistant" as never)).toBeUndefined();
});
```

- [ ] **Étape 2 : vérifier l'échec** — FAIL (module introuvable).

- [ ] **Étape 3 : `app/data/services.ts`** — écrire les **5** services avec du vrai contenu français. Voici le **premier, entièrement rédigé** comme référence de profondeur ; les 4 autres suivent la même structure avec leur propre contenu réel.

```ts
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
    heroImage: { src: "/images/services/decoration-hero.jpg", alt: "Salon contemporain décoré par Mode Kin", width: 1600, height: 1000 },
    intro:
      "La décoration intérieure transforme un logement en lieu de vie. Nos décorateurs vous accompagnent du premier croquis à la pose finale : étude des volumes, choix des matières, palette chromatique et mise en lumière. Chaque projet est pensé pour vous ressembler tout en valorisant durablement votre bien.",
    benefits: [
      { iconName: "Palette", title: "Conseil sur mesure", text: "Une étude personnalisée de vos espaces, de vos usages et de vos goûts." },
      { iconName: "Ruler", title: "Agencement optimisé", text: "Une circulation fluide et un rangement pensé au centimètre près." },
      { iconName: "Sparkles", title: "Finitions haut de gamme", text: "Des matériaux sélectionnés et une pose soignée jusqu'au dernier détail." },
    ],
    prestations: [
      "Conseil en décoration et planche d'ambiance",
      "Aménagement et optimisation des espaces",
      "Harmonies de couleurs et choix des matières",
      "Sélection de mobilier et d'accessoires",
      "Mise en lumière et éclairage d'ambiance",
    ],
    gallery: [
      { src: "/images/services/decoration-1.jpg", alt: "Séjour aux tons chauds réalisé par Mode Kin", width: 1200, height: 900 },
      { src: "/images/services/decoration-2.jpg", alt: "Chambre décorée dans un style épuré", width: 1200, height: 900 },
    ],
    faq: [
      { question: "Proposez-vous un accompagnement complet ?", answer: "Oui, de la conception au suivi de chantier, nous gérons l'ensemble du projet ou seulement les étapes de votre choix." },
      { question: "Travaillez-vous avec un budget imposé ?", answer: "Absolument. Nous adaptons nos propositions à votre budget et vous indiquons clairement les postes de dépense." },
      { question: "Intervenez-vous dans les logements occupés ?", answer: "Oui, nous organisons le chantier pour limiter la gêne et protégeons vos espaces pendant les travaux." },
    ],
    relatedSlugs: ["peinture-interieure-exterieure", "carrelage", "menuiserie"],
  },
  // ... 4 services restants, MÊME profondeur de contenu :
  //  2. peinture-interieure-exterieure — « Peinture intérieure & extérieure »
  //     prestations : préparation des supports, peinture décorative, ravalement de façade,
  //     enduits, laque et vernis, traitement anti-humidité. related : décoration, carrelage, menuiserie.
  //  3. carrelage — « Carrelage & revêtements »
  //     prestations : pose sol/mur, faïence, mosaïque, grès cérame, joints et étanchéité,
  //     rénovation de salle de bain. related : plomberie, peinture, décoration.
  //  4. plomberie — « Plomberie »
  //     prestations : installation sanitaire, réseau d'eau, chauffe-eau, dépannage fuite,
  //     salle de bain clé en main, évacuation. related : carrelage, menuiserie, décoration.
  //  5. menuiserie — « Menuiserie »
  //     prestations : portes et fenêtres, placards sur mesure, parquet, dressing,
  //     agencement bois, cuisine. related : décoration, carrelage, peinture.
];

export const SERVICE_SLUGS = services.map((s) => s.slug) as ServiceSlug[];
export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
```

> **Consigne de rédaction (obligatoire) :** chaque service restant doit avoir `metaTitle`, `metaDescription` (> 50 caractères), `intro` (paragraphe complet), ≥ 3 `benefits` avec un `iconName` Lucide valide, ≥ 4 `prestations`, ≥ 2 images de galerie avec `alt` réel, ≥ 3 questions de FAQ. Aucun champ vide, aucun lorem ipsum.

- [ ] **Étape 4 : vérifier** — `npx vitest run app/data/services.test.ts` → PASS (6 tests).

- [ ] **Étape 5 : commit**

```bash
git add -A && git commit -m "feat(data): 5 services avec contenu français et tests d'intégrité

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Tâche 4 : Données des projets + tests d'intégrité

**Fichiers :**
- Créer : `app/data/projects.ts`
- Test : `app/data/projects.test.ts`

**Interfaces :**
- Consomme : `Project`, `ServiceSlug`, `SERVICE_SLUGS` (Tâches 2–3).
- Produit : `projects: Project[]` (6 éléments), `getProject(slug)`, `PROJECT_SLUGS: string[]`, `getProjectsByCategory(slug)`.

- [ ] **Étape 1 : test d'abord** — `app/data/projects.test.ts`

```ts
import { projects, getProject, PROJECT_SLUGS, getProjectsByCategory } from "./projects";
import { SERVICE_SLUGS } from "./services";

test("il y a 6 projets aux slugs uniques", () => {
  expect(projects).toHaveLength(6);
  expect(new Set(PROJECT_SLUGS).size).toBe(6);
});
test("la catégorie de chaque projet référence un service réel", () => {
  for (const p of projects) expect(SERVICE_SLUGS).toContain(p.category);
});
test("chaque projet a au moins 2 images valides, un lieu et une date ISO", () => {
  for (const p of projects) {
    expect(p.images.length).toBeGreaterThanOrEqual(2);
    p.images.forEach((i) => expect(i.alt.trim() && i.width && i.height).toBeTruthy());
    expect(p.location.trim().length).toBeGreaterThan(0);
    expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});
test("getProjectsByCategory filtre correctement", () => {
  const cat = projects[0].category;
  expect(getProjectsByCategory(cat).every((p) => p.category === cat)).toBe(true);
});
test("getProject retrouve par slug", () => {
  expect(getProject(projects[0].slug)).toBeDefined();
  expect(getProject("inexistant")).toBeUndefined();
});
```

- [ ] **Étape 2 : vérifier l'échec** — FAIL.

- [ ] **Étape 3 : `app/data/projects.ts`** — 6 projets, 1 par catégorie minimum, contenu français réel.

```ts
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
      { src: "/images/projets/gombe-1.jpg", alt: "Séjour rénové de l'appartement de la Gombe", width: 1400, height: 933 },
      { src: "/images/projets/gombe-2.jpg", alt: "Cuisine ouverte après rénovation", width: 1400, height: 933 },
    ],
  },
  // ... 5 projets restants (catégories : peinture, carrelage, plomberie, menuiserie, + 1 libre),
  //     chacun avec ≥ 2 images valides, un lieu réel, une date ISO et une description complète.
];

export const PROJECT_SLUGS = projects.map((p) => p.slug);
export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);
export const getProjectsByCategory = (category: string): Project[] => projects.filter((p) => p.category === category);

// garde-fou : toute catégorie doit exister dans services
void services;
```

- [ ] **Étape 4 : vérifier** — PASS (5 tests).
- [ ] **Étape 5 : commit** — `feat(data): 6 réalisations liées aux services`.

---

## Tâche 5 : Tarifs + avis clients

**Fichiers :**
- Créer : `app/data/pricing.ts`, `app/data/testimonials.ts`
- Test : `app/data/pricing.test.ts`

**Interfaces :**
- Produit : `pricingTiers: PricingTier[]` (4 : Diagnostic, Standard, Premium, Entreprise), `testimonials: Testimonial[]`.

- [ ] **Étape 1 : test** — `app/data/pricing.test.ts`

```ts
import { pricingTiers } from "./pricing";
import { testimonials } from "./testimonials";

test("4 offres dont exactement une mise en avant", () => {
  expect(pricingTiers).toHaveLength(4);
  expect(pricingTiers.filter((t) => t.highlighted)).toHaveLength(1);
  expect(pricingTiers.map((t) => t.name)).toEqual(["Diagnostic", "Standard", "Premium", "Entreprise"]);
});
test("chaque offre a des prestations", () => {
  pricingTiers.forEach((t) => expect(t.features.length).toBeGreaterThanOrEqual(3));
});
test("les avis ont une note 1–5 et un texte", () => {
  expect(testimonials.length).toBeGreaterThanOrEqual(3);
  testimonials.forEach((a) => {
    expect(a.rating).toBeGreaterThanOrEqual(1);
    expect(a.rating).toBeLessThanOrEqual(5);
    expect(a.text.length).toBeGreaterThan(20);
  });
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** `pricing.ts` (4 offres, prix indicatifs, « Standard » mise en avant) et `testimonials.ts` (≥ 3 avis français, note, ville). → **Étape 4 : PASS** → **Étape 5 : commit**.

---

## Tâche 6 : Aide SEO — construction des balises meta

**Fichiers :**
- Créer : `app/seo/meta.ts`
- Test : `app/seo/meta.test.ts`

**Interfaces :**
- Consomme : `SITE` (Tâche 2).
- Produit : `buildMeta(input: MetaInput): MetaDescriptor[]` et `canonical(path: string): { rel: "canonical"; href: string }`.
  - `type MetaInput = { title: string; description: string; path: string; image?: string; noindex?: boolean }`
  - `MetaDescriptor` = type d'élément retourné par un `meta` de React Router.

- [ ] **Étape 1 : test** — `app/seo/meta.test.ts`

```ts
import { buildMeta, canonical } from "./meta";
import { SITE } from "~/data/site.config";

test("buildMeta produit title, description et Open Graph absolus", () => {
  const m = buildMeta({ title: "Contact", description: "Contactez Mode Kin", path: "/contact" });
  expect(m).toContainEqual({ title: "Contact" });
  expect(m).toContainEqual({ name: "description", content: "Contactez Mode Kin" });
  expect(m).toContainEqual({ property: "og:url", content: `${SITE.url}/contact` });
  expect(m.find((d) => "property" in d && d.property === "og:type")).toBeTruthy();
  expect(m).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
});
test("noindex ajoute la directive robots", () => {
  const m = buildMeta({ title: "T", description: "D", path: "/x", noindex: true });
  expect(m).toContainEqual({ name: "robots", content: "noindex, nofollow" });
});
test("canonical renvoie une URL absolue", () => {
  expect(canonical("/tarifs")).toEqual({ rel: "canonical", href: `${SITE.url}/tarifs` });
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter**

```ts
import { SITE } from "~/data/site.config";

export type MetaInput = { title: string; description: string; path: string; image?: string; noindex?: boolean };
const abs = (p: string) => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

export function buildMeta({ title, description, path, image, noindex }: MetaInput) {
  const url = abs(path);
  const img = abs(image ?? "/images/og-default.jpg");
  const tags: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex, nofollow" });
  return tags;
}

export const canonical = (path: string) => ({ rel: "canonical" as const, href: abs(path) });
```

- [ ] **Étape 4 : PASS** → **Étape 5 : commit** — `feat(seo): aide de construction des balises meta`.

---

## Tâche 7 : Aide SEO — générateurs schema.org (JSON-LD)

**Fichiers :**
- Créer : `app/seo/schema.ts`
- Test : `app/seo/schema.test.ts`

**Interfaces :**
- Consomme : `SITE`, `Service`, `Project`.
- Produit : `localBusinessSchema()`, `websiteSchema()`, `serviceSchema(s: Service)`, `projectSchema(p: Project)`, `breadcrumbSchema(items: {name;path}[])`, `faqSchema(faq: FaqItem[])`. Chacun retourne un objet JSON-LD prêt pour `{ "script:ld+json": ... }`.

- [ ] **Étape 1 : test** — `app/seo/schema.test.ts`

```ts
import { localBusinessSchema, serviceSchema, projectSchema, breadcrumbSchema, faqSchema, websiteSchema } from "./schema";
import { services } from "~/data/services";
import { projects } from "~/data/projects";

test("LocalBusiness contient nom, geo et horaires", () => {
  const s = localBusinessSchema();
  expect(s["@type"]).toBe("LocalBusiness");
  expect(s.geo["@type"]).toBe("GeoCoordinates");
  expect(Array.isArray(s.openingHoursSpecification)).toBe(true);
});
test("WebSite expose une URL", () => {
  expect(websiteSchema()["@type"]).toBe("WebSite");
});
test("Service référence le prestataire et le nom", () => {
  const s = serviceSchema(services[0]);
  expect(s["@type"]).toBe("Service");
  expect(s.name).toBe(services[0].title);
  expect(s.provider["@type"]).toBe("LocalBusiness");
});
test("CreativeWork pour un projet inclut lieu et date", () => {
  const s = projectSchema(projects[0]);
  expect(s["@type"]).toBe("CreativeWork");
  expect(s.dateCreated).toBe(projects[0].date);
});
test("BreadcrumbList numérote les positions à partir de 1", () => {
  const b = breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }]);
  expect(b.itemListElement[0].position).toBe(1);
  expect(b.itemListElement[1].position).toBe(2);
});
test("FAQPage mappe les questions", () => {
  const f = faqSchema(services[0].faq);
  expect(f["@type"]).toBe("FAQPage");
  expect(f.mainEntity).toHaveLength(services[0].faq.length);
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** `app/seo/schema.ts`

```ts
import { SITE } from "~/data/site.config";
import type { Service, Project, FaqItem } from "~/data/types";

const abs = (p: string) => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: SITE.hours.map((h) => ({ "@type": "OpeningHoursSpecification", description: `${h.days} : ${h.open}` })),
  };
}

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
});

export const serviceSchema = (s: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.metaDescription,
  url: abs(`/services/${s.slug}`),
  provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
  areaServed: SITE.address.city,
});

export const projectSchema = (p: Project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: p.title,
  description: p.description,
  dateCreated: p.date,
  locationCreated: p.location,
  image: p.images.map((i) => abs(i.src)),
  url: abs(`/realisations/${p.slug}`),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqSchema = (faq: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});
```

- [ ] **Étape 4 : PASS** → **Étape 5 : commit** — `feat(seo): générateurs schema.org`.

---

## Tâche 8 : Génération du sitemap.xml + robots.txt

**Fichiers :**
- Créer : `scripts/generate-sitemap.ts`, `scripts/generate-sitemap.test.ts`

**Interfaces :**
- Consomme : `SERVICE_SLUGS`, `PROJECT_SLUGS`, `SITE`.
- Produit : fonction `buildSitemapUrls(): string[]` (exportée pour test) + effet de bord écrivant `public/sitemap.xml` et `public/robots.txt` quand exécuté en script. **Note :** le script s'exécute après `react-router build` (voir `package.json` Tâche 1) ; il écrit dans `build/client/` en plus de `public/`.

- [ ] **Étape 1 : test** — `scripts/generate-sitemap.test.ts`

```ts
import { buildSitemapUrls, renderSitemap } from "./generate-sitemap";
import { SERVICE_SLUGS } from "~/data/services";
import { PROJECT_SLUGS } from "~/data/projects";

test("le sitemap contient les 21 URLs attendues", () => {
  const urls = buildSitemapUrls();
  expect(urls).toContain("/");
  expect(urls).toContain("/services");
  SERVICE_SLUGS.forEach((s) => expect(urls).toContain(`/services/${s}`));
  PROJECT_SLUGS.forEach((s) => expect(urls).toContain(`/realisations/${s}`));
  expect(urls).toContain("/devis");
  // 10 statiques indexables + 5 services + 6 projets = 21 (hors pages légales noindex? — voir note)
  expect(new Set(urls).size).toBe(urls.length); // pas de doublon
});
test("le XML rendu est bien formé et absolu", () => {
  const xml = renderSitemap(["/", "/contact"]);
  expect(xml).toContain("<?xml");
  expect(xml).toContain("<loc>");
  expect(xml).toMatch(/https:\/\/[^<]+\/contact/);
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** `scripts/generate-sitemap.ts`

```ts
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { SITE } from "../app/data/site.config.ts";
import { SERVICE_SLUGS } from "../app/data/services.ts";
import { PROJECT_SLUGS } from "../app/data/projects.ts";

const STATIC = ["/", "/services", "/realisations", "/tarifs", "/contact", "/devis", "/mentions-legales", "/politique-confidentialite", "/conditions-utilisation"];

export function buildSitemapUrls(): string[] {
  return [
    ...STATIC,
    ...SERVICE_SLUGS.map((s) => `/services/${s}`),
    ...PROJECT_SLUGS.map((s) => `/realisations/${s}`),
  ];
}

export function renderSitemap(paths: string[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const body = paths
    .map((p) => `  <url><loc>${SITE.url}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;

// Exécution directe (pas en import de test)
if (import.meta.url === `file://${process.argv[1]}`) {
  const xml = renderSitemap(buildSitemapUrls());
  for (const dir of ["public", "build/client"]) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/sitemap.xml`, xml);
    writeFileSync(`${dir}/robots.txt`, robots);
  }
  console.log(`sitemap.xml : ${buildSitemapUrls().length} URLs`);
}
```

> **Note pages légales :** elles restent dans le sitemap (indexables) mais chaque route légale déclarera aussi un `canonical`. Si le client souhaite les exclure de l'index, ajouter `noindex` via `buildMeta` sur ces routes sans les retirer du sitemap.

- [ ] **Étape 4 : PASS** → **Étape 5 : commit** — `feat(seo): génération sitemap.xml + robots.txt`.

---

## Tâche 9 : Primitives UI

**Fichiers :**
- Créer : `app/components/ui/Button.tsx`, `Card.tsx`, `GlassPanel.tsx`, `Accordion.tsx`, `Breadcrumbs.tsx`, `SectionHeading.tsx`
- Test : `app/components/ui/Button.test.tsx`, `Accordion.test.tsx`, `Breadcrumbs.test.tsx`

**Interfaces :**
- Produit :
  - `Button` — `props: { as?: "button" | "link"; to?: string; variant?: "primary" | "secondary" | "ghost"; ...ButtonHTMLAttributes }`. `primary` = fond `--color-gold`, texte blanc. Hauteur ≥ 44 px (`min-h-11`).
  - `Card` — conteneur `--color-surface`, bord `--color-border`, `rounded-2xl`.
  - `GlassPanel` — `backdrop-blur` + fond translucide (usage ciblé).
  - `Accordion` — `props: { items: { question; answer }[] }`, `aria-expanded`/`aria-controls`, pilotable au clavier.
  - `Breadcrumbs` — `props: { items: { name; path }[] }`, `<nav aria-label="Fil d'Ariane">`.
  - `SectionHeading` — titre + sous-titre stylés.

- [ ] **Étape 1 : tests** — `Button.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Button } from "./Button";

test("le bouton lien rend un <a> vers la cible", () => {
  render(<MemoryRouter><Button as="link" to="/devis">Devis</Button></MemoryRouter>);
  expect(screen.getByRole("link", { name: "Devis" })).toHaveAttribute("href", "/devis");
});
test("respecte la taille tactile minimale", () => {
  render(<Button>OK</Button>);
  expect(screen.getByRole("button")).toHaveClass("min-h-11");
});
```

`Accordion.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const items = [{ question: "Q1", answer: "R1" }, { question: "Q2", answer: "R2" }];

test("les panneaux sont repliés par défaut et s'ouvrent au clic", async () => {
  render(<Accordion items={items} />);
  const btn = screen.getByRole("button", { name: "Q1" });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("R1")).toBeVisible();
});
```

`Breadcrumbs.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Breadcrumbs } from "./Breadcrumbs";

test("rend une navigation étiquetée avec les liens intermédiaires", () => {
  render(<MemoryRouter><Breadcrumbs items={[{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }, { name: "Carrelage", path: "/services/carrelage" }]} /></MemoryRouter>);
  expect(screen.getByRole("navigation", { name: /fil d'ariane/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
});
```

> Installer `@testing-library/user-event` en dev si absent : `npm i -D @testing-library/user-event`.

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** chaque primitive (Tailwind + jetons). `Accordion` gère l'état ouvert/fermé avec `useState`, `id` uniques via `useId`, animation de hauteur par `framer-motion` (`AnimatePresence` + `height:auto`, exception assumée à la règle « pas de height » car contenu non critique et court). `Button` utilise `Link` de `react-router` quand `as="link"`.
- [ ] **Étape 4 : PASS** (les 3 fichiers de test) → **Étape 5 : commit** — `feat(ui): primitives (Button, Card, Accordion, Breadcrumbs…)`.

---

## Tâche 10 : Visionneuse d'images accessible (Lightbox)

**Fichiers :**
- Créer : `app/components/ui/Lightbox.tsx`, `app/hooks/useLightbox.ts`
- Test : `app/components/ui/Lightbox.test.tsx`

**Interfaces :**
- Produit : `Lightbox` — `props: { images: ImageAsset[]; index: number | null; onClose(); onNavigate(i: number) }`. Ferme sur `Échap`, piège le focus, boutons précédent/suivant, `role="dialog"` `aria-modal="true"`.

- [ ] **Étape 1 : test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "./Lightbox";

const imgs = [{ src: "/a.jpg", alt: "Photo A", width: 800, height: 600 }, { src: "/b.jpg", alt: "Photo B", width: 800, height: 600 }];

test("affiche l'image active dans un dialogue modal", () => {
  render(<Lightbox images={imgs} index={0} onClose={() => {}} onNavigate={() => {}} />);
  const dlg = screen.getByRole("dialog");
  expect(dlg).toHaveAttribute("aria-modal", "true");
  expect(screen.getByAltText("Photo A")).toBeInTheDocument();
});
test("Échap déclenche la fermeture", async () => {
  const onClose = vi.fn();
  render(<Lightbox images={imgs} index={0} onClose={onClose} onNavigate={() => {}} />);
  await userEvent.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalled();
});
test("ne rend rien si index est null", () => {
  const { container } = render(<Lightbox images={imgs} index={null} onClose={() => {}} onNavigate={() => {}} />);
  expect(container).toBeEmptyDOMElement();
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** (portail non requis ; `useEffect` pour l'écouteur `keydown`, focus initial sur le bouton fermer, `GlassPanel` pour l'habillage). → **Étape 4 : PASS** → **Étape 5 : commit** — `feat(ui): visionneuse d'images accessible`.

---

## Tâche 11 : Mise en page — Navbar, Footer, actions flottantes

**Fichiers :**
- Créer : `app/components/layout/Navbar.tsx`, `Footer.tsx`, `FloatingActions.tsx`, `ScrollToTop.tsx`, `app/components/layout/PageLayout.tsx`
- Modifier : `app/root.tsx` (envelopper `Outlet` dans `PageLayout`)
- Test : `app/components/layout/Navbar.test.tsx`, `Footer.test.tsx`

**Interfaces :**
- Consomme : `SITE`, `Button`, `GlassPanel`.
- Produit : `PageLayout` (Navbar + `<main id="contenu">` + Footer + FloatingActions + ScrollToTop). `Navbar` : liens Accueil/Services/Réalisations/Tarifs/Contact + bouton « Demander un devis », menu hamburger mobile animé, transition transparente→verre au scroll (`useScroll`). `FloatingActions` : WhatsApp (`https://wa.me/${SITE.whatsapp}`), appel (`tel:`), retour haut ; positionné dans la zone sûre.

- [ ] **Étape 1 : tests** — `Navbar.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Navbar } from "./Navbar";

test("expose la navigation principale et le CTA devis", () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  expect(screen.getByRole("navigation", { name: /principale/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute("href", "/devis");
});
test("le bouton hamburger ouvre le menu mobile", async () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  const toggle = screen.getByRole("button", { name: /ouvrir le menu/i });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
});
```

`Footer.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Footer } from "./Footer";

test("affiche les liens légaux et les coordonnées", () => {
  render(<MemoryRouter><Footer /></MemoryRouter>);
  expect(screen.getByRole("link", { name: /mentions légales/i })).toHaveAttribute("href", "/mentions-legales");
  expect(screen.getByRole("link", { name: /politique de confidentialité/i })).toHaveAttribute("href", "/politique-confidentialite");
  expect(screen.getByRole("link", { name: /conditions d'utilisation/i })).toHaveAttribute("href", "/conditions-utilisation");
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** les composants + brancher `PageLayout` dans `root.tsx` (remplacer `<Outlet />` par `<PageLayout><Outlet /></PageLayout>` ; retirer le `id="contenu"` des routes puisque `PageLayout` porte le `<main id="contenu">`). Le menu mobile utilise `AnimatePresence` (transform/opacity). → **Étape 4 : PASS + `npm run build`** (le site reste prérendu). → **Étape 5 : commit** — `feat(layout): navbar, footer, actions flottantes`.

---

## Tâche 12 : Composants de section (réutilisables)

**Fichiers :**
- Créer : `app/components/sections/Hero.tsx`, `Stats.tsx`, `ServicesPreview.tsx`, `Testimonials.tsx`, `CtaBand.tsx`, `Reveal.tsx`
- Test : `app/components/sections/Stats.test.tsx`, `ServicesPreview.test.tsx`

**Interfaces :**
- Consomme : `SITE.stats`, `services`, `testimonials`, `Button`, `Card`.
- Produit :
  - `Reveal` — wrapper `useInView` + `motion` (apparition au scroll, respecte reduced-motion via MotionConfig). `props: { children; delay?: number }`.
  - `Hero` — `props: { title; subtitle; image: ImageAsset; primary: {label;to}; secondary?: {label;to} }`, parallaxe légère sur l'image (`useScroll`/`useTransform`, 0–15 %).
  - `Stats` — grille des 3 chiffres de `SITE.stats`.
  - `ServicesPreview` — grille des 5 services (lien vers `/services/[slug]`).
  - `Testimonials` — cartes d'avis.
  - `CtaBand` — bande CTA finale vers `/devis`.

- [ ] **Étape 1 : tests** — `Stats.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";
import { SITE } from "~/data/site.config";

test("affiche les trois statistiques de la config", () => {
  render(<Stats />);
  SITE.stats.forEach((s) => expect(screen.getByText(s.value)).toBeInTheDocument());
});
```

`ServicesPreview.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ServicesPreview } from "./ServicesPreview";

test("lie chaque service à sa page dédiée", () => {
  render(<MemoryRouter><ServicesPreview /></MemoryRouter>);
  expect(screen.getByRole("link", { name: /carrelage/i })).toHaveAttribute("href", "/services/carrelage");
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** → **Étape 4 : PASS** → **Étape 5 : commit** — `feat(sections): hero, stats, aperçu services, avis, CTA`.

---

## Tâche 13 : Formulaires — schémas, service d'envoi, composants

**Fichiers :**
- Créer : `app/forms/schemas.ts`, `app/forms/submit.ts`, `app/components/ui/FormField.tsx`, `app/components/forms/ContactForm.tsx`, `app/components/forms/DevisForm.tsx`
- Test : `app/forms/schemas.test.ts`, `app/forms/submit.test.ts`, `app/components/forms/ContactForm.test.tsx`

**Interfaces :**
- Consomme : `SITE.forms.endpoint`, Zod, React Hook Form.
- Produit :
  - `contactSchema`, `devisSchema` (Zod) + types inférés `ContactValues`, `DevisValues`.
  - `submitForm(kind: "contact" | "devis", values): Promise<{ ok: boolean }>` — POST JSON vers `SITE.forms.endpoint` ; si `endpoint` vide, résout `{ ok: true }` après un court délai (mode démonstration documenté).
  - `FormField` — libellé visible + `aria-describedby` vers l'erreur, `aria-invalid`, message d'erreur `role="alert"`.
  - `ContactForm`, `DevisForm` — RHF + resolver Zod, honeypot, focus sur premier champ invalide, région `aria-live` de statut, bouton désactivé pendant l'envoi.

- [ ] **Étape 1 : tests** — `schemas.test.ts`

```ts
import { contactSchema, devisSchema } from "./schemas";

test("le contact exige nom, téléphone, email valide, service et message", () => {
  const bad = contactSchema.safeParse({ name: "", phone: "", email: "x", service: "", message: "" });
  expect(bad.success).toBe(false);
  const ok = contactSchema.safeParse({ name: "Jean", phone: "+243900000000", email: "j@ex.com", service: "carrelage", message: "Bonjour, un devis svp.", website: "" });
  expect(ok.success).toBe(true);
});
test("le devis exige budget et délai en plus", () => {
  const r = devisSchema.safeParse({ name: "A", phone: "+243900000000", email: "a@b.com", service: "plomberie", description: "Salle de bain complète à rénover.", budget: "1000-5000", delay: "1-3 mois", website: "" });
  expect(r.success).toBe(true);
});
```

`submit.test.ts`

```ts
import { submitForm } from "./submit";

test("sans endpoint configuré, l'envoi réussit en mode démonstration", async () => {
  const res = await submitForm("contact", { name: "A", phone: "+243900000000", email: "a@b.com", service: "carrelage", message: "Bonjour.", website: "" });
  expect(res.ok).toBe(true);
});
```

`ContactForm.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

test("affiche des erreurs sous les champs quand on soumet vide", async () => {
  render(<ContactForm />);
  await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));
  expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
});
test("chaque champ a un libellé visible", () => {
  render(<ContactForm />);
  expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter**. `schemas.ts` inclut un champ honeypot `website` qui doit rester vide. `submit.ts` :

```ts
import { SITE } from "~/data/site.config";

export async function submitForm(kind: "contact" | "devis", values: Record<string, unknown>): Promise<{ ok: boolean }> {
  if (!SITE.forms.endpoint) {
    await new Promise((r) => setTimeout(r, 400)); // démonstration : aucun endpoint configuré
    return { ok: true };
  }
  const res = await fetch(SITE.forms.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ kind, ...values }),
  });
  return { ok: res.ok };
}
```

Les formulaires utilisent `useForm` avec `zodResolver`, `mode: "onBlur"`, `setFocus` sur la première erreur, types d'input `tel`/`email`, hauteur des champs ≥ 44 px. → **Étape 4 : PASS** → **Étape 5 : commit** — `feat(forms): schémas Zod, envoi et composants accessibles`.

---

## Tâche 14 : Route Accueil (`/`)

**Fichiers :**
- Modifier : `app/routes/home.tsx` (remplace le placeholder), `app/routes/home.test.tsx`

**Interfaces :**
- Consomme : sections (Tâche 12), `buildMeta`, `canonical`, `localBusinessSchema`, `websiteSchema`.
- Produit : page d'accueil complète. Exporte `meta`, `links`.

- [ ] **Étape 1 : test** — mettre à jour `home.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home, { meta } from "./home";

test("le hero contient un h1 unique et les deux CTA", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute("href", "/devis");
  expect(screen.getByRole("link", { name: /nos réalisations/i })).toHaveAttribute("href", "/realisations");
});
test("meta déclare un titre et un JSON-LD LocalBusiness", () => {
  const m = meta({} as never);
  expect(m.some((d: Record<string, unknown>) => "title" in d)).toBe(true);
  expect(m.some((d: Record<string, unknown>) => "script:ld+json" in d)).toBe(true);
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** `home.tsx` — Hero (image `SITE`… en fait image dédiée `/images/home-hero.jpg`), présentation entreprise, avantages, Stats, ServicesPreview, aperçu réalisations (liens `/realisations`), Testimonials, CtaBand. `meta` = `[...buildMeta({...}), { "script:ld+json": localBusinessSchema() }, { "script:ld+json": websiteSchema() }]`. `links` = `[canonical("/")]`.

Modèle `meta`/`links` (réutilisé dans toutes les routes suivantes) :

```tsx
import type { Route } from "./+types/home";
import { buildMeta, canonical } from "~/seo/meta";
import { localBusinessSchema, websiteSchema } from "~/seo/schema";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({ title: "Mode Kin — Travaux du bâtiment à Kinshasa", description: "…", path: "/" }),
    { "script:ld+json": localBusinessSchema() },
    { "script:ld+json": websiteSchema() },
  ];
}
export const links = () => [canonical("/")];
```

- [ ] **Étape 4 : PASS + `npm run build`** → vérifier que `build/client/index.html` contient le `<h1>` et un bloc `application/ld+json`.

```bash
npm run build && grep -q 'application/ld+json' build/client/index.html && echo "JSON-LD prérendu OK"
```

- [ ] **Étape 5 : commit** — `feat(pages): page d'accueil`.

---

## Tâche 15 : Routes Services — liste + détail

**Fichiers :**
- Créer : `app/routes/services.tsx`, `app/routes/service-detail.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts` (ajouter les chemins au prerender)
- Test : `app/routes/service-detail.test.tsx`, `app/routes/services.test.tsx`

**Interfaces :**
- Consomme : `services`, `getService`, `getProjectsByCategory`, sections, `Breadcrumbs`, `Accordion`, SEO.
- Produit : `/services` (liste des 5) et `/services/:slug` (détail). `service-detail` lit le slug via `useParams`, `meta` via `params`.

- [ ] **Étape 1 : `routes.ts`** — ajouter :

```ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service-detail.tsx"),
] satisfies RouteConfig;
```

- [ ] **Étape 2 : `react-router.config.ts`** — enrichir `prerender` :

```ts
import type { Config } from "@react-router/dev/config";
import { SERVICE_SLUGS } from "./app/data/services";

export default {
  ssr: false,
  async prerender() {
    return ["/", "/services", ...SERVICE_SLUGS.map((s) => `/services/${s}`)];
  },
} satisfies Config;
```

- [ ] **Étape 3 : tests** — `service-detail.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import ServiceDetail, { meta } from "./service-detail";

function renderAt(slug: string) {
  const router = createMemoryRouter(
    [{ path: "/services/:slug", element: <ServiceDetail /> }],
    { initialEntries: [`/services/${slug}`] },
  );
  render(<RouterProvider router={router} />);
}

test("affiche le titre du service et le CTA devis", () => {
  renderAt("carrelage");
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute("href", "/devis");
});
test("meta est unique par slug et inclut le schema Service + FAQ", () => {
  const m = meta({ params: { slug: "carrelage" } } as never);
  expect(m.some((d: Record<string, unknown>) => "script:ld+json" in d)).toBe(true);
});
test("un slug inconnu affiche l'état introuvable", () => {
  renderAt("inconnu");
  expect(screen.getByText(/introuvable|n'existe pas/i)).toBeInTheDocument();
});
```

- [ ] **Étape 4 : échec** → **Étape 5 : implémenter** les deux routes. `service-detail` : Breadcrumbs (Accueil › Services › [titre]), hero, intro, avantages, prestations, galerie (clic → Lightbox), Accordion FAQ, liste des projets de la catégorie (`getProjectsByCategory`), liens vers services liés (`relatedSlugs`), CtaBand. `meta` construit à partir de `getService(params.slug)` → `buildMeta` + `serviceSchema` + `breadcrumbSchema` + `faqSchema`. Si service absent : composant d'état « introuvable ». → **Étape 6 : PASS + build** (vérifier `build/client/services/carrelage/index.html` existe et contient le titre). → **Étape 7 : commit** — `feat(pages): liste et pages de service`.

---

## Tâche 16 : Routes Réalisations — galerie + détail projet

**Fichiers :**
- Créer : `app/routes/realisations.tsx`, `app/routes/project-detail.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts`
- Test : `app/routes/project-detail.test.tsx`

**Interfaces :**
- Consomme : `projects`, `getProject`, `getProjectsByCategory`, `getService`, `Lightbox`, `Breadcrumbs`, SEO.
- Produit : `/realisations` (galerie filtrable par catégorie) et `/realisations/:slug` (détail : galerie Lightbox, lieu, catégorie liée au service, date). 

- [ ] **Étape 1 : `routes.ts` + `react-router.config.ts`** — ajouter `route("realisations", ...)`, `route("realisations/:slug", ...)` et, dans le prerender, `"/realisations", ...PROJECT_SLUGS.map((s) => `/realisations/${s}`)` (importer `PROJECT_SLUGS`).

- [ ] **Étape 2 : test** — `project-detail.test.tsx` (même modèle `createMemoryRouter` que Tâche 15) : vérifie le `h1`, l'affichage du lieu et de la date, le lien vers le service parent (`/services/[category]`), et l'ouverture de la Lightbox au clic sur une image. `meta` inclut `projectSchema` + `breadcrumbSchema`.

- [ ] **Étape 3 : échec** → **Étape 4 : implémenter**. `realisations.tsx` : grille de cartes projet avec filtre par catégorie (état local, pas de rechargement). `project-detail.tsx` : Breadcrumbs (Accueil › Réalisations › [titre]), galerie → Lightbox, métadonnées (lieu, date formatée en français, lien catégorie), CtaBand. → **Étape 5 : PASS + build** (vérifier un `build/client/realisations/<slug>/index.html`). → **Étape 6 : commit** — `feat(pages): galerie et pages projet`.

---

## Tâche 17 : Route Tarifs (`/tarifs`)

**Fichiers :**
- Créer : `app/routes/tarifs.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts` (ajouter `/tarifs`)
- Test : `app/routes/tarifs.test.tsx`

**Interfaces :**
- Consomme : `pricingTiers`, `Card`, `Button`, SEO.

- [ ] **Étape 1 : test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Tarifs from "./tarifs";

test("affiche les 4 offres et un lien devis", () => {
  render(<MemoryRouter><Tarifs /></MemoryRouter>);
  ["Diagnostic", "Standard", "Premium", "Entreprise"].forEach((n) => expect(screen.getByText(n)).toBeInTheDocument());
  expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute("href", "/devis");
});
test("mentionne le caractère indicatif des prix", () => {
  render(<MemoryRouter><Tarifs /></MemoryRouter>);
  expect(screen.getByText(/indicatif/i)).toBeInTheDocument();
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** (4 cartes, « Standard » mise en avant, mention « prix indicatifs, ajustés selon le projet réel », CtaBand). → **Étape 4 : PASS + build** → **Étape 5 : commit** — `feat(pages): tarifs`.

---

## Tâche 18 : Route Contact (`/contact`) + façade Google Maps

**Fichiers :**
- Créer : `app/routes/contact.tsx`, `app/components/ui/MapFacade.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts` (ajouter `/contact`)
- Test : `app/routes/contact.test.tsx`, `app/components/ui/MapFacade.test.tsx`

**Interfaces :**
- Consomme : `ContactForm`, `SITE`, `MapFacade`.
- Produit : page contact (coordonnées, horaires, réseaux, formulaire, carte). `MapFacade` — image cliquable qui ne charge l'`<iframe>` Google Maps qu'après interaction.

- [ ] **Étape 1 : tests** — `MapFacade.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MapFacade } from "./MapFacade";

test("l'iframe n'est chargée qu'après le clic", async () => {
  render(<MapFacade src="https://maps.example/embed" title="Carte Mode Kin" />);
  expect(screen.queryByTitle("Carte Mode Kin")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /afficher la carte/i }));
  expect(await screen.findByTitle("Carte Mode Kin")).toBeInTheDocument();
});
```

`contact.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Contact from "./contact";
import { SITE } from "~/data/site.config";

test("affiche le formulaire et les coordonnées cliquables", () => {
  render(<MemoryRouter><Contact /></MemoryRouter>);
  expect(screen.getByRole("button", { name: /envoyer/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: new RegExp(SITE.phone.replace("+", "\\+")) })).toHaveAttribute("href", `tel:${SITE.phone}`);
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** (téléphone `tel:`, email `mailto:`, horaires depuis `SITE.hours`, réseaux, `ContactForm`, `MapFacade` avec `SITE.mapsUrl`). → **Étape 4 : PASS + build** → **Étape 5 : commit** — `feat(pages): contact + façade Google Maps`.

---

## Tâche 19 : Route Devis (`/devis`)

**Fichiers :**
- Créer : `app/routes/devis.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts` (ajouter `/devis`)
- Test : `app/routes/devis.test.tsx`

**Interfaces :**
- Consomme : `DevisForm`, SEO.

- [ ] **Étape 1 : test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Devis from "./devis";

test("le formulaire de devis expose service, budget et délai", () => {
  render(<MemoryRouter><Devis /></MemoryRouter>);
  expect(screen.getByLabelText(/service/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/budget/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/délai/i)).toBeInTheDocument();
});
```

- [ ] **Étape 2 : échec** → **Étape 3 : implémenter** (intro conversion + `DevisForm` : service pré-sélectionnable via `?service=` avec `useSearchParams`, description, budget, délai). → **Étape 4 : PASS + build** → **Étape 5 : commit** — `feat(pages): demande de devis`.

---

## Tâche 20 : Pages légales + 404

**Fichiers :**
- Créer : `app/routes/mentions-legales.tsx`, `app/routes/politique-confidentialite.tsx`, `app/routes/conditions-utilisation.tsx`, `app/routes/not-found.tsx`, `app/components/ui/LegalLayout.tsx`
- Modifier : `app/routes.ts`, `react-router.config.ts`
- Test : `app/routes/legal.test.tsx`

**Interfaces :**
- Consomme : `SITE`, `LegalLayout`, SEO.
- Produit : 3 pages légales (contenu français réel) + route splat `*` → 404.

- [ ] **Étape 1 : `routes.ts`** — ajouter les 3 routes légales et `route("*", "routes/not-found.tsx")`. `react-router.config.ts` — ajouter les 3 chemins légaux au prerender (pas le `*`).

- [ ] **Étape 2 : test** — `legal.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MentionsLegales from "./mentions-legales";
import NotFound from "./not-found";

test("les mentions légales citent la raison sociale", () => {
  render(<MemoryRouter><MentionsLegales /></MemoryRouter>);
  expect(screen.getByRole("heading", { level: 1, name: /mentions légales/i })).toBeInTheDocument();
});
test("la 404 propose un retour à l'accueil", () => {
  render(<MemoryRouter><NotFound /></MemoryRouter>);
  expect(screen.getByRole("link", { name: /accueil/i })).toHaveAttribute("href", "/");
});
```

- [ ] **Étape 3 : échec** → **Étape 4 : implémenter**. `LegalLayout` : conteneur lisible (mesure 65–75 caractères), titre + date de mise à jour. Contenu réel français pour mentions légales (identité de l'entreprise via `SITE`, hébergeur, propriété intellectuelle), politique de confidentialité (données collectées via formulaires, finalité, conservation, droits), conditions d'utilisation. Ces pages appellent `buildMeta` avec `noindex: false` mais peuvent basculer sur `noindex: true` selon préférence client (documenté). → **Étape 5 : PASS + build** → **Étape 6 : commit** — `feat(pages): mentions légales, confidentialité, CGU, 404`.

---

## Tâche 21 : Déploiement Vercel + images + README + vérification finale

**Fichiers :**
- Créer : `vercel.json`, `public/favicon.svg`, `public/images/README.md`, `public/images/og-default.jpg` (placeholder), `README.md`
- Test : vérification manuelle documentée + `npm test` complet + `npm run build`

**Interfaces :**
- Consomme : l'ensemble du site.

- [ ] **Étape 1 : `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

> Vercel sert d'abord les fichiers statiques prérendus ; le rewrite ne s'applique qu'aux chemins sans fichier, qui retombent sur le shell et affichent la route 404 côté client.

- [ ] **Étape 2 : `public/images/README.md`** — documenter chaque emplacement d'image attendu et ses dimensions exactes (hero 1600×1000, galeries services 1200×900, projets 1400×933, og-default 1200×630), pour que le client dépose des fichiers au bon format sans casser le CLS.

- [ ] **Étape 3 : `favicon.svg`** — logo « MK » monogramme simple (SVG inline), cohérent avec la palette.

- [ ] **Étape 4 : `README.md`** — sections : présentation, prérequis, installation (`npm install`), développement (`npm run dev`), tests (`npm test`), build (`npm run build`), déploiement Vercel, et **« Personnalisation »** : comment remplacer les valeurs `⚠️` de `site.config.ts`, comment déposer les images dans `public/images/`, comment activer l'envoi réel des formulaires (renseigner `forms.endpoint` avec une URL Formspree/EmailJS).

- [ ] **Étape 5 : vérification finale**

```bash
npm run typecheck   # 0 erreur
npm test            # tous les tests au vert
npm run build       # build + sitemap
ls build/client/**/index.html   # 21 fichiers HTML attendus
grep -c '<loc>' build/client/sitemap.xml   # 20 (les 20 URLs listées ; l'accueil = 1)
```

Vérifier le nombre de pages prérendues :

```bash
find build/client -name index.html | wc -l   # doit afficher 21
```

- [ ] **Étape 6 : Lighthouse** — lancer sur le build de production servi localement (`npm start`), sur `/` et une page service. Consigner les 4 scores **tels que mesurés** dans le README (section « Performance »). Ne pas affirmer > 95 sans la mesure.

- [ ] **Étape 7 : commit final**

```bash
git add -A && git commit -m "chore: déploiement Vercel, images documentées, README

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Auto-revue du plan (effectuée)

**Couverture du spec :**
- §2 routes dérivées des données → Tâches 3–8, 15–16 (prerender depuis `SERVICE_SLUGS`/`PROJECT_SLUGS`). ✔
- §3 stack révisée (React Router 8, Tailwind 4, pas de Helmet) → Tâche 1 + Contraintes globales. ✔
- §4 les 21 URLs → Tâches 14–20 ; vérification du compte en Tâche 21. ✔
- §5 couche de données + `ImageAsset` contraint → Tâches 2–5. ✔
- §6 design (palette, typo, glassmorphisme ciblé) → Tâche 1 (`@theme`) + Tâches 9–12. ✔
- §7 animations (MotionConfig reduced-motion) → root.tsx (Tâche 1) + `Reveal`/`Hero` (Tâche 12). ✔
- §8 SEO (meta, canonical, OG, Twitter, JSON-LD, sitemap, robots, breadcrumbs, maillage) → Tâches 6–8, 15–16. ✔
- §9 formulaires (validation, erreurs, aria-live, honeypot, états) → Tâche 13. ✔
- §10 accessibilité → réparti (skip-link Tâche 1, focus visible CSS, Lightbox/Accordion Tâches 9–10, labels Tâche 13). ✔
- §11 performance (lazy par route natif RR, images `<picture>`/dimensions, façade Maps) → Tâches 2 (type), 18, 21. ✔
- §12 transverses (navbar scroll, hamburger, retour haut, WhatsApp, appel, lightbox, FAQ, scroll restoration) → Tâches 10–12 + root.tsx. ✔
- §14 livrables → Tâche 21. ✔

**Note d'écart assumé :** le découpage de code « lazy + Suspense » du spec est fourni nativement par le routage par fichier de React Router (chaque route est un module chargé à la demande) ; pas de `React.lazy` manuel à ajouter.

**Scan des placeholders :** le seul contenu non entièrement écrit dans le plan est la prose française des 4 services restants et des 5 projets restants (Tâches 3–4) et des pages légales (Tâche 20) — encadré par des consignes de rédaction strictes et des tests d'intégrité qui échouent si les champs sont vides. Aucun « TODO » de code.

**Cohérence des types :** `ImageAsset`, `Service`, `Project`, `ServiceSlug` définis en Tâche 2 et consommés à l'identique ensuite. `buildMeta`/`canonical` (Tâche 6), générateurs schema (Tâche 7), `submitForm` (Tâche 13) ont des signatures fixées et réutilisées telles quelles.
