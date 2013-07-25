'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ResteasyGenerator = module.exports = function ResteasyGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function() {
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
	}];

	this.prompt(prompts, function(props) {
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
	this.template('config/express.js', 'config/express.js');
};

ResteasyGenerator.prototype.wirteConfig = function writeIndex() {
	var mongoConnect = this.args[0] || 'mongo';
	var writeText = [
		'module.exports = {',
		'\troot: require(\'path\').normalize(__dirname + \'/..\'),',
		'\tpublicPath: \'/app/public\',',
		'\tapp: {',
		'\t\tname: \'Application-name\',',
		'\t\tversion: \'0.0.1\'',
		'\t},',
		'\tport: 3000,',
		'\tdb: \'mongodb://localhost/' + mongoConnect + '\',',
		'\tpathControllers: \'/app/controllers\',',
		'\tpathModels: \'/app/models\'',
		'};'
	];

	this.write('config/config.js', writeText.join('\n'));
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
	var writeText = 'RestEasy Yeoman Generator API';
	this.write('app/public/index.html', writeText);
};