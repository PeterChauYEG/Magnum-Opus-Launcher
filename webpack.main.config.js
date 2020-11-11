const path = require('path');

function srcPaths(src) {
  return path.join(__dirname, src);
}

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  mode: 'development',
  devtool: 'source-map',
  target: 'electron-main',
  entry: './src/main/main.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.mp4', '.png']
  },
};
