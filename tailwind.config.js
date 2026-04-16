import { mtConfig } from "@material-tailwind/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css"

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
    colors: {
      backgroundcolor: "#f9f9f9",
      // primary: "#1a1a1a",
      primary: "#6c6a6a",
      secondary: "#f9f9f9",
      hovertextcolor: "#c2bcbc",

      shadowcolor: "#6c6a6a",
    },
    animation: {
      spin: "spin 1s linear infinite",
    },
    keyframes: {
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [mtConfig, require("@tailwindcss/aspect-ratio")],
};

// const withMT = require("@material-tailwind/react/utils/withMT");
// import { withMT } from "@material-tailwind/react/utils/withMT";

// module.exports = withMT({
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
//     "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//     colors: {
//       background: "#f9f9f9",
//       primary: "#1a1a1a",
//     },
//   },
//   plugins: [],
// });
