import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { log } from "../log.js";
import { generateToken } from "../misc.js";
import { generateSecret } from "../auth.js";

/**
 * User data
 * @typedef {Object} UserData
 * @property {string} name User name
 */

/**
 * User
 */
class User extends BaseIdentifiable {
    constructor(service, id) {
        super(service, id);

        /** @type {?WebSocket} */
        this.socket = null;
        this.name = `User ${this.id}`;
        this.token = generateSecret();
        this.room = null;
    }

    /**
     * @param {WebSocket} socket
     */
    set socket(socket) {
        Object.defineProperty(this, "socket", {
            value: socket,
            writable: true,
            enumerable: true,
            configurable: true,
        });
        this.socket.on("message", this.socketMessageListener.bind(this));
        this.socket.on("close", this.socketCloseListener.bind(this));
        this.socket.on("error", this.socketErrorListener.bind(this));
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
        log.debug(`${this.name}:`, data);
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
}

export { User };
