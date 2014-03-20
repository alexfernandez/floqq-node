'use strict';

var net = require('net');
var events = require('events');
var util = require('util');

/**
 * Esta función es en realidad un objeto que se instancia con new Server().
 */
function Server(port)
{
	// usar self es necesario para evitar que en connection.on(...)
	// 'this' sea connection, y se llame a connection.on(...) de forma circular
	var self = this;
	// convierte a Server en un EventEmitter
	events.EventEmitter.call(this);

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
		// emitir los eventos error y close, pero desde server (no desde connection)
		connection.on('error', function(error) {
			self.emit('error', error);
		});
		connection.on('close', function() {
			self.emit('close');
		});
	});
	server.listen(port);
}
// herencia
util.inherits(Server, events.EventEmitter);

var server = new Server(1702);
// se pueden capturar los eventos error y close y pintarlos desde aquí
server.on('error', function(error) {
	console.error('error: %s', error);
});
server.on('close', function() {
	console.log('connection closed');
});


