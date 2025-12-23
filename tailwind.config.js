/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B7355',
          50: '#F5F1E8',
          100: '#E8DCC4',
          200: '#D4C4A8',
          300: '#C9A882',
          400: '#A68968',
          500: '#8B7355',
          600: '#6B5742',
          700: '#4F3F30',
          800: '#362B21',
          900: '#1F1814',
        },
        secondary: {
          DEFAULT: '#E8DCC4',
          light: '#F5F1E8',
          dark: '#C9A882',
        },
        warm: {
          white: '#FFFBF5',
          cream: '#F5F1E8',
          tan: '#C9A882',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

