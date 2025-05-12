import Card from "@/components/Card/Card";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import React from "react";
import projects from "./projects.json";

export const metadata = {
  title: "Projets Ruddy Autem",
  description: "Projets Ruddy Autem",
};

const Projects = () => {
  return (
    <PageWrapper
      className='flex flex-wrap justify-center gap-6'
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
