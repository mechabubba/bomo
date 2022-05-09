import { Service } from "./Service.js";

/**
 * @abstract
 */
class Base {
    /**
     * @param {Service} service - Reference to the Service instantiating this
     */
    constructor(service) {
        /**
         * Reference to the service which instantiated this
         * @name Base#service
         * @type {Service}
         * @readonly
         */
        Object.defineProperty(this, "service", { value: service });
    }
}

export { Base };
