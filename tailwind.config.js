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
        eh: {
          bg: "#0b0f1a",
          surface: "#141824",
          surface2: "#1a1f2e",
          surface3: "#1e2438",
          border: "#2a3040",
          border2: "#3a4050",
          text: "#e8eaf0",
          text2: "#d0d4de",
          muted: "#8890a0",
          faint: "#5a6070",
          primary: "#00d4ff",
          secondary: "#7c3aed",
          accent: "#f59e0b",
          copper: "#c45a3c",
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
