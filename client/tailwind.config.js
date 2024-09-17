// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        beige: "#fbead8",
        burgundy: "#5e2a2a",
        brownishgold: "#BC6A3D",

        y500: "#FFCD97",
        y300: "#FFF0E0",
        y100: "#FFF8F0",

        m500: "#752D42",
        m300: "#B95D78",
        m100: "#FAE3EA",

        b500: "#BC6A3D",
        b300: "#EFB899",
        b100: "#F8DBCB",
      },
    },
  },
  plugins: [],
};
