import SettingsContent from '@/components/Settings/SettingsContent';
import { PageWrapper } from '@/components/PageWrapper/PageWrapper';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'settingsPage' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
  };
}

const SettingsPage = () => {
  return (
    <PageWrapper
      skipChildWrapping={true}
      className="flex min-h-full w-full flex-col items-center justify-center"
    >
      <SettingsContent />
    </PageWrapper>
  );
};

export default SettingsPage;
