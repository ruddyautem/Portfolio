"use client";

import Image from "next/image";
import Link from "next/link";

// Define tagColors object outside the component for better performance
const tagColors = {
  react: "bg-react-hover border-react",
  tailwindcss: "bg-tailwind-hover border-tailwind",
  nextjs: "bg-black border-black",
  express: "bg-black border-black",
  redux: "bg-redux-hover border-redux",
  firebase: "bg-firebase-hover border-firebase",
  "styled-components": "bg-styled-hover border-styled",
  "material-ui": "bg-material-hover border-material",
  mysql: "bg-mysql-hover border-mysql",
  axios: "bg-axios-hover border-axios",
  clerk: "bg-clerk-hover border-clerk",
  sanity: "bg-sanity-hover border-sanity",
  typescript: "bg-typescript-hover border-typescript",
  zustand: "bg-zustand-hover border-zustand",
};

const Card = ({ project }) => (
  <div className="flex h-full w-full min-w-[320px] flex-col overflow-hidden rounded-sm bg-gray-100 text-[#242936] shadow-2xl">
    {/* Image Container */}
    <div className="relative aspect-4/3 w-full overflow-hidden">
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover transition-all duration-500 ease-in-out hover:scale-105"
      />
    </div>

    {/* Content Section */}
    <div className="flex flex-1 flex-col items-center gap-4 border bg-gray-300/60 p-6 text-center">
      {/* Title */}
      <h1 className="text-2xl font-semibold tracking-wide uppercase sm:text-3xl">
        {project.title}
      </h1>

      {/* Description */}
      <p className="text-darker line-clamp-3 text-base sm:text-lg">
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2.5 py-4 text-xs font-semibold text-white">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`flex h-9 w-18 items-center justify-center rounded p-1.5 transition-transform duration-200 hover:scale-105 hover:cursor-pointer sm:h-10 sm:w-20 ${
              tagColors[tag] || "border-gray-500"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-4 text-sm">
        <Link
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-28 items-center justify-center rounded bg-[#242936] p-1.5 font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-gray-700 sm:h-11 sm:w-32"
        >
          Code Source
        </Link>
        <Link
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-28 items-center justify-center rounded bg-[#1a73e8] p-1.5 font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-blue-600 sm:h-11 sm:w-32"
        >
          Demo
        </Link>
      </div>
    </div>
  </div>
);

export default Card;
