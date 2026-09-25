'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, FileUser, FolderOpen, Mail, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

const NavCard = ({ href, title, desc, icon: Icon }) => (
  <Link
    href={href}
    className="group flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-black/20 lg:gap-4 lg:p-4 xl:gap-4 xl:p-4"
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110 lg:h-10 lg:w-10 xl:h-11 xl:w-11">
      <Icon className="h-5 w-5 lg:h-5 lg:w-5 xl:h-5.5 xl:w-5.5" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-semibold text-white transition-colors group-hover:text-accent lg:text-base xl:text-lg">
        {title}
      </span>
      <span className="mt-0.5 block overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-400 lg:text-sm">
        {desc}
      </span>
    </span>
    <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5" />
  </Link>
);

const HeroSection = () => {
  const t = useTranslations('homepage');
  const navLinks = [
    { href: '/about', title: t('nav.about'), desc: t('nav.aboutDesc'), icon: User },
    { href: '/projects', title: t('nav.projects'), desc: t('nav.projectsDesc'), icon: FolderOpen },
    { href: '/contact', title: t('nav.contact'), desc: t('nav.contactDesc'), icon: Mail },
    { href: '/cv', title: t('nav.cv'), desc: t('nav.cvDesc'), icon: FileUser },
  ];

  return (
    <section className="rounded-2xl border border-slate-700/40 p-5 sm:p-7 lg:p-8 xl:p-10">
      <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left lg:gap-7">
          <div className="w-full max-w-32 shrink-0 sm:max-w-36 lg:max-w-32 xl:max-w-36">
            <div className="relative aspect-square">
              <div className="absolute -inset-2 rounded-[1.8rem] border border-slate-600/50" />
              <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/15 bg-slate-800 shadow-xl shadow-black/30">
                <Image
                  src="/profile.jpg"
                  alt={`${t('name')} ${t('surname')}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 192px, (min-width: 640px) 176px, 160px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-slate-950/30 to-transparent" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-5xl 2xl:text-6xl">
              {t('name')} {t('surname')}
            </h1>
            <p className="mt-3 text-lg font-medium text-accent sm:text-xl xl:text-2xl">{t('title')}</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:justify-self-end lg:text-left">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl xl:text-4xl">
            {t.rich('introTitle', {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base xl:text-lg">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="mt-6 hidden gap-2.5 sm:mt-9 sm:grid sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {navLinks.map((link) => (
          <NavCard key={link.href} {...link} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
