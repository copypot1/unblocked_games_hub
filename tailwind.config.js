/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hub-dark': '#0f172a',
        'hub-accent': '#38bdf8',
      }
    },
  },
  plugins: [],
}
