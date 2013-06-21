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

// ResteasyGenerator.prototype.askFor = function askFor() {
// 	var cb = this.async();
// 	// have Yeoman greet the user.
// 	console.log(this.yeoman);
// 	var prompts = [{
// 			type: 'confirm',
// 			name: 'someOption',
// 			message: 'Would you like to enable this option?',
// 			default: true
// 		}
// 	];
// 	this.prompt(prompts, function(props) {
// 		this.someOption = props.someOption;
// 		cb();
// 	}.bind(this));
// };

ResteasyGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/views');
	this.mkdir('app/models');
	this.mkdir('app/config');
	this.mkdir('app/controllers');

	this.mkdir('app/public');
	this.mkdir('app/public/images');
	this.mkdir('app/public/javascripts');
	this.mkdir('app/public/stylesheets');

	this.copy('app/app.js', 'app/app.js');

	this.copy('app/views/index.jade', 'app/views/index.jade');
	this.copy('app/views/layout.jade', 'app/views/layout.jade');

	this.copy('app/config/config.js', 'app/config/config.js');
	this.copy('app/config/express.js', 'app/config/express.js');
	this.copy('app/config/mongoose.js', 'app/config/mongoose.js');
};

ResteasyGenerator.prototype.bower = function bower() {
	this.copy('bowerrc', '.bowerrc');
	this.copy('_bower.json', 'bower.json');
};

ResteasyGenerator.prototype.git = function git() {
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
};

ResteasyGenerator.prototype.editorConfig = function editorConfig() {
	this.copy('editorconfig', '.editorconfig');
};

ResteasyGenerator.prototype.packageFiles = function() {
	this.template('_config.json', 'config.json');
	this.template('_package.json', 'package.json');
};

ResteasyGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('jshintrc', '.jshintrc');
};