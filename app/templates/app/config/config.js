module.exports = {
	root: require('path').normalize(__dirname + '/..'),
	app: {
		name: 'Application-name',
		version: '0.0.1'
	},
	port: 3000,
	db: 'mongodb://localhost/appExpressMongo'
};