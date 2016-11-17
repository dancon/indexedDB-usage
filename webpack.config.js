var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './DBMS.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'dbms.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  watch: true
}