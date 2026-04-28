/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D3B2D",    /* Forest Sage */
        secondary: "#A88E75",  /* Muted Stone */
        accent: "#E9ECEF",     /* Soft Grey */
        background: "#FFFFFF", /* Clean White */
        foreground: "#1A1A1A", /* Deep Charcoal */
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
