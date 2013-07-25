'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the Model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.writeModel = function writeModel() {
	var nameModel = this.args[0],
		argument = this.args,
		endComma = ',';

	var contentText = [
			'var RestEasy = require(\'rest-easy\'),',
			'\t' + nameModel + 'Model = new RestEasy.Model();',
			'\n' + nameModel + 'Model = new Schema({'
	];

	if (argument.length > 1) {
		for (var i = 1, len = argument.length; i < len; i++) {
			if (i === len - 1) {
				contentText.push('\t' + argument[i] + '');
			} else {
				contentText.push('\t' + argument[i] + endComma);
			}
		};
	} else {
		var contentText = [
				'var RestEasy = require(\'rest-easy\'),',
				'\t' + nameModel + ' = new RestEasy.Model();',
				'\n' + nameModel + ' = new Schema({',
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
				'\t}'
		];
	}

	contentText.push('});');
	contentText.push('\nmodule.exports = ' + nameModel + ';');

	this.write('app/models/' + this.name + '.js', contentText.join('\n'));
};