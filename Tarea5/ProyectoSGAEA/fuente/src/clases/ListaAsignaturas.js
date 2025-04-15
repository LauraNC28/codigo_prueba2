import { Lista } from './Lista.js';
import { listaEstudiantes } from './ListaEstudiantes.js';


/**
 * Clase ListaAsignaturas
 * @description Extiende la clase Lista para gestionar asignaturas.
 */
export class ListaAsignaturas extends Lista {
    /**
     * @constructor
     * @description Inicializa la lista con un número variable de asignaturas.
     * @param {...Object} asignaturas - Las asignaturas iniciales a añadir.
     */
    constructor(...asignaturas) {
        // Llama al constructor de la clase padre (Lista)
        super();
        
        try {
        
            // Itera sobre cada asignatura pasada como argumento y la añade a la lista
            asignaturas.forEach(asignatura => this.añadirAsignatura(asignatura));
        
        } catch (error) {
            console.error(`Error al inicializar las asignaturas: ${error.message}`);
        }
    }

    /**
     * @method añadirAsignatura
     * @description Añade una nueva asignatura a la lista si no existe.
     * @param {Object} asignatura - La asignatura a añadir.
     */
    añadirAsignatura(asignatura) {
        try {

            // Verifica si ya existe una asignatura con el mismo nombre en la lista
            if (this.listaRef.some(a => a.nombre === asignatura.nombre)) {
                // Si la asignatura ya existe, lanza un error
                throw new Error(`La asignatura '${asignatura.nombre}' ya existe.`);
            }

            // Si no existe, la añade al array de asignaturas
            this.listaRef.push(asignatura);
        
        } catch (error) {
            console.error(`Error al añadir asignatura: ${error.message}`);
        }
    }

    /**
     * @method eliminarAsignatura
     * @description Elimina una asignatura de la lista por su nombre.
     * @param {string} nombre - El nombre de la asignatura a eliminar.
     */
    eliminarAsignatura(nombre) {
        try {

            if (typeof nombre !== "string" || nombre.trim() === "") {
                throw new Error("El nombre de la asignatura debe ser una cadena no vacía.");
            }

            // Verifica si la asignatura con el nombre especificado existe en la lista
            const asignatura = this.listaRef.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());

            if (!asignatura) {
                throw new Error("Error: La asignatura no se encuentra en la lista.");
            }
        
            // Filtra y elimina la asignatura de la lista global
            this.listaRef = this.listaRef.filter(a => a.nombre.toLowerCase() !== nombre.toLowerCase());
        
            // Elimina la asignatura de cada estudiante matriculado
            listaEstudiantes.lista.forEach(estudiante => {
                if (estudiante.estaMatriculado(asignatura.nombre)) {
                    estudiante.desmatricular(asignatura);
                }
            });

        } catch (error) {
            console.error(`Error al eliminar asignatura: ${error.message}`);
        }
    }

    /**
     * @method busquedaAsignaturas
     * @description Busca asignaturas que contengan un patrón en su nombre.
     * @param {string} exp - El patrón de búsqueda.
     * @returns {Array} Lista de asignaturas que coinciden con el patrón.
     */
    busquedaAsignaturas(exp) {
        try {

            if (typeof exp !== "string" || exp.trim() === "") {
                throw new Error("El patrón de búsqueda debe ser una cadena no vacía.");
            }

            // Filtra las asignaturas cuyo nombre incluye el patrón 'exp' (ignorando mayúsculas y minúsculas)
            const resultados = this.listaRef.filter(a =>
                a.nombre.toLowerCase().includes(exp.toLowerCase())
            );
        
            // Si no se encuentra ninguna asignatura que coincida, muestra un mensaje
            if (resultados.length === 0) {
                console.log("No se encontraron asignaturas.");
            } else {
                // Si se encuentran, muestra los resultados
                console.log("Asignaturas encontradas:");
                resultados.forEach(asignatura => console.log(`- Nombre: ${asignatura.nombre}`));
            }
            
            // Devuelve los resultados de la búsqueda, por si se necesitan más adelante
            return resultados;

        } catch (error) {
            console.error(`Error en la búsqueda de asignaturas: ${error.message}`);
            return []; // Retorna un array vacío si ocurre un error
        }
    }

    /**
     * @method generarReporte
     * @description Genera un reporte con la información de las asignaturas.
     */
    generarReporte() {
        console.log("\n--- Reporte de Asignaturas ---");

        if (this.listaRef.length === 0) {
            console.log("No hay asignaturas registradas.");
            return;
        }

        this.listaRef.forEach((asignatura, index) => {
            console.log(`${index + 1}. Nombre: ${asignatura.nombre}`);
        });
    }
}

export const listaAsignaturas = new ListaAsignaturas();