import ContactList from '@/components/ContactList/ContactList';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

export const metadata = {
  title: 'Contact Ruddy Autem',
  description: 'Contact Ruddy Autem',
};

const Contact = () => {
  return (
    <PageWrapper className='h-full no-scrollbar'>
      <ContactList />
    </PageWrapper>
  );
};

export default Contact;
