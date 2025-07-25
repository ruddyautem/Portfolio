"use client";

import Image from "next/image";
import Link from "next/link";

const tagColors = {
  react: "bg-blue-500 border-blue-500 text-white",
  tailwindcss: "bg-cyan-500 border-cyan-500 text-white",
  nextjs: "bg-black border-black text-white",
  express: "bg-green-600 border-green-600 text-white",
  redux: "bg-purple-600 border-purple-600 text-white",
  firebase: "bg-orange-500 border-orange-500 text-white",
  "styled-components": "bg-pink-500 border-pink-500 text-white",
  "material-ui": "bg-blue-600 border-blue-600 text-white",
  mysql: "bg-orange-600 border-orange-600 text-white",
  axios: "bg-blue-400 border-blue-400 text-white",
  clerk: "bg-indigo-600 border-indigo-600 text-white",
  sanity: "bg-red-500 border-red-500 text-white",
  typescript: "bg-blue-700 border-blue-700 text-white",
  zustand: "bg-amber-600 border-amber-600 text-white",
};

const Card = ({ project }) => (
  <div className="group relative h-full w-full transform transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:scale-103">
    <div className="relative flex h-full flex-col border-2 border-[#242936] bg-[#f5f5f5] text-[#242936] shadow-[8px_8px_0px_#242936] transition-all duration-300 group-hover:shadow-[0px_0px_30px_rgba(36,41,54,0.3)]">
      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
        {/* Image Container */}
        <div className="relative aspect-4/3 w-full cursor-pointer overflow-hidden border-b-2 border-[#242936]">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="backface-visibility-hidden object-cover transition-all duration-300 ease-in-out will-change-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex h-full flex-col rounded-lg border border-gray-100 bg-white p-7">
        <span className="mb-2 text-xs font-semibold tracking-widest text-[#E93550] uppercase">
          {project.demo.slice("https://".length)}
        </span>
        <h2 className="mb-3 text-2xl font-black text-[#242936]">
          {project.title}
        </h2>
        <p className="mb-6 flex-grow text-gray-700">{project.desc}</p>
        <div className="mb-6 flex min-h-[48px] flex-wrap items-end gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium"
            >
              <span
                className={`h-2 w-2 rounded-full ${tagColors[tag]?.split(" ")[0] || "bg-gray-500"}`}
              ></span>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-3 text-sm">
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 flex-1 items-center justify-center rounded bg-[#242936] font-bold text-white transition hover:scale-105 hover:bg-gray-800"
          >
            Code Source
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 flex-1 items-center justify-center rounded bg-[#E93550] font-bold text-white transition hover:scale-105"
          >
            Demo
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
