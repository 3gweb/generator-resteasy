'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ResteasyGenerator = module.exports = function ResteasyGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({
			skipInstall: options['skip-install']
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ResteasyGenerator, yeoman.generators.Base);

ResteasyGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
			type: 'confirm',
			name: 'someOption',
			message: 'Would you like to enable this option?',
			default: true
		}
	];

	this.prompt(prompts, function (props) {
		this.someOption = props.someOption;

		cb();
	}.bind(this));
};

ResteasyGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('config');
	this.mkdir('app/models');
	this.mkdir('app/controllers');

	this.mkdir('app/public');
	this.mkdir('app/public/images');
	this.mkdir('app/public/javascripts');
	this.mkdir('app/public/stylesheets');

	this.template('app.js', 'app.js');
	this.template('config/config.js', 'config/config.js');
	this.template('config/express.js', 'config/express.js');
};

ResteasyGenerator.prototype.git = function git() {
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

ResteasyGenerator.prototype.editorConfig = function editorConfig() {
	this.copy('editorconfig', '.editorconfig');
};

ResteasyGenerator.prototype.jshint = function jshint() {
	this.copy('jshintrc', '.jshintrc');
};

ResteasyGenerator.prototype.packageFiles = function packageFiles() {
	this.copy('_package.json', 'package.json');
};

ResteasyGenerator.prototype.travis = function travis() {
	this.copy('travis.yml', '.travis.yml');
};

ResteasyGenerator.prototype.wirteIndex = function writeIndex() {
	var writeText = 'Guilherme Féla-da-mãe';
	this.write('app/public/index.html', writeText);
};