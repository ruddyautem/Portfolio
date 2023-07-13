import Card from '@/components/Card/Card';
import React from 'react';
import projects from './projects.json';

export const metadata = {
  title: 'Projets Ruddy Autem',
  description: 'Projets Ruddy Autem',
};

const Projects = () => {
  return (
    <div className=''>
      <p className='text-3xl text-center mb-4  '>Mes projets</p>
      <div
        className='grid gap-8'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, max-content))',
        }}
      >
        {projects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
