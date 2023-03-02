/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'rgb(79 70 229)',
        secondary:'#666666'
      }
    },
  },
  plugins: [],
}
