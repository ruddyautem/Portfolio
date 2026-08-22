import AboutContent from '@/components/AboutContent/AboutContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
  };
}

const About = () => {
  return <AboutContent />;
};

export default About;
