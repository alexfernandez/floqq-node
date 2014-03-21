# floqq-node

Curso de node.js para Floqq.
Presentación disponible en [slid.es](http://slid.es/alexfernandez/node-js-floqq).

## Código

Este repositorio contiene el código visto en el curso.
También contiene las soluciones a los ejercicios.
Por favor, intenta hacerlos primero antes de mirar las soluciones.

### Sesión 1: hola, mundo

Código original: `hello-world.js`.

Ejercicios:
* Cambiar la respuesta a "Hola, mundo" (en español).
* Cambiar la respuesta a una página HTML que diga "Hola, mundo".
* Cambiar el servidor para que responda sólo en /, en otra URL debe dar error 500.

### Sesión 2: hola, mundo (again)

Código original: `hello-world.js`.

Ejercicios:
* Admitir 'hello', 'Hello', 'HELLO, 'HeLlO'...
* Manejar los eventos `error` y `end`.
* Convertir a `EventEmitter`.

### Sesión 3: pruebas

Código original: `tested-server.js`.

Ejercicios:
* Eliminar todos los `console.log()`.
* Añadir otra prueba `testError()`: envía otra cadena, comprueba que obtiene 'ERROR'.
* Añadir una prueba que arranque dos servidores en puertos distintos y los pare.

### Sesión 4: desmontando callbacks

Código original: `server-tester.js`.

Ejercicios:
* Convertir la función start() también a un objeto.
* Convertir prueba a eventos.
* Ver este vídeo (en inglés). Ejercicio sin código.

### Sesión 5: paquetes

Ejercicios (ligeramente cambiados desde la presentación):
* Crear index.js que exporte alguna función.
* Exportar todos los tests e importarlos desde test.js.
* Publicar con `npm publish` y despublicar con `npm unpublish --force`.
  (Nota: primero es necesario hacer un fork.)

## Licencia

Publicado bajo licencia MIT.
Published under the MIT license.

