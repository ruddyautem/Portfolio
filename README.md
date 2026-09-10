# Portfolio

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### 📋 Présentation

Bienvenue sur le code source de mon portfolio. Développeur Full Stack, j'avais envie d'un site qui me ressemble un peu plus qu'un template classique — alors j'ai eu l'idée de le construire comme une véritable interface **VS Code** : barre de menu, sidebar, explorateur de fichiers, onglets ouverts, le tout recréé de zéro en React & TypeScript. Le site est bilingue (FR/EN) et se décline en quatre thèmes visuels, au choix.

### 📑 Les pages

| Route         | Ce qu'on y trouve                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Accueil) | Un héro, ma stack technique, et un carrousel auto-défilant de mes projets récents avec préchargement LCP                                                                |
| `/about`      | Mes compétences, réparties en Front-End, Back-End et Outils, avec animations graduelles en cascade                                                                      |
| `/projects`   | La galerie complète de mes projets — Portfolio, Temporis, Stokki, Style-D, Mytasky, DressCode, OhMyBlog!, Laxxy, CoolMail... — avec les liens vers le code et les démos |
| `/contact`    | Un formulaire simple, avec validation Zod, protection honeypot et notifications toast                                                                                   |
| `/cv`         | Mon CV, rendu à partir de données bilingues avec téléchargement PDF                                                                                                     |
| `/settings`   | Page de configuration (`parametres.json`) : sélection des 4 thèmes, choix de la langue et interrupteur d'effets visuels (halos lumineux)                                |

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
- Nettoyage strict des en-têtes d'email et échappement du contenu pour parer aux injections ;
- Messages d'erreur et de succès bilingues.

### 🌍 Internationalisation & Navigation Instantanée (0 ms)

- Bilingue français et anglais grâce à `next-intl` avec routes préfixées (`/fr/...`, `/en/...`).
- **Génération Statique Intégrale (`generateStaticParams`)** : Précompilation des 20 pages statiques au build.
- **Préchargement en mémoire (`router.prefetch`)** : Les routes sont préchargées dans le cache client dès le montage.
- **UI Optimiste (0 ms)** : Le trait des onglets et la barre latérale glissent instantanément au clic sans latence réseau.

### 📱 Navigation Gestuelle (Swipe) Mobile

- **Glissement horizontal fluide (< 1280px)** : Changement de page au doigt via carrousel continu avec mise à jour instantanée des onglets.
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
- **Cache Immuable** : En-têtes `Cache-Control: public, max-age=31536000, immutable` pour tous les assets statiques.
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
├── public/                          # Ressources statiques (icônes, images, PDFs)
├── src/
│   ├── app/
│   │   ├── robots.ts                # /robots.txt natif Next.js
│   │   ├── sitemap.ts               # /sitemap.xml bilingue natif
│   │   ├── api/contact/route.ts     # Route API d'envoi d'emails sécurisée
│   │   └── [locale]/                # Routes bilingues (fr|en)
│   │       ├── globals.css          # Styles globaux + Tailwind v4 + animations
│   │       ├── layout.tsx           # Layout racine (SSR cookies, polices, métadonnées)
│   │       ├── page.tsx             # Accueil
│   │       ├── about/page.tsx       # Compétences
│   │       ├── contact/page.tsx     # Formulaire de contact
│   │       ├── cv/page.tsx          # Affichage du CV
│   │       ├── projects/page.tsx    # Galerie de projets
│   │       └── settings/page.tsx    # Configuration (parametres.json)
│   ├── components/                  # Composants UI React
│   │   ├── SwipeNavigator/          # Carrousel multi-pages gestuel (mobile/tablette)
│   │   ├── CommandPalette/          # Palette de commandes (cmdk)
│   │   ├── Settings/                # Interface des paramètres
│   │   ├── HomepageContent/         # Contenu héro & carrousel d'accueil
│   │   ├── AboutContent/            # Compétences & badges
│   │   ├── ProjectsContent/         # Galerie de projets (découplée & responsive)
│   │   ├── CVContent/               # Rendu du CV interactif
│   │   ├── Card/                    # Cartes de projets avec tailles responsives
│   │   ├── ContactForm/             # Formulaire de contact
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

### À propos de moi

Je suis Ruddy Autem, développeur Full Stack. Si le code vous inspire ou que vous voulez discuter, n'hésitez pas — vous me trouverez sur [autem.dev](https://autem.dev) ou [GitHub](https://github.com/ruddyautem).

---

## English

### 📋 Overview

Welcome to the source code of my portfolio. As a Full Stack developer, I wanted something that felt more like _me_ than a standard template — so I built it as a real **VS Code**-style interface: menu bar, sidebar, file explorer, open tabs, all recreated from scratch in React & TypeScript. The site is bilingual (FR/EN) and comes with four selectable visual themes.

### 📑 Pages

| Route       | What's there                                                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Home)  | A hero section, my tech stack, and an auto-scrolling carousel of my recent work with LCP priority preloading                                                |
| `/about`    | My skills, split into Front-End, Back-End and Tools, with staggered reveal animations                                                                       |
| `/projects` | The full gallery of my work — Portfolio, Temporis, Stokki, Style-D, Mytasky, DressCode, OhMyBlog!, Laxxy, CoolMail... — with links to source code and demos |
| `/contact`  | A simple form, with Zod validation, honeypot spam protection, and toast notifications                                                                       |
| `/cv`       | My CV, rendered from bilingual data with PDF download                                                                                                       |
| `/settings` | Built-in settings page (`settings.json`): theme switcher, language selector, and visual background glow toggle                                              |

### ⌨️ VS Code Command Palette (`cmdk`)

Open anytime with `Ctrl+K` / `Cmd+K` or by clicking the top search bar:

- Quick file navigation across the portfolio.
- Live theme switching (Ayu, One Dark Pro, Dracula, Poimandres).
- Instant language toggle (French / English).
- Quick actions (download resume, view GitHub source).

### 📬 The contact form

Fully secured email submission route (via Resend + Zod):

- Rate limited to 3 submissions per IP every 10 minutes to prevent abuse;
- Honeypot spam trap blocking automated spam bots;
- Strict header sanitization and HTML escaping;
- Bilingual error and success feedback messages.

### 🌍 Internationalization & Instant Navigation (0 ms)

- Bilingual English and French powered by `next-intl` with locale-prefixed routes (`/en/...`, `/fr/...`).
- **Full Static Generation (`generateStaticParams`)** : Pre-rendering of all 20 static pages at build time.
- **In-Memory Prefetching (`router.prefetch`)** : All routes preloaded into client memory on mount.
- **Optimistic UI (0 ms)** : Tab underlines and sidebar indicator glide immediately on click without network delay.

### 📱 Mobile Gesture Navigation (Swipe)

- **Smooth horizontal paging (< 1280px)** : Seamless swipe between all pages with zero-latency tab indicator synchronization.
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
- **Immutable Caching**: Long-term `Cache-Control: public, max-age=31536000, immutable` headers for all static assets.
- **Targeted Tree-Shaking**: `optimizePackageImports` configured for Lucide React, Radix UI, cmdk and Framer Motion.

### 🛠 Tech stack

| Category             | Technologies                       |
| -------------------- | ---------------------------------- |
| Framework            | Next.js 16 (Turbopack, App Router) |
| UI Library           | React 19                           |
| Language             | TypeScript                         |
| Package manager      | Bun                                |
| Styling              | Tailwind CSS v4                    |
| Internationalization | next-intl                          |
| UI & Accessibility   | Radix UI, Lucide React, cmdk       |
| Animations           | Framer Motion + CSS Keyframes      |
| Carousel             | Embla Carousel                     |
| Email                | Resend API + Zod                   |
| Code quality         | ESLint + Prettier                  |

### 📁 Project structure

```
Portfolio/
├── public/                          # Static assets (icons, images, PDFs)
├── src/
│   ├── app/
│   │   ├── robots.ts                # Native Next.js /robots.txt
│   │   ├── sitemap.ts               # Native bilingual /sitemap.xml
│   │   ├── api/contact/route.ts     # Secure email contact API route
│   │   └── [locale]/                # Bilingual routes (fr|en)
│   │       ├── globals.css          # Global styles + Tailwind v4 + animations
│   │       ├── layout.tsx           # Root layout (SSR cookies, fonts, metadata)
│   │       ├── page.tsx             # Home page
│   │       ├── about/page.tsx       # About / Skills page
│   │       ├── contact/page.tsx     # Contact form page
│   │       ├── cv/page.tsx          # Resume / CV page
│   │       ├── projects/page.tsx    # Projects gallery page
│   │       └── settings/page.tsx    # Settings (settings.json)
│   ├── components/                  # React UI components
│   │   ├── SwipeNavigator/          # Multi-page gesture carousel (mobile/tablet)
│   │   ├── CommandPalette/          # Command palette (cmdk)
│   │   ├── Settings/                # Settings interface
│   │   ├── HomepageContent/         # Hero & featured project carousel
│   │   ├── AboutContent/            # Skills & badges
│   │   ├── ProjectsContent/         # Decoupled responsive projects gallery
│   │   ├── CVContent/               # Interactive CV view
│   │   ├── Card/                    # Project cards with responsive sizing
│   │   ├── ContactForm/             # Contact form
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
