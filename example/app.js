var express = require('express');
var moduleLoader = require('../index');
var app = express();

//console.log(require('/root/project/module-loader/example/modules/app1/index.js').lib);

moduleLoader(app).load('modules').run();

app.listen(3000);
console.log('server init listen 3000');
