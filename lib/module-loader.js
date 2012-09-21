var pathProccess = require('./pathProccess');

exports = function (moduleFolderPath) {

  // read folder infomation.
  // it will check directiory in clude path process
  var folders = pathProccess.getFolderPath(moduleFolderPath);
  var routes = require(routeFullPath);

};

/*
  // add load module.
  app.loadModule = function (folderPath) {

    var routes = require(routeFullPath),
      // key of route objects
      m,
      // WebDAV origin types
      method = {
        get: true,
        post: true,
        delete: true,
        put: true
      };

    for (name in routes) {
      var type = routes[name].type,
          routeUrl = routes[name].route,
          routeMiddleware = routes[name].middleware;

      // Check method, make sure to suit for WebDAV type.
      if ( ! method[type]) {
        continue;
      }

      // Check route has to be string type
      if (typeof routeUrl !== "string") {
        continue;
      }

      if (
        typeof routeMiddleware === "object" ||
        typeof routeMiddleware === "function"
      ) {
        console.log("[Status] load route files : " + routeFullPath + ", name: " + name + ", type: " + type + ", route url: " + routeUrl);
        app[type](
          routeUrl,
          routeMiddleware
        );
      }
    }

    return app;
  };
*/
