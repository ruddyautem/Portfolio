"use client";
import SkillItem from "@/components/SkillList/SkillList";
import React from "react";
import { skills } from "./skills";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import TopPageDecoration from "../TopPageDecoration/TopPageDecoration";

const AboutContent = () => {
  // Define section-specific colors using homepage accent colors
  const sectionColors = {
    Frontend: "bg-accent", // Using homepage accent color
    Backend: "bg-purple-500",
    Outils: "bg-emerald-500",
  };

  const renderSkillsSection = (skillsArray, title) => (
    <div className="item-animate relative mt-8 flex-1 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl">
      {/* Decorative header bar */}
      <div className="from-accent/30 h-1.5 bg-gradient-to-r via-blue-500/30 to-purple-500/30"></div>

      <div className="p-6 sm:p-8">
        {/* Section Title with Custom Color Underline */}
        <div className="mb-8">
          <div className="inline-block">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl 2xl:text-4xl">
              {title}
            </h2>
            <div className={`h-1 w-full rounded-sm ${sectionColors[title]}`} />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
          {skillsArray.map((item, index) => (
            <SkillItem
              key={index}
              skill={item.skill}
              icon={item.icon}
              altText={item.skill}
              category={title}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PageWrapper skipChildWrapping={true}>
      <div className="3xl:p-20 flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[var(--theme-bg)] p-4 sm:p-6 md:p-8 xl:p-12 2xl:p-16">
        <div className="item-animate relative z-10 flex w-full max-w-6xl flex-col 2xl:max-w-[100rem]">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl">
            {/* Decorative header bar */}
            <TopPageDecoration filename="profil.html" />

            <div className="p-6 sm:p-8 md:p-10">
              {/* Main Title */}
              <div className="item-animate mb-12 text-center">
                <h1 className="item-animate mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl 2xl:text-6xl">
                  Stack <span className="text-accent">Technologique</span>
                </h1>
                <p className="item-animate mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl 2xl:text-2xl">
                  Mon environnement de développement pour créer des applications
                  modernes et performantes.
                </p>
              </div>

              {/* Frontend Section */}
              <div className="w-full">
                {renderSkillsSection(skills.frontend, "Frontend")}
              </div>
              {/* Backend Section */}
              <div className="w-full">
                {renderSkillsSection(skills.backend, "Backend")}
              </div>
              {/* Tools Section */}
              <div className="w-full">
                {renderSkillsSection(skills.tools, "Outils")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutContent;
