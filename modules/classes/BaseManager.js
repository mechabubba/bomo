import { randomBytes } from "node:crypto";
import { Base } from "./Base.js";
import { Service } from "./Service.js";

/**
 * @abstract
 */
export class BaseManager extends Base {
    /**
     * @param {Service} service - Reference to the Service instantiating this
     */
    constructor(service) {
        super(service);

        /**
         * Set of ids that have
         * @type {Set<string>}
         */
        this.ids = new Set();
    }

    /**
     * Generates an id
     * @param {number} radix An integer in the range `2` through `36` to use with
     * [toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
     * @returns {string}
     */
    generateIdentifier = function(byteCount = 3) {
        const id = randomBytes(byteCount).toString("hex");
        if (this.ids.has(id)) {
            return this.generateIdentifier(byteCount);
        } else {
            this.ids.add(id);
            return id;
        }
    };
}
