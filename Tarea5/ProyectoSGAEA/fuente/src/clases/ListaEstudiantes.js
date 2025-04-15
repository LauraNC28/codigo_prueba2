import { Lista } from './Lista.js';
import { ListaAsignaturas } from './ListaAsignaturas.js';
import { listaAsignaturas } from './ListaAsignaturas.js';


/**
 * Clase ListaEstudiantes
 * @description Extiende la clase Lista para gestionar una lista específica de estudiantes.
 */
export class ListaEstudiantes extends Lista {
    /**
     * @type {Array} #estudiantes - Atributo privado que almacena la lista de estudiantes.
     */
    #estudiantes;

    /**
     * @constructor
     * @description Inicializa la lista de estudiantes como un array vacío.
     */
    constructor() {
        super(); // Llama al constructor de la clase padre `Lista`
        this.#estudiantes = []; // Lista específica para estudiantes
    }

    /**
     * @method agregarEstudiante
     * @description Agrega un estudiante a la lista si no está duplicado.
     * @param {Object} estudiante - El estudiante a agregar.
     */
    agregarEstudiante(estudiante) {
        try {

            // Verifica si ya existe un estudiante con el mismo nombre en la lista
            if (this.#estudiantes.some(e => e.nombre === estudiante.nombre)) {
                throw new Error("No se permiten duplicados en la lista de estudiantes (mismo ID).");
            }

            // Si no hay duplicados, agrega el estudiante al array
            this.#estudiantes.push(estudiante);

        } catch (error) {
            console.error(`Error al agregar estudiante: ${error.message}`);
        }
    }

    /**
     * @method obtenerEstudiantePorId
     * @description Obtiene un estudiante de la lista por su ID.
     * @param {string|number} id - El ID del estudiante.
     * @returns {Object|null} El estudiante encontrado o null si no existe.
     */
    obtenerEstudiantePorId(id) {
        try {

            const estudiante = this.#estudiantes.find(e => e.id === id);
            if (!estudiante) {
                throw new Error("Estudiante no encontrado.");
            }

            return estudiante;

        } catch (error) {
            console.error(`Error al buscar estudiante: ${error.message}`);
            return null; // Retorna null si no se encuentra el estudiante
        }
    }

    /**
     * @getter
     * @description Retorna toda la lista de estudiantes.
     * @returns {Array} Lista de estudiantes.
     */
    get lista() {
        return this.#estudiantes;
    }

    /**
     * @method matricularEstudiante
     * @description Matricula a un estudiante en una asignatura.
     * @param {number} id - ID del estudiante.
     * @param {string} nombreAsignatura - Nombre de la asignatura.
     * @param {ListaAsignaturas} listaAsignaturas - Lista de asignaturas disponibles.
     */
    matricularEstudiante(id, nombreAsignatura, listaAsignaturas) {
        try {

            if (isNaN(id)) throw new Error("ID no válido.");
            
            const estudiante = this.#estudiantes.find(e => e.id === id);
            if (!estudiante) throw new Error("Estudiante no encontrado.");
            
            const asignatura = listaAsignaturas.lista.find(a => a.nombre.toLowerCase() === nombreAsignatura.toLowerCase());
            if (!asignatura) throw new Error("Asignatura no encontrada.");
            
            estudiante.matricular(asignatura);
        
        } catch (error) {
            console.error(`Error al matricular estudiante: ${error.message}`);
        }
    }

    /**
     * @method eliminarEstudiante
     * @description Elimina un estudiante de la lista usando su ID.
     * @param {string|number} id - El ID del estudiante a eliminar.
     */
    eliminarEstudiante(id) {
        try {

            const longitudInicial = this.#estudiantes.length;

            // Filtra la lista para excluir al estudiante con el ID dado
            this.#estudiantes = this.#estudiantes.filter(e => e.id !== id);
            
            if (this.#estudiantes.length === longitudInicial) {
                throw new Error("Estudiante no encontrado para eliminar.");
            }

        } catch (error) {
            console.error(`Error al eliminar estudiante: ${error.message}`);
        }
    }

    /**
     * @method buscarEstudiante
     * @description Busca estudiantes cuyo nombre contenga un patrón dado.
     * @param {string} patron - El patrón de búsqueda.
     * @returns {Array} Lista de estudiantes que coinciden con el patrón.
     */
    buscarEstudiante(patron) {
        try {

            if (typeof patron !== "string" || patron.trim() === "") {
                throw new Error("El patrón de búsqueda debe ser una cadena no vacía.");
            }

            // Retorna una lista de estudiantes cuyos nombres incluyen el patrón
            return this.#estudiantes.filter(e =>
                e.nombre.toLowerCase().includes(patron.toLowerCase())
            );

        } catch (error) {
            console.error(`Error al buscar estudiantes: ${error.message}`);
            return []; // Retorna un array vacío si ocurre un error
        }
    }

    /**
     * @method obtenerPromedioGeneral
     * @description Calcula el promedio general de todos los estudiantes.
     * @returns {number} El promedio general.
     */
    obtenerPromedioGeneral() {
        try {

            if (this.#estudiantes.length === 0) {
                return 0; // Si no hay estudiantes, el promedio general es 0
            }
        
            /*.map(): Se aplica sobre un array y devuelve un nuevo array con los resultados de ejecutar una función 
            sobre cada uno de los elementos del array original.
            e: Es el parámetro de la función de flecha que representa a cada estudiante en el array this.#estudiantes.*/
            // Obtiene el promedio de cada estudiante
            const promedios = this.#estudiantes.map(e => e.obtenerPromedioGeneral());

            // Calcula el promedio general sumando todos los promedios y dividiendo por el total de estudiantes
            return promedios.reduce((sum, prom) => sum + prom, 0) / promedios.length;
        
        } catch (error) {
            console.error(`Error al calcular el promedio general: ${error.message}`);
            return 0; // Retorna 0 como valor por defecto en caso de error
        }
    }

    /**
     * @method añadirCalificacion
     * @description Añade una calificación a un estudiante en una asignatura específica.
     */
    añadirCalificacion(id, nombreAsignatura, calificacion) {
        try {

            const estudiante = this.obtenerEstudiantePorId(id);
            if (!estudiante) throw new Error("Estudiante no encontrado.");
            
            // Buscar la asignatura en la lista de asignaturas
            const asignatura = listaAsignaturas.lista.find(a => a.nombre.toLowerCase() === nombreAsignatura.toLowerCase());
            if (!asignatura) throw new Error("Asignatura no encontrada.");

            estudiante.agregarCalificacion(asignatura, calificacion);
        
        } catch (error) {
            console.error(`Error al añadir calificación: ${error.message}`);
        }
    }

    /**
     * @method desmatricularEstudiante
     * @description Desmatricula a un estudiante de una asignatura.
     */
    desmatricularEstudiante(id, nombreAsignatura) {
        try {

            const estudiante = this.obtenerEstudiantePorId(id);
            if (!estudiante) throw new Error("Estudiante no encontrado.");
            
            // Buscar la asignatura de forma exacta ignorando mayúsculas
            const asignatura = listaAsignaturas.lista.find(a => a.nombre.toLowerCase() === nombreAsignatura.toLowerCase());
            if (!asignatura) throw new Error("Asignatura no encontrada.");

            // Desmatricular al estudiante
            estudiante.desmatricular(asignatura);

        } catch (error) {
            console.error(`Error al desmatricular estudiante: ${error.message}`);
        }
    }

    /**
     * @method generarReporte
     * @description Genera un reporte con la información de cada estudiante y sus asignaturas.
     */
    generarReporte() {
        try {

            if (this.#estudiantes.length === 0) {
                console.log("No hay estudiantes en la lista para generar un reporte.");
                return;
            }

            // Itera por cada estudiante en la lista
            this.#estudiantes.forEach(estudiante => {
                console.log(estudiante.toString()); // Muestra los datos del estudiante como cadena
                
                // Calcular el promedio general del estudiante
                const promedioGeneral = estudiante.obtenerPromedioGeneral();
                console.log(`Promedio general: ${promedioGeneral}`);

                //Object.entries(): Se obtiene un array de arrays donde cada subarray contiene una clave (nombre de la asignatura) y su correspondiente valor (el objeto con calificaciones y fecha).
                // Itera por las asignaturas del estudiante
                Object.entries(estudiante.asignaturas).forEach(([nombre, datos]) => {
                    // Calcular el promedio de la asignatura
                    const promedioAsignatura = datos.calificaciones.length > 0 ? 
                    datos.calificaciones.reduce((sum, cal) => sum + cal, 0) / datos.calificaciones.length : 0;
                    
                    // Muestra el nombre de la asignatura, sus calificaciones y el promedio
                    console.log(`- ${nombre}: Calificaciones: ${datos.calificaciones.join(", ")} | Promedio: ${promedioAsignatura.toFixed(2)}`);
                });
            });

        } catch (error) {
            console.error(`Error al generar el reporte: ${error.message}`);
        }
    }
    
    /**
     * Guarda la lista de estudiantes en `localStorage`.
     */
    guardarEstudiantes() {
        const estudiantesJSON = JSON.stringify(this.#estudiantes.map(estudiante => estudiante.toJSON()));
        localStorage.setItem('estudiantes', estudiantesJSON);
    }

    /**
     * Carga la lista de estudiantes desde `localStorage`.
     */
    cargarEstudiantes() {
        const estudiantesJSON = localStorage.getItem('estudiantes');
        if (estudiantesJSON) {
            const estudiantesData = JSON.parse(estudiantesJSON);
            this.#estudiantes = estudiantesData.map(estudianteData => Estudiante.fromJSON(estudianteData));
        }
    }
}


export const listaEstudiantes = new ListaEstudiantes();