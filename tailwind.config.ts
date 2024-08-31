import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },

    container: {
      center: true,
      padding: '2rem',
      screens: {
        lg: '1440px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        'hero-title': '2rem',
        'hero-title-md': '2.625rem',
        'hero-title-lg': '3rem',
      },

      fontFamily: {
        sans: ['var(--font-helvetica-neue)', ...fontFamily.sans],
      },
      colors: {
        primary: '#4E0174', //for main CTA button
        'primary-light': '#6D02A3', // for filters
        'grey-900': '#313132', //for price text and model name
        'grey-800': '#5D5D5F', //for brand names
        'grey-200': '#D6D6D6', //for card outline
        'grey-100': '#F5F5FA', //for card background
        success: '#02562B', //in stock color
        'success-light': '#C5EFD9', //in stock, halo color
        warning: '#FFA500', //low stock color
        'warning-light': '#FFF2CC', //low stock, halo color
        danger: '#980233', //out of stock color
        'danger-light': '#FFDDE8', //out of stock, halo color
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
