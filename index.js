var path = require('path'),
    fs = require('fs');

function AssetManifestPlugin(output, keyRoot) {
  this.output = output;
  this.keyRoot = keyRoot;
}

AssetManifestPlugin.prototype.apply = function(compiler) {
  var assets = {},
      output  = this.output,
      keyRoot = this.keyRoot;

  var outputPath = compiler.options.output.path,
      publicPath = compiler.options.output.publicPath;

  function publicRelative(url) {
    return path.join(publicPath, url.replace(outputPath, ''));
  }

  function removeLeadSlash(path) {
    if(path[0] === '/') {
      return path.slice(1);
    }

    return path;
  }

  function formatKey(path) {
    var keyRootPath = path.replace(keyRoot, '');
    return removeLeadSlash(keyRootPath);
  }

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('module-asset', function(module, file) {
      assets[formatKey(module.userRequest)] = publicRelative(file);
    });
  });

  compiler.plugin('done', function() {
    fs.writeFileSync(output, JSON.stringify(assets, null, 2));
  });
};

module.exports = AssetManifestPlugin;
