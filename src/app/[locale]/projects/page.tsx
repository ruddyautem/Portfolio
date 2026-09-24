import ProjectsContent from '@/components/ProjectsContent/ProjectsContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projectsPage' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: '/en/projects',
        fr: '/fr/projects',
        'x-default': '/en/projects',
      },
    },
  };
}

const Projects = () => {
  return <ProjectsContent />;
};

export default Projects;

