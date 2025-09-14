import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Analytics } from "@vercel/analytics/react";
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { AboutCompact } from './components/About/AboutCompact';
import { ExperienceWithModal } from './components/Experience/ExperienceWithModal';
import { ProjectsBento } from './components/Projects/ProjectsBento';
import { SkillsModern } from './components/Skills/SkillsModern';
import { Education } from './components/Education/Education';
import { Certifications } from './components/Certifications/Certifications';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main>
        <Hero />
        <AboutCompact />
        <ExperienceWithModal />
        <ProjectsBento />
        <SkillsModern />
        <Education />
        <Certifications />
      </main>
      <Footer />
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
