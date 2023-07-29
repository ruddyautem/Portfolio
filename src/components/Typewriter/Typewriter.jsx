'use client';
import TypeIt from 'typeit-react';

import React from 'react';

const Typewriter = () => {
  return (
    <>
      <TypeIt
        className='px-8 py-4 text-4xl tracking-widest xl:p-12 font-oswald sm:text-4xl md:text-5xl lg:text-8xl 2xl:text-9xl'
        options={{ lifeLike: true, html: true }}
        getBeforeInit={(instance) => {
          instance
            .type('Rudyd Auetm')
            .pause(500)
            .move(-6)
            .pause(300)
            .delete(2)
            .pause(300)
            .type('dy')
            .pause(300)
            .move(5)
            .pause(300)
            .delete(2)
            .pause(300)
            .type('te')
            .pause(300)
            .move(1)
            .pause(300)
            .break()
            .pause(300)
            .type('Développeur Web');
          return instance;
        }}
      />
      <hr className='w-4/6 m-4 mx-auto border-t-4 border-accent-color' />
      <TypeIt
        className='px-8 py-4 text-2xl text-center xl:p-12 xl:text-4xl'
        options={{
          lifeLike: true,
          html: true,
          cursor: false,
          speed: 10,
          startDelay: 8500,
        }}
        lifeLike
        getBeforeInit={(instance) => {
          instance
            .type('HTML |')
            .type(' CSS |')
            .type(' JAVASCRIPT |')
            .type(' REACT |')
            .type(' NEXTJS |')
            .type(' REDUX |')
            .type(' TAILWINDCSS |')
            .type(' STYLED-COMPONENTS |')
            .type(' FIREBASE |')
            .type(' MONGODB |')
            .type(' MYSQL');

          return instance;
        }}
      />
    </>
  );
};

export default Typewriter;
