var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<html>\n<head><title>Hello world</title></head>\n');
	response.write('<body>\n<h1>Hello world</h1></body>\n</html>\n');
	response.end();
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

