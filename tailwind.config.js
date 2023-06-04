const defaultTheme = require('tailwindcss/defaultConfig');
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    ...defaultTheme,
    backgroundImage: {
     
    },
    // colors: {
    //   ...defaultTheme.colors,
    //   primary: "#3B81F6",
    //   white: '#ffffff',
    //   light: {
    //     DEFAULT: "#FAFBFC",
    //     lighter: "#F3F4F6",
    //   },
    // },
    extend: {},
  },
  plugins: [],
}
