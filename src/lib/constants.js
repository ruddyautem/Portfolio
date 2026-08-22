export const LANGUAGES = [
  { code: 'en', label: 'EN', title: 'English', flag: '/en.svg' },
  { code: 'fr', label: 'FR', title: 'Français', flag: '/fr.svg' },
];
 
export const THEME_OPTIONS = ['ayu', 'oneDarkPro', 'dracula', 'poimandres'];
 
export const THEME_DOT_COLORS = {
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
];
 
// Icons for the Sidebar (VS Code activity-bar style)
export const SIDEBAR_NAV_ICONS = {
  home: '/files.svg',
  about: '/code.svg',
  projects: '/source-control.svg',
  contact: '/email.svg',
  cv: '/cv-sidebar.svg',
};
 
// Icons for the Tabsbar (file-type tab icons)
export const TABS_NAV_ICONS = {
  home: '/jsx.svg',
  about: '/html5.svg',
  projects: '/js.svg',
  contact: '/css.svg',
  cv: '/cv.svg',
};
 
// Bottom sidebar items aren't navigable pages, so they carry
// their own icon directly instead of going through a lookup map.
export const BOTTOM_SIDEBAR_ITEMS = [
  { id: 'accounts', icon: '/account.svg' },
  { id: 'settings', icon: '/settings-gear.svg' },
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
 
