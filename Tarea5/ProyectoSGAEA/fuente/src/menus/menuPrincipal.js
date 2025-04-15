/**
 * Muestra el menú principal al usuario y devuelve la opción elegida.
 * Valida que la opción esté entre 1 y 4.
 * @returns {number} La opción elegida por el usuario.
 */
export function menuPrincipal() {
    while (true) {
        try {

            // Muestra el título y las opciones del menú principal
            console.log("\n--- MENÚ PRINCIPAL ---");
            console.log("1. Gestionar estudiantes");
            console.log("2. Gestionar asignaturas");
            console.log("3. Ver reporte general");
            console.log("4. Salir");
            
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