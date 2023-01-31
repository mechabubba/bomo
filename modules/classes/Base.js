import { Service } from "./Service.js";

/**
 * @abstract
 */
export class Base {
    /**
     * @param {Service} service - Reference to the Service instantiating this
     */
    constructor(service) {
        if (!service) throw new TypeError("service required");

        /**
         * Reference to the service which instantiated this
         * @name Base#service
         * @type {Service}
         * @readonly
         */
        Object.defineProperty(this, "service", { value: service });
    }
}
