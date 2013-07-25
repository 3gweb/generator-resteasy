'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the controller subgenerator with the argument ' + this.name + '.');
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.writeController = function writeController() {
	var nameController = this.args[0],
		argument = this.args;

	var contentTextFindAll = '\n' + nameController + '.get(\'/' + nameController + '\', function (req, res) {\n' +
		'\tres.json(\'ok!\');' +
		'\n});';

	var contentTextFindById = '\n' + nameController + '.get(\'/' + nameController + '/:id\', function (req, res) {\n' +
		'\tres.json(\'ok!\');' +
		'\n});';

	var contentTextPost = '\n' + nameController + '.post(\'/' + nameController + '\', function (req, res) {\n' +
		'\tres.json(\'ok!\');' +
		'\n});';

	var contentTextPut = '\n' + nameController + '.put(\'/' + nameController + '/:id\', function (req, res) {\n' +
		'\tres.json(\'ok!\');' +
		'\n});';

	var contentTextDelete = '\n' + nameController + '.delete(\'/' + nameController + '/:id\', function (req, res) {\n' +
		'\tres.json(\'ok!\');' +
		'\n});';

	var contentText = [
			'var RestEasy = require(\'rest-easy\'),',
			'\t' + nameController + ' = new RestEasy.Controller();'
	];

	var arrayMap = {
		'list': contentTextFindAll,
		'get': contentTextFindById,
		'post': contentTextPost,
		'put': contentTextPut,
		'delete': contentTextDelete
	};

	if (argument.length > 1) {
		for (var i = 1; i < argument.length; i++) {
			if (arrayMap['' + argument[i] + ''] !== undefined) {
				contentText.push(arrayMap['' + argument[i] + '']);
			} else {
				console.warn('\nArguiment ' + argument[i] + ' incorrect!!');
			}
		};
	} else {
		contentText.push(contentTextFindAll, contentTextFindById, contentTextPost, contentTextPut, contentTextDelete);
	}

	contentText.push('\nmodule.exports = ' + nameController + ';');

	this.write('app/controllers/' + this.name + '.js', contentText.join('\n'));
};