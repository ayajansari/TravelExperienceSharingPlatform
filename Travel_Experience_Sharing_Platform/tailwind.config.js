/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '550px',
        // => @media (min-width: 550px) { ... }
      },
    },

  },
  plugins: [],
}

