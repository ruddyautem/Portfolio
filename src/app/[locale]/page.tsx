import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import Homepage from '@/components/HomepageContent/HomepageContent';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: `${t('name')} ${t('surname')} | ${t('title')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
  };
}

export default function Home() {
  return (
    <PageWrapper className="h-full" skipChildWrapping={true}>
      <Homepage />
    </PageWrapper>
  );
}
