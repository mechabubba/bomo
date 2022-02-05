import { DateTime } from "luxon";

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

        /**
         * DateTime instance for when this was instantiated
         * @type {DateTime}
         */
        this.createdAt = DateTime.now();
    }

    /**
     * A unix timestamp in milliseconds for when this was instantiated
     * @type {number}
     * @readonly
     */
    get createdTimestamp() {
        return this.createdAt.toMillis();
    }
}

export { Base };
