/**
 * Representa un estudiante con atributos como nombre, edad, dirección y asignaturas matriculadas.
 * Proporciona métodos para gestionar asignaturas, calificaciones y calcular promedios.
 * @class
 */
 export class Estudiante {
    /**
     * @description Identificador único del estudiante.
     * @type {number}
     * @private
     */
    #id;

    /**
     * @description Nombre del estudiante.
     * @type {string}
     * @private
     */
    #nombre; 

    /**
     * @description Edad del estudiante.
     * @type {number}
     * @private
     */
    #edad; 

    /**
     * @description Dirección del estudiante.
     * @type {Object} // Cambiar a la clase específica si existe una clase Direccion
     * @private
     */
    #direccion; 

    /**
     * @description Asignaturas matriculadas con sus calificaciones y fecha de matrícula.
     * @type {Object.<string, {calificaciones: number[], fecha: string}>}
     * @private
     */
    #asignaturas; 

    /**
     * Contador estático para asignar IDs únicos a los estudiantes.
     * @type {number}
     * @static
     */
    static contadorId = 1;

    /**
     * Crea una instancia de un estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante, debe ser un entero positivo.
     * @param {Object} direccion - Dirección del estudiante.
     * @throws {Error} Si los valores de los parámetros no son válidos.
     */
    constructor(nombre, edad, direccion) {
        try {

            if (!/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(nombre)) {
                throw new Error("El nombre solo debe contener letras y espacios."); // Valida que el nombre contenga solo letras y espacios
            }

            if (typeof edad !== "number" || edad <= 0 || !Number.isInteger(edad)) {
                throw new Error("La edad debe ser un número entero positivo.");
            }

            this.#id = Estudiante.contadorId++; // Asigna un ID único usando el contador estático
            this.#nombre = nombre; // Asigna el nombre
            this.#edad = edad; // Valida y asigna la edad (debe ser un número positivo)
            this.#direccion = direccion; // Asigna la dirección
            this.#asignaturas = {}; // Inicializa el objeto de asignaturas como vacío, Clave: Nombre de la asignatura, Valor: { calificaciones: [], fecha: Date }
        
        } catch (error) {
            console.error("Error al crear el estudiante:", error.message);
            throw error; // Re-lanza el error para que sea manejado externamente si es necesario
        }
    }

    /**
     * Obtiene el ID único del estudiante.
     * @returns {number} El ID del estudiante.
     */
    get id() {
        return this.#id;
    }

    /**
     * Obtiene el nombre del estudiante.
     * @returns {string} El nombre del estudiante.
     */
    get nombre() {
        return this.#nombre;
    }

    /**
     * Obtiene la edad del estudiante.
     * @returns {number} La edad del estudiante.
     */
    get edad() {
        return this.#edad;
    }

    /**
     * Obtiene la dirección del estudiante.
     * @returns {Object} La dirección del estudiante.
     */
    get direccion() {
        return this.#direccion;
    }

    /**
     * Obtiene las asignaturas matriculadas del estudiante.
     * @returns {Object.<string, {calificaciones: number[], fecha: string}>} El objeto de asignaturas.
     */
    get asignaturas() {
        return this.#asignaturas;
    }

    /**
     * Matricula al estudiante en una asignatura.
     * @param {{nombre: string}} asignatura - Objeto con el nombre de la asignatura.
     * @throws {Error} Si la asignatura ya está matriculada o el nombre es inválido.
     */
    matricular(asignatura) {
        try {

            if (!asignatura || typeof asignatura.nombre !== "string" || asignatura.nombre.trim() === "") {
                throw new Error("La asignatura debe tener un nombre válido.");
            }

            if (this.#asignaturas[asignatura.nombre]) {
                throw new Error(`El estudiante ya está matriculado en ${asignatura.nombre}.`);
            }

            this.#asignaturas[asignatura.nombre] = {
                calificaciones: [],
                fecha: new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
            };

            console.log(`Estudiante matriculado en ${asignatura.nombre}.`);

        } catch (error) {
            console.error("Error al matricular al estudiante:", error.message);
        }
    }

    /**
     * Desmatricula al estudiante de una asignatura.
     * @param {{nombre: string}} asignatura - Objeto con el nombre de la asignatura.
     * @throws {Error} Si el estudiante no está matriculado en la asignatura.
     */
    desmatricular(asignatura) {
        try {
            if (!asignatura || typeof asignatura.nombre !== "string" || asignatura.nombre.trim() === "") {
                throw new Error("La asignatura debe tener un nombre válido.");
            }

            if (!this.#asignaturas[asignatura.nombre]) {
                throw new Error(`El estudiante no está matriculado en ${asignatura.nombre}.`);
            }

            delete this.#asignaturas[asignatura.nombre];

            console.log(`Asignatura ${asignatura.nombre} eliminada del estudiante ${this.#nombre}.`);

        } catch (error) {
            console.error("Error al desmatricular al estudiante:", error.message);
        }
    }
    
    /**
     * Verifica si el estudiante está matriculado en una asignatura específica.
     * @param {string} nombreAsignatura - El nombre de la asignatura a verificar.
     * @returns {boolean} `true` si está matriculado, `false` en caso contrario.
     */
    estaMatriculado(nombreAsignatura) {
        // Comprueba si la asignatura existe en el objeto privado #asignaturas del estudiante.
        // La función Boolean() convierte el valor resultante en un booleano (true/false).
        return Boolean(this.#asignaturas[nombreAsignatura]);
    }

    /**
     * Agrega una calificación a una asignatura.
     * @param {{nombre: string}} asignatura - Objeto con el nombre de la asignatura.
     * @param {number} calificacion - La calificación a agregar (entero entre 0 y 10).
     * @throws {Error} Si la asignatura no está matriculada o la calificación es inválida.
     */
    agregarCalificacion(asignatura, calificacion) {
        try {

            if (!this.#asignaturas[asignatura.nombre]) {
                throw new Error("El estudiante no está matriculado en esta asignatura."); // Lanza error si no está matriculado
            }

            if (typeof calificacion !== "number" || !Number.isInteger(calificacion) || calificacion < 0 || calificacion > 10) {
                throw new Error("La calificación debe ser un entero entre 0 y 10.");
            }

            this.#asignaturas[asignatura.nombre].calificaciones.push(calificacion); // Agrega la calificación
            
            console.log(`Calificación ${calificacion} agregada a ${asignatura.nombre}.`);
        
        } catch (error) {
            console.error("Error al agregar calificación:", error.message);
        }
    }

    /**
     * Calcula el promedio general de todas las asignaturas del estudiante.
     * @returns {number} El promedio general redondeado a 2 decimales.
     */
    obtenerPromedioGeneral() {
        try {

            /*Object.values(this.#asignaturas): Convierte los valores del objeto privado this.#asignaturas en un array.
            .map(): Devuelve un nuevo array, transformando cada asignatura en su promedio de calificaciones.
            (asignatura => { ... }): Recibe cada elemento del array y realiza cálculos para devolver el promedio de las calificaciones de esa asignatura.*/
            const promedios = Object.values(this.#asignaturas).map(asignatura => {
                if (asignatura.calificaciones.length === 0) return 0; // Si no hay calificaciones, el promedio es 0
                /*.reduce(): Función de acumulación sobre cada elemento del array, devolviendo un único valor como resultado.
                sum: Es el acumulador, que contiene el valor acumulado a medida que se procesan los elementos del array.
                cal: Es el valor del elemento actual que se está procesando.
                0: Es el valor inicial del acumulador sum. Aquí comienza con 0.*/
                const suma = asignatura.calificaciones.reduce((sum, cal) => sum + cal, 0); // Suma todas las calificaciones
                return suma / asignatura.calificaciones.length; // Calcula el promedio de la asignatura
            });
        
            if (promedios.length === 0) return 0; // Si no hay asignaturas, el promedio es 0
        
            const promedioGeneral = promedios.reduce((sum, prom) => sum + prom, 0) / promedios.length; // Calcula el promedio general
            return parseFloat(promedioGeneral.toFixed(2)); // Redondea el promedio a 2 decimales

        } catch (error) {
            console.error("Error al calcular el promedio general:", error.message);
            return 0;
        }
    }

    /**
     * Devuelve una representación en texto del estudiante.
     * Incluye ID, nombre, edad y dirección.
     * @returns {string} Una representación textual del estudiante.
     */
    toString() {
        return `ID: ${this.#id}, Nombre: ${this.#nombre}, Edad: ${this.#edad}, Dirección: ${this.#direccion.toString()}`;
    }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            edad: this.#edad,
            direccion: this.#direccion.toJSON(),
            asignaturas: this.#asignaturas
        };
    }

    static fromJSON(json) {
        const estudianteInstance = new Estudiante(json.nombre, json.edad, json.direccion);
        estudianteInstance.#id = json.id;
        estudianteInstance.#asignaturas = json.asignaturas;
        return estudianteInstance;
    }
}