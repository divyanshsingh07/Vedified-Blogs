/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED', // Vibrant violet
        'hover-primary': '#06B6D4', // Bright cyan
        accent: '#F43F5E', // Rose accent
      },
    },
  },
  plugins: [],
} 

