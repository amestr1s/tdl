const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'), // serve built files
    open: true,                              // auto-open browser
    hot: true,                               // enable HMR (Hot Module Replacement)
    watchFiles: ['./src/template.html'],              // auto-refresh when source files change
  },
});