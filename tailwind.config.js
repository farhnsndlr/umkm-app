/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-brown": {
          DEFAULT: "#5D4037",
          dark: "#4e342e",
        },
        "bg-main": "#FAF7F0",
      },
      backgroundImage: {
        "hero-bg": "url('/bg-hero.jpeg')",
      },
    },
  },
  plugins: [],
};
