import { Collection } from "@discordjs/collection";
import { BaseManager } from "./BaseManager.js";
import { Game } from "./Game.js";

/**
 * Manager class for instances of Game
 */
class GameManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Cache of current games mapped by their id
         * @type {Collection<string, Game>}
         * @name GameManager#cache
         */
        this.cache;
    }

    /** @todo should have a create function similar to RoomManager */
}

export { GameManager };
