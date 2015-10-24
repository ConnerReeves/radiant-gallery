var webpack = require('webpack');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  devtool: '#inline-source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /.scss$/,
        loader: 'style!css!sass?sourceMap'
      }
    ]
  }
}
