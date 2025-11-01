/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#6366f1',   // Indigo
        accent: '#f472b6',    // Pink
        background: '#f7f9fb',
      },
    },
  },
  plugins: [],
}
