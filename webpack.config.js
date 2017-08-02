const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/xom.js',

  output: {
    library: 'xom',
    libraryTarget: 'umd',
    path: path.resolve('dist'),
    filename: 'xom.js',
  },

  resolve: {
    extensions: ['.js'],
    modules: [path.resolve('node_modules'), path.resolve('src')],
  },

  module: {
    loaders: [
      {
        use: ['babel-loader'],
        test: /\.js$/,
        exclude: [path.resolve('node_modules')],
      },
    ],
  },
}
