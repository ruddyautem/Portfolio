"use client";

import React, { useCallback } from "react";
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

const Card = ({ project }) => {
  return (
    <div className="flex h-full w-full min-w-[320px] flex-col overflow-hidden rounded bg-gray-100 text-[#242936] shadow-2xl">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
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
        <h1 className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
          {project.title}
        </h1>

        {/* Description */}
        <span className="text-darker line-clamp-3 text-base sm:text-lg">
          {project.desc}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2.5 py-4 text-xs font-semibold text-white">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`w-18 flex h-9 items-center justify-center rounded p-1.5 transition-transform duration-200 hover:scale-105 hover:cursor-pointer sm:h-10 sm:w-20 ${
                tagColors[tag] || "border-gray-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-4 text-sm">
          {["source", "demo"].map((key) => (
            <Link
              key={`${project.id}-${key}`}
              href={project[key]}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-10 w-28 items-center justify-center rounded p-1.5 font-semibold text-white transition-transform duration-200 sm:h-11 sm:w-32 ${
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
