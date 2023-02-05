import { Collection } from "@discordjs/collection";
import { randomBytes } from "node:crypto";
import { log } from "../log.js";
import { Base } from "./Base.js";
import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { Service } from "./Service.js";

/**
 * A manager with a cache.
 * 
 * **All managers that extend this class should specify their own "creation" method, that creates and specifies classes within the cache.** The rest of this class is just helper functions.
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

    get(id) {
        return this.cache.get(id);
    }

    remove(id) {
        if (!this.cache.has(id)) {
            throw new Error("User not found");
        }
        this.cache.remove(id);
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
