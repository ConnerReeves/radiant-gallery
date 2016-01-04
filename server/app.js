var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var path = require('path');
var ExifImage = require('exif').ExifImage;
var deg = require('deg');
var request = require('superagent');
var moment = require('moment');

/////////
var assets = require('./assets');

app.use(express.static('dist'));

const assetDirs = process.argv.slice(2);
assetDirs.forEach((assetDir) => {
  app.use(express.static(assetDir));
});

app.get('/manifest', (req, res) => {
  assets.getManifest(assetDirs).then((manifest) => {
    res.send(manifest);
  });
});

app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.jade');
});

// app.set('view engine', 'jade');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
// const assetDirs = process.argv.slice(2);
//
// if (assetDirs.length === 0) {
//   throw new Error('Asset directory not specified');
// } else {
//   console.log('\nServing:', assetDirs.join('\n         '));
//   assetDirs.forEach((assetDir) => app.use(express.static(assetDir)));
// }
//
// const mapsApiKey = 'AIzaSyDAeNRpkjkDtOEF-y1qk1O_Iixcp5ruwY0';
// const getLocationName = (latitude, longitude) => new Promise((resolve) => {
//   request
//     .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapsApiKey}`)
//     .end((err, res) => {
//       if (!err) {
//         const locations = res.body.results;
//         const city = locations[locations.length - (locations.length > 1 ? 2 : 1)];
//         const address = city && city.formatted_address || '';
//         resolve(address);
//       }
//     });
// });
//
// const isImage = (file) => ['.jpg'].indexOf(path.extname(file)) !== -1;
// const isVideo = (file) => ['.mp4'].indexOf(path.extname(file)) !== -1;
// const isValidMediaFile = (file) => isImage(file) || isVideo(file);
//
// const getDateString = (date) => moment(date, "YYYY:MM:DD").format('dddd, MMMM DD, YYYY');
//
// const getManifestData = (asset) => new Promise((resolve) => {
//   const assetPath = assetDirs.reduce((assetDir) => {
//     return asset.replace(assetDir, '');
//   }, asset);
//
//   const manifestData = {
//     path: assetPath
//   };
//
//   if (isImage(asset)) {
//     new ExifImage({ image: asset }, (error, metadata) => {
//       if (metadata) {
//         manifestData.date = getDateString(metadata.exif.DateTimeOriginal);
//
//         if (Object.keys(metadata.gps).length) {
//           const latitude = deg(metadata.gps.GPSLatitude.join(' ')).decimal;
//           const longitude = deg(metadata.gps.GPSLongitude.join(' ')).decimal;
//
//           getLocationName(latitude, longitude)
//             .then((location) => resolve(Object.assign(manifestData, { location })));
//         } else {
//           resolve(manifestData);
//         }
//       } else {
//         resolve(manifestData);
//       }
//     });
//   } else {
//     resolve(manifestData);
//   }
// });

module.exports = app;
