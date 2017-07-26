var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var environment = require('./api/models/environment');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fusion')
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require ('./api/routes/oneoffRoutes.js');
routes(app);

app.listen(port);

console.log('Fusion API server started on: ' + port);