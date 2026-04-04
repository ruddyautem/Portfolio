'use client';

import { useCallback, useMemo } from 'react';

import { useTranslations } from 'next-intl';
import { getProjects } from '@/app/[locale]/projects/projects';
import HeroSection from './HeroSection';
import TechSection from './TechSection';
import ProjectCarousel from './ProjectCarousel';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';

// ============================================================================
// MAIN LAYOUT
// ============================================================================

const HomepageContent = () => {
  const t = useTranslations('homepage');
  const tProjects = useTranslations('projectsData');

  const carouselProjects = useMemo(() => getProjects(tProjects).slice(1, 4), [tProjects]);

  const handleExternalLink = useCallback((e, url) => {
    e.stopPropagation();
    e.preventDefault();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      className="box-border flex h-auto min-h-screen w-full flex-col items-center justify-start
        overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:h-full lg:min-h-0 lg:justify-center
        lg:overflow-hidden lg:p-6 2xl:p-10 3xl:p-16"
    >
      <div
        className="relative z-10 w-full max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl
          3xl:max-w-450"
      >
        <div
          className="flex h-auto w-full max-w-full flex-col overflow-hidden rounded-2xl border
            border-slate-700/50 bg-slate-800/20 shadow-2xl backdrop-blur-xl sm:rounded-3xl lg:h-full
            lg:max-h-[85vh] lg:overflow-y-hidden 2xl:max-h-[90vh] 3xl:max-h-[90vh]"
        >
          <TopPageDecoration filename={t('filename')} />

          <div
            className="flex w-full flex-col justify-start p-4 sm:p-6 md:p-8 lg:flex-1
              lg:justify-between lg:overflow-y-hidden lg:px-6 lg:py-3 xl:p-6 2xl:p-8 2xl:pb-6
              3xl:p-12 3xl:pb-10"
          >
            <div
              className="flex w-full min-w-0 flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center
                lg:gap-2 xl:gap-8 2xl:gap-12 3xl:gap-16"
            >
              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-xl 2xl:max-w-2xl">
                  <HeroSection />
                </div>
              </div>

              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-2xl">
                  <ProjectCarousel
                    carouselProjects={carouselProjects}
                    onExternalLink={handleExternalLink}
                  />
                </div>
              </div>
            </div>

            <TechSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;
