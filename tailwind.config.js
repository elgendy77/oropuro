/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#ECE3D5',
          400: '#DFD1BD',
          500: '#CFC0A8',
        },
        gold: {
          50: '#FCF9F0',
          100: '#F7F0DC',
          200: '#EDE0B5',
          300: '#E1CD8C',
          400: '#D4AF37',
          500: '#C59B27',
          600: '#A47D1C',
          700: '#7E5F15',
          800: '#5A430F',
          900: '#3A2A0A',
        },
        forest: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857',
          800: '#064E3B',
          900: '#022C22',
          950: '#011A14',
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'luxury': '0 10px 30px -5px rgba(184, 142, 35, 0.15)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
