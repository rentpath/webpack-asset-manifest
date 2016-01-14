var path = require('path');
var baseDir = __dirname;
var AssetManifestPlugin = require('../../index');

module.exports = function(outputFile) {
  return {
    entry: path.join(baseDir, 'entry.js'),

    output: {
      path: path.join(baseDir, 'output'),
      publicPath: '/assets/'
    },

    module: {
      loaders: [
        {test: /\.gif$/, loader: 'file?name=[name]-[hash].[ext]'}
      ]
    },

    plugins: [
      new AssetManifestPlugin(outputFile, path.join(baseDir, 'assets'))
    ]
  };
};
