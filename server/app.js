const express = require('express');
const app = express();

const banner = require('./banner');
const directory = require('./directory');
const manifest = require('./manifest');

banner.display();

var mediaDir = process.argv[2];
if (!mediaDir) {
  mediaDir = __dirname;
  console.warn(`Media directory not defined! Using "${mediaDir}" instead.`);
}

app.use(express.static('dist'));
app.use(express.static(mediaDir));

app.get('/directory', (req, res) => {
  const path = req.query.path || mediaDir;
  directory.getSubDirs(path).then((children) => {
    res.send({ path, children });
  });
});

app.get('/manifest', (req, res) => {
  const path = req.query.path || mediaDir;
  manifest.getManifest(mediaDir, path).then((manifest) => res.send(manifest));
});

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.jade');
});

module.exports = app;
