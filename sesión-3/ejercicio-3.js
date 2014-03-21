'use strict';

var net = require('net');
var testing = require('testing');

/**
 * Start a hello world server.
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
 * Test the server.
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
 * Test that the server returns ERROR if not receiving hello.
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
				// must receive ERROR
				testing.assertEquals(message, 'ERROR', 'Invalid response', callback);
				// but now we must close the socket
				socket.end(function() {
					// and now the server as before
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
 * Start one server, then another, then close both.
 */
function testTwoServers(callback) {
	var port1 = 1705;
	var port2 = 1706;
	// start first server
	var server1 = start(port1, function(error) {
		testing.check(error, 'Could not start server 1', callback);
		// start second server on a different port
		var server2 = start(port2, function(error) {
			// check for error too! use different messages for each error
			testing.check(error, 'Could not start server 2', callback);
			// now close the first server
			server1.close(function(error) {
				testing.check(error, 'Could not stop server 1', callback);
				// and the second server
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
	// added the new test here, array in lines
	testing.run([
		testServer,
		testError,
		testTwoServers,
	], testing.show);
}

