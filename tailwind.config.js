/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        monaco: ['var(--font-monaco)', ...fontFamily.sans],
        consolas: ['var(--font-consolas)', ...fontFamily.sans],
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  },
};
