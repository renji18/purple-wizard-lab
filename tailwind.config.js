/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeLightBlack: "#2C2C2C",
        themeDarkBlack: "#1E1E1E",
        themeLightWhite: "#FFFFFF",
        themeDarkWhite: "#8F8F8F",
      },
      fontFamily: {
        prosto: ["Prosto One", "sans-serif"],
      },
    },
  },
}
