import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F0E4",
        parchment: "#ECE6D4",
        ink: "#0C120B",
        pine: "#0E2A1B",
        forest: "#143D27",
        leaf: "#1E8243",
        sprout: "#2FA85B",
        lime: "#D4F45F",
        clay: "#C14B2C",
        haze: "#5C6657",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
