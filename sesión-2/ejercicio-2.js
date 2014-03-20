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
			// al llamar a connection.end() se va a terminar la conexión
			// lanzando el evento close
		}
	});
	// manejo de eventos error y close
	connection.on('error', function(error) {
		// muestra un error por consola
		console.error('connection closed with error: %s', error);
	});
	connection.on('close', function() {
		// muestra un mensaje por consola
		console.log('connection closed');
	});
});
server.listen(port);

