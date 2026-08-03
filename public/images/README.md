# Images du site Mode Kin

Ce dossier contient des **images d'emplacement** (placeholders). Remplacez-les
par les photos réelles de Mode Kin **en conservant exactement les mêmes noms de
fichiers et les mêmes dimensions**. Respecter les dimensions évite tout
décalage de mise en page (CLS = 0) et préserve la performance.

Format recommandé : JPEG (photos) optimisé, ou WebP/AVIF si vous régénérez le
projet. Poids conseillé : < 300 Ko par image après optimisation.

## Emplacements attendus

### Accueil et partage
| Fichier | Dimensions | Usage |
|---|---|---|
| `home-hero.jpg` | 1920 × 1080 | Grande image du bandeau d'accueil |
| `og-default.jpg` | 1200 × 630 | Image de partage (Open Graph / Twitter) par défaut |

### Services — `images/services/`
Une image de bandeau (`*-hero.jpg`, 1600 × 1000) et deux images de galerie
(`*-1.jpg`, `*-2.jpg`, 1200 × 900) par service :

| Fichier | Dimensions |
|---|---|
| `decoration-hero.jpg` | 1600 × 1000 |
| `decoration-1.jpg`, `decoration-2.jpg` | 1200 × 900 |
| `peinture-hero.jpg` | 1600 × 1000 |
| `peinture-1.jpg`, `peinture-2.jpg` | 1200 × 900 |
| `carrelage-hero.jpg` | 1600 × 1000 |
| `carrelage-1.jpg`, `carrelage-2.jpg` | 1200 × 900 |
| `plomberie-hero.jpg` | 1600 × 1000 |
| `plomberie-1.jpg`, `plomberie-2.jpg` | 1200 × 900 |
| `menuiserie-hero.jpg` | 1600 × 1000 |
| `menuiserie-1.jpg`, `menuiserie-2.jpg` | 1200 × 900 |

### Réalisations — `images/projets/`
Deux images par projet (`*-1.jpg`, `*-2.jpg`), 1400 × 933 :

| Fichier | Dimensions |
|---|---|
| `gombe-1.jpg`, `gombe-2.jpg` | 1400 × 933 |
| `limete-1.jpg`, `limete-2.jpg` | 1400 × 933 |
| `ngaliema-1.jpg`, `ngaliema-2.jpg` | 1400 × 933 |
| `lemba-1.jpg`, `lemba-2.jpg` | 1400 × 933 |
| `bandal-1.jpg`, `bandal-2.jpg` | 1400 × 933 |
| `kintambo-1.jpg`, `kintambo-2.jpg` | 1400 × 933 |

## Modifier la liste des images

Les noms de fichiers et les dimensions proviennent des fichiers de données :

- Services : `app/data/services.ts` (`heroImage`, `gallery`)
- Projets : `app/data/projects.ts` (`images`)
- Accueil : `app/routes/home.tsx` (image du hero)

Si vous ajoutez un service ou un projet, déclarez ses images dans le fichier de
données correspondant (avec `width`, `height` et un `alt` descriptif) : le type
`ImageAsset` impose ces champs, sinon le projet ne compile pas.
