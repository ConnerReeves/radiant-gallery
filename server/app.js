var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var recursive = require('recursive-readdir');

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const assetDir = process.argv[process.argv.length - 1];
app.use(express.static('dist'));
app.use(express.static(assetDir));

const isValidMediaFile = (file) => ['.jpg', '.mp4'].indexOf(path.extname(file)) > -1;

const getMetaData = (file) => ({
  path: file.replace(assetDir, '')
});

app.get('/manifest', function(req, res) {
  recursive(assetDir, function(err, files) {
    if (!err) {
      const manifest = files.reduce((manifest, file) => {
        if (isValidMediaFile(file)) {
          const fileMetaData = getMetaData(file);
          return manifest.concat(fileMetaData);
        }

        return manifest;
      }, []);

      res.send(manifest);
    }
  });
});

app.get('/', function(req, res) {
  res.render(__dirname + '/views/index.jade');
});

module.exports = app;
