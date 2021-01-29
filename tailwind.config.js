module.exports = {
  theme: {
    extend: {
      height: {
        144: '36rem',
        22: '5.5rem',
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '1/2': '50%',
        '3/10': '30%',
        '1/30': '3.33333%',
      },
      screens: {
        '3xl': '1920px',
      },
      width: {
        22: '5.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
}
