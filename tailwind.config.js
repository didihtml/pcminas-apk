/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        puc: {
          navy: '#0B1120',
          'navy-light': '#0D1B3E',
          'navy-card': '#131929',
          blue: '#1B4FD8',
          'blue-light': '#2563EB',
          teal: '#0891B2',
          'teal-light': '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
