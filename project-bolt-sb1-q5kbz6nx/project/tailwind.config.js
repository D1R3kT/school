/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E2E2E',
        accent: '#C8A951',
        background: '#F8F5EF',
        brown: '#8B4513',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out',
        slideUp: 'slideUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
        parallax: 'parallax 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        parallax: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};