var path = require('path'),
    fs = require('fs');

function AssetManifestPlugin(output) {
  this.output = output;
}

AssetManifestPlugin.prototype.apply = function(compiler) {
  var assets = {},
      output  = this.output;

  var outputPath = compiler.options.output.path,
      publicPath = compiler.options.output.publicPath;

  function publicRelative(url) {
    return path.join(publicPath, url.replace(outputPath, ''));
  }

  function keyForModule(module) {
    return Object.keys(module.assets)[0];
  }

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('module-asset', function(module, file) {
      assets[keyForModule(module)] = publicRelative(file);
    });
  });

  compiler.plugin('done', function() {
    fs.writeFileSync(output, JSON.stringify(assets, null, 2));
  });
};

module.exports = AssetManifestPlugin;
