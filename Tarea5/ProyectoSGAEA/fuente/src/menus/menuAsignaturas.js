/**
 * Muestra el menú de gestión de asignaturas y devuelve la opción elegida.
 * Valida que la opción esté entre 1 y 4.
 * @returns {number} La opción elegida por el usuario.
 */
export function menuAsignaturas() {
    while (true) {
        try {

            // Muestra el título y las opciones del menú para gestionar asignaturas
            console.log("\n--- MENÚ ASIGNATURAS ---");
            console.log("1. Añadir asignatura");
            console.log("2. Eliminar asignatura");
            console.log("3. Buscar asignatura");
            console.log("4. Volver");

            const opcion = parseInt(prompt("Elige una opción: "));

            // Verifica si la opción es un número válido
            if (isNaN(opcion) || opcion < 1 || opcion > 4) {
                throw new Error("Por favor, elige una opción válida entre 1 y 4.");
            }

            return opcion; // Devuelve la opción válida

        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}