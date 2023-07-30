import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: 'Profil Ruddy Autem',
  description: 'Profil Ruddy Autem',
};

const About = () => {
  return (
    <div className='h-full overflow-hidden'>
      <p className='text-3xl text-center '>Profil</p>
      <div className='flex items-center justify-center h-full text-[#242936] '>
        <div className='flex flex-col xl:flex-row justify-center items-center p-8 h-full w-full min-w-[300px]'>
          <div className='flex items-center justify-center w-full h-5/6 xl:w-5/6 xl:h-5/6 relative  xl:rounded-none max-w-[700px]'>
            <Image
              src='/profil.jpg'
              alt='photo de profil'
              fill
              className='object-cover rounded-t-2xl xl:rounded-none xl:rounded-l-2xl border-2 border-gray-200'
            />
          </div>

          <p className='text-justify text-lg 2xl:text-2xl  font-semibold tracking-widest p-8 h-2/3 xl:w-1/2 xl:h-5/6 bg-gray-200 shadow-xl rounded-b-2xl xl:rounded-none xl:rounded-r-2xl overflow-auto max-w-[700px]'>
            Bonjour 👋,
            <br />
            Je m&apos;appelle Ruddy, j&apos;ai 34 ans, et je suis
            <b> DEVELOPPEUR WEB</b>.
            <br />
            Mon parcours dans le développement web a commencé en 2020. J&apos;ai
            suivi le Bootcamp -
            <span className='font-bold italic'>The Web Developer Bootcamp</span>
            - de Colt Steele où j&apos;ai découvert le HTML, le CSS, Javascript,
            Node et MongoDB.
            <br />
            En 2021, j&apos;ai rejoint le Bootcamp -
            <span className='font-bold italic'> Complete React Developer </span>
            - d&apos;Andrei Neagoie et Yihua Zang, et j&apos;ai été fasciné par
            le potentiel de
            <span className='text-[#43c3ec] font-extrabold uppercase'>
              {' '}
              React
            </span>{' '}
            et de son système de composants,
            <span className='text-[#764bbe] font-extrabold uppercase'>
              {' '}
              Redux
            </span>
            , Sass,
            <span className='text-[#f60055] font-extrabold uppercase'>
              {' '}
              styled-components
            </span>{' '}
            et
            <span className='text-[#38bdf8] font-extrabold uppercase'>
              {' '}
              TailwindCSS
            </span>
            .
            <br />
            En 2022, je me suis familiarisé avec
            <span className='font-extrabold uppercase'> Firebase</span> et
            <span className='font-extrabold uppercase text-[#f49310]'>
              {' '}
              Mysql
            </span>
            . <br /> Nous sommes en 2023 et, en parallèle des projets sur
            lesquels j&apos;ai travaillé, je me concentre sur NextJS qui apporte
            à React de nouvelles fonctionnalités et de meilleures performances.
            <br />
            En dehors du développement web, je suis passionné de jeux-vidéo,
            notamment Zelda qui est mon jeu préféré, de Synthwave et de musique
            Française, ainsi que de musculation que je pratique au quotidien.
            <br />
            Si mon profil a retenu votre attention, n&apos;hésitez pas à me
            laisser un message!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
