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

/**
 * Arranca un servidor, luego otro, y cierra ambos.
 */
function testTwoServers(callback) {
	// arranca el primer servidor
	var server1 = start(1705, function(error) {
		testing.check(error, 'Could not start server 1', callback);
		// arranca el segundo servidor en otro puerto
		var server2 = start(1706, function(error) {
			// comprueba el error! usa diferentes mensajes para cada error
			testing.check(error, 'Could not start server 2', callback);
			// ahora cierra el primer servidor
			server1.close(function(error) {
				testing.check(error, 'Could not stop server 1', callback);
				// y el segundo
				server2.close(function(error) {
					testing.check(error, 'Could not stop server 2', callback);
					testing.success(callback);
				});
			});
		});
	});
}

// run tests if invoked directly
if (__filename == process.argv[1])
{
	// el nuevo test va aquí, ahora el array dividido en líneas
	testing.run([
		testServer,
		testError,
		testTwoServers,
	], testing.show);
}

