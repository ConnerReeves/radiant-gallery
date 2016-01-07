const fs = require('fs');
const path = require('path');

const isDirectory = (dir, filePath) => new Promise((resolve) => {
  fs.stat(path.resolve(dir, filePath), (err, stat) => {
    resolve(stat && stat.isDirectory());
  });
});

module.exports = {
  getSubDirs: (dir) => new Promise((resolve) => {
    fs.readdir(dir, (err, filePaths) => {
      Promise.all(filePaths.map((filePath) => isDirectory(dir, filePath))).then((isDirs) => {
        const subDirs = filePaths.filter((filePath, index) => isDirs[index]);
        resolve(subDirs);
      });
    });
  })
};
