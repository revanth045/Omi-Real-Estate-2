/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",    /* Deep Navy */
        secondary: "#DA9100",  /* Heritage Gold */
        accent: "#F4F4F4",     /* Light Grey */
        background: "#FFFFFF", /* Clean White */
        foreground: "#1F1F1F", /* Dark Charcoal */
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
