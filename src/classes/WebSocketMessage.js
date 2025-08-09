import { log } from "../log.js";

class WebSocketMessage {
    constructor(user, message) {
        if (typeof message !== "object") {
            throw new Error("message should be object");
        }

        this.user = user;
        this.type = message.type;
        this.data = message.data;
    }

    /**
     * Parses a websocket message.
     * @param {User} user The user that sent it.
     * @param {string} data The actual websocket message.
     */
    static parse(user, data) {
        try {
            JSON.parse(data);
        } catch (e) {
            log.error(`Recieved invalid message.`, data);
        }

        return this(user, data);
    }
}

export { WebSocketMessage };
