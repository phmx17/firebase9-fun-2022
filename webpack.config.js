const path = require('path')

module.exports = {
  devtool: "eval-cheap-source-map",
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: true  // watch index.js for changes and rebundle if required
} 


