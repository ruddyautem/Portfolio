import Link from "next/link";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import Typewriter from "@/components/Typewriter/Typewriter";

const AnimatedLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className='border-accent text-light w-56 relative flex justify-center items-center px-12 py-6 text-xl border transition-all duration-300 group hover:scale-105 sm:w-64 sm:text-3xl'
    >
      <span className='relative z-10 group-hover:text-white'>{children}</span>
      <div className='w-full h-full absolute inset-0 border-2 border-transparent transition-all duration-300 ease-out group-hover:border-accent'></div>
      <div className='bg-accent w-0 h-1 absolute top-0 left-0 transition-all duration-300 ease-out group-hover:w-full'></div>
      <div className='bg-accent w-1 h-0 absolute top-0 right-0 transition-all duration-300 ease-out group-hover:h-full'></div>
      <div className='bg-accent w-0 h-1 absolute right-0 bottom-0 transition-all duration-300 ease-out group-hover:w-full'></div>
      <div className='bg-accent w-1 h-0 absolute bottom-0 left-0 transition-all duration-300 ease-out group-hover:h-full'></div>
    </Link>
  );
};

export default function Home() {
  return (
    <PageWrapper className='h-full relative flex flex-col select-none'>
      <div className='h-full flex flex-col justify-center items-center text-center'>
        <Typewriter />
        <div className='flex flex-col gap-6 mt-4 lg:flex-row'>
          <AnimatedLink href='/about'>PROFIL</AnimatedLink>
          <AnimatedLink href='/projects'>PROJETS</AnimatedLink>
          <AnimatedLink href='/contact'>CONTACT</AnimatedLink>
          <AnimatedLink href='/cv'>CV</AnimatedLink>
        </div>
      </div>
    </PageWrapper>
  );
}
