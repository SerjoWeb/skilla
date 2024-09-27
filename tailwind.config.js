/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          blue: "#005FF8",
          "bright-blue": "#002CFB",
          "dark-blue": "#122945",
          "blue-gray": "#5E7793",
        },
        ui: {
          red: {
            primary: "#EA1A4F",
            secondary: "#FEE9EF",
          },
          green: {
            primary: "#28A879",
            secondary: "#DBF8EF",
          },
          "light-blue": {
            primary: "#ADBFDF",
            secondary: "#D8E4FB",
          },
          "light-gray": "#EAF0FA",
          "cell-hover": "rgba(212, 223, 243, 0.17)",
          "filter-blue": "#1F46FB",
          "filter-unactive": "#899CB1",
          "filter-hover": "#DEE4FF"
        },
      },
    },
  },
  plugins: [],
}
