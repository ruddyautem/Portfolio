import React from 'react';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import ProjectList from '@/components/ProjectsList/ProjectsList';

export const metadata = {
  title: 'Projets Ruddy Autem',
  description: 'Projets Ruddy Autem',
};

const Projects = () => {
  return (
    <PageWrapper>
      <p className='text-3xl text-center mb-4 text-accent'>Mes projets</p>
     <ProjectList/>
    </PageWrapper>
  );
};

export default Projects;
