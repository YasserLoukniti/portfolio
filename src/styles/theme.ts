export const theme = {
  colors: {
    // Primary palette - sophisticated blue/white
    primary: '#FFFFFF',
    primaryLight: '#F5F5F5',
    primaryDark: '#E0E0E0',
    secondary: '#6366F1',
    accent: '#818CF8',

    // Backgrounds - deep dark
    background: '#030303',
    backgroundLight: '#0A0A0A',
    surface: '#111111',
    surfaceLight: '#181818',

    // Text hierarchy
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textMuted: '#52525B',

    // Borders
    border: '#1F1F1F',
    borderLight: '#2A2A2A',

    // Status
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',

    // Gradients
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #A1A1AA 100%)',
    gradientPrimary: 'linear-gradient(135deg, #FFFFFF 0%, #6366F1 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.05) 100%)',
    gradientDark: 'linear-gradient(180deg, #030303 0%, #0A0A0A 100%)',
    gradientGlow: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    display: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '4.5rem',
    '7xl': '6rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
    '6xl': '12rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 50px rgba(0, 0, 0, 0.6)',
    glow: '0 0 40px rgba(99, 102, 241, 0.3)',
    glowStrong: '0 0 60px rgba(99, 102, 241, 0.5)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndices: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    toast: 1400,
    tooltip: 1500,
  },
};

export type Theme = typeof theme;
