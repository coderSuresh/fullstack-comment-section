import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'moderate-blue': 'var(--moderate-blue)',
        'soft-red': 'var(--soft-red)',
        'light-grayish-blue': 'var(--light-grayish-blue)',
        'pale-red': 'var(--pale-red)',
        'dark-blue': 'var(--dark-blue)',
        'grayish-blue': 'var(--grayish-blue)',
        'light-gray': 'var(--light-gray)',
        'very-light-gray': 'var(--very-light-gray)',
        'white': 'var(--white)',
        'outline-color': 'var(--outline-color)',
      }
    },
  },
  plugins: [],
}
export default config
