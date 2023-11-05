import Link from 'next/link';
import Typewriter from '@/components/Typewriter/Typewriter';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';

export default function Home() {
  return (
    <PageWrapper className='relative flex flex-col h-full select-none '>
      <div className='flex flex-col items-center justify-center h-full text-center '>
        <Typewriter />
        <div className='flex items-center justify-center gap-3 p-4 pt-12 text-lg sm:text-2xl font-bold text-center text-white lg:text-3xl xl:text-4xl'>
          <Link
            href='/about'
            className='p-4 mx-1 transition-all duration-200 ease-in-out rounded-lg shadow-xl w-24 sm:w-36 xl:w-56 bg-accent hover:scale-105 active:scale-100'
          >
            PROFIL
          </Link>
          <Link
            href='/projects'
            className='p-4 mx-1 transition-all duration-200 ease-in-out rounded-lg shadow-xl w-24 sm:w-36 xl:w-56 bg-accent hover:scale-105 active:scale-100'
          >
            PROJETS
          </Link>

          <Link
            href='/contact'
            className='p-4 mx-1 transition-all duration-200 ease-in-out rounded-lg shadow-xl w-24 sm:w-36 xl:w-56 bg-accent hover:scale-105 active:scale-100'
          >
            <span>CONTACT</span>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
