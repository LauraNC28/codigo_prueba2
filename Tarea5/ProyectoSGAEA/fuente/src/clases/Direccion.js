/**
 * La clase `Direccion` representa una dirección física con atributos como calle, número, piso,
 * código postal, provincia y localidad. Incluye validaciones y métodos para acceder y mostrar
 * la información de manera estructurada.
 * @class
 */
export class Direccion {
    /**
     * @description Calle de la dirección.
     * @private
     * @type {string}
     */
    #calle; 

    /**
     * @description Número de la dirección. Puede ser un número o un texto (ejemplo: "S/N").
     * @private
     * @type {number}
     */
    #numero;

    /**
     * @description Piso de la dirección. Por defecto "S/N" si no se especifica.
     * @private
     * @type {string}
     */
    #piso;

    /**
     * @description Código postal. Debe ser un número de 5 dígitos.
     * @private
     * @type {string}
     */
    #codigoPostal;

    /**
     * @description Provincia de la dirección.
     * @private
     * @type {string}
     */
    #provincia;

    /**
     * @description Localidad de la dirección.
     * @private
     * @type {string}
     */
    #localidad;

    /**
     * Constructor para inicializar los atributos de la clase `Direccion`.
     * Realiza validaciones y establece valores predeterminados donde sea necesario.
     * @param {string} calle - Nombre de la calle.
     * @param {number} numero - Número de la vivienda.
     * @param {string} [piso="S/N"] - Número del piso (opcional, por defecto "S/N").
     * @param {string} codigoPostal - Código postal de 5 dígitos.
     * @param {string} provincia - Nombre de la provincia.
     * @param {string} localidad - Nombre de la localidad.
     * @throws {Error} Si el código postal no tiene 5 dígitos.
     */
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        try {

            if (!/^[0-9]{5}$/.test(codigoPostal)) {
                throw new Error("El código postal debe ser un número de 5 dígitos.");
            }

            // Asignación de valores a las propiedades privadas
            this.#calle = calle;
            this.#numero = numero;
            this.#piso = piso || "S/N"; // Si no se proporciona piso, usa "S/N" por defecto.
            this.#codigoPostal = codigoPostal;
            this.#provincia = provincia;
            this.#localidad = localidad;

        } catch (error) {
            console.error("Error al crear una dirección:", error.message);
            throw error; // Re-lanza el error para manejo externamente si es necesario.
        }
    }

    /**
     * Obtiene el nombre de la calle.
     * @returns {string} El nombre de la calle.
     */
    get calle() {
        return this.#calle;
    }

    /**
     * Obtiene el número de la vivienda.
     * @returns {number} El número de la vivienda.
     */
    get numero() {
        return this.#numero;
    }

    /**
     * Obtiene el número del piso.
     * @returns {string} El número del piso o "S/N" si no se especificó.
     */
    get piso() {
        return this.#piso;
    }

    /**
     * Obtiene el código postal.
     * @returns {string} El código postal de 5 dígitos.
     */
    get codigoPostal() {
        return this.#codigoPostal;
    }

    /**
     * Obtiene el nombre de la provincia.
     * @returns {string} El nombre de la provincia.
     */
    get provincia() {
        return this.#provincia;
    }

    /**
     * Obtiene el nombre de la localidad.
     * @returns {string} El nombre de la localidad.
     */
    get localidad() {
        return this.#localidad;
    }

    /**
     * Devuelve una representación en texto de la dirección.
     * @returns {string} La dirección en formato de texto.
     */
    toString() {
        return `C/ ${this.#calle}, nº ${this.#numero}, Piso: ${this.#piso}, ${this.#localidad}, ${this.#provincia}, ${this.#codigoPostal}`;
    }

    toJSON() {
        return {
            calle: this.calle,
            numero: this.numero,
            piso: this.piso,
            codigoPostal: this.codigoPostal,
            provincia: this.provincia,
            localidad: this.localidad
        };
    }

    static fromJSON(data) {
        return new Direccion(
            data.calle,
            data.numero,
            data.piso,
            data.codigoPostal,
            data.provincia,
            data.localidad
        );
    }
}