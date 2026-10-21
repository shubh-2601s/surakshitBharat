/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4EFE6',
          muted: '#E9E2D5',
          card: '#FCFAF6',
          border: '#D8CEBE'
        },
        ink: {
          DEFAULT: '#0E1A2B',
          muted: '#1E2C42',
          card: '#132238',
          border: '#22354F'
        },
        navy: {
          DEFAULT: '#0B2545',
          deep: '#06172E',
          surface: '#103058'
        },
        saffron: {
          DEFAULT: '#FF8A1F',
          glow: 'rgba(255, 138, 31, 0.35)',
          muted: '#E67610',
          light: '#FFF4E8'
        },
        indiagreen: {
          DEFAULT: '#138808',
          glow: 'rgba(19, 136, 8, 0.35)',
          light: '#EBF7EA'
        },
        signalred: {
          DEFAULT: '#D7263D',
          glow: 'rgba(215, 38, 61, 0.35)',
          light: '#FDECEE'
        },
        pillar: {
          community: '#FF8A1F',
          manufacturing: '#0F9D8A',
          transport: '#F2B705',
          digital: '#4C5BD4'
        }
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"Geist"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(14, 26, 43, 0.1) 1px, transparent 1px)",
        'grid-pattern-dark': "radial-gradient(rgba(255, 138, 31, 0.15) 1px, transparent 1px)",
        'hatch-pattern': "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(142, 150, 163, 0.25) 4px, rgba(142, 150, 163, 0.25) 8px)"
      },
      boxShadow: {
        'control-room': '0 0 25px -5px rgba(255, 138, 31, 0.25)',
        'teal-glow': '0 0 25px -5px rgba(15, 157, 138, 0.3)',
        'indigo-glow': '0 0 25px -5px rgba(76, 91, 212, 0.3)'
      }
    },
  },
  plugins: [],
}
