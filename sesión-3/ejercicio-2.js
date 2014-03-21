'use strict';

var net = require('net');
var testing = require('testing');

/**
 * Inicia un servidor "hello world".
 */
function start(port, callback) {
	var server = net.createServer(function(connection) {
		connection.write('Hello?\r\n');
		connection.on('data', function(data) {
			if (String(data).trim() != 'hello') {
				connection.write('ERROR\r\n');
			} else {
				connection.end('world\r\n');
			}
		});

	});
	server.listen(port, callback);
	return server;
}

/**
 * Prueba el servidor.
 */
function testServer(callback) {
	var port = 1705;
	var server = start(port, function(error) {
		testing.check(error, 'Could not start server', callback);
		var socket = net.connect(port, 'localhost', function(error) {
			testing.check(error, 'Could not connect', callback);
			socket.on('data', function(data) {
				var message = String(data).trim();
				if (message == 'Hello?')
				{
					socket.write('hello');
					return;
				}
				testing.assertEquals(message, 'world', 'Invalid response', callback);
				server.close(function(error) {
					testing.check(error, 'Could not stop server', callback);
					testing.success(callback);
				});
			});
		});
	});
}

/**
 * Comprueba que el servidor devuelve ERROR si no recibe hello.
 */
function testError(callback) {
	var port = 1705;
	var server = start(port, function(error) {
		testing.check(error, 'Could not start server', callback);
		var socket = net.connect(port, 'localhost', function(error) {
			testing.check(error, 'Could not connect', callback);
			socket.on('data', function(data) {
				var message = String(data).trim();
				if (message == 'Hello?')
				{
					socket.write('Not hello!');
					return;
				}
				// debe recibir ERROR
				testing.assertEquals(message, 'ERROR', 'Invalid response', callback);
				// ahora tenemos que cerrar el socket, no se cierra solo
				socket.end(function() {
					// y ahora el servidor como antes
					server.close(function(error) {
						testing.check(error, 'Could not stop server', callback);
						testing.success(callback);
					});
				});
			});
		});
	});
}

// run tests if invoked directly
if (__filename == process.argv[1])
{
	// el nuevo test va aquí
	testing.run([testServer, testError], testing.show);
}

