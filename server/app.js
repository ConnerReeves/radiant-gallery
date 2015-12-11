var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var assetDir = process.argv[process.argv.length - 1];
console.log('\nServing: ' + assetDir);

app.use(express.static(assetDir));
app.use(express.static('dist'));

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  fs.readdir(assetDir, function(err, assets) {
    var allowedExtensions = ['.jpg'];

    assets = _.filter(assets, function(asset) {
      return _.contains(allowedExtensions, path.extname(asset));
    });

    res.render(__dirname + '/views/index.jade', { assets: JSON.stringify(assets) });
  });
});

module.exports = app;
