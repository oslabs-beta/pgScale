const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = {
  mode: env.NODE_ENV,
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  devServer: {
    static: {
      publicPath: path.join(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};