import { Collection } from "@discordjs/collection";
import { randomBytes } from "node:crypto";
import { log } from "../log.js";
import { Base } from "./Base.js";
import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { Service } from "./Service.js";

/**
 * A manager with a cache
 * @abstract
 */
export class BaseManager extends Base {
    /**
     * @param {Service} service - Reference to the Service instantiating this
     */
    constructor(service) {
        super(service);

        /**
         * @type {Collection<string, BaseIdentifiable>}
         */
        this.cache = new Collection();
    }

    /**
     * Generates an id
     * @param {number} byteCount Number of bytes used in the id
     * @returns {string}
     */
    generateIdentifier = function(byteCount = 4) {
        const id = randomBytes(byteCount).toString("hex");
        if (this.cache.has(id)) {
            log.warn(`id "${id}" already exists, rerolling`);
            return this.generateIdentifier(byteCount);
        }
        return id;
    };
}
