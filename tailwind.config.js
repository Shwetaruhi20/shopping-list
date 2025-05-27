/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx,css}"
];

export const theme = {
  extend: {
    fontFamily: {
    },
    colors: {
      customGreen: "rgb(93, 175, 116)"
    },
  },
};


export const plugins = [];