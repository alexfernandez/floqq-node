# floqq-node

Curso de node.js para Floqq.
Presentación disponible en [slid.es](http://slid.es/alexfernandez/node-js-floqq).

## Código

Este [repositorio](https://github.com/alexfernandez/floqq-node) contiene el código visto en el curso.
También contiene las soluciones a los ejercicios.
Por favor, intenta hacerlos primero antes de mirar las soluciones.

### Sesión 1: hola, mundo

Código original: [session-1/hello-world.js](https://github.com/alexfernandez/floqq-node/blob/master/session-1/hello-world.js).
Todo el código en [session-1](https://github.com/alexfernandez/floqq-node/tree/master/session-1).

Ejercicios:
* Cambiar la respuesta a "Hola, mundo" (en español).
* Cambiar la respuesta a una página HTML que diga "Hola, mundo".
* Cambiar el servidor para que responda sólo en /, en otra URL debe dar error 500.

### Sesión 2: hola, mundo (again)

Código original: [session-2/hello-world.js](https://github.com/alexfernandez/floqq-node/blob/master/session-2/hello-world.js).
Todo el código en [session-2](https://github.com/alexfernandez/floqq-node/tree/master/session-2).

Ejercicios:
* Admitir 'hello', 'Hello', 'HELLO, 'HeLlO'...
* Manejar los eventos `error` y `end`.
* Convertir a `EventEmitter`.

### Sesión 3: pruebas

Código original: [session-3/tested-server.js](https://github.com/alexfernandez/floqq-node/blob/master/session-3/tested-server.js).
Todo el código en [session-3](https://github.com/alexfernandez/floqq-node/tree/master/session-3).

Ejercicios:
* Eliminar todos los `console.log()`.
* Añadir otra prueba `testError()`: envía otra cadena, comprueba que obtiene 'ERROR'.
* Añadir una prueba que arranque dos servidores en puertos distintos y los pare.

### Sesión 4: desmontando callbacks

Código original: [session-4/server-tester.js](https://github.com/alexfernandez/floqq-node/blob/master/session-4/server-tester.js).
Todo el código en [session-4](https://github.com/alexfernandez/floqq-node/tree/master/session-4).

Ejercicios:
* Convertir la función start() también a un objeto.
* Convertir prueba a eventos.
* Ver este vídeo (en inglés). Ejercicio sin código.

### Sesión 5: paquetes

Código original: [package.json](https://github.com/alexfernandez/floqq-node/blob/master/package.json).
Todo el código en la [raíz](https://github.com/alexfernandez/floqq-node/tree/master) del paquete.

Ejercicios (ligeramente cambiados desde la presentación):
* Crear un `index.js` que exporte alguna función.
* Exportar todos los tests de la sesión 3 e importarlos desde `test.js`.
* Publicar con `npm publish` y despublicar con `npm unpublish --force`.
  (Nota: primero es necesario hacer un fork y cambiar el nombre al paquete.)

## Licencia

Publicado bajo licencia MIT.
Published under the MIT license.

