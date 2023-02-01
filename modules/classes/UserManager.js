import { Collection } from "@discordjs/collection";
import { WebSocket } from "ws";
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
     * Creates a user.
     * @param {WebSocket} socket The websocket that instantiated the user connection.
     * @returns {User}
     * @todo Unfinished
     */
    create(socket) {
        const id = this.generateIdentifier();
        const user = new User(this.service, id, socket);
        this.cache.set(id, user);
        return user;
    }
}

export { UserManager };
