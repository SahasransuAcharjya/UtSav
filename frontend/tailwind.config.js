// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#F8FAFC',
        saffron: '#FF9933',
        velvet: '#8B5CF6',
        emerald: '#10B981',
        gold: '#F59E0B',
      },
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        'playfair': ['"Playfair Display"', 'ui-serif', 'Georgia'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
