# Portfolio

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### 📋 Présentation

Bienvenue sur le code source de mon portfolio. Développeur Full Stack, j'avais envie d'un site qui me ressemble un peu plus qu'un template classique — alors j'ai eu l'idée de le construire comme une véritable interface **VS Code** : barre de menu, sidebar, explorateur de fichiers, onglets ouverts, le tout recréé de zéro en React & TypeScript. Le site est bilingue (FR/EN) et se décline en quatre thèmes visuels, au choix.

### 📑 Les pages

| Route         | Ce qu'on y trouve                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/` (Accueil) | Héro interactif avec navigation rapide, projecteur carrousel auto-défilant avec compte à rebours, et ruban animé des technologies (`LogoCarousel`)                             |
| `/about`      | Bento grid complet : biographie, 4 cartes de bonnes pratiques (architecture, performance, sécurité, qualité), profil VS Code interactif, compétences filtrables et téléchargement CV |
| `/projects`   | Vitrine complète des projets — Temporis, DressCode, Style-D, Stokki, Portfolio, OhMyBlog!, Mytasky, Laxxy, CoolMail, GPT-3 — avec cartes mises en avant et archives            |
| `/contact`    | Formulaire sécurisé avec validation Zod, protection anti-spam honeypot, rate limiting et notifications toast                                                                    |
| `/cv`         | Rendu du CV interactif & stylisé, basé sur des données bilingues typées, avec liens directs vers les projets et bouton de téléchargement PDF                                    |
| `/settings`   | Page de configuration (`parametres.json`) : sélection des 4 thèmes, choix de la langue et interrupteur d'effets visuels (halos lumineux d'ambiance)                             |

### ⌨️ Palette de commandes VS Code (`cmdk`)

Accessible à tout moment via `Ctrl+K` / `Cmd+K` ou depuis la barre de recherche supérieure :

- Navigation instantanée entre les fichiers du portfolio.
- Bascule de thème en direct (Ayu, One Dark Pro, Dracula, Poimandres).
- Changement instantané de langue (Français / Anglais).
- Actions rapides (téléchargement du CV, accès au code source GitHub).

### 📬 Le formulaire de contact

Sécurisation complète de la route d'envoi d'emails (via Resend + Zod) :

- Limitation à 3 envois par IP toutes les 10 minutes pour éviter le spam ;
- Protection honeypot pour bloquer les robots automatisés ;
- Rejet des requêtes dépassant 32 KiB avant parsing et validation stricte des champs ;
- Protection contre les injections d'en-têtes d'email et échappement HTML du contenu ;
- Messages d'erreur et de succès bilingues.

### 🔒 Sécurité applicative

- **CSP à nonce par requête** : les scripts inline non autorisés sont bloqués sans empêcher les scripts Next.js et les données structurées JSON-LD légitimes ;
- **En-têtes de sécurité** : HSTS en production, protection anti-clickjacking, `nosniff`, politique de référent et permissions navigateur restreintes ;
- **API défensive** : limitation de débit Redis partagée en production, IP hachée dans la clé de rate limiting, et réponses d'erreur sans détails sensibles côté visiteur ;
- **Validation testée** : les payloads invalides renvoient `400` et les payloads trop volumineux `413`.

### 🌍 Internationalisation & Navigation Instantanée (0 ms)

- Bilingue français et anglais grâce à `next-intl` avec routes préfixées (`/fr/...`, `/en/...`).
- **Génération des routes localisées (`generateStaticParams`)** : Les routes française et anglaise sont générées depuis la liste de locales configurée.
- **Préchargement en mémoire (`router.prefetch`)** : Les routes sont préchargées dans le cache client dès le montage.
- **UI Optimiste (0 ms)** : Le trait des onglets et la barre latérale glissent instantanément au clic sans latence réseau.

### 📱 Navigation Gestuelle (Swipe) Mobile

- **Glissement horizontal fluide (< 1280px)** : Changement de page au doigt via carrousel continu (`SwipeNavigator`) avec mise à jour instantanée des onglets et de la barre de navigation mobile.
- **Indicateurs visuels discrets** : Aperçu animé au chargement et invitation à explorer la palette de commandes depuis la barre supérieure.

### 🎨 Les thèmes

Quatre thèmes inspirés des éditeurs de code, mémorisés par cookies et `localStorage` avec zéro flash (FOUC) au rafraîchissement :

| Thème                | Couleur d'accent | Ambiance                                       |
| -------------------- | ---------------- | ---------------------------------------------- |
| **Ayu** (par défaut) | `#ffcc66`        | Nuances sombres et dorées chaleureuses         |
| **One Dark Pro**     | `#98c379`        | Nuances anthracite et vert pastel sobre        |
| **Dracula**          | `#ff79c6`        | Nuances sombres aux touches violettes et roses |
| **Poimandres**       | `#5de4c7`        | Nuances bleu nuit et turquoise épuré           |

### ⚡ Performance & Core Web Vitals

- **LCP Optimisé** : Préchargement prioritaire (`fetchpriority="high"`) de l'image héro du carrousel dans le `<head>` initial.
- **Moteur d'images AVIF / WebP** : Conversion et dimensionnement dynamique via Next.js (réduction de 80% à 95% de la bande passante).
- **Cache des assets** : En-têtes `Cache-Control` appliqués aux images et documents statiques pour limiter les requêtes répétées.
- **Tree-Shaking ciblé** : `optimizePackageImports` configuré pour Lucide React, Radix UI, cmdk et Framer Motion.

### 🛠 Stack technique

| Catégorie            | Technologies                       |
| -------------------- | ---------------------------------- |
| Framework            | Next.js 16 (Turbopack, App Router) |
| Librairie UI         | React 19                           |
| Langage              | TypeScript                         |
| Package manager      | Bun                                |
| Styling              | Tailwind CSS v4                    |
| Internationalisation | next-intl                          |
| UI & Accessibilité   | Radix UI, Lucide React, cmdk       |
| Animations           | Framer Motion + CSS Keyframes      |
| Carrousel            | Embla Carousel                     |
| Email                | Resend API + Zod                   |
| Qualité de code      | ESLint + Prettier                  |

### 📁 Structure du projet

```
Portfolio/
├── public/                          # Ressources statiques (icônes SVG, images, PDFs)
├── src/
│   ├── app/
│   │   ├── manifest.ts              # Web App Manifest PWA
│   │   ├── robots.ts                # /robots.txt natif Next.js
│   │   ├── sitemap.ts               # /sitemap.xml bilingue natif
│   │   ├── api/contact/route.ts     # Route API d'envoi d'emails sécurisée
│   │   └── [locale]/                # Routes bilingues (fr|en)
│   │       ├── globals.css          # Styles globaux + Tailwind v4 + animations
│   │       ├── layout.tsx           # Layout racine (SSR cookies, polices, métadonnées)
│   │       ├── page.tsx             # Accueil
│   │       ├── about/page.tsx       # Compétences, bio & profil
│   │       ├── contact/page.tsx     # Formulaire de contact
│   │       ├── cv/page.tsx          # Affichage du CV
│   │       ├── projects/page.tsx    # Galerie de projets
│   │       └── settings/page.tsx    # Configuration (parametres.json)
│   ├── components/                  # Composants UI React
│   │   ├── SwipeNavigator/          # Carrousel multi-pages gestuel (mobile/tablette)
│   │   ├── CommandPalette/          # Palette de commandes (cmdk)
│   │   ├── Settings/                # Interface des paramètres & thèmes
│   │   ├── HomepageContent/         # Contenu héro, projecteur de projets & ruban tech
│   │   ├── AboutContent/            # Bio, bonnes pratiques, profil VS Code & compétences filtrables
│   │   ├── ProjectsContent/         # Galerie de projets (cartes Featured et Archive)
│   │   ├── CVContent/               # Rendu du CV interactif bilingue
│   │   ├── ContactForm/             # Formulaire de contact avec protection anti-spam
│   │   ├── Menu/                    # Barre de titre VS Code
│   │   ├── Sidebar/                 # Navigation latérale avec indicateur optimiste
│   │   ├── Tabsbar/                 # Barre d'onglets responsive
│   │   ├── MobileNav/               # Barre de navigation mobile (<1280px) réactive
│   │   └── Explorer/                # Explorateur de fichiers
│   ├── context/ThemeContext.tsx     # Gestion du thème et des halos lumineux
│   ├── i18n/                        # Configuration next-intl & routage
│   ├── lib/                         # Constantes, données CV, utilitaires typés
│   └── messages/                    # Dictionnaires de traduction JSON (fr / en)
├── tsconfig.json                    # Configuration TypeScript
├── next.config.js                   # Configuration Next.js (optimisations & cache)
└── package.json
```

### 🚀 Pour lancer le projet

```bash
git clone <url-du-repo>
cd Portfolio

bun install
bun run dev
```

Direction [http://localhost:3000](http://localhost:3000).

> 💡 Le formulaire de contact a besoin d'une clé `RESEND_API_KEY` et de `MY_EMAIL` (dans un fichier `.env`) pour envoyer les emails.
> En production, ajoutez aussi `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`. Le reverse proxy doit remplacer `x-real-ip` avec l'adresse IP réelle du visiteur.
> `NEXT_PUBLIC_SITE_URL` est facultatif et vaut `https://autem.dev` par défaut.

### À propos de moi

Je suis Ruddy Autem, développeur Full Stack. Si le code vous inspire ou que vous voulez discuter, n'hésitez pas — vous me trouverez sur [autem.dev](https://autem.dev) ou [GitHub](https://github.com/ruddyautem).

---

## English

### 📋 Overview

Welcome to the source code of my portfolio. As a Full Stack developer, I wanted something that felt more like _me_ than a standard template — so I built it as a real **VS Code**-style interface: menu bar, sidebar, file explorer, open tabs, all recreated from scratch in React & TypeScript. The site is bilingual (FR/EN) and comes with four selectable visual themes.

### 📑 Pages

| Route       | What's there                                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Home)  | Interactive hero with quick navigation, auto-advancing project spotlight carousel with visual timer, and animated tech logo ribbon (`LogoCarousel`)                    |
| `/about`    | Full bento grid: developer narrative, 4 best-practice cards (architecture, performance, security, code quality), interactive VS Code profile snapshot, filterable skill tags (Front-End, Back-End, Tools), CV download |
| `/projects` | Complete project showcase — Temporis, DressCode, Style-D, Stokki, Portfolio, OhMyBlog!, Mytasky, Laxxy, CoolMail, GPT-3 — with featured spotlight cards and archives  |
| `/contact`  | Secured contact form with Zod validation, honeypot spam protection, rate limiting, and toast notifications                                                              |
| `/cv`       | Interactive & styled resume view rendered from typed bilingual data with direct project links and PDF download                                                          |
| `/settings` | Built-in settings page (`settings.json`): theme switcher (4 themes), language selector, and ambient background glow toggle                                             |

### ⌨️ VS Code Command Palette (`cmdk`)

Open anytime with `Ctrl+K` / `Cmd+K` or by clicking the top search bar:

- Quick file navigation across the portfolio.
- Live theme switching (Ayu, One Dark Pro, Dracula, Poimandres).
- Instant language toggle (French / English).
- Quick actions (download resume, view GitHub source).

### 📬 The contact form

Fully secured email submission route (via Resend + Zod):

- Rate limited to 3 submissions per IP every 10 minutes to prevent abuse;
- Production rate limiting requires `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and a reverse proxy that overwrites `x-real-ip` with the visitor's IP;
- Honeypot spam trap blocking automated spam bots;
- Requests larger than 32 KiB are rejected before parsing, with strict field validation;
- Email header-injection protection and HTML escaping;
- Bilingual error and success feedback messages.

`NEXT_PUBLIC_SITE_URL` is optional and defaults to `https://autem.dev`.

### 🔒 Application security

- **Per-request nonce CSP**: blocks unauthorized inline scripts while allowing legitimate Next.js scripts and JSON-LD structured data;
- **Security headers**: production HSTS, anti-clickjacking protection, `nosniff`, a strict referrer policy, and restricted browser permissions;
- **Defensive API**: shared Redis rate limiting in production, hashed IP addresses in rate-limit keys, and visitor-safe error responses with no technical details exposed;
- **Validated safeguards**: malformed payloads return `400`, while oversized payloads return `413`.

### 🌍 Internationalization & Instant Navigation (0 ms)

- Bilingual English and French powered by `next-intl` with locale-prefixed routes (`/en/...`, `/fr/...`).
- **Localized route generation (`generateStaticParams`)** : English and French routes are generated from the configured locale list.
- **In-Memory Prefetching (`router.prefetch`)** : All routes preloaded into client memory on mount.
- **Optimistic UI (0 ms)** : Tab underlines and sidebar indicator glide immediately on click without network delay.

### 📱 Mobile Gesture Navigation (Swipe)

- **Smooth horizontal paging (< 1280px)** : Seamless swipe between all pages (`SwipeNavigator`) with zero-latency tab and mobile nav synchronization.
- **Subtle visual onboarding** : Gentle introductory peek slide and an interactive top search bar invitation to explore.

### 🎨 Themes

Four themes inspired by developer editors, persisted via cookies & `localStorage` with zero flash of unstyled content (FOUC):

| Theme             | Accent color | Atmosphere                                        |
| ----------------- | ------------ | ------------------------------------------------- |
| **Ayu** (default) | `#ffcc66`    | Warm dark palette with golden accents             |
| **One Dark Pro**  | `#98c379`    | Understated anthracite with soft green accents    |
| **Dracula**       | `#ff79c6`    | Classic dark palette with purple and pink touches |
| **Poimandres**    | `#5de4c7`    | Deep midnight blue with clean turquoise accents   |

### ⚡ Performance & Core Web Vitals

- **Optimized LCP**: Priority preloading (`fetchpriority="high"`) for the hero carousel image injected into the initial `<head>`.
- **AVIF / WebP Images**: Next.js on-the-fly conversion and responsive sizing (80% to 95% bandwidth reduction).
- **Asset Caching**: `Cache-Control` headers are applied to static images and documents to reduce repeated requests.
- **Targeted Tree-Shaking**: `optimizePackageImports` configured for Lucide React, Radix UI, cmdk and Framer Motion.

### 🛠 Tech stack

| Category             | Technologies                       |
| -------------------- | ---------------------------------- |
| Framework            | Next.js 16 (Turbopack, App Router) |
| UI Library           | React 19                           |
| Language             | TypeScript                         |
| Package manager      | Bun                                |
| Styling              | Tailwind CSS v4                    |
| Internationalisation | next-intl                          |
| UI & Accessibility   | Radix UI, Lucide React, cmdk       |
| Animations           | Framer Motion + CSS Keyframes      |
| Carousel             | Embla Carousel                     |
| Email                | Resend API + Zod                   |
| Code quality         | ESLint + Prettier                  |

### 📁 Project structure

```
Portfolio/
├── public/                          # Static assets (SVG icons, images, PDFs)
├── src/
│   ├── app/
│   │   ├── manifest.ts              # PWA Web App Manifest
│   │   ├── robots.ts                # Native Next.js /robots.txt
│   │   ├── sitemap.ts               # Native bilingual /sitemap.xml
│   │   ├── api/contact/route.ts     # Secure email contact API route
│   │   └── [locale]/                # Bilingual routes (fr|en)
│   │       ├── globals.css          # Global styles + Tailwind v4 + animations
│   │       ├── layout.tsx           # Root layout (SSR cookies, fonts, metadata)
│   │       ├── page.tsx             # Home page
│   │       ├── about/page.tsx       # About / Skills & profile page
│   │       ├── contact/page.tsx     # Contact form page
│   │       ├── cv/page.tsx          # Resume / CV page
│   │       ├── projects/page.tsx    # Projects gallery page
│   │       └── settings/page.tsx    # Settings (settings.json)
│   ├── components/                  # React UI components
│   │   ├── SwipeNavigator/          # Multi-page gesture carousel (mobile/tablet)
│   │   ├── CommandPalette/          # Command palette (cmdk)
│   │   ├── Settings/                # Settings & themes interface
│   │   ├── HomepageContent/         # Hero, project spotlight & tech ribbon
│   │   ├── AboutContent/            # Narrative bio, best-practice cards, VS Code profile & filterable skills
│   │   ├── ProjectsContent/         # Projects gallery (Featured and Archive cards)
│   │   ├── CVContent/               # Bilingual interactive CV view
│   │   ├── ContactForm/             # Contact form with anti-spam protection
│   │   ├── Menu/                    # VS Code title bar
│   │   ├── Sidebar/                 # Sidebar navigation with optimistic indicator
│   │   ├── Tabsbar/                 # Responsive tabs bar
│   │   ├── MobileNav/               # Responsive mobile bottom navigation (<1280px)
│   │   └── Explorer/                # File explorer tree
│   ├── context/ThemeContext.tsx     # Theme and background glow state management
│   ├── i18n/                        # next-intl configuration & routing
│   ├── lib/                         # Constants, CV data, typed utilities
│   └── messages/                    # JSON translation dictionaries (fr / en)
├── tsconfig.json                    # TypeScript configuration
├── next.config.js                   # Next.js configuration (optimizations & cache)
└── package.json
```

### 🚀 Running it locally

```bash
git clone <repo-url>
cd Portfolio

bun install
bun run dev
```

Then head to [http://localhost:3000](http://localhost:3000).

---

### About me

I'm Ruddy Autem, a Full Stack developer. If the code speaks to you or you just want to say hi, feel free — you'll find me at [autem.dev](https://autem.dev) or on [GitHub](https://github.com/ruddyautem).
