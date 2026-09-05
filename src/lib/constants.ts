export const LANGUAGES = [
  { code: 'fr', label: 'FR', title: 'Français', flag: '/fr.svg' },
  { code: 'en', label: 'EN', title: 'English', flag: '/en.svg' },
];
 
export const THEME_OPTIONS = [
  'ayu',
  'oneDarkPro',
  'dracula',
  'poimandres',
];

export const THEME_LABELS: Record<string, string> = {
  ayu: 'Ayu',
  oneDarkPro: 'One Dark Pro',
  dracula: 'Dracula',
  poimandres: 'Poimandres',
};

export const THEME_DOT_COLORS: Record<string, string> = {
  ayu: 'bg-[#ffcc66]',
  oneDarkPro: 'bg-[#98c379]',
  dracula: 'bg-[#ff79c6]',
  poimandres: 'bg-[#5de4c7]',
};
 
// ──────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'home', link: '/' },
  { id: 'about', link: '/about' },
  { id: 'projects', link: '/projects' },
  { id: 'contact', link: '/contact' },
  { id: 'cv', link: '/cv' },
  { id: 'settings', link: '/settings' },
];
 
// Icons for the Sidebar (VS Code activity-bar style)
export const SIDEBAR_NAV_ICONS: Record<string, string> = {
  home: '/files.svg',
  about: '/code.svg',
  projects: '/source-control.svg',
  contact: '/email.svg',
  cv: '/cv-sidebar.svg',
  settings: '/settings-gear.svg',
};
 
// Icons for the Tabsbar (file-type tab icons)
export const TABS_NAV_ICONS: Record<string, string> = {
  home: '/jsx.svg',
  about: '/html5.svg',
  projects: '/js.svg',
  contact: '/css.svg',
  cv: '/cv.svg',
  settings: '/settings-gear.svg',
};

export const BOTTOM_SIDEBAR_ITEMS = [
  { id: 'accounts', icon: '/account.svg' },
];
 
// ──────────────────────────────────────────────
// Project tag color mappings (used in ProjectCarousel and Card)
// ──────────────────────────────────────────────
export const TAG_COLORS_CAROUSEL = {
  react: 'bg-blue-500',
  tailwindcss: 'bg-cyan-500',
  nextjs: 'bg-slate-400',
  express: 'bg-green-600',
  redux: 'bg-purple-600',
  firebase: 'bg-orange-500',
  'styled-components': 'bg-pink-500',
  'material-ui': 'bg-blue-600',
  mysql: 'bg-orange-600',
  axios: 'bg-blue-400',
  clerk: 'bg-indigo-600',
  sanity: 'bg-red-500',
  typescript: 'bg-blue-700',
  zustand: 'bg-amber-600',
  javascript: 'bg-yellow-500',
  stripe: 'bg-violet-500',
  zod: 'bg-blue-600',
  shadcn: 'bg-zinc-600',
  bun: 'bg-amber-700',
  elysia: 'bg-purple-600',
  redis: 'bg-red-600',
  drizzle: 'bg-emerald-500',
  postgresql: 'bg-sky-600',
  vite: 'bg-purple-500',
  'aws-s3': 'bg-amber-600',
};
 
export const TAG_COLORS_CARD = {
  react: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  tailwindcss: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
  nextjs: 'bg-gray-500/20 border-gray-500/30 text-gray-300',
  express: 'bg-green-600/20 border-green-600/30 text-green-300',
  redux: 'bg-purple-600/20 border-purple-600/30 text-purple-300',
  firebase: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
  'styled-components': 'bg-pink-500/20 border-pink-500/30 text-pink-300',
  'material-ui': 'bg-blue-600/20 border-blue-600/30 text-blue-300',
  mysql: 'bg-orange-600/20 border-orange-600/30 text-orange-300',
  axios: 'bg-blue-400/20 border-blue-400/30 text-blue-300',
  clerk: 'bg-indigo-600/20 border-indigo-600/30 text-indigo-300',
  sanity: 'bg-red-500/20 border-red-500/30 text-red-300',
  typescript: 'bg-blue-700/20 border-blue-700/30 text-blue-300',
  zustand: 'bg-amber-600/20 border-amber-600/30 text-amber-300',
  javascript: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
  stripe: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
  zod: 'bg-blue-600/20 border-blue-600/30 text-blue-300',
  shadcn: 'bg-zinc-600/20 border-zinc-500/30 text-zinc-300',
  bun: 'bg-amber-700/20 border-amber-600/30 text-amber-300',
  elysia: 'bg-purple-600/20 border-purple-600/30 text-purple-300',
  redis: 'bg-red-600/20 border-red-600/30 text-red-300',
  drizzle: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
  postgresql: 'bg-sky-600/20 border-sky-600/30 text-sky-300',
  vite: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
  'aws-s3': 'bg-amber-600/20 border-amber-600/30 text-amber-300',
};
 
// ──────────────────────────────────────────────
// Common page layout styles reused by About, Projects, Contact pages
// ──────────────────────────────────────────────
export const PAGE_OUTER_CLASSES =
  'flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden' +
  ' px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pt-[7.5vh] xl:px-12 xl:pb-12 xl:pt-[7.5vh]' +
  ' 2xl:px-16 2xl:pb-16 2xl:pt-[5vh] 3xl:px-20 3xl:pb-20 3xl:pt-[5vh]';
 
export const PAGE_INNER_CLASSES =
  'relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-400 shadow-2xl';
 
// Reduced for single-column pages (e.g. CV)
export const PAGE_INNER_NARROW_CLASSES =
  'relative z-10 w-full max-w-400';
 
export const PAGE_CARD_CLASSES =
  'flex flex-col overflow-hidden rounded-2xl border border-slate-700/50' +
  ' bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl';
 
// Section heading with title + subtitle (used by About, Projects, Contact)
export const SECTION_HEADER_CLASSES =
  'border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10';
 
export const HEADING_CLASSES =
  'item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl 2xl:text-6xl';
 
export const SUBHEADING_CLASSES =
  'item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl 2xl:text-2xl';
