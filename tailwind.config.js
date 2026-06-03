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
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        cream: '#FAF8F4',
        ink: '#1A1612',
        muted: '#6B6560',
        border: '#E8E4DE',
        accent: '#C8521A',
        'accent-light': '#F5EDE6',
      },
    },
  },
  plugins: [],
}
