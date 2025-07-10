/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        'black-purple': '#1a1a2e',
        'dark-purple': '#3f0f57',
      },
    },
  },
  plugins: [],
};
