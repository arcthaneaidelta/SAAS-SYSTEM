/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#23252B',
        surface: '#2C2F36',
        primary: '#E8E9ED',
        secondary: '#A8ACB3',
        accent1: '#C8B27D',
        accent2: '#6C7A89',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
