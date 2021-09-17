// tailwind.config.js
module.exports = {
  prefix: "fd-",
  purge: [
    "./index.html",
    "./examples/**/*.{vue,js,ts,jsx,tsx}",
    "./packages/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
