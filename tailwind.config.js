/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'bittersweet': '#ff6176',
        'lightbittersweet': '#ffd3da',
        'darkbittersweet': '#ff3f5f',
      }
    },
  },
  plugins: [],
}

