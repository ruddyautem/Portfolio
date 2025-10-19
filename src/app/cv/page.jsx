import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import Image from 'next/image';
import React from 'react';

// Data constants
const SKILLS = [
  'React.js',
  'Next.js',
  'Typescript',
  'AGILE',
  'TailwindCSS',
  'Zustand',
  'Git',
  'Clerk',
  'SCSS',
  'Styled-Components',
  'Firebase',
  'MongoDB',
  'Prisma',
  'MySQL',
  'Node',
  'Express',
];

const CONTACT_DETAILS = [
  {
    icon: 'mailIcon.svg',
    text: 'ruddy.autem@gmail.com',
    link: 'mailto:ruddy.autem@gmail.com',
  },
  { icon: 'locationIcon.svg', text: 'Leers, HDF' },
  { icon: 'linkIcon.svg', text: 'www.autem.dev', link: 'https://autem.dev/' },
  {
    icon: 'githubIcon2.svg',
    text: '/ruddyautem',
    link: 'https://github.com/ruddyautem',
  },
  {
    icon: 'linkedinIcon.svg',
    text: '/ruddyautem',
    link: 'https://www.linkedin.com/in/ruddyautem/',
  },
];

const PROJECTS = [
  {
    title: 'Portfolio VsCode',
    year: '2025',
    link: 'https://www.autem.dev',
    points: [
      "Conception et réalisation d'un portfolio en Next.js entièrement responsive inspiré de l'interface de VSCode.",
      "Intégration de thèmes de couleurs dynamiques améliorant l'attrait visuel et la convivialité.",
      "Ajout d'un service de messagerie performant assurant une prise de contact fluide et efficace.",
    ],
  },
  {
    title: 'OhMyBlog!',
    year: '2025',
    link: 'https://ohmyblog.vercel.app',
    points: [
      "Création d'une plateforme de création de blogs moderne et entièrement responsive avec React 19 et Tailwind CSS 4.1.",
      'Authentification rapide et sécurisée avec Clerk, et API gérées via Express.',
      "Intégration d'ImageKit.io pour l'upload et l'optimisation des images.",
    ],
  },
  {
    title: 'Style-D',
    year: '2025',
    link: 'https://style-d.vercel.app',
    points: [
      "Développement d'une plateforme de E-Commerce entièrement responsive au design vibrant, offrant une expérience d'achat fluide et rapide en quelques clics.",
      "Mise en place d'une authentification Google pour simplifier et accélérer l'inscription et la connexion des utilisateurs.",
      'Intégration des paiements sécurisés via Stripe et création automatisée des factures sur Firebase',
    ],
  },
];

const FORMATIONS = [
  {
    title: 'Complete React Developer, Redux, Hooks',
    institution: 'Zero To Mastery Academy',
    year: '2022',
  },
  {
    title: 'The Web Developer Bootcamp',
    institution: 'Colt Steele',
    year: '2021',
  },
  {
    title: 'Licence LLCER - Langues, littératures et civilisations étrangères et régionales',
    institution: 'Sorbonne Nouvelle',
    year: '2014',
  },
];

const LANGUAGES = [
  { language: 'Anglais', level: 'Courant' },
  { language: 'Allemand', level: 'B1' },
];

const CvDownloadButton = () => (
  <a
    href="/CV.pdf"
    download="Ruddy_Autem_CV.pdf"
    className="inline-flex items-center gap-2 rounded-lg bg-[#192a56] px-4 py-4 text-base sm:text-sm
      xl:text-base font-semibold text-white shadow-lg transition-all duration-300
      hover:bg-[#243a6b]"
  >
    Télécharger
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  </a>
);

const CV = () => (
  <PageWrapper skipChildWrapping>
    <div
      className="3xl:p-20 flex w-full items-center justify-center overflow-x-hidden p-4 sm:p-6
        md:p-8 xl:p-12 2xl:p-16"
    >
      <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-[100rem]">
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
            bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl"
        >
          {/* Decorative header bar */}
          <div
            className="item-animate flex h-12 items-center bg-gradient-to-r from-slate-800/50
              to-slate-900/15 px-6"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
              <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
              <span className="ml-4 text-slate-500">{'// cv.json'}</span>
            </div>
          </div>

          {/* Header Section */}
          <div className="item-animate border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
            {/* <div className="text-accent item-animate mb-4 inline-block rounded-full bg-slate-700/50 px-4 py-1.5 font-mono text-sm 2xl:px-5 2xl:py-2 2xl:text-base">
              CURRICULUM VITAE
            </div> */}
            <h1
              className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl
                2xl:text-6xl"
            >
              Mon <span className="text-accent">CV</span>
            </h1>
            <p
              className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl
                2xl:text-2xl"
            >
              Découvrez mon parcours, mes compétences et mes réalisations en développement web.
            </p>
          </div>

          {/* CV Content */}
          <div className="item-animate p-3 sm:p-8 md:p-10">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6 md:space-y-8">
              {/* Personal Info + About */}
              <div
                className="item-animate relative rounded-xl border border-gray-200 bg-white p-4
                  shadow-md sm:p-8 md:p-10"
              >
                {/* Download Button - Responsive Positioning */}
                <div className="z-10 mb-4 text-center sm:absolute sm:top-2 sm:right-2 sm:mb-0">
                  <CvDownloadButton />
                </div>

                {/* Personal Info Section */}
                <div className="item-animate text-center">
                  <h1
                    className="mb-2 text-4xl font-bold text-[#192a56] sm:mb-3 md:mb-4 md:text-5xl
                      lg:text-7xl"
                  >
                    Ruddy Autem
                  </h1>
                  <h2
                    className="mb-6 text-xl text-[#192a56]/80 italic sm:mb-8 md:text-2xl
                      lg:text-3xl"
                  >
                    Développeur Web Full-Stack
                  </h2>
                </div>

                {/* Contact Details - Unified Layout: Responsive via grid */}
                <div className="item-animate mx-auto max-w-5xl">
                  <div
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3
                      lg:gap-6"
                  >
                    {CONTACT_DETAILS.map((item, index) => (
                      <div
                        key={index}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg p-3
                        transition-colors hover:bg-gray-50 sm:p-4 lg:p-5
                        ${index >= 3 && 'sm:col-span-2 lg:col-span-1'} `}
                      >
                        <div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center
                            rounded-full bg-[#192a56]/10 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                        >
                          <Image src={item.icon} height={16} width={16} alt="" unoptimized />
                        </div>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="truncate text-sm text-gray-800 hover:text-[#192a56]
                              sm:text-base lg:text-lg"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="truncate text-sm text-gray-800 sm:text-base lg:text-lg">
                            {item.text}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div className="item-animate my-8 h-px w-full bg-gray-200 sm:my-10 md:my-12"></div>

                {/* About Section */}
                <div className="item-animate mx-auto max-w-5xl">
                  <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4 md:mb-8">
                    <div className="h-5 w-1.5 rounded bg-[#192a56] sm:h-7"></div>
                    <h3
                      className="text-lg font-bold text-[#192a56] sm:text-xl md:text-2xl
                        lg:text-3xl"
                    >
                      À propos
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg
                      lg:text-xl"
                  >
                    Développeur Web Full-Stack passionné, je conçois des applications fluides,
                    performantes et optimisées pour offrir la meilleure expérience utilisateur.
                    Attentif aux détails et exigeant sur la qualité du code, je m&apos;efforce de
                    proposer des solutions solides et adaptatives.
                    <span className="hidden md:inline">
                      <br />
                      <br />
                      Ma maîtrise du front-end et du back-end garantit une harmonie entre design et
                      efficacité technique. Avide d&apos;innover, j&apos;aborde chaque projet comme
                      une chance d&apos;évoluer et de dépasser les objectifs fixés.
                    </span>
                  </p>
                </div>
              </div>

              {/* Skills Card */}
              <div
                className="item-animate rounded-xl border border-gray-200 bg-white p-4 shadow-md
                  sm:p-6 md:p-8"
              >
                <div className="mx-auto max-w-5xl">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <div className="h-4 w-1 rounded bg-[#192a56] sm:h-6"></div>
                    <h3
                      className="text-base font-bold text-[#192a56] sm:text-lg md:text-xl
                        lg:text-2xl"
                    >
                      Compétences
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    {SKILLS.map((skill) => (
                      <span
                        key={skill}
                        className="item-animate rounded-md bg-[#192a56] px-2 py-1 text-xs
                          font-semibold text-white transition-transform duration-200 hover:scale-105
                          sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Card */}
              <div
                className="item-animate rounded-xl border border-gray-200 bg-white p-4 shadow-md
                  sm:p-6 md:p-8"
              >
                <div className="mx-auto max-w-5xl">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <div className="h-4 w-1 rounded bg-[#192a56] sm:h-6"></div>
                    <h3
                      className="text-base font-bold text-[#192a56] sm:text-lg md:text-xl
                        lg:text-2xl"
                    >
                      Projets
                    </h3>
                  </div>
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {PROJECTS.map((project, index) => (
                      <div
                        key={index}
                        className="item-animate border-l-2 border-[#192a56]/30 pl-3 sm:pl-4 md:pl-6"
                      >
                        <div className="mb-1 flex items-center justify-between sm:mb-2">
                          {project.link ? (
                            <a
                              href={project.link}
                              className="text-xs font-bold text-[#192a56] hover:underline sm:text-sm
                                md:text-base lg:text-lg"
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span
                              className="text-xs font-bold text-[#192a56] sm:text-sm md:text-base
                                lg:text-lg"
                            >
                              {project.title}
                            </span>
                          )}
                          <span
                            className="flex-shrink-0 rounded bg-[#192a56] px-2 py-0.5 text-xs
                              text-white sm:px-3 sm:py-1 sm:text-sm md:text-base"
                          >
                            {project.year}
                          </span>
                        </div>
                        <ul
                          className="mr-12 space-y-1 text-xs text-gray-700 sm:mr-16 sm:space-y-2
                            sm:text-sm md:mr-20 md:text-base"
                        >
                          {project.points.map((point, i) => (
                            <li key={i} className="flex">
                              <span className="mr-1 flex-shrink-0 sm:mr-2">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education + Languages */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                {/* Education Card */}
                <div
                  className="item-animate rounded-xl border border-gray-200 bg-white p-4 shadow-md
                    sm:p-6 md:p-8"
                >
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <div className="h-4 w-1 rounded bg-[#192a56] sm:h-6"></div>
                    <h3
                      className="text-base font-bold text-[#192a56] sm:text-lg md:text-xl
                        lg:text-2xl"
                    >
                      Formations
                    </h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {FORMATIONS.map((formation, index) => (
                      <div
                        key={index}
                        className="item-animate border-b border-gray-100 pb-2 last:border-b-0
                          sm:pb-3"
                      >
                        <p
                          className="mb-1 text-xs font-semibold text-[#192a56] sm:text-sm
                            md:text-base"
                        >
                          {formation.title}
                        </p>
                        <p
                          className="mb-1 text-xs text-gray-600 italic sm:mb-2 sm:text-sm
                            md:text-base"
                        >
                          {formation.institution}
                        </p>
                        <span
                          className="rounded bg-[#192a56] px-2 py-0.5 text-xs text-white sm:px-3
                            sm:py-1 sm:text-sm"
                        >
                          {formation.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Languages Card */}
                <div
                  className="item-animate rounded-xl border border-gray-200 bg-white p-4 shadow-md
                    sm:p-6 md:p-8"
                >
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <div className="h-4 w-1 rounded bg-[#192a56] sm:h-6"></div>
                    <h3
                      className="text-base font-bold text-[#192a56] sm:text-lg md:text-xl
                        lg:text-2xl"
                    >
                      Langues
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {LANGUAGES.map((language, index) => (
                      <div
                        key={index}
                        className="item-animate rounded-lg bg-gray-50 p-2 text-center sm:p-3 md:p-4"
                      >
                        <span
                          className="block text-xs font-semibold text-[#192a56] sm:text-sm
                            md:text-base lg:text-lg"
                        >
                          {language.language}
                        </span>
                        <span className="text-xs text-gray-600 sm:text-sm md:text-base">
                          {language.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* END bottom grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);

export default CV;
