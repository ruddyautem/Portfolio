import CVContent from '@/components/CVContent/CVContent';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: `/${locale}/cv`,
      languages: {
        en: '/en/cv',
        fr: '/fr/cv',
        'x-default': '/en/cv',
      },
    },
  };
};

const CV = () => {
  return <CVContent />;
};

export default CV;

