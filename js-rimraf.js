/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(pathToClean) {
  if (fs.existsSync(pathToClean)) {
    fs.readdirSync(pathToClean).forEach((file) => {
      const curPath = path.join(pathToClean, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(pathToClean);
  }
}

deleteFolderRecursive(path.join(__dirname, './dist'));
