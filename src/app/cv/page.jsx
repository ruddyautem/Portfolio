import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import Image from "next/image";
import React from "react";

// Data constants
const SKILLS = [
  "React.js",
  "Next.js",
  "Typescript",
  "AGILE",
  "TailwindCSS",
  "Git",
  "Clerk",
  "SCSS",
  "Styled-Components",
  "Firebase",
  "MongoDB",
  "Prisma",
  "MySQL",
  "Node",
  "Redux",
  "Express",
];

const CONTACT_DETAILS = [
  {
    icon: "mailIcon.svg",
    text: "ruddy.autem@gmail.com",
    link: "mailto:ruddy.autem@gmail.com",
  },
  { icon: "phoneIcon.svg", text: "06.59.73.57.28" },
  { icon: "locationIcon.svg", text: "Leers, HDF" },
  { icon: "linkIcon.svg", text: "Portfolio", link: "https://ruddyautem.fr/" },
  {
    icon: "githubIcon2.svg",
    text: "/ruddyautem",
    link: "https://github.com/ruddyautem",
  },
  {
    icon: "linkedinIcon.svg",
    text: "/ruddyautem",
    link: "https://www.linkedin.com/in/ruddyautem/",
  },
];

const PROJECTS = [
  {
    title: "Portfolio VsCode",
    year: "Présent",
    link: "https://www.ruddyautem.fr",
    points: [
      "Conception et réalisation d'un portfolio en Next.js entièrement responsive inspiré de l'interface de VSCode.",
      "Intégration de thèmes de couleurs dynamiques améliorant l'attrait visuel et la convivialité.",
      "Ajout d'un service de messagerie performant assurant une prise de contact fluide et efficace.",
    ],
  },
  {
    title: "Style-D",
    year: "2024",
    link: "https://style-d.vercel.app",
    points: [
      "Développement d'un service de messagerie inspiré de Slack en React.js.",
      "Intégration de l'authentification Google pour optimiser l'inscription et la connexion.",
    ],
  },
  {
    title: "GPT3",
    year: "2023",
    link: "",
    points: [
      "Création de la page d'accueil d'une plateforme de tutoriels sur GPT-3 en React.js.",
      "Approche mobile first pour une expérience utilisateur fluide sur tous les périphériques.",
    ],
  },
];

const FORMATIONS = [
  {
    title: "Complete React Developer, Redux, Hooks",
    institution: "Zero To Mastery Academy",
    year: "2022",
  },
  {
    title: "The Web Developer Bootcamp",
    institution: "Colt Steele",
    year: "2021",
  },
  {
    title:
      "Licence LLCER - Langues, littératures et civilisations étrangères et régionales",
    institution: "Sorbonne Nouvelle",
    year: "2014",
  },
];

const LANGUAGES = [
  { language: "Anglais", level: "Courant" },
  { language: "Allemand", level: "B1" },
];

// Component definitions
const ContactItem = ({ icon, text, link }) => (
  <div className='flex gap-2 transition-transform duration-100 ease-in-out hover:scale-105'>
    <Image src={icon} height={20} width={20} alt={`${text} icon`} unoptimized />
    {link ? (
      <a href={link} className='text-black hover:underline'>
        {text}
      </a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const SkillBadge = ({ skill }) => (
  <span
    className='bg-[#192a56] text-white px-3 py-2 rounded-md font-semibold shadow-md 
    hover:scale-105 transition-transform ease-in-out duration-200 select-none'
  >
    {skill}
  </span>
);

const ProjectItem = ({ title, year, points, link }) => (
  <div className='space-y-1'>
    <div className='flex justify-between items-center'>
      {link ? (
        <a
          href={link}
          className='flex items-center gap-2 text-sm font-extrabold hover:underline'
        >
          {title}
          <Image
            src='link.svg'
            height={12}
            width={12}
            alt='Project link'
            unoptimized
          />
        </a>
      ) : (
        <span className='text-sm font-extrabold'>{title}</span>
      )}
      <span className='text-[#192a56]'>{year}</span>
    </div>
    <ul className='ml-3 max-w-[75%] space-y-1'>
      {points.map((point, index) => (
        <li key={index} className='flex'>
          <span className='mr-1'>-</span> {point}
        </li>
      ))}
    </ul>
  </div>
);

const FormationItem = ({ title, institution, year }) => (
  <div className='flex justify-between items-center'>
    <p className='max-w-lg mr-3 font-extrabold'>
      {title} <span className='italic font-normal'>- {institution}</span>
    </p>
    <span className='text-[#192a56]'>{year}</span>
  </div>
);

const LanguageItem = ({ language, level }) => (
  <div>
    <span className='font-extrabold'>{language}</span> — {level}
  </div>
);

const Section = ({ title, icon, children }) => (
  <section className='mt-3'>
    <div className='flex items-center gap-3 border-b-2 border-[#192a56] pb-1'>
      <Image
        src={icon}
        height={20}
        width={20}
        alt={`${title} icon`}
        unoptimized
      />
      <h3 className='text-xl font-semibold'>{title}</h3>
    </div>
    {children}
  </section>
);

const CV = () => (
  <PageWrapper
    className='max-w-4xl mx-auto py-10 px-8 sm:px-16 bg-[#F8F6F1] text-black 
    rounded shadow-lg font-semibold border-8 border-[#192a56] text-sm text-justify relative'
  >
    <a
      href='/CV.pdf'
      download='Ruddy_Autem_CV.pdf'
      className='absolute top-2 right-2 hover:scale-110 transition-transform duration-200'
    >
      <Image
        src='downloadIcon.svg'
        height={36}
        width={36}
        alt='Download CV'
        unoptimized
      />
    </a>

    <header className='text-center pb-2'>
      <h1 className='text-4xl sm:text-5xl text-[#192a56] font-comfortaa'>
        Ruddy Autem
      </h1>
      <h2 className='text-2xl sm:text-3xl italic font-normal text-[#192a56]'>
        Développeur Web Full-Stack
      </h2>
    </header>

    <div className='flex flex-wrap justify-center gap-3 mt-2'>
      {CONTACT_DETAILS.map((item, index) => (
        <ContactItem key={index} {...item} />
      ))}
    </div>

    <p className='mt-3'>
      Développeur Web Full-Stack passionné, je conçois des applications fluides,
      performantes et optimisées pour offrir la meilleure expérience
      utilisateur. Attentif aux détails et exigeant sur la qualité du code, je
      m’efforce de proposer des solutions solides et adaptatives.
      <br />
      Ma maîtrise du front-end et du back-end garantit une harmonie entre design
      et efficacité technique. Avide d’innover, j’aborde chaque projet comme une
      chance d’évoluer et de dépasser les objectifs fixés.
    </p>

    <Section title='Compétences Techniques' icon='skillsIcon.svg'>
      <div className='flex flex-wrap gap-3 mt-3'>
        {SKILLS.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </Section>

    <Section title='Projets' icon='projectsIcon.svg'>
      <div className='mt-3 space-y-4'>
        {PROJECTS.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </Section>

    <Section title='Formations' icon='schoolIcon.svg'>
      <div className='mt-3 '>
        {FORMATIONS.map((formation, index) => (
          <FormationItem key={index} {...formation} />
        ))}
      </div>
    </Section>

    <Section title='Langues' icon='languagesIcon.svg'>
      <ul className='flex flex-wrap gap-4 mt-3'>
        {LANGUAGES.map((language, index) => (
          <li key={index}>
            <LanguageItem {...language} />
          </li>
        ))}
      </ul>
    </Section>
  </PageWrapper>
);

export default CV;
