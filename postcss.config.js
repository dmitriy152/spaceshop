module.exports = {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        viewportWidth: 768,
        exclude: [/node_modules/],
        unitToConvert: 'px',
        unitPrecision: 2,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        landscape: true,
        landscapeUnit: 'vw',
        landscapeWidth: 568
      }
    }
  }