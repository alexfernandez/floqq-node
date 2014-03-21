'use strict';

var testing = require('testing');
// importa cada test individual
var s1ej1 = require('./session-3/ejercicio-1.js');
var s1ej2 = require('./session-3/ejercicio-2.js');
var s1ej3 = require('./session-3/ejercicio-3.js');

// mete todos los tests en un array
var tests = [
	s1ej1.test,
	s1ej2.test,
	s1ej3.test,
];
// corre todos los tests en secuencia
testing.run(tests, testing.show);


