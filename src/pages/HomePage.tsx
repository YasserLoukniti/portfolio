import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { AboutCompact } from '../components/About/AboutCompact';
import { ExperienceTimeline } from '../components/Experience/ExperienceTimeline';
import { ProjectsBento } from '../components/Projects/ProjectsBento';
import { SkillsModern } from '../components/Skills/SkillsModern';
import { Education } from '../components/Education/Education';
import { Certifications } from '../components/Certifications/Certifications';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutCompact />
      <ExperienceTimeline />
      <ProjectsBento />
      <SkillsModern />
      <Education />
      <Certifications />
    </>
  );
};
