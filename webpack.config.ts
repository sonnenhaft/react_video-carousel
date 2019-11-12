import { Configuration } from 'webpack';

const HtmlWebPackPlugin = require('html-webpack-plugin');

interface SystemEnvVariables {
  mode: string
}

module.exports = (ignored: any, env: SystemEnvVariables): Configuration => ({
  entry: './src',
  optimization: { minimize: false },
  resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
  module: {
    rules: [
      { use: 'babel-loader', test: /\.(js|ts)(x?)$/ },
      { use: ['style-loader', 'css-loader'], test: /\.css$/i },
      {
        test: /\.(woff(2)?|ttf|gif|png|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts-and-images/'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: require('path').resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        secure: false,
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    }
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' })
  ]
});