import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica-neue)'],
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
  plugins: [],
};
export default config;
