module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "nftbg-lighter": '#85a0ad',
        nftbg: '#648596'
      },
      fontSize: {
        xss: '0.6rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
