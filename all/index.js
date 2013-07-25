'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AllGenerator = module.exports = function AllGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the all subgenerator with the argument ' + this.name + '.');
};

util.inherits(AllGenerator, yeoman.generators.NamedBase);

AllGenerator.prototype.writeController = function writeController() {
	var nameController = this.args[0];

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

	contentText.push(contentTextFindAll);
	contentText.push(contentTextFindById);
	contentText.push(contentTextPost);
	contentText.push(contentTextPut);
	contentText.push(contentTextDelete);

	contentText.push('\nmodule.exports = ' + nameController + ';');

	this.write('app/controllers/' + this.name + '.js', contentText.join('\n'));
};

AllGenerator.prototype.writeModel = function writeModel() {
	var nameModel = this.args[0];

	var contentText = [
			'var RestEasy = require(\'rest-easy\');',
			'\nvar ' + nameModel + ' = new RestEasy.Model(\'' + nameModel + '\', {',
			'\ttitle: String,',
			'\tauthor: String,',
			'\tbody: String,',
			'\tcomments: [{',
			'\t\t\tbody: String,',
			'\t\t\tdate: Date',
			'\t\t}',
			'\t],',
			'\tdate: {',
			'\t\ttype: Date,',
			'\t\tdefault: Date.now',
			'\t},',
			'\thidden: Boolean,',
			'\tmeta: {',
			'\t\tvotes: Number,',
			'\t\tfavs: Number',
			'\t}',
			'});'
	];

	contentText.push('\nmodule.exports = ' + nameModel + ';');

	this.write('app/models/' + this.name + '.js', contentText.join('\n'));
};