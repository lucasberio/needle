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
          purple: '#6C5CE7',
          'purple-dark': '#4834d4',
          'purple-dim': '#2d2260',
          cream: '#F5F0E8',
          'cream-dark': '#E8E0D0',
          dark: '#0E0C14',
          'dark-2': '#16131f',
          'dark-3': '#1e1a2e',
          muted: '#8B85A0',
          gold: '#F4B942',
        },
      },
    },
  },
  plugins: [],
}
