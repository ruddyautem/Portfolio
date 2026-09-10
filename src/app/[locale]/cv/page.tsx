import CVContent from '@/components/CVContent/CVContent';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
};

const CV = () => {
  return <CVContent />;
};

export default CV;

