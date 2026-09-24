import AboutContent from '@/components/AboutContent/AboutContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        fr: '/fr/about',
        'x-default': '/en/about',
      },
    },
  };
}

const About = () => {
  return <AboutContent />;
};

export default About;
