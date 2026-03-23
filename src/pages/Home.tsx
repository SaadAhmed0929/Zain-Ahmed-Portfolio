import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { BentoGrid } from '../components/BentoGrid';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { ExperienceList } from '../components/ExperienceList';
import { Certifications } from '../components/Certifications';
import { Contact } from '../components/Contact';
import { Certification } from '../types';

export const Home = ({ 
  onContactClick, 
  onProjectsClick, 
  onCertificationsClick, 
  onCertClick,
  isLightMode, 
  isLoading 
}: { 
  onContactClick: () => void, 
  onProjectsClick: () => void, 
  onCertificationsClick: () => void, 
  onCertClick: (cert: Certification) => void,
  isLightMode: boolean, 
  isLoading: boolean 
}) => {
  return (
    <main>
      <Hero onContactClick={onContactClick} onProjectsClick={onProjectsClick} isLightMode={isLightMode} isLoading={isLoading} />
      <Stats />
      <BentoGrid />
      <Skills />
      <Projects onMoreClick={onProjectsClick} />
      <Certifications onMoreClick={onCertificationsClick} onCertClick={onCertClick} />
      <ExperienceList />
      <Contact />
    </main>
  );
};
