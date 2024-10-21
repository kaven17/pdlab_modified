/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#3b82f6',
        background: '#0a0e17',
        surface: '#1f2937',
        text: '#e0e0e0',
      },
    },
  },
  plugins: [],
};