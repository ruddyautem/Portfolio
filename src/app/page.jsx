import Link from "next/link";
import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import Typewriter from "@/components/Typewriter/Typewriter";

const AnimatedLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative inline-block px-12 py-6 text-light border border-accent group hover:scale-105 transition-all duration-300"
    >
      <span className="relative z-10 group-hover:text-white">{children}</span>
      <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out border-2 border-transparent group-hover:border-accent"></div>
      <div className="absolute top-0 left-0 w-0 h-1 bg-accent transition-all duration-300 ease-out group-hover:w-full"></div>
      <div className="absolute top-0 right-0 w-1 h-0 bg-accent transition-all duration-300 ease-out group-hover:h-full"></div>
      <div className="absolute bottom-0 right-0 w-0 h-1 bg-accent transition-all duration-300 ease-out group-hover:w-full"></div>
      <div className="absolute bottom-0 left-0 w-1 h-0 bg-accent transition-all duration-300 ease-out group-hover:h-full"></div>
    </Link>
  );
};

export default function Home() {
  return (
    <PageWrapper className="relative flex flex-col h-full select-none ">
      <div className="flex flex-col items-center justify-center h-full text-center ">
        <Typewriter />
        <div className="flex items-center justify-center gap-6 p-4 pt-12 text-lg sm:text-2xl font-bold text-center text-white lg:text-3xl xl:text-4xl">
          <AnimatedLink href="/about">PROFIL</AnimatedLink>
          <AnimatedLink href="/projects">PROJETS</AnimatedLink>
          <AnimatedLink href="/contact">CONTACT</AnimatedLink>
        </div>
      </div>
    </PageWrapper>
  );
}
