/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
      },
      colors: {
        ek: {
          bg: "#f5f2e6",
          surface: "#ffffff",
          surface2: "#f5f3ea",
          surface3: "#f0eee2",
          border: "#e6e3d6",
          border2: "#d4d0be",
          text: "#1a1614",
          text2: "#2d2824",
          muted: "#7d6e1e",
          faint: "#9e9578",
          gold: "#c9a227",
          bronze: "#a68b1b",
          sage: "#7c9a6e",
          slate: "#6b8cad",
          accent: "#c9a227",
          dark: "#1a1614",
          charcoal: "#2d2824",
          parchment: "#f5f2e6",
        }
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'stagger-in': 'stagger-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
