import Card from "@/components/Card/Card";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import React from "react";
import { projects } from "./projects.js";

export const metadata = {
  title: "Projets Ruddy Autem",
  description: "Projets Ruddy Autem",
};

const Projects = () => {
  return (
    <PageWrapper
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,335px),1fr))] gap-12 p-6"
      style={{
        maxWidth: "100%",
      }}
    >
      {projects.map((project) => (
        <Card key={project.id} project={project} />
      ))}
    </PageWrapper>
  );
};

export default Projects;
