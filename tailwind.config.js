/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Esquema "Lujo Minimalista" para Alta Perfumería Árabe
        noir: {
          950: "#050505", // Fondo ultra profundo
          900: "#0A0A0A", // Fondo primario
          850: "#0F0F0F",
          800: "#141414", // Superficie de tarjetas
          700: "#1C1C1C", // Bordes sutiles y divisores
          600: "#2B2B2B",
        },
        gold: {
          100: "#FAF3E0",
          200: "#F4E4BA",
          300: "#E9CE87",
          400: "#DEBA5C",
          500: "#D4AF37", // Oro real arquetípico
          600: "#B89628",
          700: "#94761C",
          800: "#705612",
        },
        amber: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#C87D32", // Ámbar oriental resinoso
          600: "#B45309",
          700: "#8D3E08",
          800: "#5E2503", // Tono Oud ahumado profundo
        },
        sand: {
          50: "#FCFAF7",
          100: "#F7F3EB",
          200: "#EFE8DA",
          300: "#DECFC0",
          400: "#B8A896",
          500: "#857564",
        }
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        extrawide: ".35em",
        ultra: ".5em",
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.15)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.25)',
        'inner-gold': 'inset 0 0 20px 0 rgba(212, 175, 55, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
