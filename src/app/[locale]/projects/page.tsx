import ProjectsContent from '@/components/ProjectsContent/ProjectsContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projectsPage' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
  };
}

const Projects = () => {
  return <ProjectsContent />;
};

export default Projects;

