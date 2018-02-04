const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SCRIPTS_PATH = './app/scripts/index.js';
const STYLES_PATH = './app/styles/index.js';

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    scripts: SCRIPTS_PATH,
    styles: STYLES_PATH,
  },
  output: {
    path: path.resolve('tmp'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: extractLess.extract([ 'css-loader', 'less-loader' ])  
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    extractLess,
  ]
};