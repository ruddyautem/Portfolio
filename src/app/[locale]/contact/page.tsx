import ContactList from '@/components/ContactList/ContactList';
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        fr: '/fr/contact',
        'x-default': '/en/contact',
      },
    },
  };
}

const Contact = () => {
  return (
    <PageWrapper skipChildWrapping={true}>
      <ContactList />
    </PageWrapper>
  );
};

export default Contact;
