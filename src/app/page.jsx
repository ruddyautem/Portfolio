import { PageWrapper } from "../components/PageWrapper/PageWrapper";
import Typewriter from "@/components/Typewriter/Typewriter";
import AnimatedLink from "@/components/AnimatedLink/AnimatedLink";

export default function Home() {
  return (
    <PageWrapper className="relative flex h-full flex-col select-none">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Typewriter />
        <div className="mt-4 flex flex-col gap-6 lg:flex-row">
          <AnimatedLink href="/about">PROFIL</AnimatedLink>
          <AnimatedLink href="/projects">PROJETS</AnimatedLink>
          <AnimatedLink href="/contact">CONTACT</AnimatedLink>
          <AnimatedLink href="/cv">CV</AnimatedLink>
        </div>
      </div>
    </PageWrapper>
  );
}

// import Link from "next/link";
// import { PageWrapper } from "../components/PageWrapper/PageWrapper";

// const NavItem = ({ href, children }) => {
//   return (
//     <Link
//       href={href}
//       className="group relative px-4 py-2 text-2xl font-light text-white transition-all duration-300 hover:text-accent md:text-3xl"
//     >
//       {children}
//       {/* Centered underline that expands */}
//       <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-500 group-hover:w-full" />
//     </Link>
//   );
// };

// export default function Home() {
//   return (
//     <PageWrapper className="relative min-h-screen overflow-hidden flex h-screen flex-col items-center justify-center p-8 text-center">
//       <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
//         <div className="text-center">
//           <h1 className="text-8xl font-medium leading-none text-white md:text-9xl lg:text-[10rem]">
//             RUDDY
//             <br />
//             <span className="text-accent">AUTEM</span>
//           </h1>
//           <p className="mt-6 text-3xl text-white/60 md:text-4xl">
//             DEVELOPPEUR WEB FULL-STACK
//           </p>
//         </div>

//         <nav className="mt-16 flex flex-col md:flex-row md:gap-24">
//           <NavItem href="/about">PROFIL</NavItem>
//           <NavItem href="/projects">PROJETS</NavItem>
//           <NavItem href="/contact">CONTACT</NavItem>
//           <NavItem href="/cv">CV</NavItem>
//         </nav>
//       </div>
//     </PageWrapper>
//   );
// }
