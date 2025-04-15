/**
 * Representa una asignatura con un nombre y un conjunto de calificaciones asociadas.
 * Proporciona métodos para gestionar calificaciones y calcular el promedio.
 * @class
 */
export class Asignatura {
    /**
     * @private
     * @type {string}
     * @description Nombre de la asignatura.
     */
    #nombre;

    /**
     * @private
     * @type {number[]}
     * @description Array para almacenar las calificaciones de la asignatura.
     */
    #calificaciones; 

    /**
     * Constructor para inicializar una asignatura con su nombre.
     * Valida el nombre para asegurar que solo contiene caracteres permitidos.
     * @param {string} nombre - Nombre de la asignatura. Solo se permiten letras, números romanos y espacios.
     * @throws {Error} Si el nombre contiene caracteres no válidos.
     */
    constructor(nombre) {
        try {

            if (!/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(nombre)) {
                throw new Error("El nombre de la asignatura solo debe contener letras, números romanos y espacios."); // Valida el nombre
            }

            this.#nombre = nombre; // Asigna el nombre de la asignatura
            this.#calificaciones = []; // Inicializa el array de calificaciones como vacío

        } catch (error) {
            console.error(`Error al crear la asignatura: ${error.message}`);
            throw error; // Re-lanza el error para permitir su manejo externo si es necesario
        }
    }

    /**
     * Devuelve el nombre de la asignatura.
     * @returns {string} Nombre de la asignatura.
     */
    get nombre() {
        return this.#nombre;
    }

    /**
     * Devuelve una copia del array de calificaciones.
     * @returns {number[]} Array de calificaciones.
     */
    get calificaciones() {
        return [...this.#calificaciones]; 
    }

    /**
     * Agrega una calificación a la asignatura.
     * Valida que la calificación sea un número entero entre 0 y 10.
     * @param {number} calificacion - Calificación a agregar.
     * @throws {Error} Si la calificación no es válida.
     */
    agregarCalificacion(calificacion) {
        try {

            if (calificacion < 0 || calificacion > 10 || !Number.isInteger(calificacion)) {
                throw new Error("La calificación debe ser un entero entre 0 y 10.");
            }

            this.#calificaciones.push(calificacion); // Agrega la calificación al array
        
        } catch (error) {
            console.error(`Error al agregar calificación: ${error.message}`);
            throw error; // Re-lanza el error para permitir su manejo externo si es necesario
        }
    }
    

    /**
     * Calcula el promedio de las calificaciones en la asignatura.
     * Si no hay calificaciones, devuelve 0.
     * @returns {number} Promedio de las calificaciones con 2 decimales.
     */
    obtenerPromedio() {
        try {

            if (this.#calificaciones.length === 0) return 0; // Si no hay calificaciones, el promedio es 0
            /*.reduce(): Función de acumulación sobre cada elemento del array, devolviendo un único valor como resultado.
            acc: Es el acumulador, que contiene el valor acumulado a medida que se procesan los elementos del array.
            cal: Es el valor del elemento actual que se está procesando.
            0: Es el valor inicial del acumulador acc. Aquí comienza con 0.*/
            const suma = this.#calificaciones.reduce((acc, cal) => acc + cal, 0); // Suma todas las calificaciones
            
            return ((suma / this.#calificaciones.length).toFixed(2)); // Calcula el promedio
        
        } catch (error) {
            console.error(`Error al calcular el promedio: ${error.message}`);
            return 0; // Devuelve 0 en caso de error
        }
    }

    /**
     * Devuelve una representación en texto de la asignatura.
     * @returns {string} Representación en texto del nombre de la asignatura.
     */
    toString() {
        return `Asignatura: ${this.#nombre}`;
    }
}