/*
	https://github.com/tapio/live-server
*/
var liveServer = require("live-server");

var params = {
	host: "localhost",
	ignore: __dirname + '/sass',
	logLevel: 2,
	port: 9000,
	root: __dirname	
};

liveServer.start(params);