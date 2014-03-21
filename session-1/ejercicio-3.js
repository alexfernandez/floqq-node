// modo estricto de JavaScript
'use strict';
var http = require('http');

http.createServer(function (request, response) {
	// request.url contiene el path de la petición
	if (request.url != '/') {
		// no es la home /, devuelve error
		response.writeHead(500, {'Content-Type': 'text/plain'});
		// una respuesta 500 puede devolver una página
		response.end('Error');
		return;
	}
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

