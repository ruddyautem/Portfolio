export const CV_DATA = {
  name: 'Ruddy Autem',
  title: 'Développeur Web Full-Stack',
  about:
    "Développeur Web Full-Stack passionné, je conçois des applications fluides, performantes et optimisées pour offrir la meilleure expérience utilisateur. Attentif aux détails et exigeant sur la qualité du code, je m'efforce de proposer des solutions solides et adaptatives. Ma maîtrise du front-end et du back-end garantit une harmonie entre design et efficacité technique. Avide d'innover, j'aborde chaque projet comme une chance d'évoluer et de dépasser les objectifs fixés.",
  contacts: [
    { icon: 'mailIcon.svg', text: 'ruddy.autem@gmail.com', link: 'mailto:ruddy.autem@gmail.com' },
    { icon: 'locationIcon.svg', text: 'Leers, HDF' },
    { icon: 'linkIcon.svg', text: 'www.autem.dev', link: 'https://autem.dev/' },
    { icon: 'githubIcon2.svg', text: '/ruddyautem', link: 'https://github.com/ruddyautem' },
    {
      icon: 'linkedinIcon.svg',
      text: '/ruddyautem',
      link: 'https://www.linkedin.com/in/ruddyautem/',
    },
  ],
  skillGroups: [
    {
      label: 'Front-end',
      skills: [
        'React.js',
        'Next.js',
        'Vue.js',
        'Typescript',
        'TailwindCSS',
        'SCSS',
        'Styled-Components',
      ],
    },
    {
      label: 'Back-end',
      skills: ['Node', 'Express', 'Firebase', 'MongoDB', 'Prisma', 'MySQL'],
    },
    {
      label: 'Outils',
      skills: ['Git', 'Zustand', 'Clerk', 'AGILE'],
    },
  ],
  projects: [
    {
      title: 'Portfolio VsCode',
      year: '2025',
      link: 'https://autem.dev',
      points: [
        "Conception et réalisation d'un portfolio en Next.js entièrement responsive inspiré de l'interface de VSCode.",
        "Intégration de thèmes de couleurs dynamiques améliorant l'attrait visuel et la convivialité.",
        "Ajout d'un service de messagerie performant assurant une prise de contact fluide et efficace.",
      ],
    },
    {
      title: 'OhMyBlog!',
      year: '2025',
      link: 'https://ohmyblog.autem.dev',
      points: [
        "Création d'une plateforme de création de blogs moderne et entièrement responsive avec React 19 et Tailwind CSS 4.1.",
        'Authentification rapide et sécurisée avec Clerk, et API gérées via Express.',
        "Intégration d'ImageKit.io pour l'upload et l'optimisation des images.",
      ],
    },
    {
      title: 'Style-D',
      year: '2025',
      link: 'https://style-d.autem.dev',
      points: [
        "Développement d'une plateforme de E-Commerce entièrement responsive au design vibrant, offrant une expérience d'achat fluide et rapide en quelques clics.",
        "Mise en place d'une authentification Google pour simplifier et accélérer l'inscription et la connexion des utilisateurs.",
        'Intégration des paiements sécurisés via Stripe et création automatisée des factures sur Firebase.',
      ],
    },
  ],
  formations: [
    {
      title: 'Complete React Developer, Redux, Hooks',
      institution: 'Zero To Mastery Academy',
      year: '2022',
    },
    { title: 'The Web Developer Bootcamp', institution: 'Colt Steele', year: '2021' },
    {
      title: 'Licence LLCER — Langues, littératures et civilisations étrangères et régionales',
      institution: 'Sorbonne Nouvelle',
      year: '2014',
    },
  ],
  languages: [
    { language: 'Anglais', level: 'Courant' },
    { language: 'Allemand', level: 'B1' },
  ],
};
