/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ja,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    import('@tailwindcss/forms')
  ],
}

