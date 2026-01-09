import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#10b981", // Emerald
          dark: "#059669",
          light: "#34d399",
        },
        accent: {
          DEFAULT: "#fbbf24", // Gold
          dark: "#f59e0b",
          light: "#fcd34d",
        },
        luxury: {
          black: "#0a0a0a",
          gray: "#1a1a1a",
          "gray-light": "#262626",
          border: "#333333",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
