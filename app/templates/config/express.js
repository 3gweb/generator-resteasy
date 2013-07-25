var express = require('express'),
	config = require('./config');

module.exports = function (app) {
	app.configure(function () {
		app.use(express.compress());
		app.set('port', config.port);
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(config.root + config.publicPath));
		app.use(function (req, res) {
			res.status(404).json({
				status: 404
			});
		});

		// development only
		if ('development' == app.get('env')) {
			app.use(express.errorHandler());
		}

	});
};