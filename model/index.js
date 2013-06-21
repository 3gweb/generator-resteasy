'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
	yeoman.generators.NamedBase.apply(this, arguments);
	console.log('You called the model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
	var args = this.arguments,
		filename = this.name,
		modelTextModel = '',
		newSchema = {},
		arraySchema = [];

	var transObject = function(objArray) {
		var schema = {}
		for (var i = 1; i < args.length; i++) {
			var key = args[i].split(':')[0];
			var value = args[i].substring(key.length + 1);

			schema[key] = value;
		};

		return transSchema(schema);
	};

	var transSchema = function(objSchema) {
		var modelSchema = '{\n',
			modelSchemaEnd = ',\n',
			lenNewSchema = 0;

		lenNewSchema = Object.keys(objSchema).length;

		Object.keys(objSchema).forEach(function(key, index) {
			if (lenNewSchema - 1 === index) {
				modelSchemaEnd = '';
			}

			modelSchema += '\t' + key + ': ' + objSchema[key] + modelSchemaEnd;
		});
		modelSchema += '\n}';

		return modelSchema;
	};

	newSchema = transObject(args);

	modelTextModel = 'var RestEasy = require(\'rest-easy\');' +
		'\n\nvar ' + filename + 'Schema = new Schema(' + newSchema + ');' +
		'\n\nmodule.exports = ' + filename + 'Model;';

	this.write('app/models/' + filename + '.js', modelTextModel);
};