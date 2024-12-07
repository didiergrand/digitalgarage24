import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'dg': {
        '50': '#f6f5fa',
        '100': '#ebeaf4',
        '200': '#d2d0e7',
        '300': '#a9a7d2',
        '400': '#7a78b8',
        '500': '#5a57a0',
        '600': '#484485',
        '700': '#3c386c',
        '800': '#24214b',
        '900': '#18142f',
        '950': '#0e0b1f',
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
