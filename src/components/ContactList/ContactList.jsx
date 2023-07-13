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
    <div className='flex flex-col my-3 leading-relaxed text-[17px] sm:text-xl lg:text-2xl'>
      <div className='flex items-center '>
        <p className='ml-4 mr-6 opacity-50 sm:text-xl '>
          1
        </p>
        <p className='text-[#ddfd8c] '>.social </p> &nbsp; &#123;
      </div>
      {myContacts.map((contact, index) => (
        <div key={index} className='flex flex-row items-center'>
          <p className='ml-4 mr-12 opacity-50 sm:text-xl'>
            {index + 2}
          </p>
          <p className=''>
            {contact.social}: &nbsp; 
            <a href={contact.href} className='text-[#ddfd8c] pb-2 underline'>
              {contact.link}
            </a>;
          </p>
        </div>
        
      ))}
            <div className='flex items-center '>
        <p className='ml-4 mr-8 opacity-50 sm:text-xl '>
          5 
        </p>
        <p className=''>&#125;</p>
      </div>
    </div>
  );
};

export default ContactList;
