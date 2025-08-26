import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff'
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1'
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff'
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff'
    },
    info: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    '0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)',
    '0px 24px 48px rgba(0, 0, 0, 0.35), 0px 19px 19px rgba(0, 0, 0, 0.22)',
    '0px 30px 60px rgba(0, 0, 0, 0.40), 0px 24px 24px rgba(0, 0, 0, 0.22)',
    '0px 36px 72px rgba(0, 0, 0, 0.45), 0px 30px 30px rgba(0, 0, 0, 0.22)',
    '0px 42px 84px rgba(0, 0, 0, 0.50), 0px 36px 36px rgba(0, 0, 0, 0.22)',
    '0px 48px 96px rgba(0, 0, 0, 0.55), 0px 42px 42px rgba(0, 0, 0, 0.22)',
    '0px 54px 108px rgba(0, 0, 0, 0.60), 0px 48px 48px rgba(0, 0, 0, 0.22)',
    '0px 60px 120px rgba(0, 0, 0, 0.65), 0px 54px 54px rgba(0, 0, 0, 0.22)',
    '0px 66px 132px rgba(0, 0, 0, 0.70), 0px 60px 60px rgba(0, 0, 0, 0.22)',
    '0px 72px 144px rgba(0, 0, 0, 0.75), 0px 66px 66px rgba(0, 0, 0, 0.22)',
    '0px 78px 156px rgba(0, 0, 0, 0.80), 0px 72px 72px rgba(0, 0, 0, 0.22)',
    '0px 84px 168px rgba(0, 0, 0, 0.85), 0px 78px 78px rgba(0, 0, 0, 0.22)',
    '0px 90px 180px rgba(0, 0, 0, 0.90), 0px 84px 84px rgba(0, 0, 0, 0.22)',
    '0px 96px 192px rgba(0, 0, 0, 0.95), 0px 90px 90px rgba(0, 0, 0, 0.22)',
    '0px 102px 204px rgba(0, 0, 0, 1.00), 0px 96px 96px rgba(0, 0, 0, 0.22)',
    '0px 108px 216px rgba(0, 0, 0, 1.00), 0px 102px 102px rgba(0, 0, 0, 0.22)',
    '0px 114px 228px rgba(0, 0, 0, 1.00), 0px 108px 108px rgba(0, 0, 0, 0.22)',
    '0px 120px 240px rgba(0, 0, 0, 1.00), 0px 114px 114px rgba(0, 0, 0, 0.22)',
    '0px 126px 252px rgba(0, 0, 0, 1.00), 0px 120px 120px rgba(0, 0, 0, 0.22)',
    '0px 132px 264px rgba(0, 0, 0, 1.00), 0px 126px 126px rgba(0, 0, 0, 0.22)'
  ]
});

export default theme;