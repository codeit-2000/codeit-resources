/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("tailwindcss-preset-px-to-rem")],
  theme: {
    extend: {},
  },
  plugins: [],
};
