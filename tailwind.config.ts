import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      orange: '#E86546',
      dark: '#231815',
      green: '#74D194',
      green2: '#00D85A',
      white: '#FFFFFF',
      pink: '#F590A8',
      yellow: '#FFE600',
      blue: '#00698A',
      red: '#FF002A',
      purple: '#C860FF',
      dark2: '#333434',
      gray: '#888888',
      gray2: '#E2DDD9',
      blue2: '#368AA5',
      orange2: '#E58169',
      yellow2: '#FFE177',
      khak: '#E2CCAF'
    },
    extend: {
      keyframes: {
        'spin-max': {
          '0%': {
            transform: 'rotate(0) scale(0.3)'
          },
          '100%': {
            transform: 'rotate(1800deg) scale(1)'
          }
        }
      },
      animation: {
        'spin-max': 'spin-max 0.5s ease-in-out 1s 1'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};

export default config;
