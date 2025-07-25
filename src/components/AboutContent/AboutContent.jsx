"use client";
import SkillItem from "@/components/SkillList/SkillList";
import React from "react";
import { skills } from "./skills";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

const AboutContent = () => {
  // Define section-specific colors using project colors
  const sectionColors = {
    Frontend: "bg-[#3d68ec]", // Frontend blue
    Backend: "bg-[#764bbe]", // Backend purple
    Outils: "bg-[#98c379]", // Tools green
  };

  const renderSkillsSection = (skillsArray, title) => (
    <div className="relative mt-8 flex-1 rounded-xl bg-gray-900/10 p-6 backdrop-blur-xs">
      {/* Section Title with Custom Color Underline */}
      <div className="mb-8">
        <div className="inline-block">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">{title}</h2>
          <div className={`h-1 w-full rounded-sm ${sectionColors[title]}`} />
        </div>
      </div>
      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-4 2xl:grid-cols-3">
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
  );

  return (
    <div className="h-full w-full p-4 sm:p-8">
      <PageWrapper>
        {/* Main Title */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Stack Technologique
          </h1>
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
      </PageWrapper>
      {/* Grid Layout CSS */}
      <style jsx>{`
        :global(.item-animate) {
          width: 100%;
        }
        :global(.item-animate:nth-child(n + 2)) {
          display: block;
        }
        @media (min-width: 768px) {
          :global(.item-animate:nth-child(2)),
          :global(.item-animate:nth-child(3)),
          :global(.item-animate:nth-child(4)) {
            display: inline-block;
            width: calc(33.333% - 1rem);
            margin-right: 1.5rem;
            vertical-align: top;
          }
          :global(.item-animate:nth-child(4)) {
            margin-right: 0;
          }
        }
        @media (max-width: 767px) {
          :global(.item-animate:nth-child(n + 2)) {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutContent;