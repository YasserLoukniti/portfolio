import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience/:id" element={<ExperienceDetailPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
