var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var environment = require('./api/models/environment');
var drive = require('./api/models/drive');
var seeder = require('./api/models/seeders/seeder');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fusion');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

seeder.seed(mongoose);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require ('./api/routes/oneoffRoutes.js');
routes(app);

app.listen(port);

console.log('Fusion API server started on: ' + port);