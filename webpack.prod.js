const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      __API__: "'https://draliatest.azurewebsites.net/api'", // prod server
      __API_AUTH_TOKEN__: "'NzSvsHgWN80FXBUJ'", // prod auth token
    }),
  ],
});