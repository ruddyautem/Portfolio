import Card from '@/components/Card/Card';
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper';
import { getProjects } from './projects.js';
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
              <p className={SUBHEADING_CLASSES}>
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