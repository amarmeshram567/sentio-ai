// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,jsx}'],
//   theme: {
//     extend: {
//       colors: {
//         obsidian: {
//           950: '#050505',
//           900: '#0a0a0c',
//           800: '#101013',
//           700: '#17171b',
//           600: '#202024',
//         },
//         silver: {
//           400: '#c9cdd6',
//           300: '#dfe2e8',
//           200: '#eef0f3',
//         },
//         core: {
//           violet: '#7c6cff',
//           blue: '#5b8cff',
//           cyan: '#5bd0ff',
//         },
//       },
//       fontFamily: {
//         display: ['"Instrument Serif"', 'serif'],
//         ui: ['"Inter"', 'system-ui', 'sans-serif'],
//       },
//       backgroundImage: {
//         'grid-fine': 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
//         'core-glow': 'radial-gradient(circle at center, rgba(124,108,255,0.35) 0%, rgba(91,140,255,0.15) 35%, transparent 70%)',
//       },
//       boxShadow: {
//         glass: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
//         glow: '0 0 40px rgba(124,108,255,0.35)',
//       },
//       keyframes: {
//         drift: {
//           '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
//           '50%': { transform: 'translateY(-14px) translateX(6px)' },
//         },
//         'pulse-soft': {
//           '0%, 100%': { opacity: 0.4 },
//           '50%': { opacity: 1 },
//         },
//         shimmer: {
//           '0%': { backgroundPosition: '-200% 0' },
//           '100%': { backgroundPosition: '200% 0' },
//         },
//         'grid-pan': {
//           '0%': { backgroundPosition: '0 0' },
//           '100%': { backgroundPosition: '80px 80px' },
//         },
//       },
//       animation: {
//         drift: 'drift 7s ease-in-out infinite',
//         'drift-slow': 'drift 11s ease-in-out infinite',
//         'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
//         shimmer: 'shimmer 3s linear infinite',
//         'grid-pan': 'grid-pan 20s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// }



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,jsx}'],
//   theme: {
//     extend: {
//       colors: {
//         obsidian: {
//           950: '#050505',
//           900: '#0a0a0c',
//           800: '#101013',
//           700: '#17171b',
//           600: '#202024',
//           border: 'rgba(255,255,255,0.08)',
//           borderStrong: 'rgba(255,255,255,0.14)',
//         },
//         // Landing page copy tones
//         silver: {
//           400: '#c9cdd6',
//           300: '#dfe2e8',
//           200: '#eef0f3',
//         },
//         // App UI text tones (Sidebar / TopNav)
//         ink: {
//           primary: '#eef0f3',
//           secondary: '#a7acb8',
//           tertiary: '#6b7080',
//         },
//         // Landing page accent tones
//         core: {
//           violet: '#7c6cff',
//           blue: '#5b8cff',
//           cyan: '#5bd0ff',
//         },
//         // App UI accent tones (Sidebar / TopNav)
//         accent: {
//           violet: '#7c6cff',
//           blue: '#5b8cff',
//           indigo: '#4f5bd5',
//           glow: '#5bd0ff',
//         },
//       },
//       fontFamily: {
//         display: ['"Instrument Serif"', 'serif'],
//         ui: ['"Inter"', 'system-ui', 'sans-serif'],
//       },
//       backgroundImage: {
//         'grid-fine': 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
//         'core-glow': 'radial-gradient(circle at center, rgba(124,108,255,0.35) 0%, rgba(91,140,255,0.15) 35%, transparent 70%)',
//       },
//       boxShadow: {
//         glass: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
//         glow: '0 0 40px rgba(124,108,255,0.35)',
//         ambient: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
//         glowSoft: '0 0 24px rgba(124,108,255,0.28)',
//       },
//       keyframes: {
//         drift: {
//           '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
//           '50%': { transform: 'translateY(-14px) translateX(6px)' },
//         },
//         'pulse-soft': {
//           '0%, 100%': { opacity: 0.4 },
//           '50%': { opacity: 1 },
//         },
//         shimmer: {
//           '0%': { backgroundPosition: '-200% 0' },
//           '100%': { backgroundPosition: '200% 0' },
//         },
//         'grid-pan': {
//           '0%': { backgroundPosition: '0 0' },
//           '100%': { backgroundPosition: '80px 80px' },
//         },
//       },
//       animation: {
//         drift: 'drift 7s ease-in-out infinite',
//         'drift-slow': 'drift 11s ease-in-out infinite',
//         'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
//         shimmer: 'shimmer 3s linear infinite',
//         'grid-pan': 'grid-pan 20s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dynamic active theme token (reads CSS variable set on :root)
        'theme-accent': 'rgb(var(--color-accent) / <alpha-value>)',

        // chat gpt suggest
        'theme-background': 'rgb(var(--theme-background) / <alpha-value>)',
        'theme-surface': 'rgb(var(--theme-surface) / <alpha-value>)',
        'theme-elevated': 'rgb(var(--theme-elevated) / <alpha-value>)',
        'theme-hover': 'rgb(var(--theme-hover) / <alpha-value>)',

        'theme-secondary': 'rgb(var(--color-accent-secondary) / <alpha-value>)',
        'theme-border': 'rgb(var(--theme-border) / <alpha-value>)',

        obsidian: {
          950: '#050505',
          900: '#0a0a0c',
          800: '#101013',
          700: '#17171b',
          600: '#202024',
          border: 'rgba(255,255,255,0.08)',
          borderStrong: 'rgba(255,255,255,0.14)',
        },
        // Landing page copy tones
        silver: {
          400: '#c9cdd6',
          300: '#dfe2e8',
          200: '#eef0f3',
        },
        // App UI text tones (Sidebar / TopNav)
        ink: {
          primary: '#eef0f3',
          secondary: '#a7acb8',
          tertiary: '#6b7080',
        },
        // Landing page accent tones
        core: {
          violet: '#7c6cff',
          blue: '#5b8cff',
          cyan: '#5bd0ff',
        },
        // Existing static accent tokens preserved
        accent: {
          violet: '#7c6cff',
          blue: '#5b8cff',
          indigo: '#4f5bd5',
          glow: '#5bd0ff',
        },

      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        ui: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fine': 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'core-glow': 'radial-gradient(circle at center, rgba(124,108,255,0.35) 0%, rgba(91,140,255,0.15) 35%, transparent 70%)',
        // Dynamic radial glow matching whichever theme is selected
        'theme-glow': 'radial-gradient(circle at center, rgb(var(--color-accent) / 0.35) 0%, transparent 70%)',
        'theme-gradient': 'var(--theme-gradient)',
        // chat gpt suggest
        'theme-radial':
          'radial-gradient(circle at center, rgb(var(--color-accent) / 0.25), transparent 70%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        glow: '0 0 40px rgba(124,108,255,0.35)',
        ambient: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        glowSoft: '0 0 24px rgba(124,108,255,0.28)',
        // Dynamic theme shadows
        'theme-glow': '0 0 25px rgb(var(--color-accent) / 0.35)',
        'theme-glow-sm': '0 0 12px rgb(var(--color-accent) / 0.25)',
        'theme-glow-lg': '0 0 45px rgb(var(--color-accent) / 0.45)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-14px) translateX(6px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        'drift-slow': 'drift 11s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'grid-pan': 'grid-pan 20s linear infinite',
      },
      // chat gpt sugges
      borderColor: {
        'theme': 'rgb(var(--theme-border) / <alpha-value>)',
        'theme-accent': 'rgb(var(--color-accent) / <alpha-value>)',
      },
      textColor: {
        'theme': 'rgb(var(--theme-text) / <alpha-value>)',
        'theme-muted': 'rgb(var(--theme-text-muted) / <alpha-value>)',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, box-shadow, opacity',
      },
    },
  },
  plugins: [],
}