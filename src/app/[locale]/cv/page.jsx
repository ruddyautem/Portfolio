import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import Image from 'next/image';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getCvData } from '@/lib/cvData';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

const cleanUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

function SectionHeading({ label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:items-start">
      <div className="flex items-center gap-2">
        <span className="text-base font-black text-slate-700">•</span>
        <h2
          className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700
            sm:text-[11px] md:text-[12px]"
        >
          {label}
        </h2>
      </div>
      <div
        className="h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-slate-700/60
          to-transparent sm:from-slate-700/60 sm:via-transparent sm:to-transparent"
      ></div>
    </div>
  );
}

function DownloadIcon({ className }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}

function ContactChip({ contact }) {
  const chip = (
    <span
      className="inline-flex cursor-pointer select-none items-center gap-1.5 rounded-md border
        border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-700 transition-all
        duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm 
        min-[375px]:px-3 min-[375px]:py-1.5 min-[375px]:text-[11px] 
        sm:gap-2 sm:rounded-lg sm:px-3.5 sm:py-2 sm:text-[13px]"
    >
      <Image
        src={contact.icon}
        alt=""
        width={18}
        height={18}
        unoptimized
        className="h-3.5 w-3.5 shrink-0 opacity-70 min-[375px]:h-4 min-[375px]:w-4 sm:h-4.5 sm:w-4.5"
      />
      {contact.text}
    </span>
  );

  if (contact.link) {
    return (
      <Link href={contact.link} target="_blank" rel="noopener noreferrer" className="block">
        {chip}
      </Link>
    );
  }

  return chip;
}

const CV = () => {
  const t = useTranslations('cv');
  const tTabs = useTranslations('tabsbar');
  const locale = useLocale();

  const { name, title, about, contacts, skillGroups, projects, formations, languages } =
    getCvData(locale);

  return (
    <PageWrapper skipChildWrapping>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-start
          font-['Inter','Segoe_UI',system-ui,sans-serif]"
      >
        <div className="relative z-10 w-full max-w-400">
          <div
            className="rounded-xl border border-slate-700/50 bg-slate-800/20 shadow-2xl
              backdrop-blur-xl sm:rounded-2xl"
          >
            <TopPageDecoration filename={tTabs('cv')} />

            <div
              className="border-b border-slate-700/30 px-4 py-5 text-center sm:px-6 sm:py-7 md:py-8"
            >
              <h1 className="cv-float mb-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p className="cv-float-1 mx-auto max-w-xl text-sm text-slate-400 sm:text-base">
                {t('subtitle')}
              </p>
            </div>

            <div
              className="mx-4 my-6 min-h-[80vh] rounded-2xl border border-slate-300 bg-[#f1f3f7] p-3
                sm:p-4 md:p-5"
            >
              <div
                className="cv-float relative mb-4 overflow-hidden rounded-2xl border
                  border-slate-200 bg-white shadow-sm"
              >
                {/* --- HEADER BACKGROUND --- */}
                <div
                  className="relative h-40 w-full bg-linear-to-r from-slate-800 via-slate-700
                    to-slate-800 sm:h-40 md:h-48 lg:h-56 xl:h-64"
                >
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  ></div>

                  {/* --- DESKTOP DOWNLOAD BUTTON --- */}
                  <a
                    href={t('cvFile')}
                    download={t('cvFileName')}
                    title={t('downloadBtn')}
                    className="absolute right-5 top-5 z-20 hidden sm:inline-flex cursor-pointer
                      items-center justify-center gap-2 rounded-xl bg-slate-700 px-4 py-2.5 text-xs
                      font-bold text-white shadow-md transition-all duration-300
                      hover:-translate-y-0.5 hover:bg-slate-600 hover:shadow-lg md:right-6 md:top-6
                      md:px-5 md:text-sm"
                  >
                    <DownloadIcon className="block" />
                    <span>{t('downloadBtn')}</span>
                  </a>

                  <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
                    {/* --- PROFILE PICTURE  --- */}
                    <div
                      className="h-40 w-40 overflow-hidden rounded-3xl border-[6px] border-white
                        bg-white shadow-lg sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-64 lg:w-64 xl:h-72
                        xl:w-72"
                    >
                      <Image
                        src="/profile.jpg"
                        alt={name}
                        width={300}
                        height={300}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* --- TEXT CONTENT --- */}
                <div
                  className="flex flex-col items-center px-4 pb-6 pt-24 text-center 
                    min-[375px]:px-5 min-[375px]:pb-8 min-[375px]:pt-28 
                    sm:pt-32 md:pt-32 lg:pt-40 xl:pt-44"
                >
                  <span
                    className="mb-2.5 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[9px]
                      font-black uppercase tracking-[0.2em] text-slate-600 
                      min-[375px]:mb-3 min-[375px]:px-3 min-[375px]:py-1.5 min-[375px]:text-[10px] 
                      sm:text-xs md:text-sm"
                  >
                    {title}
                  </span>

                  <h1
                    className="cv-name-gradient mb-4 text-3xl font-black leading-tight
                      tracking-tight min-[375px]:mb-5 min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    {name}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-1.5 min-[375px]:gap-2">
                    {contacts.map((c, i) => (
                      <ContactChip key={i} contact={c} />
                    ))}
                  </div>

                  {/* --- MOBILE DOWNLOAD BUTTON --- */}
                  <a
                    href={t('cvFile')}
                    download={t('cvFileName')}
                    title={t('downloadBtn')}
                    className="cv-download-btn mx-auto mt-4 flex w-full cursor-pointer items-center
                      justify-center gap-2 rounded-xl bg-slate-700 px-4 py-2.5 transition-all
                      duration-300 hover:-translate-y-0.5 hover:bg-slate-600 hover:shadow-lg
                      sm:hidden"
                  >
                    <DownloadIcon className="text-white" />
                    <span className="text-xs font-semibold text-white">{t('downloadBtn')}</span>
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="flex flex-col gap-5 lg:col-span-2 lg:gap-6">
                  {about && (
                    <div
                      className="cv-float-1 rounded-2xl border border-slate-200 bg-white p-5
                        shadow-sm sm:p-6"
                    >
                      <SectionHeading label={t('aboutTitle')} />
                      <p
                        className="mt-4 whitespace-pre-wrap text-center text-sm leading-relaxed
                          text-slate-700/80 sm:text-left sm:text-[13px] md:text-[14px]"
                      >
                        {about}
                      </p>
                    </div>
                  )}

                  <div
                    className="cv-float-2 flex-1 rounded-2xl border border-slate-200 bg-white p-5
                      shadow-sm sm:p-6"
                  >
                    <SectionHeading label={t('projectsTitle')} />
                    <div className="mt-5 flex flex-col gap-4 lg:gap-5">
                      {projects.map((proj, idx) => {
                        const cardClass =
                          'cv-project-card group relative block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-100/50 hover:shadow-lg sm:p-5';

                        const cardContent = (
                          <>
                            <span
                              className="cv-project-number absolute -left-3 -top-3 flex h-7 w-7
                                select-none items-center justify-center rounded-full border
                                border-slate-200 bg-white text-[10px] font-black text-slate-700
                                transition-all duration-300 sm:h-8 sm:w-8 sm:text-xs"
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>

                            <div
                              className="flex flex-col items-center gap-2 pl-3 sm:flex-row
                                sm:items-start sm:justify-between sm:gap-3"
                            >
                              <div className="min-w-0 flex-1 text-center sm:text-left">
                                <div
                                  className="flex flex-wrap items-center justify-center gap-2
                                    sm:justify-start"
                                >
                                  <span
                                    className="text-[13px] font-bold text-slate-700 sm:text-[14px]
                                      md:text-[15px]"
                                  >
                                    {proj.title}
                                  </span>
                                  {proj.link && (
                                    <>
                                      <span className="select-none text-[10px] text-slate-300">
                                        •
                                      </span>
                                      <span
                                        className="select-none rounded-lg border border-blue-200
                                          bg-blue-50/50 px-3 py-1.5 font-mono text-[11px]
                                          font-medium text-blue-600 sm:text-[11.5px]"
                                      >
                                        {cleanUrl(proj.link)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <span
                                className="shrink-0 select-none rounded-xl border
                                  border-slate-700/20 bg-slate-700 px-3 py-1.5 text-[10px] font-bold
                                  text-white sm:text-[11px]"
                              >
                                {proj.year}
                              </span>
                            </div>

                            {proj.points.length > 0 && (
                              <ul className="mt-3 space-y-1.5 pl-3">
                                {proj.points.map((pt, pti) => (
                                  <li
                                    key={pti}
                                    className="flex items-start justify-center gap-2 text-center
                                      text-[11px] leading-relaxed text-slate-700/70 sm:justify-start
                                      sm:text-left sm:text-[12px]"
                                  >
                                    <span
                                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-700"
                                    ></span>
                                    <span className="whitespace-pre-wrap">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        );

                        if (proj.link) {
                          return (
                            <Link
                              key={idx}
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cardClass}
                            >
                              {cardContent}
                            </Link>
                          );
                        }

                        return (
                          <div key={idx} className={cardClass}>
                            {cardContent}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div
                    className="cv-float-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
                      sm:p-5"
                  >
                    <SectionHeading label={t('skillsTitle')} />
                    <div className="mt-4 space-y-4">
                      {skillGroups.map((group) => (
                        <div key={group.label} className="text-center sm:text-left">
                          <p
                            className="mb-2 select-none text-[9px] font-black uppercase
                              tracking-[0.2em] text-slate-700/50 sm:text-[10px]"
                          >
                            {group.label}
                          </p>
                          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                            {group.skills.map((skill) => (
                              <span
                                key={skill}
                                className="cursor-pointer select-none rounded-xl border
                                  border-slate-700/20 bg-slate-700 px-3 py-1.5 font-mono text-[10px]
                                  font-semibold text-white transition-all duration-200
                                  hover:-translate-y-1 hover:scale-105 hover:shadow-lg
                                  sm:text-[11px]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="cv-float-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
                      sm:p-5"
                  >
                    <SectionHeading label={t('educationTitle')} />
                    <div className="mt-4 flex flex-col gap-2">
                      {formations.map((f, idx) => (
                        <div
                          key={idx}
                          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl
                            border border-slate-200 bg-slate-50 p-3 text-center transition-all
                            duration-300 hover:-translate-y-1 hover:border-slate-300
                            hover:bg-slate-100/50 hover:shadow-md sm:flex-row sm:items-start
                            sm:justify-between sm:text-left"
                        >
                          <div className="min-w-0 flex-1">
                            <p
                              className="text-[12px] font-bold leading-snug text-slate-700
                                sm:text-[13px]"
                            >
                              {f.title}
                            </p>
                            {f.institution && (
                              <p
                                className="mt-0.5 text-[10px] italic text-slate-700/55
                                  sm:text-[11px]"
                              >
                                {f.institution}
                              </p>
                            )}
                          </div>
                          <span
                            className="shrink-0 select-none rounded-xl border border-slate-700/20
                              bg-slate-700 px-3 py-1.5 text-[10px] font-black text-white
                              sm:text-[11px]"
                          >
                            {f.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="cv-float-6 flex-1 rounded-2xl border border-slate-200 bg-white p-4
                      shadow-sm sm:p-5"
                  >
                    <SectionHeading label={t('languagesTitle')} />
                    <div className="mt-4 space-y-2">
                      {languages.map((l, i) => (
                        <div
                          key={i}
                          className="flex cursor-pointer items-center justify-center gap-3
                            rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5
                            transition-all duration-300 hover:-translate-y-1 hover:border-slate-300
                            hover:bg-slate-100/50 hover:shadow-md sm:justify-between"
                        >
                          <span className="text-[12px] font-bold text-slate-700 sm:text-[13px]">
                            {l.language}
                          </span>
                          <span
                            className="select-none rounded-xl border border-slate-700/20
                              bg-slate-700 px-3 py-1.5 text-[10px] font-bold text-white
                              sm:text-[11px]"
                          >
                            {l.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CV;