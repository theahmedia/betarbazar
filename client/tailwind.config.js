/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // Restrict to light theme only
  }
}
