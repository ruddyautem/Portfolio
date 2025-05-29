import SkillItem from "@/components/SkillList/SkillList";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { skills } from "./skills";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export const metadata = {
  title: "Profil Ruddy Autem",
  description: "Profil Ruddy Autem",
};

const About = () => {
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
    <PageWrapper className="h-full w-full p-4 sm:p-8">
      <div className="mb-6 flex flex-col">
        {/* Main Title */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Stack Technologique
          </h1>
        </div>
        {/* Frontend Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            {renderSkillsSection(skills.frontend, "Frontend")}
          </div>

          {/* Backend Section */}
          <div className="col-span-1">
            {renderSkillsSection(skills.backend, "Backend")}
          </div>

          {/* Tools Section */}
          <div className="col-span-1">
            {renderSkillsSection(skills.tools, "Outils")}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
