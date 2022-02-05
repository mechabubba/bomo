import { Base } from "./Base.js";
import { generate } from "../modules/id.js";

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
        this.id = generate();
    }

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

export { BaseIdentifiable };
