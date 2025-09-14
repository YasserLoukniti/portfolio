import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { AboutCompact } from './components/About/AboutCompact';
import { ExperienceWithModal } from './components/Experience/ExperienceWithModal';
import { ProjectsBento } from './components/Projects/ProjectsBento';
import { Skills } from './components/Skills/Skills';
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
        <Skills />
        <Education />
        <Certifications />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
