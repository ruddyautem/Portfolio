'use client';

import { useCallback, useMemo } from 'react';

import { useTranslations } from 'next-intl';
import { getProjects } from '@/app/[locale]/projects/projects';
import HeroSection from './HeroSection';
import TechSection from './TechSection';
import ProjectCarousel from './ProjectCarousel';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';

import { PAGE_OUTER_CLASSES, PAGE_INNER_CLASSES, PAGE_CARD_CLASSES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const HomepageContent = () => {
  const t = useTranslations('homepage');
  const tProjects = useTranslations('projectsData');

  const carouselProjects = useMemo(
    () => getProjects(tProjects).filter((p) => p.featured),
    [tProjects],
  );

  const handleExternalLink = useCallback((e, url) => {
    e.stopPropagation();
    e.preventDefault();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          <TopPageDecoration filename={t('filename')} />

          <div
            className="flex w-full flex-col justify-between p-3 sm:p-6 md:p-8
              lg:flex-1 lg:overflow-y-hidden lg:px-6 lg:py-2.5 xl:p-5 2xl:px-6 2xl:py-4
              3xl:p-12 3xl:pb-10"
          >
            <div
              className="flex w-full min-w-0 flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center
                lg:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-16"
            >
              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-xl 2xl:max-w-2xl 3xl:max-w-2xl">
                  <HeroSection />
                </div>
              </div>

              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-2xl 2xl:max-w-none">
                  <ProjectCarousel
                    carouselProjects={carouselProjects}
                    onExternalLink={handleExternalLink}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 lg:mt-0">
              <TechSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;