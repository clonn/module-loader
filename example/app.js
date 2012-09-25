var express = require('express');
var moduleLoader = require('../index');
var app = express();

moduleLoader(app).load('modules');

app.listen(3000);
console.log('server init listen 3000');
