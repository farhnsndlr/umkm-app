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
      },
      backgroundImage: {
        "hero-bg": "url('/bg-hero.jpeg')",
      },
    },
  },
  plugins: [],
};
