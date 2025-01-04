/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ja,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/bg.svg')"
      },
      backgroundSize:{
        "home-xl":"50%"
      }
    },
  },
  plugins: [
    import('@tailwindcss/forms')
  ],
}

