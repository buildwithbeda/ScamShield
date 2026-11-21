/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional Indian Public-Service-Inspired Palette
        navy: {
          primary: '#123B64',
          dark: '#092B49',
          gov: '#0B5CAD',
          light: '#EBF2F9',
        },
        surface: {
          bg: '#F3F6FA',
          card: '#FFFFFF',
          subtle: '#E8EEF5',
        },
        text: {
          main: '#243447',
          muted: '#52667A',
          subtle: '#7E91A4',
        },
        border: {
          subtle: '#DCE4EC',
          strong: '#BCCAD8',
        },
        // Restrained National Accents
        saffron: {
          DEFAULT: '#E07A1A',
          light: '#FEF3E7',
          dark: '#B45309',
        },
        indiaGreen: {
          DEFAULT: '#15803D',
          light: '#F0FDF4',
          dark: '#166534',
        },
        // Standardized Risk Indicators
        risk: {
          low: '#15803D',       // Green
          caution: '#D97706',   // Amber
          high: '#DC2626',      // Red
          critical: '#991B1B',  // Dark Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
