import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import { Service } from "./Service.js";

/**
 * @abstract
 */
class Base {
    /**
     * @param {Service} service - Reference to the Service instantiating this
     * @param {?string} [id] An optional pre-existing id, used for custom ids
     */
    constructor(service, id = null) {
        if (!service) throw new TypeError("Class instantiated without reference to service");
        if (service instanceof Service === false) throw new TypeError("Service parameter must be an instance of Service");

        /**
         * Reference to the service which instantiated this
         * @name Base#service
         * @type {Service}
         * @readonly
         */
        Object.defineProperty(this, "service", { value: service });

        /**
         * A custom id string or a version 4 uuid
         * @type {string}
         */
        this.id = id || uuidv4();

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

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

export { Base };
