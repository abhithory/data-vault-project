const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [tailwindcss, autoprefixer]
            }
          }
        }],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./public/index.html"
  }),
  new CopyPlugin({
    patterns: [
      { from: "public/assets" },
    ],
  }),
  // new webpack.ProvidePlugin({
  //   process: 'process/browser',
  // }),
  new NodePolyfillPlugin()

  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};