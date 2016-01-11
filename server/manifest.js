const _ = require('lodash');
const readDir = require('recursive-readdir');
const path = require('path');

const getPath = (file) => (path.extname(file) || '').replace('.', '').toUpperCase();
const isImage = (file) => ['GIF', 'JPG', 'PNG', 'TIFF'].indexOf(getPath(file)) !== -1;
const isVideo = (file) => ['MP4', 'OGG', 'WEBM'].indexOf(getPath(file)) !== -1;

module.exports = {
  getManifest: (mediaDir, dir) => new Promise((resolve) => {
    readDir(dir, (err, files) => {
      const filteredFiles = _(files)
        .filter((file) => isImage(file) || isVideo(file))
        .map((file) => ({ path: file.replace(mediaDir, '') }))
        .value();

      resolve(filteredFiles);
    });
  })
};
