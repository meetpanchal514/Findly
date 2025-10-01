/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          400: '#a3a3a3',
          600: '#4b4b4b',
          900: '#171717',
          950: '#0a0a0a',
        },
        'atomic-tangerine': '#f79256',
        'sunset': '#fbd1a2',
        'tiffany-blue': '#7dcfb6',
        'moonstone': '#00b2ca',
        'yinmn-blue': '#1d4e89',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'refract': 'refract 2s ease-in-out infinite',
      },
      keyframes: {
        refract: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.2)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(255,255,255,0.1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}