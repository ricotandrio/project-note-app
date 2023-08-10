/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/*.js",
    "./src/components/*.js",
    "./src/data/*.js",
    "./src/data/*.js",
    "%PUBLIC_URL%/*.js",
    "*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFEB3B',
        'accent': '#FFC107',
        'primary_red': '#ff607e',
        'accent_red': '#EE1D52',
      },
    },
  },
  plugins: [],
}

