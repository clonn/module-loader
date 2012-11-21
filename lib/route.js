var util = require('util');

/**
 * Constructure of Route
 *
 * @Class Route
 * @params none
 * @return self
 *
 */
function Route() {
  this.queue = [];
};

/**
 * Add route in Route Class queue.
 *
 * @method addRoute
 * @params {String} url, route url, ref expressjs.com
 * @params {String | Array}
 * @params {Array} middleware, type of middleware of express framework.
 * @return void
 *
 */
Route.prototype.addRoute = function (url, method, middleware) {

  var m = {
        get: true,
        post: true,
        delete: true,
        put: true
      },
      route;


  if (typeof url !== 'string') {
    throw new Error('[Error] addRoute URL must be a Strin type. ');
  }

  // this is for ignore method, by default.
  // method can be ignored.
  // and method can be as middleware, so you can use addRoute like a magic function.

  // Array could be a middleware of Route.
  if (util.isArray(method)) {

    middleware = method;
    method = 'get';

  }

  // fixed WebDAV method, will pass different (HIGH, LOWER case)
  if (typeof method === 'string') {
    method = method.toLowerCase();
  }

  method = m[method] ? method : 'get';

  // Otherwise, middleware have to existed and be an Array type
  if ( ! middleware || ! util.isArray(middleware)) {
    throw new Error('[Error] Load middleware FAIL, URL: ' + url + ', Method: ' + method);
  }

  route = {
    url: url,
    method: method,
    middleware: middleware
  };

  // push those route setting in an queue of Route.
  this.queue.push(route);

};

// module exports for Node.js
module.exports = Route;
