import Card from "@/components/Card/Card";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import React from "react";
import { projects } from "./projects.js";
import TopPageDecoration from "@/components/TopPageDecoration/TopPageDecoration";

export const metadata = {
  title: "Projets Ruddy Autem",
  description: "Projets Ruddy Autem",
};

const Projects = () => {
  return (
    <PageWrapper skipChildWrapping={true}>
      <div className="3xl:p-20 flex w-full items-center justify-center overflow-x-hidden p-4 sm:p-6 md:p-8 xl:p-12 2xl:p-16">
        <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-[100rem]">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl">
            {/* Decorative header bar */}
            <TopPageDecoration filename="projets.js" />

            {/* Header Section */}
            <div className="item-animate border-b border-slate-700/30 p-6 text-center sm:p-8 md:p-10">
              {/* <div className="text-accent item-animate mb-4 inline-block rounded-full bg-slate-700/50 px-4 py-1.5 font-mono text-sm 2xl:px-5 2xl:py-2 2xl:text-base">
                PORTFOLIO
              </div> */}
              <h1 className="item-animate mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
                Mes <span className="text-accent">Projets</span>
              </h1>
              <p className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl 2xl:text-2xl">
Mon portfolio en action : des idées transformées en expériences web concrètes.
              </p>
            </div>

            {/* Projects Grid - Grille améliorée pour éviter les cartes trop petites */}
            <div className="item-animate p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
                {projects.map((project) => (
                  <Card key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Projects;
