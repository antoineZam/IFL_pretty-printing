/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // True black/obsidian
        surface: '#121212',   // Secondary background
        surfaceHighlight: '#1E1E1E',
        primary: '#DAA520',   // Your Gold
        primaryDim: '#B8860B',
        accent: '#2563EB',    // Subtle cool blue for contrast (tech feel)
        glass: 'rgba(255, 255, 255, 0.03)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'archivo-condensed-bold': ['Archivo Condensed Bold', 'sans-serif'],
        'archivo-expanded-regular': ['Archivo Expanded Regular', 'sans-serif'],
        'archivo-extra-condensed-bold': ['Archivo Extra Condensed Bold', 'sans-serif'],
        'archivo-extra-condensed-semibold': ['Archivo Extra Condensed SemiBold', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 90deg at 50% 50%, #000000 0%, #1a1a1a 50%, #000000 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
