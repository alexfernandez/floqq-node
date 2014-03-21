'use strict';

var net = require('net');
var events = require('events');
var util = require('util');
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

/**
 * Nuestra nueva función tiene la lógica de pruebas,
 * en lugar de delegarla entera a Tester.
 * Observa que crear una nueva prueba como testError en la sesión 3
 * sería ahora trivial con este diseño.
 */
function testServer(callback) {
	var port = 1705;
	var received = false;
	var tester = new Tester(port);
	tester.on('error', function(error) {
		testing.failure('Testing error: ' + error, callback);
	});
	tester.on('message', function(message) {
		if (message == 'Hello?')
		{
			// hacemos el write() y el return en la misma línea por brevedad
			return tester.write('hello');
		}
		// seguimos con la prueba
		testing.assertEquals(message, 'world', 'Bad response', callback);
		console.log('here');
		tester.close();
		received = true;
	});
	// finalmente, tras cerrar el servidor damos la prueba por buena
	// el cierre está ahora desacoplado de la escritura así que comprobamos que hayamos recibido algo
	tester.on('close', function() {
		testing.assert(received, 'Data not received', callback);
		testing.success('Well done!', callback);
	});
}

function Tester(port) {
	// self es una clausura para this
	var self = this;
	// convierte a EventEmitter
	events.EventEmitter.call(this);
	var socket;
	var server = start(port, serverStarted);
	// si encuentra un error en el servidor lo lanza
	server.on('error', function(error) {
		self.emit('error', error);
	});
	server.on('close', function() {
		self.emit('close');
	});
	
	function serverStarted() {
		socket = net.connect(port, 'localhost', socketConnected);
		// si encuentra un error en el socket lo lanza
		socket.on('error', function(error) {
			self.emit('error', error);
		});
	}
		
	function socketConnected() {
		socket.on('data', receiveData);
	}

	/**
	 * Esta nueva función sirve para enviar datos desde el tester.
	 */
	self.write = function(data) {
		socket.write(data);
	};
	
	function receiveData(data) {
		var message = String(data).trim();
		self.emit('message', message);
	}

	self.close = function() {
		server.close();
	};
}
// herencia de EventEmitter
util.inherits(Tester, events.EventEmitter);

exports.test = function(callback) {
	testing.run([testServer], callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

