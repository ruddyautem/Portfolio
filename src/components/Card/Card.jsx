'use client'
import Image from 'next/image';
import React from 'react';

const Card = ({ project }) => {
  const tagColors = {
    react: 'border-[#43c3ec] hover:bg-[#43c3ec] hover:bg-opacity-20',
    tailwindcss: 'border-[#38bdf8] hover:bg-[#38bdf8] hover:bg-opacity-20',
    nextjs: 'border-black hover:bg-black hover:bg-opacity-10',
    redux: 'border-[#764bbe] hover:bg-[#764bbe] hover:bg-opacity-20',
    firebase: 'border-[#fbca3f] hover:bg-[#fbca3f] hover:bg-opacity-20',
    'styled-components':
      'border-[#f60055] hover:bg-[#f60055] hover:bg-opacity-20',
    'material-ui': 'border-[#00affe] hover:bg-[#00affe] hover:bg-opacity-20',
    mysql: 'border-[#f49310] hover:bg-[#f49310] hover:bg-opacity-20',
    axios: 'border-[#3d68ec] hover:bg-[#3d68ec] hover:bg-opacity-20',
  };

  return (
    <div className='flex flex-col m-4 overflow-hidden shadow-2xl rounded-[14px] text-[#242936] p-2 bg-gray-200'>
      <div className='relative w-full overflow-hidden h-72 rounded-md '>
        <Image
          src={project.img}
          alt={project.title}
          fill
          className='object-cover transition-all duration-500 ease-in-out hover:scale-110'
        />
      </div>

      <div className='flex flex-col items-center flex-grow gap-2 p-4 text-center '>
        <h1 className='p-2 text-3xl font-semibold uppercase text-[#242936] tracking-wide '>
          {project.title}
        </h1>
        <span className='p-2 text-darker'>{project.desc}</span>
        <div className='flex flex-wrap justify-center flex-none gap-2 mt-4 text-sm font-semibold'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 border-2 rounded-lg cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:scale-110 active:scale-100 select-none ${
                tagColors[tag] || 'border-gray-500'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className='flex items-center gap-3 px-4 pt-4 mt-auto font-semibold text-white'>
          <button
            onClick={() => window.location.href = `${project.source}`}
            className='p-2 w-28 hover:text-white bg-[#242936]  transition-all duration-200 ease-in-out rounded-lg hover:bg-accent hover:scale-110 active:scale-100 shadow'
          >
            Code Source
          </button>

          <button
            onClick={() => window.location.href = `${project.demo}`}
            className='p-2 w-28 mx-1 hover:text-white bg-[#242936]  transition-all duration-200 ease-in-out rounded-lg hover:bg-accent hover:scale-110 active:scale-100 shadow'
          >
            <span>Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
