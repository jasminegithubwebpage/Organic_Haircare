// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        beige: "#fbead8",
        burgundy: "#5e2a2a",
        brownishgold: "#BC6A3D",

        // yellow accent
        y500: "#FFCD97",
        y300: "#FFF0E0",
        y100: "#FFF8F0",

        // maroon accent
        m500: "#752D42",
        m300: "#B95D78",
        m100: "#FAE3EA",

        // brown accent
        b500: "#BC6A3D",
        b300: "#EFB899",
        b100: "#F8DBCB",

        // neutrals
        n900: "#1F2223",
        n800: "#363939",
        n700: "#57595A",
        n600: "#797A7B",
        n500: "#8E9090",
        n400: "#B1B2B2",
        n300: "#D2D3D3",
        n200: "#EAEAEA",
        n100: "#F6F6F6",
      },
      width: {
        50: "200px",
        70: "300px",
      },
    },
  },
  plugins: [],
};
