# Portfolio

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### 📋 Présentation

Bienvenue sur le code source de mon portfolio. Développeur Full Stack, j'avais envie d'un site qui me ressemble un peu plus qu'un template classique — alors j'ai eu l'idée de le construire comme une véritable interface **VS Code** : barre de menu, sidebar, explorateur de fichiers, onglets ouverts, le tout recréé de zéro en React. Le site est bilingue (FR/EN) et se décline en quatre thèmes visuels, au choix.

### 📑 Les pages

| Route         | Ce qu'on y trouve                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Accueil) | Un héro, ma stack technique, et un carrousel auto-défilant de mes projets récents                                                                                       |
| `/about`      | Mes compétences, réparties en Front-End, Back-End et Outils, avec quelques effets visuels que j'aime bien                                                               |
| `/projects`   | La galerie complète de mes projets — Portfolio, Temporis, Stokki, Style-D, Mytasky, DressCode, OhMyBlog!, Laxxy, CoolMail... — avec les liens vers le code et les démos |
| `/contact`    | Un formulaire simple, avec validation et notifications toast                                                                                                            |
| `/cv`         | Mon CV, rendu à partir de données bilingues                                                                                                                             |

### 📬 Le formulaire de contact

J'ai pris le temps de sécuriser un minimum la route qui envoie les emails (via nodemailer) :

- une limitation à 3 envois par IP toutes les 10 minutes, pour éviter le spam ;
- un nettoyage strict de tout ce qui pourrait finir dans un en-tête d'email, pour éviter l'injection ;
- un échappement du contenu avant affichage ;
- des messages d'erreur bilingues, histoire de rester cohérent avec le reste du site.

### 🌍 Internationalisation

Le site parle français et anglais grâce à `next-intl`. Les routes sont préfixées par la langue (`/fr/...`, `/en/...`), toutes les chaînes vivent dans `src/messages/`, et on change de langue d'un simple clic depuis la barre de menu.

### 🎨 Les thèmes

J'ai toujours aimé bidouiller les thèmes de mon éditeur, alors j'en ai intégré quatre, directement inspirés de vrais thèmes VS Code :

| Thème                | Couleur d'accent |
| -------------------- | ---------------- |
| **Ayu** (par défaut) | `#ffcc66`        |
| **One Dark Pro**     | `#98c379`        |
| **Dracula**          | `#ff79c6`        |
| **Poimandres**       | `#5de4c7`        |

Le choix est mémorisé, et chaque thème redéfinit ses propres tokens CSS dans `globals.css`.

### 🔒 Sécurité

Rien d'extraordinaire, mais j'y tenais : chaque page passe par un middleware qui pose une vraie `Content-Security-Policy`, interdit l'affichage en iframe (`X-Frame-Options: DENY`), bloque le sniffing de type MIME, et désactive caméra/micro/géolocalisation par défaut. Le site expose aussi un `robots.txt` et un `sitemap.xml` générés dynamiquement, pour rester correctement indexé.

### 🛠 Stack technique

| Catégorie            | Technologies                       |
| -------------------- | ---------------------------------- |
| Framework            | Next.js 16 (App Router) + React 19 |
| Langage              | JavaScript / JSX                   |
| Package manager      | Bun                                |
| Styling              | Tailwind CSS v4                    |
| Internationalisation | next-intl                          |
| UI                   | Radix UI, Lucide React             |
| Animations           | Framer Motion                      |
| Carrousel            | Embla Carousel                     |
| Email                | Nodemailer                         |
| Qualité de code      | ESLint + Prettier                  |

### 📁 Structure du projet

```
Portfolio/
├── public/                          # 130+ ressources (icônes, images, PDF)
│   ├── aboutmeIcon.svg
│   ├── cv-sidebar.svg
│   ├── contact-email.svg
│   ├── contact-github.svg
│   ├── contact-linkedin.svg
│   └── ... (120+ autres icônes/images)
├── src/
│   ├── app/
│   │   ├── robots.js                # /robots.txt (route Next.js native)
│   │   ├── sitemap.js               # /sitemap.xml (route Next.js native)
│   │   └── [locale]/                # Routes préfixées par la langue (fr|en)
│   │       ├── globals.css          # Styles globaux + Tailwind v4
│   │       ├── layout.jsx           # Layout racine (providers, métadonnées)
│   │       ├── page.jsx             # Accueil
│   │       ├── about/page.jsx       # Compétences
│   │       ├── contact/page.jsx     # Formulaire de contact
│   │       ├── cv/
│   │       │   └── page.jsx         # Affichage du CV (lecture seule)
│   │       ├── projects/
│   │       │   ├── page.jsx         # Galerie de projets
│   │       │   └── projects.js      # Données des projets
│   │       └── api/contact/route.js # Envoi d'email sécurisé
│   ├── components/                  # 18 composants UI réutilisables
│   │   ├── AboutContent/            # Contenu de la section "À propos"
│   │   ├── AnimatedLink/            # Lien avec animation au survol
│   │   ├── Card/                    # Conteneur de carte générique
│   │   ├── ContactForm/             # Formulaire côté client (appels API)
│   │   ├── ContactList/             # Liste de contacts / liens sociaux
│   │   ├── Explorer/                # Panneau explorateur de fichiers
│   │   ├── Footer/                  # Pied de page
│   │   ├── HomepageContent/         # Contenu principal de l'accueil
│   │   ├── Icons/                   # Icônes SVG
│   │   ├── InputField/              # Champ de formulaire avec label/erreur
│   │   ├── LanguageSwitcher/        # Bascule FR ↔ EN
│   │   ├── Menu/                    # Barre de menu supérieure
│   │   ├── PageWrapper/             # Wrapper de page + décorations
│   │   ├── Sidebar/                 # Barre latérale de navigation
│   │   ├── SkillList/               # Liste de badges de compétences
│   │   ├── Tabsbar/                 # Barre d'onglets
│   │   ├── TechSection/             # Bloc technologies
│   │   ├── ThemeToggle/             # Sélecteur de thème
│   │   ├── Tooltip/                 # Infobulle au survol
│   │   └── TopPageDecoration/       # Décoration d'en-tête de page
│   ├── context/ThemeContext.js      # Fournisseur de thème (4 thèmes)
│   ├── i18n/routing.js              # Configuration next-intl
│   ├── lib/
│   │   ├── constants.js             # Données de nav, couleurs, classes partagées
│   │   ├── cvData.js                # Données du CV & logique de sauvegarde
│   │   ├── icons.jsx                # Icônes React partagées
│   │   └── utils.js                 # Helpers (échappement HTML, nettoyage)
│   └── proxy.js                     # Middleware : i18n + en-têtes de sécurité
├── .env                              # Variables d'environnement
├── .gitignore
├── bun.lock
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── postcss.config.cjs
├── package.json
└── README.md
```

### 🚀 Pour lancer le projet

```bash
git clone <url-du-repo>
cd Portfolio

bun install
bun run dev
```

Direction [http://localhost:3000](http://localhost:3000).

> 💡 Le formulaire de contact a besoin d'identifiants SMTP (dans un `.env`) pour envoyer réellement les emails.

### À propos de moi

Je suis Ruddy Autem, développeur Full Stack. Si le code vous inspire ou que vous voulez discuter, n'hésitez pas — vous me trouverez sur [autem.dev](https://autem.dev) ou [GitHub](https://github.com/ruddyautem).

---

## English

### 📋 Overview

Welcome to the source code of my portfolio. As a Full Stack developer, I wanted something that felt more like _me_ than a standard template — so I built it as a real **VS Code**-style interface: menu bar, sidebar, file explorer, open tabs, all recreated from scratch in React. The site is bilingual (FR/EN) and comes with four selectable visual themes.

### 📑 Pages

| Route       | What's there                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Home)  | A hero section, my tech stack, and an auto-scrolling carousel of my recent projects                                                                           |
| `/about`    | My skills, split into Front-End, Back-End and Tools, with a few visual touches I'm fond of                                                                    |
| `/projects` | The full gallery of my work — Portfolio, Temporis, Stokki, Style-D, Mytasky, DressCode, OhMyBlog!, Laxxy, CoolMail... — with links to the code and live demos |
| `/contact`  | A simple form, with validation and toast notifications                                                                                                        |
| `/cv`       | My CV, rendered from bilingual data                                                                                                                           |

### 📬 The contact form

I took the time to properly secure the route that sends emails (via nodemailer):

- rate limiting to 3 submissions per IP every 10 minutes, to keep spam away;
- strict sanitization of anything that could end up in an email header, to prevent injection;
- escaping the message content before it's rendered;
- bilingual error messages, to stay consistent with the rest of the site.

### 🌍 Internationalization

The site speaks French and English thanks to `next-intl`. Routes are locale-prefixed (`/fr/...`, `/en/...`), every string lives in `src/messages/`, and switching languages is one click away in the menu bar.

### 🎨 Themes

I've always liked tinkering with my editor's theme, so I built in four, directly inspired by real VS Code themes:

| Theme             | Accent color |
| ----------------- | ------------ |
| **Ayu** (default) | `#ffcc66`    |
| **One Dark Pro**  | `#98c379`    |
| **Dracula**       | `#ff79c6`    |
| **Poimandres**    | `#5de4c7`    |

The choice is remembered, and each theme redefines its own CSS tokens in `globals.css`.

### 🔒 Security

Nothing fancy, but it mattered to me: every page goes through a middleware that sets a real `Content-Security-Policy`, blocks framing (`X-Frame-Options: DENY`), prevents MIME sniffing, and disables camera/mic/geolocation by default. The site also serves a dynamically generated `robots.txt` and `sitemap.xml`, so it stays properly indexed.

### 🛠 Tech stack

| Category             | Technologies                       |
| -------------------- | ---------------------------------- |
| Framework            | Next.js 16 (App Router) + React 19 |
| Language             | JavaScript / JSX                   |
| Package manager      | Bun                                |
| Styling              | Tailwind CSS v4                    |
| Internationalization | next-intl                          |
| UI                   | Radix UI, Lucide React             |
| Animations           | Framer Motion                      |
| Carousel             | Embla Carousel                     |
| Email                | Nodemailer                         |
| Code quality         | ESLint + Prettier                  |

### 📁 Project structure

```
Portfolio/
├── public/                          # 130+ assets (icons, images, PDFs)
│   ├── aboutmeIcon.svg
│   ├── cv-sidebar.svg
│   ├── contact-email.svg
│   ├── contact-github.svg
│   ├── contact-linkedin.svg
│   └── ... (120+ other icons/images)
├── src/
│   ├── app/
│   │   ├── robots.js                # /robots.txt (native Next.js route)
│   │   ├── sitemap.js               # /sitemap.xml (native Next.js route)
│   │   └── [locale]/                # Locale-prefixed routes (fr|en)
│   │       ├── globals.css          # Global styles + Tailwind v4
│   │       ├── layout.jsx           # Root layout (providers, metadata)
│   │       ├── page.jsx             # Home
│   │       ├── about/page.jsx       # Skills
│   │       ├── contact/page.jsx     # Contact form
│   │       ├── cv/
│   │       │   └── page.jsx         # CV display (read-only)
│   │       ├── projects/
│   │       │   ├── page.jsx         # Project gallery
│   │       │   └── projects.js      # Project data
│   │       └── api/contact/route.js # Secured email endpoint
│   ├── components/                  # 18 reusable UI components
│   │   ├── AboutContent/            # About section content
│   │   ├── AnimatedLink/            # Hover-animated link
│   │   ├── Card/                    # Generic card wrapper
│   │   ├── ContactForm/             # Client-side form (calls API)
│   │   ├── ContactList/             # Contacts / social links list
│   │   ├── Explorer/                # File explorer panel
│   │   ├── Footer/                  # Footer
│   │   ├── HomepageContent/         # Main home content block
│   │   ├── Icons/                   # SVG icons
│   │   ├── InputField/              # Form input with label/error
│   │   ├── LanguageSwitcher/        # FR ↔ EN toggle
│   │   ├── Menu/                    # Top menu bar
│   │   ├── PageWrapper/             # Page wrapper + decorations
│   │   ├── Sidebar/                 # Main navigation sidebar
│   │   ├── SkillList/               # Skills badges list
│   │   ├── Tabsbar/                 # Tab bar
│   │   ├── TechSection/             # Technologies section block
│   │   ├── ThemeToggle/             # Theme switcher
│   │   ├── Tooltip/                 # Hover tooltip
│   │   └── TopPageDecoration/       # Page header decoration
│   ├── context/ThemeContext.js      # Theme provider (4 themes)
│   ├── i18n/routing.js              # next-intl configuration
│   ├── lib/
│   │   ├── constants.js             # Nav data, tag colors, shared classes
│   │   ├── cvData.js                # CV data & autosave logic
│   │   ├── icons.jsx                # Shared React icons
│   │   └── utils.js                 # Helpers (HTML escaping, sanitization)
│   └── proxy.js                     # Middleware: i18n + security headers
├── .env                              # Environment variables
├── .gitignore
├── bun.lock
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── postcss.config.cjs
├── package.json
└── README.md
```

### 🚀 Running it locally

```bash
git clone <repo-url>
cd Portfolio

bun install
bun run dev
```

Then head to [http://localhost:3000](http://localhost:3000).

> 💡 The contact form needs SMTP credentials (in a `.env`) to actually send emails.

### About me

I'm Ruddy Autem, a Full Stack developer. If the code speaks to you or you just want to say hi, feel free — you'll find me at [autem.dev](https://autem.dev) or on [GitHub](https://github.com/ruddyautem).
