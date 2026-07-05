import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        trust: {
          50: "#eef3f9",
          100: "#d7e3f0",
          200: "#aec7e1",
          300: "#7fa3cc",
          400: "#4d76a3",
          500: "#2c5079",
          600: "#1c3a5e",
          700: "#152c48",
          800: "#0f2036",
          900: "#0a1626",
          950: "#060e18",
        },
        action: {
          50: "#fbf6e9",
          100: "#f3e5bd",
          200: "#e9d08a",
          300: "#ddb857",
          400: "#cfa03a",
          500: "#b8862a",
          600: "#946a20",
          700: "#70501a",
          800: "#4d3714",
          900: "#2e210d",
        },
        "michelet-blue": "#0066FF",
        "michelet-dark": "#050B14",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        section: "clamp(4rem, 8vw, 8rem)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        floating:
          "0 20px 40px -12px rgba(10,22,38,0.45), 0 8px 16px -8px rgba(10,22,38,0.35)",
        "glow-gold": "0 0 25px rgba(184,134,42,0.55), 0 0 50px rgba(184,134,42,0.25)",
        "glow-blue": "0 0 30px rgba(0,102,255,0.4)",
        "glow-blue-lg": "0 0 45px rgba(0,102,255,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
