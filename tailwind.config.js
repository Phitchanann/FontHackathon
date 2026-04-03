/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00478d',
          dark: '#005eb8',
          light: '#d6e3ff',
        },
        surface: {
          DEFAULT: '#f8f9fa',
          card: '#ffffff',
          input: '#f3f4f5',
          border: '#c2c6d4',
        },
        text: {
          primary: '#191c1d',
          secondary: '#424752',
          muted: '#6b7280',
          blue: '#00478d',
        },
        danger: '#ba1a1a',
        triage: {
          red: '#ba1a1a',
          orange: '#e65100',
          yellow: '#f9a825',
          green: '#2e7d32',
          white: '#424752',
        },
      },
      fontFamily: {
        heading: ['"Be Vietnam Pro"', 'Sarabun', 'sans-serif'],
        body: ['"Public Sans"', 'Sarabun', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
        btn: '16px',
        input: '8px',
        chip: '12px',
      },
      boxShadow: {
        card: '0px 40px 80px 0px rgba(0,0,0,0.03)',
        btn: '0px 10px 15px -3px rgba(0,71,141,0.2), 0px 4px 6px -4px rgba(0,71,141,0.2)',
        bar: '0px -10px 40px 0px rgba(0,0,0,0.04)',
        header: '0px 10px 40px 0px rgba(25,28,29,0.04)',
      },
    },
  },
  plugins: [],
}
