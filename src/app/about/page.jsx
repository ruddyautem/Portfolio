import SkillItem from "@/components/SkillList/SkillList";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

export const metadata = {
  title: "Profil Ruddy Autem",
  description: "Profil Ruddy Autem",
};

const skills = {
  frontend: [
    {
      skill: "HTML",
      icon: "/html52.svg",
    },
    {
      skill: "CSS",
      icon: "/css.svg",
    },
    {
      skill: "Javascript",
      icon: "/js.svg",
    },
    {
      skill: "React",
      icon: "/react.svg",
    },
    {
      skill: "Typescript",
      icon: "/typescript.svg",
    },
    {
      skill: "Next.js",
      icon: "/nextjs.svg",
    },
    {
      skill: "Vite",
      icon: "/vite.svg",
    },
    {
      skill: "TailwindCSS",
      icon: "/tailwind.svg",
    },
    {
      skill: "Styled Components",
      icon: "/styled.svg",
    },
    {
      skill: "SASS",
      icon: "/sass.svg",
    },
    {
      skill: "Redux",
      icon: "/redux.svg",
    },
    {
      skill: "Bootstrap",
      icon: "/bootstrap.svg",
    },
    {
      skill: "Shadcn",
      icon: "/shadcn.svg",
    },
  ],
  backend: [
    {
      skill: "Mongodb",
      icon: "/mongodb.svg",
    },
    {
      skill: "Firebase",
      icon: "/firebase.svg",
    },
    {
      skill: "NodeJS",
      icon: "/nodejs.svg",
    },
    {
      skill: "Express.js",
      icon: "/express.svg",
    },
    {
      skill: "Prisma",
      icon: "/prisma.svg",
    },
    {
      skill: "Clerk",
      icon: "/clerk.svg",
    },
    {
      skill: "Zustand",
      icon: "/zustand.svg",
    },
    {
      skill: "MySQL",
      icon: "/mysql.svg",
    },
  ],
  tools: [
    {
      skill: "Git",
      icon: "/git.svg",
    },
    {
      skill: "Github",
      icon: "/github.svg",
    },
    {
      skill: "Vercel",
      icon: "/vercel2.svg",
    },
    ,
    {
      skill: "Sanity",
      icon: "/sanity2.svg",
    },
    {
      skill: "Heroku",
      icon: "/heroku.svg",
    },
    {
      skill: "Netlify",
      icon: "/netlify.svg",
    },
    {
      skill: "VsCode",
      icon: "/vsclogo.svg",
    },
    {
      skill: "Postman",
      icon: "/postman.svg",
    },
    {
      skill: "SSH",
      icon: "/ssh.svg",
    },
    {
      skill: "IA",
      icon: "/ai.svg",
    },
  ],
};

const About = () => {
  const renderSkillsSection = (skillsArray, title) => (
    <div className='flex-1 mt-8'>
      <span className='text-3xl font-bold mb-4'>{title}</span>
      <span className='mt-2 h-[1px] bg-accent w-full' />
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8'>
        {skillsArray.map((item, index) => (
          <SkillItem
            key={index}
            skill={item.skill}
            icon={item.icon}
            altText={item.skill}
          />
        ))}
      </div>
    </div>
  );

  return (
    <PageWrapper className='w-full h-full p-6 sm:p-12'>
      <div className='flex flex-col mb-6'>
        <span className='text-3xl font-bold mb-8'>Stack Technologique</span>
        <div className='flex flex-col justify-center gap-12 xl:flex-row'>
          {/* FRONTEND */}
          {renderSkillsSection(skills.frontend, "FrontEnd")}
          <span className='hidden xl:flex w-[1px] bg-accent opacity-50 my-24' />
          {/* BACKEND */}
          {renderSkillsSection(skills.backend, "BackEnd")}
          <span className='hidden xl:flex w-[1px] bg-accent opacity-50 my-24' />
          {renderSkillsSection(skills.tools, "Outils")}
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
