'use strict';

var net = require('net');
var port = 1702;
var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.write('Hello?\r\n');
	connection.on('data', function(data) {
		if (String(data).trim() != 'hello') {
			connection.write('ERROR\r\n');
		} else {
			connection.end('world\r\n');
		}
	});
	connection.on('error', function(error) {
		console.error('connection closed with error: %s', error);
	});
	connection.on('close', function() {
		console.log('connection closed');
	});
});
server.listen(port);

