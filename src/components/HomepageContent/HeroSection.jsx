// HeroSection.jsx
'use client';

import { Link } from '@/i18n/routing';
import {
  Code2,
  Globe,
  Layers,
  Sparkles,
  MapPin,
  FolderOpen,
  User,
  Mail,
  Download,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const NavCard = ({ href, label, icon: Icon }) => (
  <Link
    href={href}
    className="group relative flex flex-1 flex-col items-center justify-center gap-2.5 rounded-xl
      border border-slate-700/80 bg-slate-800/40 px-3 py-6 shadow-md transition-all duration-300
      hover:border-accent hover:bg-slate-800/80 hover:shadow-accent/10 active:scale-[0.98] xl:py-7
      2xl:py-8"
  >
    <div
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700/50 text-accent
        transition-colors duration-300 group-hover:bg-accent group-hover:text-slate-950 xl:h-10
        xl:w-10"
    >
      <Icon className="h-4.5 w-4.5 xl:h-5 xl:w-5" />
    </div>
    <span
      className="text-xs font-semibold text-slate-200 transition-colors duration-300
        group-hover:text-white xl:text-sm 2xl:text-base"
    >
      {label}
    </span>
  </Link>
);

const CvButton = ({ label, href, downloadName }) => (
  <div className="item-animate mt-7 flex w-full items-center justify-center gap-3 2xl:mt-9">
    <span className="h-px flex-1 bg-linear-to-r from-transparent to-slate-600/60" />
    <a
      href={href}
      download={downloadName}
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 text-xs text-accent transition-colors
        duration-300 sm:text-base xl:text-sm 2xl:text-base 3xl:text-lg"
    >
      <span
        className="absolute -bottom-0.5 left-1/2 h-px w-0 bg-accent transition-all duration-300
          group-hover:w-1/2"
      />
      <span
        className="absolute -bottom-0.5 right-1/2 h-px w-0 bg-accent transition-all duration-300
          group-hover:w-1/2"
      />
      <Download
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 xl:h-4 xl:w-4 2xl:h-5
          2xl:w-5"
      />
      <span className="tracking-wide">{label}</span>
    </a>
    <span className="h-px flex-1 bg-linear-to-l from-transparent to-slate-600/60" />
  </div>
);

const HeroSection = () => {
  const t = useTranslations('homepage');

  const NAV_LINKS = [
    { href: '/projects', label: t('nav.projects'), icon: FolderOpen },
    { href: '/about', label: t('nav.about'), icon: User },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  const SKILL_PILLS = [
    { icon: Code2, label: t('skills.fullstack') },
    { icon: Globe, label: t('skills.webMobile') },
    { icon: Layers, label: t('skills.uiux') },
    { icon: Sparkles, label: t('skills.stack') },
  ];

  return (
    <div className="w-full pt-3 text-center lg:pt-0">
      <div className="mb-4 flex w-full flex-col items-center lg:mb-4 xl:mb-5 2xl:mb-7">
        <div
          className="item-animate mb-4 inline-block max-w-full truncate rounded-full bg-slate-700/50
            px-2 py-1 font-mono text-[10px] text-accent lg:px-3 lg:text-xs xl:text-sm 2xl:px-4
            2xl:py-2 2xl:text-base 3xl:px-6 3xl:py-3 3xl:text-xl"
        >
          {t('badge')}
        </div>
        <h1
          className="item-animate mb-4 w-full truncate text-2xl font-bold tracking-tight
            sm:text-3xl lg:mb-3 lg:text-lg xl:text-2xl 2xl:mb-4 2xl:text-4xl 3xl:text-6xl"
        >
          {t('name')} <span className="text-accent">{t('surname')}</span>
        </h1>
        <p
          className="item-animate mb-5 w-full truncate text-base text-slate-300 sm:text-lg
            lg:mb-4 lg:text-sm xl:text-lg 2xl:mb-5 2xl:text-2xl 3xl:text-4xl"
        >
          {t('title')}
        </p>
      </div>
      <p
        className="item-animate mx-auto mb-6 w-full max-w-md text-xs text-slate-300 sm:text-sm
          lg:mb-4 lg:max-w-xs lg:text-xs xl:max-w-md xl:text-base 2xl:mb-6 2xl:max-w-2xl
          2xl:leading-relaxed 2xl:text-lg 3xl:max-w-3xl 3xl:text-2xl"
      >
        {t('description')}
      </p>
      <div
        className="item-animate mb-6 flex flex-wrap justify-center gap-2 lg:mb-4 lg:gap-1.5
          xl:gap-2 2xl:mb-6 2xl:gap-2.5"
      >
        {SKILL_PILLS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="group flex cursor-default items-center gap-1.5 rounded-lg border
              border-slate-600/70 bg-slate-800/20 px-3 py-1.5 text-xs font-medium text-slate-300
              transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/40
              hover:text-white lg:px-2 lg:py-1 lg:text-[9px] xl:px-3 xl:py-1.5 xl:text-[11px]
              2xl:px-3.5 2xl:py-1.5 2xl:text-xs 3xl:px-5 3xl:py-2 3xl:text-sm"
          >
            <Icon
              className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300
                group-hover:scale-110 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 2xl:h-4 2xl:w-4 3xl:h-5
                3xl:w-5"
            />
            {label}
          </span>
        ))}
      </div>
      <div className="item-animate mb-6 flex justify-center lg:mb-4 2xl:mb-6">
        <span
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 lg:text-[10px]
            xl:text-xs 2xl:text-sm 3xl:text-base"
        >
          <MapPin
            className="h-3.5 w-3.5 shrink-0 text-slate-400 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5
              2xl:h-4 2xl:w-4"
          />
          {t('location')}
        </span>
      </div>
      <div className="item-animate grid w-full grid-cols-3 gap-2.5 xl:gap-3 2xl:gap-3.5">
        {NAV_LINKS.map((link) => (
          <NavCard key={link.href} {...link} />
        ))}
      </div>
      <CvButton label={t('downloadCv')} href={t('cvFile')} downloadName={t('cvFileName')} />
    </div>
  );
};

export default HeroSection;