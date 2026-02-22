import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import Image from 'next/image';
import React from 'react';

const SKILL_GROUPS = [
  {
    label: 'Front-end',
    skills: [
      'React.js',
      'Next.js',
      'Vue.js',
      'Typescript',
      'TailwindCSS',
      'SCSS',
      'Styled-Components',
    ],
  },
  {
    label: 'Back-end',
    skills: ['Node', 'Express', 'Firebase', 'MongoDB', 'Prisma', 'MySQL'],
  },
  {
    label: 'Outils',
    skills: ['Git', 'Zustand', 'Clerk', 'AGILE'],
  },
];

const CONTACT_DETAILS = [
  { icon: 'mailIcon.svg', text: 'ruddy.autem@gmail.com', link: 'mailto:ruddy.autem@gmail.com' },
  { icon: 'locationIcon.svg', text: 'Leers, HDF' },
  { icon: 'linkIcon.svg', text: 'www.autem.dev', link: 'https://autem.dev/' },
  { icon: 'githubIcon2.svg', text: '/ruddyautem', link: 'https://github.com/ruddyautem' },
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
      'Intégration des paiements sécurisés via Stripe et création automatisée des factures sur Firebase.',
    ],
  },
];

const FORMATIONS = [
  {
    title: 'Complete React Developer, Redux, Hooks',
    institution: 'Zero To Mastery Academy',
    year: '2022',
  },
  { title: 'The Web Developer Bootcamp', institution: 'Colt Steele', year: '2021' },
  {
    title: 'Licence LLCER — Langues, littératures et civilisations étrangères et régionales',
    institution: 'Sorbonne Nouvelle',
    year: '2014',
  },
];

const LANGUAGES = [
  { language: 'Anglais', level: 'Courant' },
  { language: 'Allemand', level: 'B1' },
];

/* ─── MICRO-COMPONENTS ─── */

const SectionTitle = ({ children }) => (
  <div className="mb-6 flex flex-col items-center gap-2 sm:items-start md:mb-8">
    <h3
      className="text-base font-extrabold uppercase tracking-widest text-[#192a56] sm:text-lg
        md:text-xl lg:text-2xl"
    >
      {children}
    </h3>
    <div className="h-1 w-12 rounded-full bg-[#192a56] opacity-80 sm:w-16" />
  </div>
);

const Card = ({ children, className = '' }) => (
  <div
    className={`item-animate rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CvDownloadButton = ({ className = '' }) => (
  <a
    href="/CV.pdf"
    download="Ruddy_Autem_CV.pdf"
    className={`inline-flex items-center rounded-xl bg-[#192a56] px-6 py-3 text-sm font-semibold
      text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#243a6b]
      hover:shadow-lg md:text-base ${className}`}
  >
    Télécharger CV
  </a>
);

const ContactBadge = ({ item }) => {
  const cls =
    'flex items-center gap-2 rounded-full border border-[#192a56]/15 bg-[#192a56]/5 px-3 py-1.5 text-xs text-[#192a56] sm:text-sm md:px-4 md:py-2 md:text-base';
  const content = (
    <>
      <Image src={item.icon} height={14} width={14} alt="" unoptimized className="shrink-0" />
      <span className="break-all">{item.text}</span>
    </>
  );
  return item.link ? (
    <a href={item.link} className={`${cls} transition-colors hover:bg-[#192a56]/10`}>
      {content}
    </a>
  ) : (
    <span className={cls}>{content}</span>
  );
};

/* ─── PROJECT TITLE — shared between <a> and <span> ─── */
const projectTitleCls = 'text-xl font-extrabold text-[#192a56] sm:text-lg sm:font-bold md:text-xl';

/* ─── MAIN COMPONENT ─── */

const CV = () => (
  <PageWrapper skipChildWrapping>
    <div
      className="3xl:p-20 flex w-full items-start justify-center overflow-x-hidden p-4 sm:p-6 md:p-8
        xl:p-12 2xl:p-16"
    >
      <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-350">
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
            bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl"
        >
          {/* Traffic-light bar */}
          <div
            className="flex h-12 items-center bg-linear-to-r from-slate-800/50 to-slate-900/15 px-6"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-slate-500">{'// cv.json'}</span>
            </div>
          </div>

          {/* Page title */}
          <div className="border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
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

          {/* Content */}
          <div className="item-animate p-3 sm:p-8 md:p-10">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6 md:space-y-8">
              {/* ════════════ HERO ════════════ */}
              <Card className="overflow-hidden">
                <div
                  className="relative flex flex-col items-center px-6 py-8 text-center sm:px-8
                    sm:py-10 md:px-12 md:py-12"
                >
                  <h1
                    className="text-4xl font-extrabold leading-tight text-[#192a56] sm:text-5xl
                      md:text-6xl lg:text-7xl"
                  >
                    Ruddy Autem
                  </h1>
                  <p
                    className="mt-3 text-lg font-medium italic text-[#192a56]/60 sm:text-xl
                      md:text-2xl lg:text-3xl"
                  >
                    Développeur Web Full-Stack
                  </p>
                  <div
                    className="mt-6 flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3 md:mt-8"
                  >
                    {CONTACT_DETAILS.map((item, i) => (
                      <ContactBadge key={i} item={item} />
                    ))}
                  </div>
                  <CvDownloadButton className="mt-8 xl:absolute xl:right-10 xl:top-10 xl:mt-0" />
                </div>

                <div className="mx-6 h-px bg-gray-100 sm:mx-8 md:mx-12" />

                <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
                  <SectionTitle>À propos</SectionTitle>
                  <p
                    className="text-center text-sm leading-relaxed text-gray-600 sm:text-left
                      sm:text-base md:text-lg lg:text-xl"
                  >
                    Développeur Web Full-Stack passionné, je conçois des applications fluides,
                    performantes et optimisées pour offrir la meilleure expérience utilisateur.
                    Attentif aux détails et exigeant sur la qualité du code, je m&apos;efforce de
                    proposer des solutions solides et adaptatives.
                  </p>
                  <p
                    className="mt-4 hidden text-left text-sm leading-relaxed text-gray-600
                      sm:text-base md:block md:text-lg lg:text-xl"
                  >
                    Ma maîtrise du front-end et du back-end garantit une harmonie entre design et
                    efficacité technique. Avide d&apos;innover, j&apos;aborde chaque projet comme
                    une chance d&apos;évoluer et de dépasser les objectifs fixés.
                  </p>
                </div>
              </Card>

              {/* ════════════ SKILLS ════════════ */}
              <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                <SectionTitle>Compétences</SectionTitle>
                <div className="space-y-3 sm:space-y-4">
                  {SKILL_GROUPS.map((group) => (
                    <div
                      key={group.label}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <span
                        className="w-full shrink-0 text-center text-[10px] font-bold uppercase
                          tracking-widest text-[#192a56]/40 sm:w-20 sm:text-left sm:text-xs md:w-24"
                      >
                        {group.label}
                      </span>
                      <div className="hidden w-px self-stretch bg-[#192a56]/10 sm:block" />
                      <div
                        className="flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2
                          md:gap-2.5"
                      >
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="item-animate cursor-pointer rounded-lg bg-[#192a56] px-3 py-1
                              text-xs font-semibold text-white transition-all duration-200
                              hover:scale-105 hover:bg-[#243a6b] sm:py-1.5 md:px-4 md:py-2
                              md:text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ════════════ PROJECTS ════════════ */}
              <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                <SectionTitle>Projets</SectionTitle>
                <div className="space-y-6 sm:space-y-8">
                  {PROJECTS.map((project, i) => (
                    <div key={i} className="item-animate">
                      <div
                        className="mb-3 flex flex-col items-center gap-1.5 text-center sm:flex-row
                          sm:items-center sm:justify-between sm:gap-3 sm:text-left"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span
                            className="hidden h-2 w-2 shrink-0 rounded-full bg-[#192a56] sm:block
                              md:h-2.5 md:w-2.5"
                          />
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${projectTitleCls} hover:underline`}
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span className={projectTitleCls}>{project.title}</span>
                          )}
                        </div>
                        <span
                          className="shrink-0 rounded-full bg-[#192a56] px-3 py-0.5 text-xs
                            font-semibold text-white sm:text-sm md:px-4 md:py-1 md:text-base"
                        >
                          {project.year}
                        </span>
                      </div>
                      <ul className="space-y-2 sm:pl-4 md:pl-5">
                        {project.points.map((point, j) => (
                          <li
                            key={j}
                            className="text-center text-xs text-gray-600 sm:flex sm:items-start
                              sm:gap-2 sm:text-left sm:text-sm md:text-base"
                          >
                            <span
                              className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full
                                bg-[#192a56]/30 align-middle sm:mr-0 sm:mt-1.5 sm:block
                                sm:align-top"
                            />
                            <span className="inline sm:block">{point}</span>
                          </li>
                        ))}
                      </ul>
                      {i < PROJECTS.length - 1 && (
                        <div className="mt-6 h-px w-full bg-gray-100 sm:mt-8" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* ════════════ FORMATIONS & LANGUAGES ════════════ */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
                <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:col-span-3">
                  <SectionTitle>Formations</SectionTitle>
                  <div className="space-y-4 sm:space-y-5">
                    {FORMATIONS.map((f, i) => (
                      <div
                        key={i}
                        className="item-animate flex flex-col items-center gap-2 border-b
                          border-gray-100 pb-4 text-center last:border-0 last:pb-0 sm:flex-row
                          sm:items-start sm:gap-5 sm:text-left"
                      >
                        <span
                          className="shrink-0 rounded-lg bg-[#192a56] px-2.5 py-1 text-xs font-bold
                            text-white sm:mt-0.5 sm:text-sm md:px-3 md:py-1.5 md:text-base"
                        >
                          {f.year}
                        </span>
                        <div className="flex flex-col items-center gap-0.5 sm:items-start">
                          <p
                            className="text-sm font-extrabold text-[#192a56] sm:font-semibold
                              md:text-base lg:text-lg"
                          >
                            {f.title}
                          </p>
                          <p className="text-xs italic text-gray-500 sm:text-sm md:text-base">
                            {f.institution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:col-span-2">
                  <SectionTitle>Langues</SectionTitle>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {LANGUAGES.map((l, i) => (
                      <div
                        key={i}
                        className="item-animate flex items-center justify-between rounded-xl
                          bg-[#192a56]/5 px-4 py-3 md:px-5 md:py-4"
                      >
                        <span
                          className="text-sm font-semibold text-[#192a56] sm:text-base md:text-lg"
                        >
                          {l.language}
                        </span>
                        <span
                          className="rounded-full bg-[#192a56] px-3 py-0.5 text-xs font-medium
                            text-white sm:text-sm md:px-4 md:py-1 md:text-base"
                        >
                          {l.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);

export default CV;
