var fs = require('fs');

exports.getFolderPath = function (folderPath) {

  var folders = [];

  // Read route path(directory) and list file name.
  // then read them as route.
  folders = fs.readdirSync(routeFolderPath);
  return folders;
};
