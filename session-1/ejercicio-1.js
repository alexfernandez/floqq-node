// modo estricto de JavaScript, muy útil para cazar errores
'use strict';

var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	// se traduce el mensaje a español
	response.end('Hola, mundo\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

