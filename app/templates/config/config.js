module.exports = {
	root: require('path').normalize(__dirname + '/..'),
	publicPath: '/app/public',
	app: {
		name: 'Application-name',
		version: '0.0.1'
	},
	port: 3000,
	db: 'mongodb://localhost/resteasy-todoapp',
	pathControllers: '/app/controllers',
	pathModels: '/app/models'
};