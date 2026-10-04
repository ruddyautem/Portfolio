'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import { getProjects } from '@/app/[locale]/projects/projects';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { ArchiveProjectCard } from './ArchiveProjectCard';
import {
  PAGE_OUTER_CLASSES,
  PAGE_INNER_CLASSES,
  PAGE_CARD_CLASSES,
  SECTION_HEADER_CLASSES,
  HEADING_CLASSES,
  SUBHEADING_CLASSES,
} from '@/lib/constants';

const Projects = () => {
  const t = useTranslations('projectsPage');
  const tProjects = useTranslations('projectsData');

  const allProjects = useMemo(() => getProjects(tProjects), [tProjects]);
  const featuredProjects = useMemo(() => allProjects.filter((p) => p.featured), [allProjects]);
  const otherProjects = useMemo(() => allProjects.filter((p) => !p.featured), [allProjects]);

  return (
    <PageWrapper skipChildWrapping={true}>
      <div className={PAGE_OUTER_CLASSES}>
        <div className={PAGE_INNER_CLASSES}>
          <div className={PAGE_CARD_CLASSES}>
            {/* Page Header */}
            <div className={SECTION_HEADER_CLASSES}>
              <h1 className={HEADING_CLASSES}>
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p className={SUBHEADING_CLASSES}>{t('subtitle')}</p>
            </div>

            <div className="p-3 sm:p-8 md:p-10 lg:p-12">
              {/* Featured Showcase Section */}
              <section aria-label={t('featuredTitle')} className="space-y-6 sm:space-y-12">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                    <span className="text-xs text-slate-600 sm:text-sm">//</span>
                    <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                      {t('featuredEyebrow')}
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-accent/60 sm:w-7" />
                    <h2 className="text-sm font-semibold tracking-wide text-accent sm:text-base lg:text-lg">
                      {t('featuredTitle')}
                    </h2>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm sm:text-base lg:text-lg text-slate-400">
                    {t('featuredSubtitle')}
                  </p>
                </div>

                {/* Alternating Spotlight Cards */}
                <div className="space-y-6 sm:space-y-14">
                  {featuredProjects.map((project, index) => (
                    <FeaturedProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      codeSourceText={t('codeSource')}
                      liveDemoText={t('liveDemo')}
                      architectureTitleText={t('architectureTitle')}
                    />
                  ))}
                </div>
              </section>

              {/* Lab & Other Projects Section */}
              <section
                aria-label={t('otherTitle')}
                className="mt-12 sm:mt-24 border-t border-white/[0.08] pt-8 sm:pt-16"
              >
                <div className="mb-6 sm:mb-8 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2.5 font-mono sm:gap-3">
                    <span className="text-xs text-slate-600 sm:text-sm">//</span>
                    <span className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase sm:text-sm">
                      02
                    </span>
                    <span aria-hidden="true" className="h-px w-5 bg-slate-600 sm:w-7" />
                    <h2 className="text-sm font-semibold tracking-wide text-slate-300 sm:text-base lg:text-lg">
                      {t('otherTitle')}
                    </h2>
                  </div>
                  <p className="mt-1.5 text-[11px] sm:text-sm text-slate-400 max-w-xl">
                    {t('otherSubtitle')}
                  </p>
                </div>

                {/* High-density Lab Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {otherProjects.map((project) => (
                    <ArchiveProjectCard
                      key={project.id}
                      project={project}
                      codeSourceText={t('codeSource')}
                      liveDemoText={t('liveDemo')}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Projects;
