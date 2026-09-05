import Card from '@/components/Card/Card';
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper';
import { getProjects } from './projects';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import {
  PAGE_OUTER_CLASSES,
  PAGE_INNER_CLASSES,
  PAGE_CARD_CLASSES,
  SECTION_HEADER_CLASSES,
  HEADING_CLASSES,
  SUBHEADING_CLASSES,
} from '@/lib/constants';

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

  const projects = getProjects(tProjects);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <PageWrapper skipChildWrapping={true}>
      <div className={PAGE_OUTER_CLASSES}>
        <div className={`${PAGE_INNER_CLASSES} shadow-2xl`}>
          <div className={PAGE_CARD_CLASSES}>
            <TopPageDecoration filename={t('filename')} />

            <div className={SECTION_HEADER_CLASSES}>
              <h1 className={HEADING_CLASSES}>
                {t('title')} <span className="text-accent">{t('titleAccent')}</span>
              </h1>
              <p className={SUBHEADING_CLASSES}>{t('subtitle')}</p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              {/* Featured Projects Header */}
              <div className="mb-6 flex flex-col items-center text-center">
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30
                    bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider
                    text-accent"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  {t('featuredTitle')}
                </div>
                <p className="mt-2 text-sm text-slate-400">{t('featuredSubtitle')}</p>
              </div>

              {/* Featured Projects Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {featuredProjects.map((project, index) => (
                  <div key={project.id} className={`item-animate-${Math.min(index + 1, 4)} h-full`}>
                    <Card project={project} />
                  </div>
                ))}
              </div>

              {/* Other Projects Section */}
              {otherProjects.length > 0 && (
                <>
                  <div
                    className="mt-14 mb-6 border-t border-slate-700/40 pt-10 flex flex-col
                      items-center text-center"
                  >
                    <div
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700
                        bg-slate-800/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider
                        text-slate-300"
                    >
                      {t('otherTitle')}
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{t('otherSubtitle')}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {otherProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`item-animate-${Math.min((index % 4) + 1, 4)} h-full`}
                      >
                        <Card project={project} compact={true} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Projects;
