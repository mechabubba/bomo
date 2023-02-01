import { Collection } from "@discordjs/collection";
import { BaseManager } from "./BaseManager.js";
import { User } from "./User.js";

/**
 * Manager class for instances of User
 */
class UserManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Cache of current users mapped by their id
         * @type {Collection<string, User>}
         * @name GameManager#cache
         */
        this.cache;
    }

    /**
     * Creates a User with a given websocket, and returns
     */
    create(socket) {
        const id = this.generateIdentifier();
        const user = new User(this.service, id, socket);
        this.cache.set(id, user);
        return user;
    }

    /** @todo should have a create function similar to RoomManager */
}

export { UserManager };
