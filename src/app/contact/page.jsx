import ContactList from '@/components/ContactList/ContactList';
import React from 'react';

export const metadata = {
  title: 'Contact Ruddy Autem',
  description: 'Contact Ruddy Autem',
};

const Contact = () => {
  return (
    <div className='h-full overflow-auto no-scrollbar'>
      <p className='text-3xl text-center mb-4 '>Contact</p>
      <ContactList />
    </div>
  );
};

export default Contact;
