import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getCvData } from '@/lib/cvData';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

const SectionTitle = ({ children }) => (
  <div className="item-animate mb-6 flex flex-col items-center gap-2 sm:items-start md:mb-8">
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
  <div className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

// 🔥 The download link is now dynamic!
const CvDownloadButton = ({ label, href, downloadName, className = '' }) => (
  <a
    href={href}
    download={downloadName}
    className={`item-animate inline-flex items-center rounded-xl bg-[#192a56] px-6 py-3 text-sm font-semibold
      text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#243a6b]
      hover:shadow-lg md:text-base ${className}`}
  >
    {label}
  </a>
);

const ContactBadge = ({ item }) => {
  const cls =
    'flex items-center gap-2 rounded-full border border-[#192a56]/15 bg-[#192a56]/5 px-3 py-1.5 text-xs text-[#192a56] sm:text-sm md:px-4 md:py-2 md:text-base';
  const content = (
    <>
      <Image
        src={item.icon}
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
    <a href={item.link} className={`item-animate ${cls} transition-colors hover:bg-[#192a56]/10`}>
      {content}
    </a>
  ) : (
    <span className={`item-animate ${cls}`}>{content}</span>
  );
};

const projectTitleCls = 'text-xl font-extrabold text-[#192a56] sm:text-lg sm:font-bold md:text-xl';

const CV = () => {
  const t = useTranslations('cv');
  const tTabs = useTranslations('tabsbar');
  const tData = useTranslations('cvData');
  
  // Fetch translated CV Data
  const { name, title, about, contacts, skillGroups, projects, formations, languages } = getCvData(tData);

  return (
    <PageWrapper skipChildWrapping>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden 
          px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pt-[7.5vh] xl:px-12 xl:pb-12 xl:pt-[7.5vh] 
          2xl:px-16 2xl:pb-16 2xl:pt-[5vh] 3xl:px-20 3xl:pb-20 3xl:pt-[5vh]"
      >
        <div
          className="relative z-10 flex w-full max-w-6xl xl:max-w-7xl 2xl:max-w-360 3xl:max-w-440 flex-col shadow-2xl"
        >
          <div
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50
              bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl"
          >
            <TopPageDecoration filename={tTabs('cv')} />

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

            <div className="p-3 sm:p-8 md:p-10">
              <div className="mx-auto w-full space-y-4 sm:space-y-6 md:space-y-8">
                <Card className="overflow-hidden">
                  <div
                    className="relative flex flex-col items-center px-6 py-8 text-center sm:px-8
                      sm:py-10 md:px-12 md:py-12"
                  >
                    <h1
                      className="item-animate text-4xl font-extrabold leading-tight text-[#192a56] sm:text-5xl
                        md:text-6xl lg:text-7xl"
                    >
                      {name}
                    </h1>
                    <p
                      className="item-animate mt-3 text-lg font-medium italic text-[#192a56]/60 sm:text-xl
                        md:text-2xl lg:text-3xl"
                    >
                      {title}
                    </p>
                    <div
                      className="mt-6 flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3 md:mt-8"
                    >
                      {contacts.map((item, i) => (
                        <ContactBadge key={i} item={item} />
                      ))}
                    </div>
                    {/* Pass Dynamic Download Info */}
                    <CvDownloadButton 
                      label={t('downloadBtn')} 
                      href={t('cvFile')}
                      downloadName={t('cvFileName')}
                      className="mt-8 xl:absolute xl:right-10 xl:top-10 xl:mt-0" 
                    />
                  </div>

                  <div className="item-animate mx-6 h-px bg-gray-100 sm:mx-8 md:mx-12" />

                  <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
                    <SectionTitle>{t('aboutTitle')}</SectionTitle>
                    <p
                      className="item-animate text-center text-sm leading-relaxed text-gray-600 sm:text-left
                        sm:text-base md:text-lg lg:text-xl"
                    >
                      {about}
                    </p>
                  </div>
                </Card>

                <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                  <SectionTitle>{t('skillsTitle')}</SectionTitle>
                  <div className="space-y-3 sm:space-y-4">
                    {skillGroups.map((group) => (
                      <div
                        key={group.label}
                        className="item-animate flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
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
                              className="cursor-pointer rounded-lg bg-[#192a56] px-3 py-1
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

                <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
                  <SectionTitle>{t('projectsTitle')}</SectionTitle>
                  <div className="space-y-6 sm:space-y-8">
                    {projects.map((project, i) => (
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
                        {i < projects.length - 1 && (
                          <div className="mt-6 h-px w-full bg-gray-100 sm:mt-8" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
                  <Card className="px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8 lg:col-span-3">
                    <SectionTitle>{t('educationTitle')}</SectionTitle>
                    <div className="space-y-4 sm:space-y-5">
                      {formations.map((f, i) => (
                        <div
                          key={i}
                          className="item-animate flex flex-col items-center gap-2 border-b
                            border-gray-100 pb-4 text-center last:border-0 last:pb-0 sm:flex-row
                            sm:items-center sm:gap-5 sm:text-left"
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
                    <SectionTitle>{t('languagesTitle')}</SectionTitle>
                    <div className="flex flex-col gap-3 sm:gap-4">
                      {languages.map((l, i) => (
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
};

export default CV;