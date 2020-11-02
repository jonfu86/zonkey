const path = require('path');

module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/dist'),
    port: 8080,
    // Send API requests on localhost to API server get around CORS.
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};
