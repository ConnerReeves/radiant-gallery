var _ = require('lodash');
var readDir = require('recursive-readdir');
var path = require('path');

const getPath = (file) => (path.extname(file) || '').replace('.', '').toUpperCase();
const isImage = (file) => ['GIF', 'JPG', 'PNG', 'TIFF'].indexOf(getPath(file)) !== -1;
const isVideo = (file) => ['MP4', 'OGG', 'WEBM'].indexOf(getPath(file)) !== -1;

module.exports = {
  getManifest: (dirs) => new Promise((resolve, reject) => {
    Promise.all(dirs.map((dir) => new Promise((resolve, reject) => {
      readDir(dir, (err, files) => resolve(files));
    }))).then((files) => {
      const filteredFiles = _(files)
        .flatten()
        .filter((file) => isImage(file) || isVideo(file))
        .map((file) => ({ path: dirs.reduce((file, dir) => file.replace(dir, ''), file) }))
        .value();

      resolve(filteredFiles);
    });
  })
};
