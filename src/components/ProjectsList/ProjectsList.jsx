'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; // Import `query` and `orderBy`
import { db } from '@/utils/firebase';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(collection(db, 'projects'), orderBy('id'));

      const querySnapshot = await getDocs(q);
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  console.log(projects);

  return (
    <div
      className='grid gap-8'
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, max-content))',
      }}
    >
      {projects.map((project) => (
        <Card key={project.id} project={project} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default ProjectList;
