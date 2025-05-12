"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore"; // Import `query` and `orderBy`

import Card from "@/components/Card/Card";
import { db } from "@/utils/firebase";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, "projects"), orderBy("id"));

      const querySnapshot = await getDocs(q);
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  console.log(projects);

  // Slice the projects array to display only the first 4 projects
  const displayedProjects = projects.slice(0, 4);

  return (
    <div
      className='grid gap-4 lg:p-4 '
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(375px, max-content))",
      }}
    >
      {displayedProjects.map((project) => (
        <Card key={project.id} project={project}/>
      ))}
    </div>
  );
};

export default ProjectList;
