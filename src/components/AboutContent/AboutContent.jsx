'use client';
import SkillItem from '@/components/SkillList/SkillList';
import React from 'react';
import { skills } from './skills';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';

const AboutContent = () => {
  const sections = [
    {
      title: 'Frontend',
      data: skills.frontend,
      color: 'bg-accent',
      glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]',
      desc: "Conception d'interfaces réactives, architecture moderne et expériences web performantes.",
      counterLabel: 'technologies',
    },
    {
      title: 'Backend',
      data: skills.backend,
      color: 'bg-purple-500',
      glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.6)]',
      desc: 'Solutions serveur robustes, bases de données SQL/NoSQL et APIs sécurisées.',
      counterLabel: 'technologies',
    },
    {
      title: 'Outils',
      data: skills.tools,
      color: 'bg-emerald-500',
      glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]',
      desc: 'Déploiement continu (CI/CD), gestion de contenu (CMS) et workflow DevOps.',
      counterLabel: 'outils',
    },
  ];

  const renderSkillsSection = (section, index) => {
    const isLast = index === sections.length - 1;

    return (
      <div
        key={section.title}
        className={`item-animate relative flex flex-col items-center gap-8 py-10 sm:py-14
          ${!isLast ? 'border-b border-slate-700/30' : ''}`}
      >
        <div className="z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-5 flex flex-col items-center">
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {section.title}
              </h2>
              <div
                className={`absolute -bottom-2 left-0 h-1 w-full rounded-full ${section.color}
                  ${section.glowClass} opacity-90`}
              />
            </div>
          </div>

          <p className="mb-6 text-sm text-slate-300 sm:text-base">{section.desc}</p>

          <div className="flex justify-center">
            <div
              className="inline-flex items-center rounded-full border border-slate-700/40
                bg-slate-800/30 px-4 py-1.5 font-mono text-xs font-medium text-slate-300
                backdrop-blur-md"
            >
              <span className={`mr-2 h-1.5 w-1.5 rounded-full ${section.color}`} />
              {section.data.length} {section.counterLabel}
            </div>
          </div>
        </div>

        <div className="z-10 w-full">
          <div
            className="grid gap-2 items-stretch"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
          >
            {section.data.map((item, idx) => (
              <SkillItem
                key={idx}
                skill={item.skill}
                icon={item.icon}
                altText={item.skill}
                category={section.title}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageWrapper skipChildWrapping={true}>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden
          px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pt-[7.5vh] xl:px-12 xl:pb-12 xl:pt-[7.5vh]
          2xl:px-16 2xl:pb-16 2xl:pt-[5vh] 3xl:px-20 3xl:pb-20 3xl:pt-[5vh]"
      >
        <div className="relative z-10 flex w-full max-w-7xl flex-col 2xl:max-w-400">
          <div
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
              bg-slate-800/10 shadow-2xl backdrop-blur-xl sm:rounded-3xl"
          >
            <TopPageDecoration filename="profil.html" />

            <div className="flex flex-col items-center p-6 sm:p-8 md:p-10 lg:p-14">
              <div className="item-animate mb-8 max-w-3xl text-center sm:mb-12">
                <h1
                  className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl
                    md:text-5xl 2xl:text-6xl"
                >
                  Stack <span className="text-accent">Technologique</span>
                </h1>
                <p className="text-lg text-slate-300 sm:text-xl 2xl:text-2xl">
                  Un aperçu détaillé de mon environnement de développement, des langages aux outils
                  de déploiement, pour créer des applications modernes.
                </p>
              </div>

              <div
                className="w-full rounded-2xl border border-slate-700/20 bg-slate-800/5 px-4
                  sm:px-10"
              >
                {sections.map((section, index) => renderSkillsSection(section, index))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutContent;
