import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import Image from 'next/image';
import React from 'react';
import { CV_DATA } from '@/lib/cvData';

export const metadata = {
  title: 'CV Ruddy Autem',
  description: 'CV Ruddy Autem — Développeur Web Full-Stack',
};

const {
  name,
  title,
  about,
  contacts,
  skillGroups,
  projects,
  formations,
  languages,
} = CV_DATA;

/* ─── MICRO-COMPONENTS ─── */

const SectionTitle = ({ children }) => (
  <div className="mb-6 flex flex-col items-center gap-2 sm:items-start md:mb-8">
    <h3 className="text-base font-extrabold uppercase tracking-widest text-[#192a56] sm:text-lg md:text-xl lg:text-2xl">
      {children}
    </h3>
    <div className="h-1 w-12 rounded-full bg-[#192a56] opacity-80 sm:w-16" />
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`item-animate rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CvDownloadButton = ({ className = '' }) => (
  <a
    href="/CV.pdf"
    download={`${name.replace(/\s+/g, '_')}_CV.pdf`}
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
      <Image
        src={item.icon.startsWith('/') ? item.icon : `/${item.icon}`}
        height={14}
        width={14}
        alt=""
        unoptimized
        className="shrink-0"
      />
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

const projectTitleCls = 'text-xl font-extrabold text-[#192a56] sm:text-lg sm:font-bold md:text-xl';

/* ─── MAIN COMPONENT ─── */

const CV = () => (
  <PageWrapper skipChildWrapping>
    <div className="3xl:p-20 flex w-full items-start justify-center overflow-x-hidden p-4 sm:p-6 md:p-8 xl:p-12 2xl:p-16">
      <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-350">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl">

          <TopPageDecoration filename="cv.json" />

          {/* Page header */}
          <div className="border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
            <h1 className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
              Mon <span className="text-accent">CV</span>
            </h1>
            <p className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl 2xl:text-2xl">
              Découvrez mon parcours, mes compétences et mes réalisations en développement web.
            </p>
          </div>

          {/* Content */}
          <div className="item-animate p-3 sm:p-8 md:p-10">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6 md:space-y-8">

              {/* ── HERO ── */}
              <Card className="overflow-hidden">
                <div className="relative flex flex-col items-center px-6 py-8 text-center sm:px-8 sm:py-10 md:px-12 md:py-12">
                  <h1 className="text-4xl font-extrabold leading-tight text-[#192a56] sm:text-5xl md:text-6xl lg:text-7xl">
                    {name}
                  </h1>
                  <p className="mt-3 text-lg font-medium italic text-[#192a56]/60 sm:text-xl md:text-2xl lg:text-3xl">
                    {title}
                  </p>
                  <div className="mt-6 flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3 md:mt-8">
                    {contacts.map((item, i) => (
                      <ContactBadge key={i} item={item} />
                    ))}
                  </div>
                  <CvDownloadButton className="mt-8 xl:absolute xl:right-10 xl:top-10 xl:mt-0" />
                </div>

                <div className="mx-6 h-px bg-gray-100 sm:mx-8 md:mx-12" />

                <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
                  <SectionTitle>À propos</SectionTitle>
                  <p className="text-center text-sm leading-relaxed text-gray-600 sm:text-left sm:text-base md:text-lg lg:text-xl">
                    {about}
                  </p>
                </div>
              </Card>

              {/* ── SKILLS ── */}
              <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                <SectionTitle>Compétences</SectionTitle>
                <div className="space-y-3 sm:space-y-4">
                  {skillGroups.map((group) => (
                    <div key={group.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <span className="w-full shrink-0 text-center text-[10px] font-bold uppercase tracking-widest text-[#192a56]/40 sm:w-20 sm:text-left sm:text-xs md:w-24">
                        {group.label}
                      </span>
                      <div className="hidden w-px self-stretch bg-[#192a56]/10 sm:block" />
                      <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2 md:gap-2.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="item-animate cursor-pointer rounded-lg bg-[#192a56] px-3 py-1 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#243a6b] sm:py-1.5 md:px-4 md:py-2 md:text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── PROJECTS ── */}
              <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                <SectionTitle>Projets</SectionTitle>
                <div className="space-y-6 sm:space-y-8">
                  {projects.map((project, i) => (
                    <div key={i} className="item-animate">
                      <div className="mb-3 flex flex-col items-center gap-1.5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-left">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="hidden h-2 w-2 shrink-0 rounded-full bg-[#192a56] sm:block md:h-2.5 md:w-2.5" />
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
                        <span className="shrink-0 rounded-full bg-[#192a56] px-3 py-0.5 text-xs font-semibold text-white sm:text-sm md:px-4 md:py-1 md:text-base">
                          {project.year}
                        </span>
                      </div>
                      <ul className="space-y-2 sm:pl-4 md:pl-5">
                        {project.points.map((point, j) => (
                          <li key={j} className="text-center text-xs text-gray-600 sm:flex sm:items-start sm:gap-2 sm:text-left sm:text-sm md:text-base">
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#192a56]/30 align-middle sm:mr-0 sm:mt-1.5 sm:block sm:align-top" />
                            <span className="inline sm:block">{point}</span>
                          </li>
                        ))}
                      </ul>
                      {i < projects.length - 1 && (
                        <div className="mt-6 h-px w-full bg-gray-100 sm:mt-8" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── FORMATIONS + LANGUAGES ── */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
                <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:col-span-3">
                  <SectionTitle>Formations</SectionTitle>
                  <div className="space-y-4 sm:space-y-5">
                    {formations.map((f, i) => (
                      <div
  key={i}
  className="item-animate flex flex-col items-center gap-2 border-b border-gray-100 pb-4 text-center last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-5 sm:text-left"
>
  <span className="shrink-0 rounded-lg bg-[#192a56] px-2.5 py-1 text-xs font-bold text-white sm:mt-0.5 sm:text-sm md:px-3 md:py-1.5 md:text-base">
    {f.year}
  </span>
  <div className="flex flex-col items-center gap-0.5 sm:items-start">
    <p className="text-sm font-extrabold text-[#192a56] sm:font-semibold md:text-base lg:text-lg">
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
                    {languages.map((l, i) => (
                      <div
                        key={i}
                        className="item-animate flex items-center justify-between rounded-xl bg-[#192a56]/5 px-4 py-3 md:px-5 md:py-4"
                      >
                        <span className="text-sm font-semibold text-[#192a56] sm:text-base md:text-lg">
                          {l.language}
                        </span>
                        <span className="rounded-full bg-[#192a56] px-3 py-0.5 text-xs font-medium text-white sm:text-sm md:px-4 md:py-1 md:text-base">
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