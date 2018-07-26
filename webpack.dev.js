const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 3001,
    compress: true,
    historyApiFallback: true,
    contentBase: './dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      __API__: "'https://draliatest.azurewebsites.net/api'", // testing server
      __API_AUTH_TOKEN__: "'NzSvsHgWN80FXBUJ'", // testing auth token
    }),
  ],
});