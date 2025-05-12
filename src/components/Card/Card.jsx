"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define tagColors object outside the component for better performance
const tagColors = {
  react: "bg-reactHover border-react",
  tailwindcss: "bg-tailwindHover border-tailwind",
  nextjs: "bg-black border-black",
  express: "bg-black border-black",
  redux: "bg-reduxHover border-redux",
  firebase: "bg-firebaseHover border-firebase",
  "styled-components": "bg-styledHover border-styled",
  "material-ui": "bg-materialHover border-material",
  mysql: "bg-mysqlHover border-mysql",
  axios: "bg-axiosHover border-axios",
  clerk: "bg-clerkHover border-clerk",
  sanity: "bg-sanityHover border-sanity",
  typescript: "bg-typescriptHover border-typescript",
  zustand: "bg-zustandHover border-zustand",
};

// Create a reusable Button component
const Button = ({ text, onClick }) => (
  <button className='bg-[#242936] p-2 w-20 h-10 flex justify-center items-center rounded hover:scale-105 transition-all duration-200'>
    {text}
  </button>
);

// Use useCallback to memoize handleRedirect function
const Card = ({ project }) => {
  const handleRedirect = React.useCallback(
    () =>
      ({ url }) =>
        (window.location.href = url),
    []
  );

  return (
    <div className='flex flex-col m-4 overflow-hidden shadow-2xl rounded text-[#242936] bg-gray-100 lg:w-[450px] w-[500px] '>
      {/* Image Container */}
      <div className='w-full h-80 overflow-hidden relative'>
        <Image
          src={project.img}
          alt={project.title}
          fill
          className='object-cover transition-all duration-500 ease-in-out hover:scale-105'
        />
      </div>

      {/* Content Section */}
      <div className='bg-gray-300/60 flex-grow flex flex-col items-center gap-4 p-4 text-center border'>
        {/* Title */}
        <h1 className='p-2 text-3xl font-semibold uppercase tracking-wide'>
          {project.title}
        </h1>

        {/* Description */}
        <span className='text-darker p-4'>{project.desc}</span>

        {/* Tags */}
        <div className='flex flex-wrap justify-center gap-4 text-xs text-white font-semibold p-4'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`p-2 w-20 h-10 flex items-center justify-center rounded transition-transform duration-200 hover:scale-105 hover:cursor-pointer ${
                tagColors[tag] || "border-gray-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className='mt-auto flex gap-4 pt-12 text-xs'>
          {["source", "demo"].map((key) => (
            <Link
              key={`${project.id}-${key}`}
              href={project[key]}
              target='_blank'
              rel='noopener noreferrer'
              className={`p-2 w-28 h-12 flex items-center justify-center rounded transition-transform duration-200 font-semibold text-white ${
                key === "source"
                  ? "bg-[#242936] hover:bg-gray-700"
                  : "bg-[#1a73e8] hover:bg-blue-600"
              } hover:scale-105`}
            >
              {key === "source" ? "Code Source" : "Demo"}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
