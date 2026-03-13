export const getCvData = (t) => ({
  name: 'Ruddy Autem',
  title: t('title'),
  about: t('about'),
  contacts: [
    { icon: '/mailIcon.svg', text: 'ruddy.autem@gmail.com', link: 'mailto:ruddy.autem@gmail.com' },
    { icon: '/locationIcon.svg', text: 'Leers, HDF' },
    { icon: '/linkIcon.svg', text: 'www.autem.dev', link: 'https://autem.dev/' },
    { icon: '/githubIcon2.svg', text: '/ruddyautem', link: 'https://github.com/ruddyautem' },
    {
      icon: '/linkedinIcon.svg',
      text: '/ruddyautem',
      link: 'https://www.linkedin.com/in/ruddyautem/',
    },
  ],
  skillGroups: [
    {
      label: t('skills.frontend'),
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
      label: t('skills.backend'),
      skills: ['Node', 'Express', 'Firebase', 'MongoDB', 'Prisma', 'MySQL'],
    },
    {
      label: t('skills.tools'),
      skills: ['Git', 'Zustand', 'Clerk', 'AGILE'],
    },
  ],
  projects: [
    {
      title: t('projects.portfolio.title'),
      year: '2025',
      link: 'https://autem.dev',
      points: t.raw('projects.portfolio.points'),
    },
    {
      title: t('projects.ohmyblog.title'),
      year: '2025',
      link: 'https://ohmyblog.autem.dev',
      points: t.raw('projects.ohmyblog.points'),
    },
    {
      title: t('projects.styled.title'),
      year: '2025',
      link: 'https://style-d.autem.dev',
      points: t.raw('projects.styled.points'),
    },
  ],
  formations: [
    {
      title: t('formations.react'),
      institution: 'Zero To Mastery Academy',
      year: '2022',
    },
    { title: t('formations.bootcamp'), institution: 'Colt Steele', year: '2021' },
    {
      title: t('formations.llcer'),
      institution: 'Sorbonne Nouvelle',
      year: '2014',
    },
  ],
  languages: [
    { language: t('languages.en'), level: t('languages.enLevel') },
    { language: t('languages.de'), level: t('languages.deLevel') },
  ],
});