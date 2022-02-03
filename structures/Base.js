import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

/**
 * @abstract
 */
class Base {
    /**
     * @param {Bomo} bomo - Reference to the Bomo instantiating this
     * @param {?string} [id] An optional pre-existing id, used for custom ids
     */
    constructor(bomo, id = null) {
        if (!bomo) throw new TypeError("Class instantiated without reference to bomo");

        /**
         * Reference to the instance of Bomo which instantiated this
         * @name Base#bomo
         * @type {Bomo}
         * @readonly
         */
        Object.defineProperty(this, "bomo", { value: bomo });

        /**
         * A version 4 uuid or a custom id string
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
