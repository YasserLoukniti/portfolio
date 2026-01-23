'use client';

import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { ExperienceTimeline } from '@/components/Experience/ExperienceTimeline';
import { ProjectsBento } from '@/components/Projects/ProjectsBento';
import { SkillsModern } from '@/components/Skills/SkillsModern';
import { Education } from '@/components/Education/Education';
import { Certifications } from '@/components/Certifications/Certifications';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceTimeline />
      <ProjectsBento />
      <SkillsModern />
      <Education />
      <Certifications />
    </>
  );
}
