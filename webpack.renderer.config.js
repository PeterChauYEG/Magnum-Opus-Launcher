const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

function srcPaths(src) {
  return path.join(__dirname, src);
}

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      '@main': srcPaths('src/main'),
      '@models': srcPaths('src/models'),
      '@renderer': srcPaths('src/renderer'),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.mp4', '.json', '.png']
  },
};
