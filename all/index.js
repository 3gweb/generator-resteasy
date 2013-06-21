'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AllGenerator = module.exports = function AllGenerator(args, options, config) {
	yeoman.generators.NamedBase.apply(this, arguments);
	console.log('You called the all subgenerator with the argument ' + this.name + '.');
};

util.inherits(AllGenerator, yeoman.generators.NamedBase);

AllGenerator.prototype.files = function files() {
	var args = this.arguments,
		filename = this.name,
		modelTextController = '',
		modelTextModel = '';

	modelTextController = 'var ' + filename + ' = require(\''+ filename +'\');' +
		'\n\nvar ' + filename + 'Controller = new EasyRestController(app, {' +
		'\n\t\'insert\': function (req, res) {},' +
		'\n\t\'update\': function (req, res) {},' +
		'\n\t\'destroy\': function (req, res) {},' +
		'\n\t\'list\': function (req, res) {},' +
		'\n\t\'get\': function (req, res) {},' +
		'\n\t\'get /customSearchUser\': function (req, res) {' +
		'\n\t\tres.t = 1;' +
		'\n\t}' +
		'\n});' +
		'\n\nmodule.exports = ' + filename + 'Controller;';

	modelTextModel = 'var RestEasy = require(\'rest-easy\');' +
		'\n\nvar ' + filename + 'Schema = new Schema({' +
		'\n\ttitle: String,' +
		'\n\tauthor: String,' +
		'\n\tage: Number,' +
		'\n\tcomments: [{ body: String, date: Date }],' +
		'\n\tdate: { type: Date, default: Date.now },' +
		'\n\thidden: Boolean,' +
		'\n\tmeta: {' +
    	'\n\t\tvotes: Number,' +
    	'\n\t\tfavs:  Number' +
  		'\n\t}' +
		'\n});' +
		'\n\nmodule.exports = ' + filename + 'Model;';

	this.write('app/controllers/' + filename + '.js', modelTextController);
	this.write('app/models/' + filename + '.js', modelTextModel);
};