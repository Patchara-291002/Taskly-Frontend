/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryOrange: "#FF6200",
        grayBackground: "#F6F6F6",
        grayBorder: "#D6D6D6" 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
