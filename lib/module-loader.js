var fs = require('fs');
var util = require('util');
var dir = [];
var path = require('path');
var pathProccess = require('./pathProccess');


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

  var r = route.split('#').pop();
  // WebDAV origin types
  var method = {
        get: true,
        post: true,
        delete: true,
        put: true
      };

  return method[r] ? r : 'get';
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

ModuleLoader.prototype.load = function (route) {
  // TODO: have to detect route as string.

  var lists = fs.readdirSync(route);

  lists.forEach(function (list, idx) {
    var module;
    var app = this.instance;
    var fullpath = path.join(route, list);

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

    // set default module route
    var defaultRoutePath = module.route || 'routes';
    var routeFullPath = path.resolve(path.normalize(path.join(fullpath, defaultRoutePath)));

    // load route and make url
    var routes = fs.readdirSync(path.resolve(path.normalize(path.join(fullpath, defaultRoutePath))));

    var app = this.instance;
    routes.forEach(function (route, idx) {

      if ( ! fs.statSync(path.join(routeFullPath, route)).isFile()) {
        throw new Error('Module: ' + list + ', Route ' + route + ' is not a file');
      }

      if ( ! route.match(/[.]js$/)) {
        // file type fail.
        return;
      }

      var moduleRoute = load(path.join(routeFullPath, route));
      moduleRoute.that = app.lib;

      for (i in moduleRoute) {
        var method = getMethod(i);
        var userRoute = getRouteUrl(list, i);

        // load route and url
        app[method](
          userRoute,
          moduleRoute[i].middleware
        );

        console.log('Load Route: ' + userRoute + ' ,method: ' + method);
      }

    });



  });
  //console.log(lists);
  //console.log('run load method');
  return this;
};

module.exports = function (app) {
  return new ModuleLoader(app);
};
