import assert from "node:assert";
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
     * Parses a websocket message and ensures its structure.
     * @param {User} user The user that sent it.
     * @param {string} data The actual websocket message.
     */
    static parse(user, data) {
        let json;
        console.log(data);
        try {
            json = JSON.parse(data);
            assert.ok("type" in json);
            assert.ok("content" in json);
        } catch (e) {
            log.debug("Error parsing WebSocket message;", e);
            log.error(e);
            return null;
        }
        return new this(user, json);
    }
}

const WebSocketMessageType = Object.freeze({
    AUTH: "auth",           // global listener only
    HEARTBEAT: "heartbeat",
});

export { WebSocketMessage, WebSocketMessageType };
