# floqq-node

Curso de node.js para Floqq.
Presentación disponible en [slid.es](http://slid.es/alexfernandez/node-js-floqq).

## Código

Este repositorio contiene el código visto en el curso.
También contiene las soluciones a los ejercicios.
Por favor, intenta hacerlos primero antes de mirar las soluciones.

### Sesión 1: hola, mundo

Todo el código en `sesión-1`.
Código original: `sesión-1/hello-world.js`.

Ejercicios:
* Cambiar la respuesta a "Hola, mundo" (en español).
* Cambiar la respuesta a una página HTML que diga "Hola, mundo".
* Cambiar el servidor para que responda sólo en /, en otra URL debe dar error 500.

### Sesión 2: hola, mundo (again)

Todo el código en `sesión-2`.
Código original: `sesión-2/hello-world.js`.

Ejercicios:
* Admitir 'hello', 'Hello', 'HELLO, 'HeLlO'...
* Manejar los eventos `error` y `end`.
* Convertir a `EventEmitter`.

### Sesión 3: pruebas

Todo el código en `sesión-3`.
Código original: `sesión-3/tested-server.js`.

Ejercicios:
* Eliminar todos los `console.log()`.
* Añadir otra prueba `testError()`: envía otra cadena, comprueba que obtiene 'ERROR'.
* Añadir una prueba que arranque dos servidores en puertos distintos y los pare.

### Sesión 4: desmontando callbacks

Todo el código en `sesión-4`.
Código original: `sesión-4/server-tester.js`.

Ejercicios:
* Convertir la función start() también a un objeto.
* Convertir prueba a eventos.
* Ver este vídeo (en inglés). Ejercicio sin código.

### Sesión 5: paquetes

Todo el código en la raíz del paquete.
Código original: `package.json`.

Ejercicios (ligeramente cambiados desde la presentación):
* Crear un `index.js` que exporte alguna función.
* Exportar todos los tests de la sesión 3 e importarlos desde `test.js`.
* Publicar con `npm publish` y despublicar con `npm unpublish --force`.
  (Nota: primero es necesario hacer un fork y cambiar el nombre al paquete.)

## Licencia

Publicado bajo licencia MIT.
Published under the MIT license.

