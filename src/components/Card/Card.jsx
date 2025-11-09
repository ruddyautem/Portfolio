'use client';

import Image from 'next/image';
import Link from 'next/link';

const tagColors = {
  react: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  tailwindcss: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
  nextjs: 'bg-gray-500/20 border-gray-500/30 text-gray-300',
  express: 'bg-green-600/20 border-green-600/30 text-green-300',
  redux: 'bg-purple-600/20 border-purple-600/30 text-purple-300',
  firebase: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
  'styled-components': 'bg-pink-500/20 border-pink-500/30 text-pink-300',
  'material-ui': 'bg-blue-600/20 border-blue-600/30 text-blue-300',
  mysql: 'bg-orange-600/20 border-orange-600/30 text-orange-300',
  axios: 'bg-blue-400/20 border-blue-400/30 text-blue-300',
  clerk: 'bg-indigo-600/20 border-indigo-600/30 text-indigo-300',
  sanity: 'bg-red-500/20 border-red-500/30 text-red-300',
  typescript: 'bg-blue-700/20 border-blue-700/30 text-blue-300',
  zustand: 'bg-amber-600/20 border-amber-600/30 text-amber-300',
};

const Card = ({ project }) => (
  <div
    className="item-animate group relative h-full w-full transform transition-all duration-500
      hover:-translate-y-2 hover:scale-[1.02]"
  >
    <div
      className="hover:shadow-glow relative flex h-full flex-col overflow-hidden rounded-2xl border
        border-slate-700/50 bg-slate-800/30 transition-all duration-500
        group-hover:border-slate-600/60 group-hover:bg-slate-700/20 sm:rounded-3xl"
    >
      {/* Decorative header bar */}
      <div className="from-accent/30 h-1.5 bg-gradient-to-r via-blue-500/30 to-purple-500/30"></div>

      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
        {/* Image Container */}
        <div className="relative aspect-video w-full cursor-pointer overflow-hidden">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex h-full flex-col p-6 text-center sm:p-8 md:text-left">
        {/* Project URL */}
        <Link href={project.demo} className="cursor-pointer">
          <span className="text-accent mb-3 text-xs font-semibold tracking-widest uppercase">
            {project.demo?.slice('https://'.length) || 'PROJET'}
          </span>
        </Link>

        {/* Title */}
        <h2 className="mb-4 text-xl font-bold text-white transition-colors duration-300 sm:text-2xl">
          {project.title}
        </h2>

        {/* Description */}
        <p className="mb-6 flex-grow leading-relaxed text-slate-300">{project.desc}</p>

        {/* Tags */}
        <div
          className="z-10 mb-6 flex min-h-[60px] flex-wrap items-start justify-center gap-2
            select-none md:justify-start"
        >
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className={`border border-white/10 px-3 py-1.5 text-xs font-medium rounded-lg
              transition-all duration-300 ${tagColors[tag]?.split(' ')[2] || 'text-slate-300'}
              bg-white/5`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="z-10 mt-auto flex justify-center gap-3 text-sm sm:flex-row">
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-36 items-center justify-center rounded-xl bg-white/5 border
              border-white/10 font-medium text-white transition-all duration-300 hover:bg-white/10
              hover:border-white/20 hover:scale-105 md:flex-1"
          >
            Code Source
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent/90 flex h-10 w-36 items-center justify-center rounded-xl
              font-medium text-slate-900 transition-all duration-300 hover:bg-accent hover:shadow-lg
              hover:scale-105 md:flex-1"
          >
            Voir Demo
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
