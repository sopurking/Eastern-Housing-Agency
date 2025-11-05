import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  sans: ['var(--font-poppins)', 'sans-serif'],
  playfair: ['var(--font-playfair)', 'serif'],
},
      colors: {
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
};
export default config;
