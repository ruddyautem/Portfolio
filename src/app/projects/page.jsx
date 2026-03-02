import Card from '@/components/Card/Card';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import React from 'react';
import { projects } from './projects.js';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';

export const metadata = {
  title: 'Projets Ruddy Autem',
  description: 'Projets Ruddy Autem',
};

const Projects = () => {
  return (
    <PageWrapper skipChildWrapping={true}>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden 
          px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pt-[7.5vh] xl:px-12 xl:pb-12 xl:pt-[7.5vh] 
          2xl:px-16 2xl:pb-16 2xl:pt-[5vh] 3xl:px-20 3xl:pb-20 3xl:pt-[5vh]"
      >
        <div
          className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-400 shadow-2xl"
        >
          <div
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
              bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl"
          >
            <TopPageDecoration filename="projets.js" />

            <div
              className="item-animate border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10"
            >
              <h1
                className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl
                  2xl:text-6xl"
              >
                Mes <span className="text-accent">Projets</span>
              </h1>
              <p
                className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl
                  2xl:text-2xl"
              >
                Mon portfolio en action : des idées transformées en expériences web concrètes.
              </p>
            </div>

            <div className="item-animate p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} project={project} />
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