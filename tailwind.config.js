/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      colors: {
        airpalsGreyFont: "#909AA7",
        airpalsGreyBackground: "#F1F2F4",
      },
    },
  },
  plugins: [],
};
