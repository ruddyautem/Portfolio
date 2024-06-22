// Card.jsx
"use client";

import "react-loading-skeleton/dist/skeleton.css";

import React, { useState } from "react";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Card = ({ project, isLoading }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const tagColors = {
    react: "border-react hover:bg-react hover:bg-reactHover",
    tailwindcss: "border-tailwind hover:bg-tailwind hover:bg-tailwindHover",
    nextjs: "border-black hover:bg-black hover:bg-opacity-10",
    redux: "border-redux hover:bg-redux hover:bg-reduxHover",
    firebase: "border-firebase hover:bg-firebase hover:bg-firebaseHover",
    "styled-components": "border-styled hover:bg-styled hover:bg-styledHover",
    "material-ui": "border-material hover:bg-material hover:bg-materialHover",
    mysql: "border-mysql hover:bg-mysql hover:bg-mysqlHover",
    axios: "border-axios hover:bg-axios hover:bg-axiosHover",
  };

  return (
    <div className='flex flex-col m-4 overflow-hidden shadow-2xl rounded-lg text-[#242936] p-3 bg-gray-100 min-w-[325px]'>
      <div className='w-full h-72 overflow-hidden relative rounded-md'>
        {(isLoading || isImageLoading) && (
          <Skeleton
            className='h-full'
            baseColor='#cecece'
            highlightColor='#a5a5a5'
          />
        )}
        <Image
          src={project.img}
          alt={project.title}
          fill
          className='object-cover transition-all duration-500 ease-in-out hover:scale-105'
          onLoad={() => setIsImageLoading(false)}
          style={{ opacity: isLoading || isImageLoading? 0 : 1 }}
        />
      </div>

      <div className='bg-gray-300/30 flex-grow flex flex-col items-center gap-4 p-4 mt-2 text-center rounded-md border'>
        <h1 className='p-2 text-3xl font-semibold uppercase text-[#242936] tracking-wide'>
          {isLoading? (
            <Skeleton width={180} baseColor="#cecece" highlightColor="#a5a5a5" className="h-10" />
          ) : (
            project.title
          )}
        </h1>
        <span className='text-darker p-4'>
          {isLoading? (
            <Skeleton width={240} baseColor="#cecece" highlightColor="#a5a5a5" className="h-28" />
          ) : (
            project.desc
          )}
        </span>
        {/* Tags Container Moved Above Buttons */}
        <div className='flex flex-wrap justify-center gap-2 text-sm font-semibold p-4'> {/* Adjusted here */}
          {isLoading
       ? [1, 2, 3].map((index) => (
                <span
                  key={index}
                  className="px-2 font-semibold rounded-lg border-2 transition-all duration-300 ease-in-out cursor-pointer select-none">
                  <Skeleton baseColor="#cecece" highlightColor="#a5a5a5" width={50} />
                </span>
              ))
            : project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 border-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 ease-in-out hover:scale-105 select-none ${tagColors[tag] || "border-gray-500"}`}>
                  {tag}
                </span>
              ))}
        </div>
        {/* Buttons Container */}
        <div className='mt-auto w-full flex justify-center gap-8 pt-12 text-white font-bold'>
          <button
            onClick={() => handleRedirect(project.source)}
            className='bg-[#242936]  w-32 h-12 flex justify-center items-center rounded-md hover:scale-110 transition-all duration-200'>
            Code Source
          </button>

          <button
            onClick={() => handleRedirect(project.demo)}
            className='bg-[#242936]  w-32 h-12 flex justify-center items-center rounded-md hover:scale-110 transition-all duration-200'>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;