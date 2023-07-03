/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // eslint-disable-next-line quotes
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // eslint-disable-next-line quotes
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // eslint-disable-next-line quotes, comma-dangle
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    // eslint-disable-next-line quotes, comma-dangle
    "./node_modules/flowbite/**/*.js",
  ],
  // eslint-disable-next-line quotes, comma-dangle
  plugins: [require("flowbite/plugin")],
  // eslint-disable-next-line semi
};
