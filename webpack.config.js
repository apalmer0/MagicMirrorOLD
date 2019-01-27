const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  todoist_api_key: process.env.TODOIST_API_KEY,
  weather_api_key: process.env.WEATHER_API_KEY,
};

config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
    TODOIST_API_KEY: JSON.stringify(config.todoist_api_key),
    WEATHER_API_KEY: JSON.stringify(config.weather_api_key),
  },
  NODE_ENV: config.env,
};

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)|(\.test\.jsx?$)/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader',
              query: {
                minimize: true,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
            { loader: 'import-glob-loader' },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'bundle.css',
    }),
    new webpack.DefinePlugin(config.globals),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'src'),
    ],
    extensions: ['.js', '.jsx'],
  },
};
