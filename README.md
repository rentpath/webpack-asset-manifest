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

## Commitizen
   `webpack-asset-manifest` uses [Commitizen](https://commitizen.github.io/cz-cli/) to format commit messages.
   * Install it globally `$ npm install -g commitizen`
  Once you are ready to commit, follow the familiar github workflow, with a slight change.
  ```
  $ git add <files>
  $ git cz
  ```
  `git cz` will bring up the Commitizen commit prompt, follow the instructions, and `$ git push` as usual.

  This commit message format is used for `semantic-release`.

# License
[MIT](https://github.com/rentpath/webpack-asset-manifest/blob/master/LICENSE)
