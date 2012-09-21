var enHanceExpress = require('./lib/index.js');
//var express = require('express');

var app = enHanceExpress();

app.loadModule();
app.listen(3000);
console.log('server init listen 3000');
