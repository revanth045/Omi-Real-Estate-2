/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#EC4899",
        accent: "#F59E0B",
        background: "#0F172A",
        foreground: "#F8FAFC",
      },
    },
  },
  plugins: [],
}
