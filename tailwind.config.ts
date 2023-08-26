import type { Config } from "tailwindcss";
import { rose } from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["autumn"],
  },
  theme: {
    extend: {
      colors: {
        primary: rose,
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
