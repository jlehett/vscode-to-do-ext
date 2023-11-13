const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/ui/index.js', // Update with your entry file
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/index.html', // Update with your HTML file
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
