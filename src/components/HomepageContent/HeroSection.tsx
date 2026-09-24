// HeroSection.jsx
'use client';

import { Link } from '@/i18n/routing';
import { FolderOpen, FileUser, User, Mail, Download, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const NavCard = ({ href, title, desc, icon: Icon }) => (
  <Link
    href={href}
    className="group flex w-full items-center gap-3.5 rounded-xl border border-slate-700/60
      bg-slate-800/40 p-3.5 transition-all duration-200 hover:border-accent/40 hover:bg-slate-800/70
      2xl:gap-4 2xl:p-4 3xl:gap-5 3xl:rounded-2xl 3xl:p-5"
  >
    <Icon
      className="h-5 w-5 shrink-0 text-accent transition-transform duration-200
        group-hover:scale-110 2xl:h-5.5 2xl:w-5.5 3xl:h-6.5 3xl:w-6.5"
    />

    <div className="flex min-w-0 flex-1 flex-col text-center sm:text-left">
      <span
        className="text-sm font-semibold text-white transition-colors group-hover:text-accent
          2xl:text-base 3xl:text-lg"
      >
        {title}
      </span>

      <span className="mt-0.5 truncate text-xs text-slate-400 2xl:text-sm 3xl:text-base">
        {desc}
      </span>
    </div>

    <ArrowRight
      className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition-all duration-200
        group-hover:translate-x-0.5 group-hover:text-accent 2xl:h-4.5 2xl:w-4.5 3xl:h-5.5 3xl:w-5.5"
    />
  </Link>
);

const CvButton = ({ label, href, downloadName }) => (
  <div className="mt-5 flex w-full items-center justify-center gap-3 2xl:mt-7 3xl:mt-9">
    <span
      className="h-px flex-1 origin-right scale-x-100 bg-linear-to-r from-transparent
        to-slate-700/70 transition-transform duration-300 group-hover:scale-x-100"
    />

    <a
      href={href}
      download={downloadName}
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 text-xs text-accent transition-colors
        duration-300 xl:text-sm 2xl:text-base 3xl:text-lg"
    >
      <span className="relative inline-flex items-center gap-2">
        <Download
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 xl:h-4 xl:w-4 2xl:h-5
            2xl:w-5 3xl:h-6 3xl:w-6"
        />
        <span className="tracking-wide">{label}</span>
        <span
          className="absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-accent
            transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </a>

    <span
      className="h-px flex-1 origin-left scale-x-100 bg-linear-to-l from-transparent to-slate-700/70
        transition-transform duration-300 group-hover:scale-x-100"
    />
  </div>
);

const HeroSection = () => {
  const t = useTranslations('homepage');

  const NAV_LINKS = [
    {
      href: '/about',
      title: t('nav.about'),
      desc: t('nav.aboutDesc'),
      icon: User,
    },
    {
      href: '/projects',
      title: t('nav.projects'),
      desc: t('nav.projectsDesc'),
      icon: FolderOpen,
    },
    {
      href: '/contact',
      title: t('nav.contact'),
      desc: t('nav.contactDesc'),
      icon: Mail,
    },
    {
      href: '/cv',
      title: t('nav.cv'),
      desc: t('nav.cvDesc'),
      icon: FileUser,
    },
  ];

  return (
    <div className="w-full pt-3 text-center lg:pt-0">
      {/* Intro */}
      <div className="mb-3 flex w-full flex-col items-center lg:mb-4 xl:mb-5 2xl:mb-7 3xl:mb-10">
        <div
          className="mb-2.5 inline-block max-w-full truncate rounded-full bg-slate-700/50 px-2.5
            py-1 font-mono text-[10px] text-accent lg:px-3 lg:text-xs xl:px-4 xl:py-1.5 xl:text-sm
            2xl:mb-4 2xl:px-5 2xl:py-2 2xl:text-base 3xl:mb-5 3xl:px-7 3xl:py-3 3xl:text-xl"
        >
          {t('badge')}
        </div>

        <h1
          className="mb-2 w-full text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:mb-3
            lg:text-4xl xl:text-5xl 2xl:mb-4 2xl:text-6xl 3xl:mb-5 3xl:text-8xl"
        >
          {t('name')} <span className="text-accent">{t('surname')}</span>
        </h1>

        <p
          className="w-full text-center text-base text-slate-300 sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl
            3xl:text-4xl"
        >
          {t('title')}
        </p>
      </div>

      {/* Description */}
      <p
        className="mx-auto mb-4 w-full max-w-md text-center text-xs leading-relaxed text-slate-300 sm:text-sm
          lg:mb-4 lg:max-w-lg lg:text-sm xl:mb-5 xl:max-w-xl xl:text-base 2xl:mb-7 2xl:max-w-2xl
          2xl:text-lg 3xl:mb-9 3xl:max-w-4xl 3xl:text-2xl"
      >
        {t('description')}
      </p>

      {/* Navigation – side by side (all 4 on large screens) */}
      <div
        className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 xl:gap-3
          2xl:gap-4 3xl:gap-5"
      >
        {NAV_LINKS.map((link) => (
          <NavCard key={link.href} {...link} />
        ))}
      </div>

      {/* CV */}
      <CvButton label={t('downloadCv')} href={t('cvFile')} downloadName={t('cvFileName')} />
    </div>
  );
};

export default HeroSection;
