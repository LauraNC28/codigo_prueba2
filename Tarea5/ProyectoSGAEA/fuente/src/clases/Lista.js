/**
 * Clase Lista
 * @description Representa una lista genérica que utiliza un atributo privado para almacenar los elementos.
 */
export class Lista {
    /**
     * @type {Array} #listaRef - Atributo privado que almacena la lista interna.
     */
    #listaRef;

    /**
     * @constructor
     * @description Inicializa la lista como un array vacío.
     */
    constructor() {
        this.#listaRef = []; // La lista comienza vacía
    }

     /**
     * @getter
     * @description Retorna una copia superficial del array interno.
     * @returns {Array} Copia de la lista interna.
     */
    get lista() {
        return [...this.#listaRef]; // Retorna una copia superficial del array interno
        // Usar una copia evita que se modifique directamente el array privado desde fuera de la clase
    }

    /**
     * @getter
     * @description Retorna la referencia directa al array interno.
     * @returns {Array} Referencia al array interno.
     */
    get listaRef() {
        return this.#listaRef; // Permite acceder directamente al atributo privado
        // Esto puede ser útil para manipular la lista, pero conlleva el riesgo de modificar el estado interno
    }

    /**
     * @setter
     * @description Asigna un nuevo array al atributo privado.
     * @param {Array} listaRef - El nuevo array que reemplaza el contenido interno de la lista.
     */
    set listaRef(listaRef) {
        this.#listaRef = listaRef; // Reemplaza el contenido interno de la lista
        // Este setter permite reinicializar la lista si es necesario
    }
}
