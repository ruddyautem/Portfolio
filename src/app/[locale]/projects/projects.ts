export interface Project {
  id: number;
  title: string;
  badge?: string;
  img: string;
  desc: string;
  shortDesc: string;
  tags: string[];
  source: string;
  demo: string;
  displayUrl: string;
  featured: boolean;
  category: 'fullstack' | 'nextjs' | 'react';
  categories: ('fullstack' | 'nextjs' | 'react')[];
  highlights?: string[];
  themeColor?: {
    glow: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: 'Temporis',
    badge: t('temporis.badge'),
    img: '/temporis.png',
    desc: t('temporis.desc'),
    shortDesc: t('temporis.shortDesc'),
    tags: ['nextjs', 'typescript', 'elysia', 'redis', 'tailwindcss', 'zod'],
    source: 'https://github.com/ruddyautem/temporis',
    demo: 'https://temporis.autem.dev',
    displayUrl: 'temporis.autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'nextjs'],
    highlights: [t('temporis.h1'), t('temporis.h2'), t('temporis.h3')],
  },
  {
    id: 2,
    title: 'DressCode',
    badge: t('dresscode.badge'),
    img: '/dresscode.png',
    desc: t('dresscode.desc'),
    shortDesc: t('dresscode.shortDesc'),
    tags: ['nextjs', 'typescript', 'sanity', 'clerk', 'stripe', 'zustand', 'zod', 'shadcn'],
    source: 'https://github.com/ruddyautem/DressCode',
    demo: 'https://dresscode.autem.dev',
    displayUrl: 'dresscode.autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'nextjs'],
    highlights: [t('dresscode.h1'), t('dresscode.h2'), t('dresscode.h3')],
  },
  {
    id: 3,
    title: 'Style-D',
    badge: t('styled.badge'),
    img: '/styled.jpg',
    desc: t('styled.desc'),
    shortDesc: t('styled.shortDesc'),
    tags: ['react', 'vite', 'zustand', 'firebase', 'stripe', 'styled-components'],
    source: 'https://github.com/ruddyautem/style-D/',
    demo: 'https://style-d.autem.dev',
    displayUrl: 'style-d.autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'react'],
    highlights: [t('styled.h1'), t('styled.h2'), t('styled.h3')],
  },
  {
    id: 4,
    title: 'Stokki',
    badge: t('stokki.badge'),
    img: '/stokki.png',
    desc: t('stokki.desc'),
    shortDesc: t('stokki.shortDesc'),
    tags: ['nextjs', 'typescript', 'prisma', 'tailwindcss', 'zod'],
    source: 'https://github.com/ruddyautem/stokki',
    demo: 'https://stokki.autem.dev',
    displayUrl: 'stokki.autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'nextjs'],
    highlights: [t('stokki.h1'), t('stokki.h2'), t('stokki.h3')],
  },
  {
    id: 5,
    title: 'Portfolio',
    badge: t('portfolio.badge'),
    img: '/portfolio.png',
    desc: t('portfolio.desc'),
    shortDesc: t('portfolio.shortDesc'),
    tags: ['nextjs', 'typescript', 'tailwindcss', 'react'],
    source: 'https://github.com/ruddyautem/Portfolio',
    demo: 'https://autem.dev',
    displayUrl: 'autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'nextjs'],
    highlights: [t('portfolio.h1'), t('portfolio.h2'), t('portfolio.h3')],
  },
  {
    id: 6,
    title: 'OhMyBlog!',
    badge: t('ohmyblog.badge'),
    img: '/ohmyblog.png',
    desc: t('ohmyblog.desc'),
    shortDesc: t('ohmyblog.shortDesc'),
    tags: ['nextjs', 'typescript', 'tailwindcss', 'drizzle', 'clerk', 'zod'],
    source: 'https://github.com/ruddyautem/ohmyblog/',
    demo: 'https://ohmyblog.autem.dev',
    displayUrl: 'ohmyblog.autem.dev',
    featured: true,
    category: 'fullstack',
    categories: ['fullstack', 'nextjs'],
    highlights: [t('ohmyblog.h1'), t('ohmyblog.h2'), t('ohmyblog.h3')],
  },
  {
    id: 7,
    title: 'Mytasky',
    img: '/mytasky.png',
    desc: t('mytasky.desc'),
    shortDesc: t('mytasky.shortDesc'),
    tags: ['nextjs', 'typescript', 'tailwindcss', 'react'],
    source: 'https://github.com/ruddyautem/mytasky',
    demo: 'https://mytasky.autem.dev',
    displayUrl: 'mytasky.autem.dev',
    featured: false,
    category: 'nextjs',
    categories: ['nextjs'],
  },
  {
    id: 8,
    title: 'Laxxy',
    img: '/laxxy.png',
    desc: t('laxxy.desc'),
    shortDesc: t('laxxy.shortDesc'),
    tags: ['react', 'vite', 'redux', 'firebase', 'material-ui', 'styled-components'],
    source: 'https://github.com/ruddyautem/laxxy',
    demo: 'https://laxxy.autem.dev',
    displayUrl: 'laxxy.autem.dev',
    featured: false,
    category: 'fullstack',
    categories: ['fullstack', 'react'],
  },
  {
    id: 9,
    title: 'CoolMail',
    img: '/coolmail.png',
    desc: t('coolmail.desc'),
    shortDesc: t('coolmail.shortDesc'),
    tags: ['react', 'vite', 'redux', 'firebase', 'material-ui'],
    source: 'https://github.com/ruddyautem/CoolMail',
    demo: 'https://coolmail.autem.dev',
    displayUrl: 'coolmail.autem.dev',
    featured: false,
    category: 'fullstack',
    categories: ['fullstack', 'react'],
  },
  {
    id: 10,
    title: 'GPT-3',
    img: '/gpt3.jpg',
    desc: t('gpt3.desc'),
    shortDesc: t('gpt3.shortDesc'),
    tags: ['react'],
    source: 'https://github.com/ruddyautem/gpt3',
    demo: 'https://gpt3.autem.dev',
    displayUrl: 'gpt3.autem.dev',
    featured: false,
    category: 'react',
    categories: ['react'],
  },
];
