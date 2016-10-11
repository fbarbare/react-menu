var path = require('path');
var webpackConfig = require('floflo-webpack-config');

module.exports = webpackConfig({
  sourcePath: path.join(__dirname),
  sourceFileName: 'example.js',
  destinationPath: path.join(__dirname, 'public'),
  destinationFileName: 'script.js'
});
