module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        header: "#c4cf62",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
