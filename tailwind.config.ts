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
    },
  },
  plugins: [],
};

export default config;
