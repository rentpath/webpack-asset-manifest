# Webpack Asset Manifest


Generates an asset manifest file, specifically for server-side frameworks like rails and sinatra that don’t generate asset links with Javascript.

## Usage

Add the following to your webpack.config.js:

```javascript
var AssetManifestPlugin = require('webpack-asset-manifest'),

var config = {
...
    plugins: [
      new AssetManifestPlugin('webpack-assets.json', path.resolve(__dirname, 'app/assets')),
};

/* Use the PrefetchPlugin to feed images to AssetManifestPlugin. */
var images = glob.sync('app/assets/images/**/*.+(jpg|jpeg|gif|png)');
images.forEach(function(image) {
  config.plugins.push(new webpack.PrefetchPlugin('./' + image));
});
```
# License
[MIT](https://github.com/rentpath/webpack-asset-manifest/blob/master/LICENSE)
