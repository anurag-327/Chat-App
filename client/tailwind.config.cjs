/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      lobster: ["Lobster", "cursive"]
    },
    screens: {
      'sm': {'min': '0px', 'max': '600px'},
      'md': {'min': '601px', 'max': '1100px'},
      'lg': {'min': '1101px', 'max': '1279px'},
      'xl': {'min': '1280px'},
      
    },
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar-hide')],
}
