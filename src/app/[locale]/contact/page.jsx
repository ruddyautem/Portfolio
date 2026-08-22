import ContactList from '@/components/ContactList/ContactList';
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} ${t('titleAccent')}`,
    description: t('subtitle'),
  };
}

const Contact = () => {
  return (
    <PageWrapper className="h-full xl:overflow-y-hidden" skipChildWrapping={true}>
      <ContactList />
    </PageWrapper>
  );
};

export default Contact;
