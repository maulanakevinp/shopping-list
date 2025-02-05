import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wpu: '#bada55',
        kopi: '#c0ffee',
        primary: '#14b8a6',
        dark: '#0f172a',
      },
      spacing: {
        13: "3.25rem",
      },
      animation: {
        "spin-slow": 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
