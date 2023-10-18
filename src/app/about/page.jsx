import Image from 'next/image';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import Link from 'next/link';

export const metadata = {
  title: 'Profil Ruddy Autem',
  description: 'Profil Ruddy Autem',
};

const About = () => {
  return (
    <PageWrapper className='h-full overflow-hidden'>
      <p className='text-3xl text-center text-accent'>Mon Profil</p>
      <div className='flex items-center justify-center h-full text-[#242936] '>
        <div className='flex flex-col xl:flex-row justify-center items-center p-8 h-full w-full min-w-[300px]'>
          <div className='relative w-full h-5/6 xl:w-5/6 xl:h-5/6 max-w-[600px]'>
            <Image
              src='/profil.jpg'
              alt='photo de profil'
              layout='fill'
              objectFit='cover'
              className='rounded-t-2xl xl:rounded-none xl:rounded-l-2xl border-2 border-gray-200'
            />
          </div>

          <div className='grid place-items-center text-md sm:text-xl 2xl:text-xl font-semibold tracking-wider p-8 h-2/3 xl:w-1/2 xl:h-5/6 bg-gray-200 shadow-xl rounded-b-2xl xl:rounded-none xl:rounded-r-2xl overflow-auto max-w-[600px]'>
            <p className='text-justify'>
              Bonjour 👋, <br /> Je suis Ruddy, <b>développeur web</b> de 34
              ans, passionné d&apos;informatique et de nouvelles technologies.{' '}
              <br /> Mon initiation au développement web a débuté en 2020 avec
              le Bootcamp{' '}
              <span className='text-bootcamp1 font-bold italic'>
                The Web Developer Bootcamp
              </span>{' '}
              de Colt Steele, où j&apos;ai découvert les fondamentaux tels que
              le HTML, le CSS et JavaScript, mais aussi Node.js et MongoDB.{' '}
              <br />
              En 2021, j&apos;ai poursuivi ma formation avec le Bootcamp{' '}
              <span className='text-bootcamp2 font-bold italic'>
                Complete React Developer
              </span>{' '}
              d&apos;Andrei Neagoie et Yihua Zang. J&apos;ai été captivé par les
              possibilités offertes par{' '}
              <span className='text-react font-extrabold'>React</span> et son
              système de composants,{' '}
              <span className='text-redux font-extrabold'>Redux</span>, Sass,{' '}
              <span className='text-styled font-extrabold'>
                Styled-Components
              </span>{' '}
              et{' '}
              <span className='text-tailwind font-extrabold'>TailwindCSS</span>
              .<br />
              En 2022, j&apos;ai étendu mes compétences en back-end en me
              familiarisant avec{' '}
              <span className='text-firebase font-extrabold '>
                Firebase
              </span>, <span className='text-mysql font-extrabold '>MySQL</span>{' '}
              et <span className='text-[#0c344b] font-extrabold'>Prisma</span>.{' '}
              <br />
              Aujourd&apos;hui, en 2023, mon attention se tourne vers Next.js
              qui apporte à React de nouvelles fonctionnalités et des
              performances optimisées. <br />
              En dehors du développement web, je suis un passionné de jeux vidéo
              avec une affection particulière pour la série Zelda, de musique
              (Synthwave, LoFi, rock, chanson française) et de cinéma
              (science-fiction, thrillers). <br /> Si mon profil a retenu votre
              attention, n&apos;hésitez pas à m&apos;envoyer{' '}
              <Link href='/contact'>
                <button className='px-3 font-extrabold hover:scale-110 transition-all ease-in-out duration-300 rounded-md bg-accent active:scale-100 shadow-md text-white '>
                  UN MESSAGE
                </button>
              </Link>{' '}
              !
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
