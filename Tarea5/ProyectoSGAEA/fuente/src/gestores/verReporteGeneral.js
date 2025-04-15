import { ListaEstudiantes } from "../clases/ListaEstudiantes.js";
import { ListaAsignaturas } from "../clases/ListaAsignaturas.js";
import { listaEstudiantes } from "../clases/ListaEstudiantes.js";
import { listaAsignaturas } from "../clases/ListaAsignaturas.js";


/**
 * Función para generar el reporte general de los estudiantes.
 * Incluye una lista de estudiantes con sus calificaciones y el promedio general.
 */
export function verReporteGeneral() {
    try {

        console.log("\n--- Reporte General ---");

        // Reporte de estudiantes
        console.log("\n Reporte de Estudiantes:");
        listaEstudiantes.generarReporte(); // Genera un reporte con los estudiantes y sus calificaciones
        
        // Mostrar el promedio general
        const promedioGeneral = listaEstudiantes.obtenerPromedioGeneral();
            
        if (isNaN(promedioGeneral)) {
            throw new Error("No se pudo calcular el promedio general. Verifique la lista de estudiantes.");
        }
        
        console.log(`Promedio general de la lista: ${promedioGeneral.toFixed(2)}`);

        // Reporte de asignaturas
        console.log("\n Reporte de Asignaturas:");
        listaAsignaturas.generarReporte();
    
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}