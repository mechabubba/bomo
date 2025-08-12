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
    create(token) {
        const user = new User(this.service, token);
        this.cache.set(user.id, user);
        return user;
    }

    /**
     * Find a user by their token.
     * @todo is this wise? probably better to use a jwt or something that can a) be verified and b) physically stores the users id
     * @param {string} token
     */
    findByToken(token) {
        return this.cache.find((v, k) => {
            return v.token == token;
        });
    }
}

export { UserManager };
