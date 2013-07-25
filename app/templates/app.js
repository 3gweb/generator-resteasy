var express = require('express'),
	mongoose = require('mongoose'),
	RestEasy = require('rest-easy'),
	config = require('./config/config');

var app = express();
require('./config/express')(app);

mongoose.connect(config.db);

RestEasy.getInstance().initialize(app, mongoose, config);

app.listen(config.port);

console.log('http://localhost:' + config.port);