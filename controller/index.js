'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
	yeoman.generators.NamedBase.apply(this, arguments);
	console.log('You called the controller subgenerator with the argument ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
	var args = this.arguments,
		filename = this.name,
		modelTextController = '',
		modelTextControllerCustom = '',
		modelsRoutes = ['insert', 'destroy', 'list', 'get'],
		modelRoutes,
		modelsTextRoutes = [],
		findModelText = '';

	modelsTextRoutes = {
		insert: '\n\t\'insert\': function (req, res) {},',
		destroy: '\n\t\'destroy\': function (req, res) {},',
		list: '\n\t\'list\': function (req, res) {},',
		get: '\n\t\'get\': function (req, res) {},',
	};

	modelTextController = 'var ' + filename + ' = require(\'model\');' +
		'\n\nvar ' + filename + 'Controller = new EasyRestController(app, {' +
		'\n\t\'insert\': function (req, res) {},' +
		'\n\t\'update\': function (req, res) {},' +
		'\n\t\'destroy\': function (req, res) {},' +
		'\n\t\'list\': function (req, res) {},' +
		'\n\t\'get\': function (req, res) {},' +
		'\n\t\'get /customSearch\': function (req, res) {' +
		'\n\t\tres.t = 1;' +
		'\n\t}' +
		'\n});' +
		'\n\nmodule.exports = ' + filename + 'Controller;';

	var customRoutes = function(args) {
		args.shift();
		var breaking = false;
		var errors = [];
		args.forEach(function(arg) {
			if (modelsRoutes.indexOf(arg) === -1) {
				errors.push('Erro argument: ' + arg + ' invalid!');
			} else {
				findModelText += modelsTextRoutes[arg];
			}
		});

		if (errors.length > 0) {
			errors.push('Arguments valids: insert update destroy list get\n');
			errors.forEach(function(data) {
				console.warn(data);
			});
			return;
		}

		modelTextControllerCustom = 'var ' + filename + ' = require(\'model\');' +
			'\n\nvar ' + filename + 'Controller = new EasyRestController(app, {' +
			'' + findModelText + '' +
			'\n\t\'get /customSearch\': function (req, res) {' +
			'\n\t\tres.t = 1;' +
			'\n\t}' +
			'\n});' +
			'\n\nmodule.exports = ' + filename + 'Controller;';

		return modelTextControllerCustom;
	};

	modelRoutes = customRoutes(args);

	console.log(modelRoutes);
	if (args.length === 0) {
		modelRoutes = modelTextController;
		this.write('app/controllers/' + filename + '.js', modelRoutes);
	} else if (modelRoutes !== undefined) {
		console.log(modelRoutes);
		this.write('app/controllers/' + filename + '.js', modelRoutes);
	}
};