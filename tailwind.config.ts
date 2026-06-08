import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#faf8f4",
        "paper-warm": "#f3efe8",
        charcoal: "#1a1a1a",
        beige: "#D8CBB8",
        gold: "#c9a24e",
        "gold-light": "rgba(201, 162, 78, 0.15)",
        violet: "#8b5cf6",
        "violet-light": "rgba(139, 92, 246, 0.12)",
        teal: "#14b8a6",
        rose: "#f43f5e",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(26, 26, 26, 0.06)",
        elevated:
          "0 12px 40px rgba(26, 26, 26, 0.08), 0 2px 8px rgba(26, 26, 26, 0.04)",
        gallery:
          "0 24px 60px rgba(26, 26, 26, 0.08), 0 4px 12px rgba(26, 26, 26, 0.03)",
        float: "0 16px 40px rgba(26, 26, 26, 0.1)",
        "glow-gold": "0 0 40px rgba(201, 162, 78, 0.18)",
        "glow-violet": "0 0 40px rgba(139, 92, 246, 0.12)",
        "card-hover":
          "0 20px 50px rgba(26, 26, 26, 0.1), 0 0 30px rgba(201, 162, 78, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      backdropBlur: {
        "2xl": "40px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "gradient-shift": "gradient-shift 18s ease infinite",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
