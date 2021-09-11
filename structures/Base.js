const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

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

    /**
     * Creates a (usually plain) object using id, createdTimestamp, and manually supplied custom properties (in the form of objects)
     * @param  {...object} objects
     */
    toObject(...objects) {
        const data = {
            "id": this.id,
            "createdTimestamp": this.createdTimestamp,
        };
        if (objects.length) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals
            return objects.reduce((previousObject, currentObject) => ({ ...previousObject, ...currentObject }), data);
        } else {
            return data;
        }
    }

    /**
     * Simple shortcut to JSON.stringify on this.toObject()
     * @param  {...any} objects
     */
    toJSON(...objects) {
        return JSON.stringify(this.toObject(...objects), null, 0); // No whitespace
    }

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

module.exports = Base;
