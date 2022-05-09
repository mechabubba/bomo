import Collection from "@discordjs/collection";
import { Base } from "./Base.js";

/**
 * A base used for managers
 * @abstract
 */
class BaseManager extends Base {
    constructor(service) {
        super(service);
        /**
         * @type {Collection<Snowflake, BaseBlock>}
         */
        this.cache = new Collection();
    }
}

export { BaseManager };
