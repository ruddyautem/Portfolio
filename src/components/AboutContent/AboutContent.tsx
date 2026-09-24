'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
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
  Code2,
} from 'lucide-react';
import SkillItem from '@/components/SkillList/SkillList';
import { skills } from './skills';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';
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
  const tTabs = useTranslations('tabsbar');

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
            <TopPageDecoration filename={tTabs('about')} />

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
                <div
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border
                    border-slate-700/60 bg-slate-800/25 p-5 shadow-xl backdrop-blur-xl sm:p-7
                    lg:col-span-7"
                >
                  <div>
                    {/* Header: Photo + Identity + Location */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left pb-6 border-b border-slate-700/50">
                      <div className="relative shrink-0">
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-accent/40 shadow-lg shadow-accent/10">
                          <Image
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
                        <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-white">
                          Ruddy Autem
                        </h2>
                        <p className="font-mono text-xs sm:text-sm xl:text-base font-semibold text-accent mt-0.5">
                          {t('role')}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs xl:text-sm text-slate-400 font-mono mt-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{t('location')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio Text */}
                    <div className="pt-5 space-y-3.5 text-xs sm:text-sm xl:text-[15px] 2xl:text-base leading-relaxed text-slate-300 text-center sm:text-left">
                      <h3 className="text-sm sm:text-base xl:text-lg font-semibold text-white">
                        {t('bioTitle')}
                      </h3>
                      <p>{t('bioP1')}</p>
                      <p>{t('bioP2')}</p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                      <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-2.5 xl:p-3 text-center">
                        <div className="font-mono text-sm sm:text-base xl:text-lg font-bold text-accent">
                          {t('metricProjects')}
                        </div>
                        <div className="text-[10px] sm:text-xs xl:text-[13px] text-slate-400 font-mono mt-0.5">
                          {t('metricProjectsDesc')}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-2.5 xl:p-3 text-center">
                        <div className="font-mono text-sm sm:text-base xl:text-lg font-bold text-emerald-400">
                          {t('metricTypeSafe')}
                        </div>
                        <div className="text-[10px] sm:text-xs xl:text-[13px] text-slate-400 font-mono mt-0.5">
                          {t('metricTypeSafeDesc')}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-2.5 xl:p-3 text-center">
                        <div className="font-mono text-sm sm:text-base xl:text-lg font-bold text-sky-400">
                          {t('metricFullstack')}
                        </div>
                        <div className="text-[10px] sm:text-xs xl:text-[13px] text-slate-400 font-mono mt-0.5">
                          {t('metricFullstackDesc')}
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-2.5 xl:p-3 text-center">
                        <div className="font-mono text-sm sm:text-base xl:text-lg font-bold text-purple-400">
                          {t('metricBilingual')}
                        </div>
                        <div className="text-[10px] sm:text-xs xl:text-[13px] text-slate-400 font-mono mt-0.5">
                          {t('metricBilingualDesc')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-5 border-t border-slate-700/50">
                    <Link
                      href="/projects"
                      className="inline-flex h-9 sm:h-10 xl:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl
                        border border-slate-600 bg-slate-800/60 px-4 xl:px-5 text-xs sm:text-sm xl:text-[15px] font-semibold text-white
                        transition-all duration-200 hover:border-slate-500 hover:bg-slate-700/50
                        hover:-translate-y-0.5"
                    >
                      <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                      <span>{t('btnProjects')}</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex h-9 sm:h-10 xl:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl
                        border border-slate-600 bg-slate-800/60 px-4 xl:px-5 text-xs sm:text-sm xl:text-[15px] font-semibold text-white
                        transition-all duration-200 hover:border-slate-500 hover:bg-slate-700/50
                        hover:-translate-y-0.5"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                      <span>{t('btnContact')}</span>
                    </Link>

                    <a
                      href={tHome('cvFile')}
                      download={tHome('cvFileName')}
                      rel="noopener noreferrer"
                      className="inline-flex h-9 sm:h-10 xl:h-11 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl
                        bg-accent px-4 xl:px-5 text-xs sm:text-sm xl:text-[15px] font-semibold text-slate-950 shadow-md transition-all
                        duration-200 hover:bg-accent/90 hover:shadow-accent/20 hover:-translate-y-0.5"
                    >
                      <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>{t('btnDownloadCv')}</span>
                    </a>
                  </div>
                </div>

                {/* Right Card (5 cols): VS Code Code Card with matching background */}
                <div
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60
                    bg-slate-800/25 p-5 shadow-xl backdrop-blur-xl sm:p-7 lg:col-span-5"
                >
                  {/* Window Bar */}
                  <div className="relative flex h-9 items-center justify-between border-b border-slate-700/50 pb-3 mb-4">
                    <div className="flex items-center gap-1.5 z-10">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>

                    {/* Centered Tab filename */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/60 px-2.5 py-1 font-mono text-xs xl:text-sm text-slate-200 border border-slate-700/60">
                        <Image
                          src="/typescript.svg"
                          alt="TypeScript"
                          width={13}
                          height={13}
                          className="h-3.5 w-3.5"
                        />
                        <span>{t('configFilename')}</span>
                      </div>
                    </div>

                    {/* Right Spacer for symmetry */}
                    <div className="w-12" aria-hidden="true" />
                  </div>

                  {/* Code Editor Body */}
                  <div className="flex-1 overflow-x-auto font-mono text-xs sm:text-sm xl:text-[14px] 2xl:text-[15px] leading-relaxed py-1">
                    <div className="text-slate-400 italic mb-3 text-xs sm:text-[13px] xl:text-[14px]">
                      {t('configComment')}
                    </div>

                    <div className="space-y-1.5">
                      <div>
                        <span className="text-purple-300 font-semibold">export const</span>{' '}
                        <span className="text-sky-300 font-semibold">developer</span>:{' '}
                        <span className="text-teal-300 font-semibold">DeveloperProfile</span> = &#123;
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">name:</span>{' '}
                        <span className="text-emerald-300">&apos;Ruddy Autem&apos;</span>,
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">role:</span>{' '}
                        <span className="text-emerald-300">&apos;{t('configRole')}&apos;</span>,
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">location:</span>{' '}
                        <span className="text-emerald-300">&apos;{t('configLocation')}&apos;</span>,
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">core:</span> [
                        <span className="text-amber-300">&apos;Next.js&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;React&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;TypeScript&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Node.js&apos;</span>
                        ],
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">databases:</span> [
                        <span className="text-amber-300">&apos;PostgreSQL&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Drizzle&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Prisma&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Redis&apos;</span>
                        ],
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">tooling:</span> [
                        <span className="text-amber-300">&apos;TailwindCSS&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Zod&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Clerk&apos;</span>,{' '}
                        <span className="text-amber-300">&apos;Cursor&apos;</span>
                        ],
                      </div>

                      <div className="pl-4">
                        <span className="text-slate-200 font-medium">focus:</span>{' '}
                        <span className="text-emerald-300">&apos;{t('configFocus')}&apos;</span>,
                      </div>

                      <div>&#125;;</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ============================================================
                  SECTION 2: Engineering Pillars & Methodology (2x2 Bento)
                  ============================================================ */}
              <section aria-label={t('pillarsTitle')}>
                <div className="mb-6 sm:mb-8 text-center sm:text-left">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-700
                      bg-slate-800/60 px-3 py-0.5 text-[11px] sm:text-xs xl:text-sm font-mono font-semibold uppercase tracking-wider
                      text-slate-300 mb-2"
                  >
                    <Code2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
                    {t('pillarsBadge')}
                  </div>
                  <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-white">
                    {t('pillarsTitle')}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm xl:text-base text-slate-400 max-w-2xl mx-auto sm:mx-0">
                    {t('pillarsSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                  {engineeringPillars.map((pillar, idx) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div
                        key={idx}
                        className={`group relative overflow-hidden rounded-2xl border border-slate-700/50
                          bg-slate-800/20 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300
                          ${pillar.borderHover} hover:bg-slate-800/35 hover:-translate-y-1 hover:shadow-lg`}
                      >
                        {/* Ambient glow */}
                        <div
                          className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full
                            bg-linear-to-br ${pillar.glow} opacity-0 blur-2xl transition-opacity duration-300
                            group-hover:opacity-100`}
                          aria-hidden="true"
                        />

                        <div className="relative z-10 flex flex-col items-center sm:flex-row sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left">
                          <div
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center
                              rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105
                              ${pillar.badgeStyle}`}
                          >
                            <PillarIcon className="h-5 w-5" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base xl:text-lg font-bold text-white transition-colors group-hover:text-accent">
                              {pillar.title}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm xl:text-[15px] leading-relaxed text-slate-300">
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
                <div className="mb-6 sm:mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                  <div>
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-700
                        bg-slate-800/60 px-3 py-0.5 text-[11px] sm:text-xs xl:text-sm font-mono font-semibold uppercase tracking-wider
                        text-slate-300 mb-2"
                    >
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent" />
                      {t('stackBadge')}
                    </div>
                    <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-white">
                      {t('stackTitle')}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm xl:text-base text-slate-400 max-w-2xl mx-auto sm:mx-0">
                      {t('stackSubtitle')}
                    </p>
                  </div>

                  {/* Clean Category Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label={t('ariaFilterSkills')}
                    className="flex flex-wrap items-center justify-center gap-1.5 rounded-xl border
                      border-slate-700/60 bg-slate-800/40 p-1.5 backdrop-blur-md"
                  >
                    {[
                      { id: 'all', label: t('filterAll'), count: allSkillsList.length, dot: 'bg-accent' },
                      { id: 'frontend', label: t('filterFrontend'), count: skills.frontend.length, dot: 'bg-blue-400' },
                      { id: 'backend', label: t('filterBackend'), count: skills.backend.length, dot: 'bg-purple-400' },
                      { id: 'tools', label: t('filterTools'), count: skills.tools.length, dot: 'bg-emerald-400' },
                    ].map((tab) => {
                      const isActive = activeFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveFilter(tab.id as SkillCategory)}
                          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs xl:text-sm font-mono
                            transition-all duration-200 cursor-pointer ${
                              isActive
                                ? 'bg-accent text-slate-950 font-bold shadow-sm shadow-accent/20'
                                : 'text-slate-400 hover:bg-slate-700/40 hover:text-white'
                            }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-slate-950' : tab.dot}`} />
                          <span>{tab.label}</span>
                          <span
                            className={`rounded-full px-1.5 py-0.2 text-[10px] xl:text-xs ${
                              isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700/50 text-slate-400'
                            }`}
                          >
                            {tab.count}
                          </span>
                        </button>
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
                        items: skills.tools,
                        category: 'tools' as const,
                      },
                    ].map((group) => (
                      <div key={group.key} className="space-y-3.5">
                        {/* Sub-section Header */}
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="h-px flex-1 bg-linear-to-l from-slate-700/60 to-transparent sm:hidden" />
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${group.dot}`} />
                            <h3 className="text-sm sm:text-base xl:text-lg font-bold text-white tracking-tight">
                              {group.title}
                            </h3>
                            <span className="rounded-full bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[10px] xl:text-xs font-mono text-slate-400">
                              {group.items.length}
                            </span>
                          </div>
                          <div className="h-px flex-1 bg-linear-to-r from-slate-700/60 to-transparent" />
                        </div>

                        {/* Sub-section Cards Grid */}
                        <div className="grid grid-cols-2 gap-2.5 items-stretch sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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
                  <div className="grid grid-cols-2 gap-2.5 items-stretch sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
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
