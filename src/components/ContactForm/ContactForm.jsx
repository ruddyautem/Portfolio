'use client';
import { useEffect, useState } from 'react';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      objet: e.target.objet.value,
      message: e.target.message.value,
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    
    if (response.ok) {
      const responseJson = await response.json();
      console.log('Message sent success'), setLoading(false);
      setNotification(responseJson.message);
      e.target.name.value = '';
      e.target.email.value = '';
      e.target.objet.value = '';
      e.target.message.value = '';
    }

    if (!response.ok) {
      const errorJson = await response.json();
        console.log('Error sending message'), setLoading(true);
        setNotification(errorJson.message);
    }
    };
    
    useEffect(() => {
        if (notification) {
          const timer = setTimeout(() => {
            setNotification(null);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [notification]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 m-4 mt-0 sm:flex-row '>
        <div className='flex flex-col gap-2 sm:w-72'>
          <label htmlFor='name' className='text-base uppercase '>
            Nom
          </label>
          <input
            autoComplete='off'
            type='text'
            id='name'
            className='w-full px-2 py-1 bg-gray-400 border-none bg-opacity-5 focus:outline-accent-color focus:outline-1 focus:outline-none'
            minLength={2}
            maxLength={150}
            required
          />
        </div>
        <div className='flex flex-col gap-2 sm:w-72'>
          <label htmlFor='email' className='text-base uppercase' minLength={10}>
            Email
          </label>
          <input
            autoComplete='off'
            type='email'
            id='email'
            className='w-full px-2 py-1 bg-gray-400 border-none bg-opacity-5 focus:outline-accent-color focus:outline-1 focus:outline-none'
            maxLength={150}
            required
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 m-4 sm:flex-row '>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='objet' className='text-base uppercase '>
            objet
          </label>
          <input
            autoComplete='off'
            type='text'
            id='objet'
            className='w-full px-2 py-1 text-gray-200 bg-gray-400 border-none bg-opacity-5 focus:outline-accent-color focus:outline-1 focus:outline-none'
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 m-4 sm:flex-row '>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='message' className='text-base uppercase '>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='w-full h-48 px-2 py-1 bg-gray-400 border-none bg-opacity-5 focus:outline-accent-color focus:outline-1 focus:outline-none'
            minLength={10}
            required
          />
        </div>
          </div>
          <div className='flex items-center'>
              
      <button
        type='submit'
        disabled={loading}
        className='px-2 py-1 w-24 h-9 text-base m-4 font-bold transition-all duration-200 ease-in-out active:scale-90 border border-accent-color shadow disabled:bg-gray-800 disabled:opacity-50'
      >
        ENVOYER
          </button>
          {notification &&<p className='px-2 text-sm xl:text-base mx-2 my-2 font-bold transition-all duration-200 ease-in-out'>{notification}</p>}
          </div>
    </form>
  );
};

export default ContactForm;
