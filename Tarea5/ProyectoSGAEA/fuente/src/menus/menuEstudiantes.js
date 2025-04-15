/**
 * Muestra el menú de gestión de estudiantes y devuelve la opción elegida.
 * Valida que la opción esté entre 1 y 8.
 * @returns {number} La opción elegida por el usuario.
 */
export function menuEstudiantes() {
    while (true) {
        try {

            // Muestra el título y las opciones del menú para gestionar estudiantes
            console.log("\n--- MENÚ ESTUDIANTES ---");
            console.log("1. Añadir estudiante");
            console.log("2. Eliminar estudiante");
            console.log("3. Buscar estudiante");
            console.log("4. Matricular estudiante");
            console.log("5. Añadir calificación");
            console.log("6. Desmatricular asignatura");
            console.log("7. Calcular promedio del estudiante");
            console.log("8. Volver");

            const opcion = parseInt(prompt("Elige una opción: "));

            // Verifica si la opción es un número válido
            if (isNaN(opcion) || opcion < 1 || opcion > 8) {
                throw new Error("Por favor, elige una opción válida entre 1 y 8.");
            }

            return opcion; // Devuelve la opción válida
        
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}