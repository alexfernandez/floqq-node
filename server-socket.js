'use strict';

var net = require('net');
var port = 1702;
var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.write('Hello?\r\n');
	connection.on('data', function(data) {
		if (String(data).trim() == 'quit') {
			connection.end('quit');
			return;
		}
		if (String(data).trim() != 'hello') {
			connection.write('ERROR\r\n');
		} else {
			connection.end('world\r\n');
		}
	});
	connection.on('error', function(error) {
		console.log('Error: %s', error);
	});
	connection.on('end', function() {
		console.log('Connection closed');
	});
});
server.listen(port);
