/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E1420',
        paper: '#FAFAF8',
        blue: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
          dark: '#1E40AF',
        },
        slate: {
          DEFAULT: '#475569',
          light: '#94A3B8',
        },
        border: '#E2E8F0',
        accent: '#F59E0B',
        green: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        site: '960px',
      },
    },
  },
  plugins: [],
}
