'use strict';

var net = require('net');
var testing = require('testing');
// var port = 1702;

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

// start(port);

function testServer(callback) {
	var port = 1705;
	new Tester(port, callback);
}

function Tester(port, callback) {
	var socket;
	var server = start(port, serverStarted);
	
	function serverStarted(error) {
		testing.check(error, 'Could not start server', callback);
		socket = net.connect(port, 'localhost', socketConnected);
	}
		
	function socketConnected(error) {
		testing.check(error, 'Could not connect', callback);
		socket.on('data', receiveData);
	}
	
	function receiveData(data) {
		var message = String(data).trim();
		if (message == 'Hello?')
		{
			socket.write('hello');
			return;
		}
		testing.assertEquals(message, 'world', 'Bad response', callback);
		server.close(serverClosed);
	}
	
	function serverClosed(error) {
		testing.check(error, 'Could not stop server', callback);
		testing.success('Good job!', callback);
	}
}

exports.test = function(callback) {
	testing.run([testServer], callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

