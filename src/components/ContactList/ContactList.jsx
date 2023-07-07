import React from 'react';

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
    <div className='flex flex-col lg:text-2xl my-3 leading-relaxed sm:text-lg '>
      <div className='flex items-center '>
        <p className='ml-4 mr-8  sm:text-xl opacity-50 pointer-events-none'>
          1
        </p>
        <p className='text-[#ddfd8c] '>.social</p>
      </div>
      {myContacts.map((contact, index) => (
        <div key={index} className='flex flex-row items-center'>
          <p className='pointer-events-none ml-4 mr-16 sm:text-xl opacity-50'>
            {index + 2}
          </p>
          <p className=''>
            {contact.social} : &nbsp;
            <a href={contact.href} className='text-[#ddfd8c] pb-2 underline'>
              {contact.link}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
