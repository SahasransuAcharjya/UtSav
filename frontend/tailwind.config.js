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
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          // UtSav Custom Colors
          saffron: '#FF9933',
          velvet: '#6B21A8',
          emerald: '#10B981',
          pearl: '#F9FAFB',
          gold: '#FACC15',
        },
        fontFamily: {
          playfair: ['"Playfair Display"', 'serif'],
          jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  