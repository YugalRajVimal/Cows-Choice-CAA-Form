/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#14532d",
          dark: "#0f3d21",
        },
      },
    },
  },
  plugins: [],
};
