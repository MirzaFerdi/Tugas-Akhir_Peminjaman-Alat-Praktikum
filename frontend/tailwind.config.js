/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,jsx}", "./src/**/*.{js,jsx}", "./src/**/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans"],
      serif: ["Times New Roman", "sans-serif"],
    },
    screens: {
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    extend: {
      backgroundImage: {
        "forgot-password": "url('/src/assets/images/forgot-bg.jpg')",
      },
    },
  },
  plugins: [],
};