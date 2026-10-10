'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LoadingImage } from '@/components/Loading/LoadingImage';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  MapPin,
  FolderOpen,
  Mail,
  Download,
  Layers,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SkillItem from '@/components/SkillList/SkillList';
import { skills } from './skills';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import {
  PAGE_OUTER_CLASSES,
  PAGE_INNER_CLASSES,
  PAGE_CARD_CLASSES,
  SECTION_HEADER_CLASSES,
  HEADING_CLASSES,
  SUBHEADING_CLASSES,
} from '@/lib/constants';

type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools';

const AboutContent = () => {
  const t = useTranslations('about');
  const tHome = useTranslations('homepage');

  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');

  // Unified skills list with category tags for smooth filtering
  const allSkillsList = useMemo(() => {
    return [
      ...skills.frontend.map((item) => ({ ...item, category: 'frontend' as const })),
      ...skills.backend.map((item) => ({ ...item, category: 'backend' as const })),
      ...skills.tools.map((item) => ({ ...item, category: 'tools' as const })),
    ];
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeFilter === 'all') return allSkillsList;
    return allSkillsList.filter((item) => item.category === activeFilter);
  }, [activeFilter, allSkillsList]);

  const engineeringPillars = [
    {
      icon: Layers,
      title: t('pillar1Title'),
      desc: t('pillar1Desc'),
      glow: 'from-sky-500/15 via-blue-500/10 to-transparent',
      borderHover: 'hover:border-sky-400/50',
      badgeStyle: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
    },
    {
      icon: Zap,
      title: t('pillar2Title'),
      desc: t('pillar2Desc'),
      glow: 'from-amber-500/15 via-yellow-500/10 to-transparent',
      borderHover: 'hover:border-amber-400/50',
      badgeStyle: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    },
    {
      icon: ShieldCheck,
      title: t('pillar3Title'),
      desc: t('pillar3Desc'),
      glow: 'from-purple-500/15 via-fuchsia-500/10 to-transparent',
      borderHover: 'hover:border-purple-400/50',
      badgeStyle: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
    },
    {
      icon: Sparkles,
      title: t('pillar4Title'),
      desc: t('pillar4Desc'),
      glow: 'from-emerald-500/15 via-teal-500/10 to-transparent',
      borderHover: 'hover:border-emerald-400/50',
      badgeStyle: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    },
  ];

  return (
    <PageWrapper skipChildWrapping={true}>
      <div className={PAGE_OUTER_CLASSES}>
        <div className={PAGE_INNER_CLASSES}>
          <div className={PAGE_CARD_CLASSES}>
            {/* Main Header */}
            <header className={SECTION_HEADER_CLASSES}>
              <h1 className={HEADING_CLASSES}>
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p className={SUBHEADING_CLASSES}>{t('subtitle')}</p>
            </header>

            <div className="flex flex-col gap-10 p-3.5 sm:gap-12 sm:p-8 md:p-10 lg:gap-14 lg:p-12">
              {/* ============================================================
                  SECTION 1: Developer Profile & VS Code Snapshot (Bento Grid)
                 ============================================================ */}
              <section
                aria-label={t('ariaProfileSection')}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch"
              >
                {/* Left Card (7 cols): Bio Narrative, Metrics & CTAs */}
                <div className="flex flex-col justify-between overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-5 sm:p-7 lg:col-span-7">
                  <div>
                    {/* Header: Photo + Identity + Location */}
                    <div className="flex flex-col items-center gap-4 border-b border-slate-700/50 pb-6 text-center sm:flex-row sm:items-start sm:text-left">
                      <div className="relative shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-accent/40 shadow-lg shadow-accent/10 sm:h-24 sm:w-24">
                          <LoadingImage
                            src="/profile.jpg"
                            alt="Ruddy Autem"
                            fill
                            sizes="96px"
                            priority
                            className="object-cover object-top"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl xl:text-3xl">
                          Ruddy Autem
                        </h2>
                        <p className="mt-0.5 font-mono text-xs font-semibold text-accent sm:text-sm xl:text-base">
                          {t('role')}
                        </p>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs text-slate-400 xl:text-sm">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          <span>{t('location')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio Text */}
                    <div className="space-y-3.5 pt-5 text-center text-xs leading-relaxed text-slate-300 sm:text-left sm:text-sm xl:text-[15px] 2xl:text-base">
                      <h3 className="text-sm font-semibold text-white sm:text-base xl:text-lg">
                        {t('bioTitle')}
                      </h3>
                      <p>{t('bioP1')}</p>
                      <p>{t('bioP2')}</p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                      <div className="rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 text-center xl:p-3">
                        <div className="font-mono text-sm font-bold text-accent sm:text-base xl:text-lg">
                          {t('metricProjects')}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400 sm:text-xs xl:text-[13px]">
                          {t('metricProjectsDesc')}
                        </div>
                      </div>

                      <div className="rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 text-center xl:p-3">
                        <div className="font-mono text-sm font-bold text-emerald-400 sm:text-base xl:text-lg">
                          {t('metricTypeSafe')}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400 sm:text-xs xl:text-[13px]">
                          {t('metricTypeSafeDesc')}
                        </div>
                      </div>

                      <div className="rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 text-center xl:p-3">
                        <div className="font-mono text-sm font-bold text-sky-400 sm:text-base xl:text-lg">
                          {t('metricFullstack')}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400 sm:text-xs xl:text-[13px]">
                          {t('metricFullstackDesc')}
                        </div>
                      </div>

                      <div className="rounded-[10px] border border-white/8 bg-(--theme-bg) p-2.5 text-center xl:p-3">
                        <div className="font-mono text-sm font-bold text-purple-400 sm:text-base xl:text-lg">
                          {t('metricBilingual')}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400 sm:text-xs xl:text-[13px]">
                          {t('metricBilingualDesc')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 border-t border-slate-700/50 pt-5 sm:justify-start">
                    <Link
                      href="/projects"
                      className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-white/8 bg-(--theme-bg) px-4 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/14 sm:h-10 sm:flex-initial sm:text-sm xl:h-11 xl:px-5 xl:text-[15px]"
                    >
                      <FolderOpen className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                      <span>{t('btnProjects')}</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-white/8 bg-(--theme-bg) px-4 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/14 sm:h-10 sm:flex-initial sm:text-sm xl:h-11 xl:px-5 xl:text-[15px]"
                    >
                      <Mail className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                      <span>{t('btnContact')}</span>
                    </Link>

                    <a
                      href={tHome('cvFile')}
                      download={tHome('cvFileName')}
                      rel="noopener noreferrer"
                      className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 text-xs font-semibold text-slate-950 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-accent/20 sm:h-10 sm:flex-initial sm:text-sm xl:h-11 xl:px-5 xl:text-[15px]"
                    >
                      <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{t('btnDownloadCv')}</span>
                    </a>
                  </div>
                </div>

                {/* Right Card (5 cols): VS Code Code Card with matching background */}
                <div className="flex flex-col justify-between overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-5 sm:p-7 lg:col-span-5">
                  <div className="-mt-2 -ml-2 flex h-6 items-start justify-start">
                    <div className="flex items-center gap-1 font-mono text-[10px] text-slate-200 xl:text-xs">
                      <Image
                        src="/typescript.svg"
                        alt="TypeScript"
                        width={13}
                        height={13}
                        className="h-3 w-3"
                      />
                      <span>{t('configFilename')}</span>
                    </div>
                  </div>

                  {/* Code Editor Body */}
                  <div className="about-code-editor -mx-5 mt-3 flex-1 overflow-x-auto py-1 font-mono text-xs leading-relaxed sm:-mx-7 sm:text-sm xl:text-[14px] 2xl:text-[15px]">
                    <div className="grid grid-cols-[4rem_minmax(0,1fr)]">
                      <aside aria-hidden="true" className="border-r border-white/8 select-none">
                        <div className="mb-3 flex w-full items-center justify-center text-center font-inconsolata text-[14.5px] text-[#787f8d]">
                          1
                        </div>
                        <div className="space-y-1.5">
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((line) => (
                            <div
                              key={line}
                              className="flex w-full items-center justify-center text-center font-inconsolata text-[14.5px] text-[#787f8d]"
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </aside>

                      <div className="pl-3">
                        <div className="mb-3 text-xs text-slate-400 italic sm:text-[13px] xl:text-[14px]">
                          {t('configComment')}
                        </div>

                        <div className="space-y-1.5">
                          <div>
                            <span className="font-semibold text-purple-300">export const</span>{' '}
                            <span className="font-semibold text-sky-300">developer</span>:{' '}
                            <span className="font-semibold text-teal-300">DeveloperProfile</span> =
                            &#123;
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">name:</span>{' '}
                            <span className="text-emerald-300">&apos;Ruddy Autem&apos;</span>,
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">role:</span>{' '}
                            <span className="text-emerald-300">&apos;{t('configRole')}&apos;</span>,
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">location:</span>{' '}
                            <span className="text-emerald-300">
                              &apos;{t('configLocation')}&apos;
                            </span>
                            ,
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">core:</span> [
                            <span className="text-amber-300">&apos;Next.js&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;React&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;TypeScript&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Node.js&apos;</span>
                            ],
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">databases:</span> [
                            <span className="text-amber-300">&apos;PostgreSQL&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Drizzle&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Prisma&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Redis&apos;</span>
                            ],
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">tooling:</span> [
                            <span className="text-amber-300">&apos;TailwindCSS&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Zod&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Clerk&apos;</span>,{' '}
                            <span className="text-amber-300">&apos;Cursor&apos;</span>
                            ],
                          </div>

                          <div className="pl-4">
                            <span className="font-medium text-slate-200">focus:</span>{' '}
                            <span className="text-emerald-300">&apos;{t('configFocus')}&apos;</span>
                            ,
                          </div>

                          <div>&#125;;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ============================================================
                  SECTION 2: Engineering Pillars & Methodology (2x2 Bento)
                  ============================================================ */}
              <section aria-label={t('pillarsTitle')}>
                <div className="mb-6 text-center sm:mb-8 sm:text-left">
                  <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                    <span className="text-xs text-slate-600 sm:text-sm">//</span>
                    <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                      02
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-accent/60 sm:w-7" />
                    <h2 className="text-sm font-semibold tracking-wide text-accent sm:text-base xl:text-lg">
                      {t('pillarsTitle')}
                    </h2>
                  </div>
                  <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-400 sm:mx-0 sm:text-sm xl:text-base">
                    {t('pillarsSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                  {engineeringPillars.map((pillar, idx) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div
                        key={idx}
                        className={`group relative overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) p-5 transition-all duration-300 sm:p-6 ${pillar.borderHover} hover:-translate-y-1`}
                      >
                        {/* Accent decoration */}
                        <div
                          className={`pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-linear-to-br ${pillar.glow} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                          aria-hidden="true"
                        />

                        <div className="relative z-10 flex flex-col items-center gap-3.5 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${pillar.badgeStyle}`}
                          >
                            <PillarIcon className="h-5 w-5" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-white transition-colors group-hover:text-accent sm:text-base xl:text-lg">
                              {pillar.title}
                            </h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm xl:text-[15px]">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ============================================================
                  SECTION 3: Tech Stack & Tools (Interactive Explorer)
                  ============================================================ */}
              <section aria-label={t('stackTitle')}>
                <div className="mb-6 flex flex-col items-center justify-between gap-4 text-center sm:mb-8 sm:flex-row sm:text-left">
                  <div>
                    <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                      <span className="text-xs text-slate-600 sm:text-sm">//</span>
                      <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                        03
                      </span>
                      <span aria-hidden="true" className="h-px w-5 bg-accent/60 sm:w-7" />
                      <h2 className="text-sm font-semibold tracking-wide text-accent sm:text-base xl:text-lg">
                        {t('stackTitle')}
                      </h2>
                    </div>
                    <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-400 sm:mx-0 sm:text-sm xl:text-base">
                      {t('stackSubtitle')}
                    </p>
                  </div>

                  {/* Clean Category Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label={t('ariaFilterSkills')}
                    className="flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 p-1.5 backdrop-blur-md"
                  >
                    {[
                      {
                        id: 'all',
                        label: t('filterAll'),
                        count: allSkillsList.length,
                        dot: 'bg-accent',
                        countStyle: 'bg-blue-100 text-blue-700',
                      },
                      {
                        id: 'frontend',
                        label: t('filterFrontend'),
                        count: skills.frontend.length,
                        dot: 'bg-blue-400',
                      },
                      {
                        id: 'backend',
                        label: t('filterBackend'),
                        count: skills.backend.length,
                        dot: 'bg-purple-400',
                      },
                      {
                        id: 'tools',
                        label: t('filterTools'),
                        count: skills.tools.length,
                        dot: 'bg-emerald-400',
                      },
                    ].map((tab) => {
                      const isActive = activeFilter === tab.id;
                      return (
                        <motion.button
                          key={tab.id}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveFilter(tab.id as SkillCategory)}
                          className={`relative flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs transition-all duration-200 xl:text-sm ${
                            isActive
                              ? 'font-bold text-slate-950'
                              : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="skill-filter-indicator"
                              className="absolute inset-0 rounded-lg bg-accent shadow-sm shadow-accent/20"
                              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            />
                          )}
                          <span
                            className={`relative h-1.5 w-1.5 rounded-full ${isActive ? 'bg-slate-950' : tab.dot}`}
                          />
                          <span className="relative">{tab.label}</span>
                          <span
                            className={`skill-filter-count py-0.2 relative rounded-full px-1.5 text-[10px] xl:text-xs ${
                              isActive ? 'bg-white/25 text-white' : tab.countStyle
                            }`}
                          >
                            {tab.count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Skills Grid: Sub-grouped by category when "all", single grid when filtered */}
                {activeFilter === 'all' ? (
                  <div className="space-y-8">
                    {[
                      {
                        key: 'frontend',
                        title: t('frontend.title'),
                        desc: t('frontend.desc'),
                        dot: 'bg-blue-400',
                        accentText: 'text-blue-400',
                        borderSubtle: 'border-blue-500/20',
                        countStyle: 'bg-sky-100 text-sky-700',
                        items: skills.frontend,
                        category: 'frontend' as const,
                      },
                      {
                        key: 'backend',
                        title: t('backend.title'),
                        desc: t('backend.desc'),
                        dot: 'bg-purple-400',
                        accentText: 'text-purple-400',
                        borderSubtle: 'border-purple-500/20',
                        countStyle: 'bg-purple-100 text-purple-700',
                        items: skills.backend,
                        category: 'backend' as const,
                      },
                      {
                        key: 'tools',
                        title: t('tools.title'),
                        desc: t('tools.desc'),
                        dot: 'bg-emerald-400',
                        accentText: 'text-emerald-400',
                        borderSubtle: 'border-emerald-500/20',
                        countStyle: 'bg-emerald-100 text-emerald-700',
                        items: skills.tools,
                        category: 'tools' as const,
                      },
                    ].map((group) => (
                      <div key={group.key} className="space-y-3.5">
                        {/* Sub-section Header */}
                        <div className="flex items-center justify-center gap-3 sm:justify-start">
                          <div className="h-px flex-1 bg-linear-to-l from-slate-700/60 to-transparent sm:hidden" />
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${group.dot}`} />
                            <h3 className="text-sm font-bold tracking-tight text-white sm:text-base xl:text-lg">
                              {group.title}
                            </h3>
                            <span
                              className={`skill-group-count skill-group-count--${group.key} rounded-full border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 font-mono text-[10px] text-slate-400 xl:text-xs`}
                            >
                              {group.items.length}
                            </span>
                          </div>
                          <div className="h-px flex-1 bg-linear-to-r from-slate-700/60 to-transparent" />
                        </div>

                        {/* Sub-section Cards Grid */}
                        <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                          {group.items.map((item, idx) => (
                            <SkillItem
                              key={`${item.skill}-${idx}`}
                              skill={item.skill}
                              icon={item.icon}
                              altText={item.skill}
                              category={group.category}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                    {filteredSkills.map((item, idx) => (
                      <SkillItem
                        key={`${item.skill}-${idx}`}
                        skill={item.skill}
                        icon={item.icon}
                        altText={item.skill}
                        category={item.category}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutContent;
