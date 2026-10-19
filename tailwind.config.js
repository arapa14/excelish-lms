/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#17212B',
        muted: '#5B6773',
        line: '#DDE3E9',
        surface: '#F3F5F7',
        brand: { DEFAULT: '#0E7C66', dark: '#0A5F4E', soft: '#E1F3EE' },
        amber: { DEFAULT: '#B7791F', soft: '#FBF1DC' },
        danger: { DEFAULT: '#B42318', soft: '#FDE8E6' },
      },
    },
  },
  plugins: [],
}
