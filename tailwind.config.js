/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'serif'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        needle: {
          red: '#E8192C',
          'red-dark': '#C01020',
          'red-dim': '#991020',
          white: '#F2F0ED',
          'cream-dark': '#E8E0D0',
          black: '#0A0A0A',
          'dark': '#111111',
          'dark-2': '#1A1A1A',
          muted: '#6B6B6B',
          red2: '#C01020',
        },
      },
    },
  },
  plugins: [],
}
