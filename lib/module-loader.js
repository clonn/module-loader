var fs = require('fs');
var util = require('util');
var dir = [];
var path = require('path');
var Route = require('./route');

function ModuleLoader (app) {

  // web application instance
  this.instance = app;
  console.log('initial Module-Loader...');

  // initial web instance
  instance = app;
  return this;
};

// load module and check them
function load(path) {
  var module = require(path);
  if ( ! module) {
    throw new Error('Module : ' + dirname + ' could not require');
  }
  return module;
}

// lib loader.
function libLoader(hook, key) {
  var app = this.instance;

  // TODO: have to enhace about controller, and routes.
  if (typeof hook === 'string') {
    return this;
  }

  // check module lib are Array type.
  if (util.isArray(hook)) {

    // append a main module collection for app.
    app[key] = {};

    // check this instance is require this lib
    var libs = hook;

    hook.forEach(function (lib, idx) {

      if ( ! app[key][lib]) {

        console.log('Load Library(' + key + '): ' + path.resolve(path.normalize(path.join('lib', lib))));

        app[key][lib] = require(path.resolve(path.join('lib', lib))) || require(lib);
      }
    });
  }

  return this;
}

function getMethod (route) {

  if (typeof route !== 'string') {
    return 'get';
  }

  route = route.toLowerCase();

  //var r = route.split('#').pop();
  // WebDAV origin types
  var method = {
        get: true,
        post: true,
        delete: true,
        put: true
      };

  return method[route] ? route : 'get';
}

function getRouteUrl (module, route) {
  var r = route.split('#').shift();
  if (r === '') {
    r = '/';
  }
  return path.join('/' + module, r);
}

function loadMiddleware (middleware, app) {
  var lib = app.lib || {};
  return middleware;
}

function addRoute (url, method, middleware) {
  var m = {
        get: true,
        post: true,
        delete: true,
        put: true
      },
      middlewareBuffer = middleware;

  method = m[method] ? method : 'get';

  // when 2nd parameter is ignored, will pass the method to middleware
  if (typeof middleware !== "array") {
    middleware = middlewareBuffer;
  }

}

// Load route setting and middleware
function loadRoute (fullpath, module, list) {

  var app = this.instance,
      defaultRoutePath,
      routeFullPath,
      routeFileList,
      routeQueue = new Route();

  // set default module route
  // this setting file, is always locate on index.js in module folder
  defaultRoutePath = module.route || 'routes';
  routeFullPath = path.resolve(path.normalize(path.join(fullpath, defaultRoutePath)));

  // load route and make url
  routeFileList = fs.readdirSync(path.resolve(path.normalize(path.join(fullpath, defaultRoutePath))));

  routeFileList.forEach(function (routeFile, idx) {

    if ( ! fs.statSync(path.join(routeFullPath, routeFile)).isFile()) {
      throw new Error('Module: ' + list + ', Route ' + routeFile + ' is not a file');
    }

    if ( ! routeFile.match(/[.]js$/)) {
      // file type fail.
      return;
    }

    // initial to load route app method.
    load(path.join(routeFullPath, routeFile))(app, routeQueue);

    routeQueue.queue.forEach(function (moduleRoute, i) {

      var method = getMethod(moduleRoute.method);
      var userUrl = getRouteUrl(list, moduleRoute.url);

      // load route and url
      app[method](
        userUrl,
        moduleRoute.middleware
      );

      console.log('Load Route: ' + userUrl + ' ,method: ' + method);

    });

  });
}

ModuleLoader.prototype.load = function (route) {
  // TODO: have to detect route as string.

  var lists = fs.readdirSync(route);

  lists.forEach(function (list, idx) {

    var module,
        fullpath = path.join(route, list);

    if ( ! fs.statSync(fullpath).isDirectory()) {
      throw new Error('Path ' + list + ' is not a folder');
    }

    // get absolute full path.
    var dirname = path.resolve(path.normalize(fullpath));

    // this is module index setting.
    module = load(dirname);
    for (i in module) {

      libLoader(module[i], i);

    }

    // Load module's route and implement these modules.
    loadRoute(fullpath, module, list);

  });

  return this;
};

module.exports = function (app) {
  return new ModuleLoader(app);
};
