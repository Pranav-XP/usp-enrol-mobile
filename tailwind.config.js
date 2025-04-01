/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"],
    presets:[require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        usp:{
          teal:{
            DEFAULT: '#008C95',
            500: '#007882', // Approximate 80% shade
            300: '#67B6BC', // Approximate 50% shade
            100: '#C6E3E6', // Approximate 20% shade
          },
          'dark-teal': {
            DEFAULT: '#00263E',
            500: '#00212F', // Approximate 80% shade
            300: '#4D6B7A', // Approximate 50% shade
            100: '#B0C0CA', // Approximate 20% shade
          }
        }
      }
    },
  },
  plugins: [],
}

