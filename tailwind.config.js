/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      birumuda: '#2D9CDB',
      hijau: '#73CA5C',
      abu: '#D0D0D0',
      abuTua: '#8A8A8A',
      abumuda: '#F2F2F2',
      brightPurple: '#4B1979',
      purple: '#A06ECE',
      violet: '#A06ECE',
      darkPurple: '#7126B5',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      pink: colors.pink
    },
    fontSize: {
      sm: '12px',
      base: '16px',
      medium: '20px',
      xl: '25px',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    },
    fontWeight: {
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '12px',
      lg: '16px',
      full: '9999px',
      large: '12px'
    },
    extend: {
      boxShadow: {
        '3xl': '0px 0px 4px rgba(0, 0, 0, 0.15)'
      },
      lineHeight: {
        'extra-loose': '2.5',
        short: '20px'
      }
    }
  }
}
