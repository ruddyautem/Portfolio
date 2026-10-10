'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslations } from 'next-intl';
import ContactForm from '../ContactForm/ContactForm';
import { GithubIcon } from '@/components/Icons/Icons';
import { Mail, Clock, MapPin, ExternalLink } from 'lucide-react';

const LinkedinIcon = ({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);
import {
  PAGE_OUTER_CLASSES,
  PAGE_INNER_CLASSES,
  PAGE_CARD_CLASSES,
  SECTION_HEADER_CLASSES,
  HEADING_CLASSES,
  SUBHEADING_CLASSES,
} from '@/lib/constants';

interface SocialChannelCardProps {
  name: string;
  href: string;
  displayUrl: string;
  description: string;
  icon: React.ReactNode;
  themeClasses: {
    badge: string;
    borderHover: string;
    glow: string;
  };
  mobileActionLabel?: string;
}

const SocialChannelCard = memo(
  ({
    name,
    href,
    displayUrl,
    description,
    icon,
    themeClasses,
    mobileActionLabel,
  }: SocialChannelCardProps) => {
    const isMailto = href.startsWith('mailto:');
    return (
      <a
        href={href}
        target={isMailto ? '_self' : '_blank'}
        rel={isMailto ? undefined : 'noopener noreferrer'}
        className={`group relative block w-[calc((100%-0.5rem)/2)] cursor-pointer overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 transition-all duration-300 select-none hover:border-white/14 sm:w-[calc((100%-1.5rem)/3)] sm:p-3.5 xl:flex xl:w-full xl:flex-1 xl:flex-col xl:justify-center xl:p-5 ${themeClasses.borderHover}`}
      >
        <div
          className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full xl:h-32 xl:w-32 ${themeClasses.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
          aria-hidden="true"
        />

        {/* Mobile/Tablet View (< xl): Compact Tile */}
        <div className="flex h-full flex-col items-center justify-between gap-2 text-center xl:hidden">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl ${themeClasses.badge}`}
          >
            {icon}
          </div>

          <div className="w-full">
            <h3 className="truncate text-xs font-semibold text-white sm:text-sm">{name}</h3>
          </div>

          <div className="inline-flex w-full max-w-50 items-center justify-center gap-1 rounded-md border border-slate-700/60 px-1 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-accent/40 group-hover:text-accent sm:max-w-none sm:text-xs">
            <span>{mobileActionLabel ?? (isMailto ? 'Écrire' : 'Ouvrir')}</span>
            <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </div>
        </div>

        {/* Desktop View (xl:): Rich Horizontal Card */}
        <div className="hidden items-center gap-4 text-left xl:flex xl:flex-row xl:gap-5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 xl:h-14 xl:w-14 xl:rounded-2xl ${themeClasses.badge}`}
          >
            {icon}
          </div>

          <div className="w-full min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="block text-sm leading-tight font-semibold text-white sm:text-base xl:text-lg">
                {name}
              </h3>
            </div>

            <p className="mt-0.5 line-clamp-1 font-mono text-xs text-slate-400 sm:text-sm xl:mt-1 xl:text-sm">
              {description}
            </p>

            <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 transition-colors group-hover:text-accent xl:text-sm">
              <span className="max-w-50 truncate sm:max-w-xs xl:max-w-sm">{displayUrl}</span>
              <ExternalLink className="h-3 w-3 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 xl:h-3.5 xl:w-3.5" />
            </div>
          </div>
        </div>
      </a>
    );
  },
);
SocialChannelCard.displayName = 'SocialChannelCard';

const ContactList = () => {
  const t = useTranslations('contact');

  const [defaultRightHeight, setDefaultRightHeight] = useState<number | null>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (window.innerWidth >= 1280 && rightCardRef.current) {
        const textarea = rightCardRef.current.querySelector('textarea');
        if (!textarea || !textarea.style.height) {
          setDefaultRightHeight(rightCardRef.current.offsetHeight);
        }
      } else {
        setDefaultRightHeight(null);
      }
    };

    measure();
    const timer = setTimeout(measure, 50);

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          {/* Section Header */}
          <div className={SECTION_HEADER_CLASSES}>
            <h1 className={HEADING_CLASSES}>
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h1>
            <p className={SUBHEADING_CLASSES}>{t('subtitle')}</p>
          </div>

          {/* Content Grid */}
          <div className="p-3 sm:p-8 md:p-10 xl:p-12">
            <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 xl:grid-cols-12">
              {/* Left Column: Direct Channels & Reassurance (5 cols on xl) */}
              <div className="flex flex-col xl:col-span-5">
                <div className="mb-2 flex items-center justify-center sm:mb-3 xl:justify-start">
                  <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                    <span className="text-xs text-slate-600 sm:text-sm">//</span>
                    <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                      01
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-accent/60 sm:w-7" />
                    <h2 className="text-sm font-semibold tracking-wide text-accent sm:text-base lg:text-lg">
                      {t('networksTitle')}
                    </h2>
                  </div>
                </div>

                {/* 5 Units Cards Container: dynamic height on xl to perfectly align with right panel */}
                <div
                  className="flex flex-col gap-2.5 sm:gap-3 xl:gap-3.5"
                  style={defaultRightHeight ? { height: `${defaultRightHeight}px` } : undefined}
                >
                  {/* 5 Units Cards Container: 2 per line on mobile (< sm), 3 on row 1 + 2 on row 2 on tablet, stacked on desktop */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 xl:contents">
                    {/* Email Card */}
                    <SocialChannelCard
                      name="Email"
                      href="mailto:ruddy.autem@gmail.com"
                      displayUrl="ruddy.autem@gmail.com"
                      description={t('socials.email')}
                      icon={<Mail className="h-5 w-5 text-rose-400 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />}
                      themeClasses={{
                        badge: 'border-rose-400/30 bg-rose-500/15 text-rose-300',
                        borderHover: 'hover:border-rose-400/50',
                        glow: 'bg-rose-500/15',
                      }}
                      mobileActionLabel="Écrire"
                    />

                    {/* LinkedIn Card */}
                    <SocialChannelCard
                      name="LinkedIn"
                      href="https://www.linkedin.com/in/ruddyautem/"
                      displayUrl="linkedin.com/in/ruddyautem"
                      description={t('socials.linkedin')}
                      icon={
                        <LinkedinIcon className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
                      }
                      themeClasses={{
                        badge: 'border-sky-400/30 bg-sky-500/15 text-sky-300',
                        borderHover: 'hover:border-sky-400/50',
                        glow: 'bg-sky-500/15',
                      }}
                      mobileActionLabel="Profil"
                    />

                    {/* GitHub Card */}
                    <SocialChannelCard
                      name="GitHub"
                      href="https://github.com/ruddyautem"
                      displayUrl="github.com/ruddyautem"
                      description={t('socials.github')}
                      icon={
                        <GithubIcon className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
                      }
                      themeClasses={{
                        badge: 'border-purple-400/30 bg-purple-500/15 text-purple-300',
                        borderHover: 'hover:border-purple-400/50',
                        glow: 'bg-purple-500/15',
                      }}
                      mobileActionLabel="Code"
                    />

                    {/* Response Time Card */}
                    <div className="group relative w-[calc((100%-0.5rem)/2)] overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 transition-all duration-300 select-none hover:border-emerald-500/50 sm:w-[calc((100%-1.5rem)/3)] sm:p-3.5 xl:flex xl:w-full xl:flex-1 xl:flex-col xl:justify-center xl:p-5">
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-500/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 xl:h-32 xl:w-32"
                        aria-hidden="true"
                      />

                      {/* Mobile View (< xl): Compact Tile */}
                      <div className="flex h-full flex-col items-center justify-between gap-2 text-center xl:hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl">
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="w-full">
                          <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
                            {t('responseTime')}
                          </h3>
                        </div>
                        <div className="inline-flex w-full max-w-50 items-center justify-center gap-1 rounded-md border border-slate-700/60 px-1 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-accent/40 group-hover:text-accent sm:max-w-none sm:text-xs">
                          <span>{t('hours24')}</span>
                        </div>
                      </div>

                      {/* Desktop View (xl:): Horizontal Left-Aligned, Vertically Centered */}
                      <div className="hidden w-full items-center gap-4 text-left xl:flex xl:flex-row xl:gap-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 xl:h-14 xl:w-14 xl:rounded-2xl">
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
                        </div>
                        <div className="w-full min-w-0 flex-1">
                          <h3 className="block text-sm leading-tight font-semibold text-white sm:text-base xl:text-lg">
                            {t('responseTime')}
                          </h3>
                          <p className="mt-0.5 font-mono text-xs text-slate-400 sm:text-sm xl:mt-1 xl:text-sm">
                            {t('hours24')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="group relative w-[calc((100%-0.5rem)/2)] overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 transition-all duration-300 select-none hover:border-sky-500/50 sm:w-[calc((100%-1.5rem)/3)] sm:p-3.5 xl:flex xl:w-full xl:flex-1 xl:flex-col xl:justify-center xl:p-5">
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-sky-500/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 xl:h-32 xl:w-32"
                        aria-hidden="true"
                      />

                      {/* Mobile View (< xl): Compact Tile */}
                      <div className="flex h-full flex-col items-center justify-between gap-2 text-center xl:hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/15 text-sky-400 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl">
                          <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="w-full">
                          <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
                            {t('location')}
                          </h3>
                        </div>
                        <div className="inline-flex w-full max-w-50 items-center justify-center gap-1 rounded-md border border-slate-700/60 px-1 py-1 font-mono text-[10px] text-slate-300 transition-colors group-hover:border-accent/40 group-hover:text-accent sm:max-w-none sm:text-xs">
                          <span>{t('locationDetail')}</span>
                        </div>
                      </div>

                      {/* Desktop View (xl:): Horizontal Left-Aligned, Vertically Centered */}
                      <div className="hidden w-full items-center gap-4 text-left xl:flex xl:flex-row xl:gap-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/15 text-sky-400 shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 xl:h-14 xl:w-14 xl:rounded-2xl">
                          <MapPin className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
                        </div>
                        <div className="w-full min-w-0 flex-1">
                          <h3 className="block text-sm leading-tight font-semibold text-white sm:text-base xl:text-lg">
                            {t('location')}
                          </h3>
                          <p className="mt-0.5 font-mono text-xs text-slate-400 sm:text-sm xl:mt-1 xl:text-sm">
                            {t('locationDetail')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Tech Terminal Contact Form (7 cols on xl) */}
              <div className="xl:col-span-7">
                <div className="mb-2 flex items-center justify-center sm:mb-3 xl:justify-start">
                  <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                    <span className="text-xs text-slate-600 sm:text-sm">//</span>
                    <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                      02
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-accent/60 sm:w-7" />
                    <h2 className="text-sm font-semibold tracking-wide text-accent sm:text-base lg:text-lg">
                      {t('sendMessageTitle')}
                    </h2>
                  </div>
                </div>

                <div ref={rightCardRef}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="portfolio-toast"
        progressClassName="portfolio-toast__progress"
      />
    </div>
  );
};

export default ContactList;
