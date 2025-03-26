/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Parkinsans', 'sans-serif'],
        bangla: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
      animation: {
        'border': 'border 10s linear infinite',
        'spin-slow': 'spin 7s linear infinite',
        "spin-glow": "spin 2s linear infinite, pulse 2s infinite",
        'shimmer': "shimmer 1.5s linear infinite",
      },
      keyframes: {
        'spin-slow': {
          '0%': {
            transform: 'rotate(0deg)',
            boxShadow: '0 0 5px 2px rgba(0, 255, 0, 0.5)',
          },
          '50%': {
            transform: 'rotate(180deg)',
            boxShadow: '0 0 10px 5px rgba(0, 255, 0, 0.7)',
          },
          '100%': {
            transform: 'rotate(360deg)',
            boxShadow: '0 0 5px 2px rgba(0, 255, 0, 0.5)',
          },
        },
        'border': {
          to: { '--border-angle': '360deg' },
        },
        shimmer: {
          "0%": { borderColor: "rgba(255, 255, 255, 0)" },
          "50%": { borderColor: "rgba(255, 255, 255, 0.5)" },
          "100%": { borderColor: "rgba(255, 255, 255, 0)" }
        }
      },              
      fontSize:{
        'text-sm':'0.438' // 7px
      },
      colors: {
        'custom-orange': '#F97316',
        'custom-black': '#020617',
        'custom-ash': '#F8F8F8',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none"
        }
      };

      addUtilities(newUtilities)
    }
  ],
}