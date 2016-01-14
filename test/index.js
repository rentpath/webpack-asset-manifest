var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var AssetManifestPlugin = require('../index');

describe('Plugin', function(done) {
  var outputFile;
  var images;

  beforeEach(function(done) {
    images = glob.sync('./test/dummy/assets/**/*.gif');
    outputFile = path.join(__dirname, 'dummy', 'webpack-test-assets.json');

    var config = require('./dummy/webpack.test.config');

    webpack(config(outputFile), function(err, stats) { 
      if(err) throw err;
      if(stats.hasErrors()) throw 'build has errors';
      if(stats.hasWarnings()) throw 'build has warnings';

      done();
    });
  });

  afterEach(function() {
    if(fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
    outputFile = null;
  });

  it('creates output file with given name', function() {
    var fileExists = fs.existsSync(outputFile);
    expect(fileExists).to.equal(true);
  });

  describe('output', function() {
    var manifest;
    beforeEach(function(done) {
      fs.readFile(outputFile, 'utf8', function(err, data) {
        manifest = JSON.parse(data);
        done();
      });
    });

    it('contains all assets', function() {
      expect(Object.keys(manifest)).to.have.length(images.length);
    });

    it('has keys scoped to asset root', function() {
      var keys = Object.keys(manifest);

      images.forEach(function(image) {
        var key = path.relative(path.join(__dirname, 'dummy', 'assets'), image);

        expect(keys).to.include(key);
      });
    });

    it('has values scoped to public dir', function() {
      images.forEach(function(image) {
        var key = path.relative(path.join(__dirname, 'dummy', 'assets'), image);

        // Expect the value to be the webpack output for the file.
        // This is based on the public path and file loader name config.
        var parts = image.split('/').slice(-1)[0].split('.');
        var expected = ['/assets/', parts[0], '-[0-9a-f]*\\.', parts[1]].join('');

        expect(manifest[key]).to.match(new RegExp(expected));
      });
    });
  });
});
