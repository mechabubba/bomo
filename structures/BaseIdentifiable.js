import { Base } from "./Base.js";
import { generateIdentifier } from "../modules/id.js";

/**
 * A base identifiable by an id
 * @abstract
 */
class BaseIdentifiable extends Base {
    constructor(service) {
        super(service);
        /**
         * A collision proof id
         * @type {string}
         */
        this.id = generateIdentifier();
    }

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

export { BaseIdentifiable };
