import { Collection } from "@discordjs/collection";
import { BaseManager } from "./BaseManager.js";
import { Player } from "./Player.js";

/**
 * Manager class for instances of Player
 */
class PlayerManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Cache of current players mapped by their id
         * @type {Collection<string, Player>}
         * @name GameManager#cache
         */
        this.cache;
    }

    /** @todo should have a create function similar to RoomManager */
}

export { PlayerManager };
