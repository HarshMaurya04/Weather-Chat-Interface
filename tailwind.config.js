/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
      },
      keyframes: {
        'loading-bar': {
          '0%, 100%': { width: '20%' },
          '50%': { width: '80%' },
        },
      },
    },
  },
  plugins: [],
}