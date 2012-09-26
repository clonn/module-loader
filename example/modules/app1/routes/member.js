module.exports = function (app, r) {

  r.addRoute('', 'get', [
    function (req, res) {
      res.send('run index view');
    }
  ]);

  r.addRoute('', 'post', [
    function (req, res) {
      res.send('run index view:POST');
    }
  ]);

  r.addRoute('index/:id', 'get', [
    function (req, res) {
      app.lib.lib1();
      app.lib.lib2();
      res.send('run index/:id');
    }
  ]);

  r.addRoute('info', [
    function (req, res) {
      res.send('run info, and ignore METHOD parameter');
    }
  ]);

};
