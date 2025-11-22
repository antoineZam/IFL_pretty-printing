/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'archivo-condensed-bold': ['Archivo Condensed Bold', 'sans-serif'],
        'archivo-expanded-regular': ['Archivo Expanded Regular', 'sans-serif'],
        'archivo-extra-condensed-bold': ['Archivo Extra Condensed Bold', 'sans-serif'],
        'archivo-extra-condensed-semibold': ['Archivo Extra Condensed SemiBold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
