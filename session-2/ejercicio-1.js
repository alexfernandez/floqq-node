'use strict';

var net = require('net');
var port = 1702;
var server = net.createServer(function(connection) {
	console.log('Connection open');
	connection.write('Hello?\r\n');
	connection.on('data', function(data) {
		// ahora llamamos a toLowerCase() para convertir la entrada a minúsculas
		if (String(data).trim().toLowerCase() != 'hello') {
			connection.write('ERROR\r\n');
		} else {
			connection.end('world\r\n');
			console.log('connection closed');
		}
	});
});
server.listen(port);

