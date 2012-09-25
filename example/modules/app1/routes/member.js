/*
route = {
  r:[],
  function addRoute(ro, method, callback) {
    r.push({route: ro, method: method, callback: callback});
  }
}
*/
/*
r.addRoute('index/:id', 'get', [
  someroute.xxx,
  someroute.xx1
]);
*/

module.exports = function (app) {
  return {
    '': {
      middleware: [
        function (req, res) {
          app.lib.lib1();
          app.lib.lib2();
          res.send('member root path');
        }
      ]
    },
    '#post': {
      middleware: [
        function (req, res) {
          app.lib.lib2();
          res.send('member root path (get)');
        }
      ]
    },
    'info': {
      middleware: [
        function (req, res) {
          app.lib.lib2();
          res.send('member info');
        }
      ]
    },
    'data#get': {
      middleware: [
        //lib.lib1,
        function (req, res) {
          res.send('member data');
        }
      ]
    },
    'data#post': {
      middleware: [
        //lib.lib2,
        function (req, res) {
          res.send('member data');
        }
      ]
    },
  };

};
