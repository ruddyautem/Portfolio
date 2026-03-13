import Card from '@/components/Card/Card';
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper';
import React from 'react';
import { getProjects } from './projects.js';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projectsPage' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
  };
}

const Projects = () => {
  const t = useTranslations('projectsPage');
  const tProjects = useTranslations('projectsData');
  
  // Call the function from projects.js passing the translation function
  const projects = getProjects(tProjects);

  return (
    <PageWrapper skipChildWrapping={true}>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden
          px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pt-[7.5vh] xl:px-12 xl:pb-12 xl:pt-[7.5vh]
          2xl:px-16 2xl:pb-16 2xl:pt-[5vh] 3xl:px-20 3xl:pb-20 3xl:pt-[5vh]"
      >
        <div className="relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-400 shadow-2xl">
          <div
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
              bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl"
          >
            <TopPageDecoration filename={t('filename')} />

            <div className="border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
              <h1
                className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl
                  2xl:text-6xl"
              >
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p
                className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl
                  2xl:text-2xl"
              >
                {t('subtitle')}
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
                {projects.map((project) => (
                  <div key={project.id} className="item-animate h-full">
                    <Card project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Projects;