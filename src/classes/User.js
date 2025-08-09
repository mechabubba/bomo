import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { log } from "../log.js";

/**
 * User data
 * @typedef {Object} UserData
 * @property {string} name User name
 */

/**
 * User
 */
class User extends BaseIdentifiable {
    constructor(service, id, socket) {
        super(service, id);

        this.socket = socket;
        this.socket.on("message", this.socketMessageListener);
        this.socket.on("close", this.socketCloseListener);
        this.socket.on("error", this.socketErrorListener);

        this.name = `User ${this.id}`;
        this.room = null;
    }

    /**
     * Sends a message to the User this class represents.
     * @param {Object} data The message to send, to be stringified.
     * @returns {void}
     */
    send(data) {
        const message = JSON.stringify(data); /** @todo maybe do more serialization here */
        this.socket.send(message);
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-message
     */
    socketMessageListener(data, isBinary) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            log.error("Error parsing socket message.");
        }

        // do some parsing n shit
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-close-1
     */
    socketCloseListener(code, reason) {
        //
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-error-1
     */
    socketErrorListener(error) {
        //
    }

    /*
    socketOpenListener() {
        //
    }

    socketPingListener() {
        //
    }

    socketPongListener() {
        //
    }

    socketUnexpectedResponseListener() {
        //
    }

    socketUpgradeListener() {
        //
    }
    */

    get id() {
        return this.id;
    }
}

export { User };
