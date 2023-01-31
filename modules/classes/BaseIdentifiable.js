import { Base } from "./Base.js";

/**
 * A base identifiable by an id
 * @abstract
 */
class BaseIdentifiable extends Base {
    /**
     * @param {string} id - Unique id within the context of a given manager
     * @param {Service} service - Reference to the Service instantiating this
     */
    constructor(id, service) {
        if (!id) throw new TypeError("id must be ");
        super(service);

        /**
         * A collision proof id
         * @type {string}
         */
        this.id = id;
    }

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

export { BaseIdentifiable };
