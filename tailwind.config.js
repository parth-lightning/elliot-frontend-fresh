/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14161A',
        paper: '#F5F6F8',
        panel: '#FFFFFF',
        line: '#E4E7EC',
        sidebar: '#0B1130',
        'sidebar-hover': '#161C42',
        signal: { DEFAULT: '#3B5FE0', dim: '#EAEFFD' },
        good: { DEFAULT: '#1EA672', dim: '#E7F7F0' },
        critical: { DEFAULT: '#D64545', dim: '#FBEAEA' },
        major: { DEFAULT: '#E0900F', dim: '#FDF1DF' },
        minor: { DEFAULT: '#3B82C4', dim: '#E9F2FA' },
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
