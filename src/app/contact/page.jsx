import ContactList from '@/components/ContactList/ContactList';
import React from 'react';

export const metadata = {
  title: 'Contact Ruddy Autem',
  description: 'Contact Ruddy Autem',
};

const Contact = () => {
  return (
    <div className='h-full no-scrollbar'>
      <ContactList />
    </div>
  );
};

export default Contact;
