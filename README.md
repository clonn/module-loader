module-loader
=============

Module Loader is a helper of [Express framework](http://expressjs.com), it can help to auto load modules and render routes and middleware by it self.

##How to use

update your express main js file, ex, app.js

    var express = require('express');
    var moduleLoader = require('../index');
    var app = express();

    moduleLoader(app).load('modules');

    app.listen(3000);
    console.log('server init listen 3000');

the module loader will help you load modules those under 'modules' folder.

Then you can put modules in 'modules' folder,

For example, there is a app1 module. the app1 folder structure is below,

    ├── index.js
    └── routes
        └── member.js

index.js file can allocate the *route* folder name, and reload global library.

**index.jsi**

    module.exports = {
      lib: [
       'lib1'
      ],
      route: 'routes'
    };

the routes folder will be put the route setting files. the app1 module already put in a member route. That module loader will help you auto load these route / middleware file in modules.

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

##Module folder / file structure

    ├── app.js
    ├── lib
    │   ├── lib1.js
    └── modules
        └── app1
                ├── index.js
                        └── routes
                                    └── member.js

Help modules which build under Express, can auto load when web service started.

