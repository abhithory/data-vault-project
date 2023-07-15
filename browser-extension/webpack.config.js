const path = require('path');

module.exports = {
  entry: {
    index: "./src/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'my-first-webpack.bundle.js',
    filename: '[name].js',
  },
};