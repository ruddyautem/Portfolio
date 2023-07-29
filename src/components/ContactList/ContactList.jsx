import React from 'react';
import ContactForm from '../ContactForm/ContactForm';

const ContactList = () => {
  const myContacts = [
    {
      social: 'email',
      link: 'ruddy.autem@gmail.com',
      href: 'mailto:ruddy.autem@gmail.com',
    },
    {
      social: 'linkedIn',
      link: 'ruddyautem',
      href: 'https://www.linkedin.com/in/ruddyautem/',
    },
    {
      social: 'github',
      link: 'panderawan',
      href: 'https://github.com/panderawan/',
    },
  ];


  return (
    <div className='flex flex-col xl:flex-row '>
      <div className='flex flex-col leading-relaxed text-[17px] sm:text-xl lg:text-xl 2xl:text-2xl flex-1 '>
        <p className='m-4 font-bold text-[17px] sm:text-xl lg:text-xl 2xl:text-2xl'>
          Si vous souhaitez me joindre :{' '}
        </p>
        <div className='flex items-center '>
          <p className='ml-4 mr-3 opacity-50 sm:text-xl '>1</p>
          <p className='text-accent-color '>.social </p> &nbsp; &#123;
        </div>
        {myContacts.map((contact, index) => (
          <div key={index} className='flex flex-row items-center'>
            <p className='ml-4 mr-8 opacity-50 sm:text-xl'>{index + 2}</p>
            <p className=''>
              {contact.social}: &nbsp;
              <a
                href={contact.href}
                className='pb-2 text-accent-color hover:underline'
              >
                {contact.link}
              </a>
              ;
            </p>
          </div>
        ))}
        <div className='flex items-center '>
          <p className='ml-4 mr-4 opacity-50 sm:text-xl '>5</p>
          <p className=''>&#125;</p>
        </div>
      </div>
      <div className='flex-col items-center justify-center hidden mx-1 xl:flex'>
        <div className='h-full m-2 my-4 border-l border-yellow-500' />
      </div>
      <div className='flex flex-col leading-relaxed text-[17px] sm:text-xl lg:text-xl flex-1 mt-2 xl:mt-0'>
        <p className='m-4 font-bold text-[17px] sm:text-xl lg:text-xl 2xl:text-2xl'>
          Ou me laisser un message :{' '}
        </p>
        <ContactForm/>
      </div>
    </div>
  );
};

export default ContactList;
