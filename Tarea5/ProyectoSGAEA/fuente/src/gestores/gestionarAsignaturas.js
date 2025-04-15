import { menuAsignaturas } from "../menus/menuAsignaturas.js";
import { ListaAsignaturas } from "../clases/ListaAsignaturas.js";
import { Asignatura } from "../clases/Asignatura.js";

// Se crean instancias de las listas para gestionar asignaturas
import { listaAsignaturas } from "../clases/ListaAsignaturas.js";


/**
 * Función para gestionar asignaturas a través de un menú interactivo.
 * Permite añadir, eliminar, buscar asignaturas y volver al menú principal.
 */
export function gestionarAsignaturas() {
    let opcion;
    do {
        try {

            opcion = menuAsignaturas(); // Muestra el menú de asignaturas y obtiene la opción
            switch (opcion) {
                case 1: { // Añadir asignatura
                    console.log("\n--- Añadir Asignatura ---");
                    const nombre = prompt("Nombre de la asignatura: ").trim();

                    if (!nombre) {
                        throw new Error("El nombre de la asignatura no puede estar vacío.");
                    }

                    const asignatura = new Asignatura(nombre);
                    listaAsignaturas.añadirAsignatura(asignatura); // Añade la asignatura a la lista
                    console.log("Asignatura añadida correctamente.");
                    break;
                }

                case 2: { // Eliminar asignatura
                    console.log("\n--- Eliminar Asignatura ---");
                    const nombreAsignatura = prompt("Nombre de la asignatura a eliminar: ").trim(); // Solicita el nombre de la asignatura al usuario

                    if (!nombreAsignatura) {
                        throw new Error("El nombre de la asignatura no puede estar vacío.");
                    }

                    // Llama al método para eliminar la asignatura
                    listaAsignaturas.eliminarAsignatura(nombreAsignatura.trim());
                    console.log(`Asignatura "${nombreAsignatura}" eliminada correctamente.`);
                    break;
                }

                case 3: { // Buscar asignatura
                    console.log("\n--- Buscar Asignatura ---");
                    const exp = prompt("Nombre o parte del nombre a buscar: ").trim();

                    if (!exp) {
                        throw new Error("Debe ingresar un término de búsqueda.");
                    }

                    listaAsignaturas.busquedaAsignaturas(exp); // Muestra las asignaturas que coinciden con la búsqueda
                    break;
                }

                case 4: // Volver al menú principal
                    console.log("Volviendo al menú principal...");
                    break;

                default:
                    console.log("Opción inválida. Intente nuevamente.");
            }

        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    } while (opcion !== 4); // El bucle sigue hasta que el usuario elige salir
}