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
      'dg': {
        '50': '#f3f6f3',
        '100': '#e4e9e2',
        '200': '#cad3c7',
        '300': '#AEBDAC',
        '400': '#7a8f78',
        '500': '#576d55',
        '600': '#445843',
        '700': '#364735',
        '800': '#2d392c',
        '900': '#252f25',
        '950': '#141a14',
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
