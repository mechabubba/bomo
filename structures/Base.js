const { v4: uuidv4 } = require("uuid");

/**
 * @abstract
 */
class Base {
    /**
     * @param {?string} [id] An optional pre-existing id, mainly used for reinstantiation where necessary
     */
    constructor(id = null) {
        /**
          * A version 4 uuid or a custom id string
          * @type {string}
          */
        this.id = id || uuidv4();
    }

    toJSON(whitespace = 0) {
        return JSON.stringify(this, null, whitespace);
    }

    valueOf() {
        return this.id;
    }

    toString() {
        return this.id;
    }
}

module.exports = Base;
