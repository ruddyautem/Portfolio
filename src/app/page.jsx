'use client';
import Link from 'next/link';
import TypeIt from 'typeit-react';

export default function Home() {
  return (
    <div className='relative flex flex-col h-full select-none '>
      <div className='flex flex-col items-center justify-center h-full text-center '>
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
        <div className='flex items-center justify-center gap-3 p-4 pt-12 text-2xl font-bold text-center text-white lg:text-3xl xl:text-4xl'>
          <Link
            href='/projects'
            className='p-4 mx-1 transition-all duration-200 ease-in-out rounded-lg shadow-xl w-36 sm:w-40 xl:w-56  bg-accent-color hover:scale-110 active:scale-100'
          >
            PROJETS
          </Link>

          <Link
            href='/contact'
            className='p-4 mx-1 transition-all duration-200 ease-in-out rounded-lg shadow-xl w-36 sm:w-40 xl:w-56  bg-accent-color hover:scale-110 active:scale-100'
          >
            <span>CONTACT</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
