var path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

function AssetManifestPlugin(output, assetRoot) {
  this.output = output;
  this.assetRoot = assetRoot;
}

AssetManifestPlugin.prototype.apply = function(compiler) {
  var assets = {},
      output  = this.output,
      assetRoot = this.assetRoot;

  var publicPath = compiler.options.output.publicPath;

  function publicRelative(url) {
    return publicPath + url;
  }

  function removeAssetRoot(resource) {
    var replaceRoot = new RegExp("^" + assetRoot + "(\/)?");
    return resource.replace(replaceRoot, '');
  }

  function keyForModule(module) {
    return removeAssetRoot(module.resource);
  }

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('module-asset', function(module, file) {
      assets[keyForModule(module)] = publicRelative(file);
    });
  });

  compiler.plugin('done', function() {
    mkdirp.sync(path.dirname(output));
    fs.writeFileSync(output, JSON.stringify(assets, null, 2));
  });
};

module.exports = AssetManifestPlugin;
