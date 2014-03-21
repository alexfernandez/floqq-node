// modo estricto de JavaScript
'use strict';

var http = require('http');

http.createServer(function (request, response) {
	// tipo MIME text/html para devolver una página HTML
	response.writeHead(200, {'Content-Type': 'text/html'});
	// se devuelve código HTML en varias líneas
	response.write('<html>\n<head><title>Hello world</title></head>\n');
	// cada línea está separada por un \n, para no hacerlas infinitas
	response.write('<body>\n<h1>Hello world</h1></body>\n</html>\n');
	// response.end() sin parámetros sólo termina la conexión
	response.end();
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

