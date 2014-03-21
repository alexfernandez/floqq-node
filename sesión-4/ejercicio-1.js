'use strict';

var net = require('net');
var testing = require('testing');
// var port = 1702;

function start(port, callback) {
	// crea el objeto server
	var server = new Server(port);
	// empieza a escuchar
	server.listen(callback);
	// devuelve nuestro objeto server (no el original)
	return server;
}

/**
 * Esta función es la definición del objeto Server,
 * por eso está en mayúsculas.
 */
function Server(port)
{
	var server = net.createServer(connect);

	/**
	 * Recibe una conexión.
	 * Una función definida dentro de otra función? Claro que sí!
	 */
	function connect(connection) {
		connection.write('Hello?\r\n');
		connection.on('data', function(data) {
			if (String(data).trim() != 'hello') {
			} else {
				connection.end('world\r\n');
			}
		});
	}

	/**
	 * Comienza a escuchar.
	 * A esta función se accede desde fuera, así que se crea como atributo de this.
	 */
	this.listen = function(callback)
	{
		server.listen(port, callback);
	};

	/**
	 * Como ya no devolvemos el servidor directamente sino nuestro objeto Server,
	 * tenemos que exponer una función para cerrar.
	 */
	this.close = function(callback)
	{
		server.close(callback);
	};
}

// start(port);

function testServer(callback) {
	var port = 1705;
	new Tester(port, callback);
}

/**
 * Observa que el test no cambia porque respetamos el API.
 */
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

