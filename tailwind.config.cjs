/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        royall: {
          dark: '#0f1a2b',
          gold: '#c9a24b',
          light: '#f5f5f3',
        },
      },
    },
  },
  plugins: [],
};
