import { Base } from "./Base.js";
import { Service } from "./Service.js";

/**
 * A object identifiable by an id
 * @abstract
 */
class BaseIdentifiable extends Base {
    /**
     * @param {Service} service Reference to the Service instantiating this
     * @param {string} id Unique id within the context of a given manager
     */
    constructor(service, id) {
        if (!id) throw new TypeError("id required");
        super(service);

        /**
         * Unique id within the context of a given manager
         * @type {string}
         */
        this.id = id;
    }

    /**
     * Payload safe json objects
     * @return {{ id: string }}
     */
    toJSON() {
        return {
            id: this.id,
        };
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}

export { BaseIdentifiable };
