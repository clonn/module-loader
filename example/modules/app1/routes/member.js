module.exports = {
  '': {
    middleware: [
      function (req, res) {
        //this.lib.lib1();
        res.send('member root path');
      }
    ]
  },
  '#post': {
    middleware: [
      function (req, res) {
        res.send('member root path (get)');
      }
    ]
  },
  'info': {
    middleware: [
      function (req, res) {
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
