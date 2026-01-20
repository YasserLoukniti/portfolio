import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 14px;
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    position: relative;

    /* Subtle noise texture */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      opacity: 0.02;
      pointer-events: none;
      z-index: 0;
    }

    /* Subtle gradient orbs */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(ellipse 80% 50% at 20% -20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 100%, rgba(129, 140, 248, 0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }
  }

  #root {
    position: relative;
    z-index: 1;
  }

  ::selection {
    background: rgba(99, 102, 241, 0.3);
    color: ${({ theme }) => theme.colors.text};
  }

  /* Minimal scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};

    &:hover {
      background: ${({ theme }) => theme.colors.textMuted};
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: -0.03em;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  h4 {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.xl};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }

  /* Utility classes */
  .gradient-text {
    background: linear-gradient(135deg, #FFFFFF 0%, #6366F1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
  }

  /* Focus states for accessibility */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
    }
    50% {
      box-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
