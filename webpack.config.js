var webpack = require('webpack');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  devtool: '#source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        stage: 0
      }
    },{
      test: /.scss$/,
      loader: 'style!css!sass?sourceMap'
    }]
  }
}
