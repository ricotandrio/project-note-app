/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.js",
    "%PUBLIC_URL%/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#F9F9F9',
        'pure-white': '#FFFFFF',
        'red': '#FF5959',
        'blue': '#88bed0',
        'green': '#2FAC2C',
        'purple': '#c2b4cc',
      },
    },
  },
  plugins: [],
}

