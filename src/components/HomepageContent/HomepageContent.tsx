'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getProjects } from '@/app/[locale]/projects/projects';
import HeroSection from './HeroSection';
import TechSection from './TechSection';
import ProjectSpotlight from './ProjectSpotlight';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';

import { PAGE_OUTER_CLASSES, PAGE_INNER_CLASSES, PAGE_CARD_CLASSES } from '@/lib/constants';

const HomepageContent = () => {
  const t = useTranslations('homepage');
  const tProjects = useTranslations('projectsData');

  const featuredProjects = useMemo(
    () => getProjects(tProjects).filter((p) => p.featured),
    [tProjects],
  );

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          <TopPageDecoration filename={t('filename')} />

          <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12 p-4 sm:p-7 md:p-9 lg:p-10 xl:p-12">
            {/* Top Section: Hero (Identity, intro, skills & actions) */}
            <div className="w-full">
              <HeroSection />
            </div>

            {/* Middle Section: Project Carousel / Spotlight */}
            <div className="w-full">
              <ProjectSpotlight projects={featuredProjects} t={t} />
            </div>

            {/* Bottom Section: Technologies Logo Ribbon */}
            <div className="w-full pt-2">
              <TechSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;