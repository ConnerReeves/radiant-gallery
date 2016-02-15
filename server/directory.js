const Immutable = require('immutable');
const recursive = require('recursive-readdir');

module.exports = {
  getDirectory: (root) => new Promise((resolve) => {
    recursive(root, ['.DS_Store'], (err, paths) => {
      const directory = paths
                          .map((path) => path.replace(root, ''))
                          .map((path) => path.substring(0, path.lastIndexOf('/')))
                          .reduce((directory, path) => {
                            const pathParts = path.split('/');

                            pathParts.forEach((pathPart, partIndex) => {
                              const parentPath = pathParts.slice(0, partIndex).join('/');

                              if (pathPart) {
                                directory = directory.update(parentPath, (children) => {
                                  return children ? children.add(pathPart) : Immutable.Set([ pathPart ]);
                                });
                              }
                            });

                            return directory;
                          }, Immutable.Map()).toJS();

      resolve(directory);
    });
  })
};
