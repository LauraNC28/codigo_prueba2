# Proyecto Documentado con JSDoc

Este proyecto incluye la documentación del código fuente utilizando JSDoc.

## Pasos realizados

1. **Instalación de dependencias**:
   - Node.js y JSDoc fueron instalados.
   - `npm install --save-dev jsdoc`

2. **Documentación del código**:
   - Se añadieron comentarios usando la sintaxis de JSDoc.

3. **Automatización con npm**:
   - Se creó un script en `package.json` para ejecutar JSDoc: `npm run doc`.

4. **Generación de documentación**:
   - La documentación fue generada y almacenada en la carpeta `docs`.

## Nota importante

- **node_modules** y la carpeta **docs** están en el archivo `.gitignore` y no se subirán al repositorio.

## Comandos útiles

- Generar la documentación:
  ```bash
  npm run doc


# Explicación de modularización

El código se ha estructurado en diferentes módulos para mejorar su organización y facilitar su mantenimiento. La modularización se ha realizado de la siguiente manera:

1. **Módulo de Clases (clases/)**

Este directorio contiene las clases fundamentales del sistema:

 - Asignatura.js: Representa una asignatura con sus calificaciones.

 - Direccion.js: Define la estructura para la dirección de un estudiante.

 - Estudiante.js: Modelo de estudiante con nombre, edad y lista de asignaturas.

 - Lista.js: Clase genérica para manejar listas de elementos.

 - ListaAsignaturas.js: Gestiona una colección de asignaturas.

 - ListaEstudiantes.js: Gestiona una colección de estudiantes.


2. **Módulo de Gestores (gestores/)**

Este módulo contiene las funciones encargadas de gestionar los datos de los estudiantes y asignaturas:

 - gestionarAsignaturas.js: Permite agregar y eliminar asignaturas.

 - gestionarEstudiantes.js: Maneja la gestión de estudiantes en el sistema.

 - verReporteGeneral.js: Genera y muestra informes con calificaciones y promedios.


3. **Módulo de Menús (menus/)**

Aquí se encuentran los archivos encargados de la navegación dentro de la aplicación:

 - menuAsignaturas.js: Menú de opciones para gestionar asignaturas.

 - menuEstudiantes.js: Menú de opciones para gestionar estudiantes.

 - menuPrincipal.js: Punto de entrada principal para la selección de opciones.


4. **Archivo Principal (app.js)**

El archivo app.js actúa como punto de inicio del programa. Se encarga de:

 - Importar los módulos necesarios.

 - Mostrar el menú principal.

 - Coordinar las interacciones del usuario con los distintos gestores.

 - Realizar pruebas para verificar el correcto funcionamiento de las funciones del sistema.