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
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        stage: 0
      },
      test: /\.js$/
    },{
      loader: 'style!css!sass?sourceMap',
      test: /.scss$/
    }],
    postLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'istanbul-instrumenter'
    }]
  },
  resolve: {
    modulesDirectories: ['.', 'node_modules'],
  }
}
