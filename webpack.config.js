'use strict';

require('dotenv').config();
const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

//if NODE_ENV is production string in env file then this will equal true boolean
const production = process.env.NODE_ENV === 'production';

let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new ExtractPlugin('bundle.[hash].css'),
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __APP_ID__: JSON.stringify(process.env.APP_ID),
    __API_TOKEN__: JSON.stringify(process.env.API_TOKEN),
    __API_CON__: JSON.stringify(process.env.API_CONNECT_URL),
  }),
];

//CleanPlugin folder to clean
let pathsToClean = [
  'build',
];

// production plugins
if(production){
  plugins = plugins.concat([
    new CleanPlugin(pathsToClean),
    new UglifyPlugin(),
  ]);
}

// export config
module.exports = {
  plugins,
  entry: `${__dirname}/src/main.js`,
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },

  devServer: { historyApiFallback: true },
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
