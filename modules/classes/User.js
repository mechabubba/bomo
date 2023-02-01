import { BaseIdentifiable } from "./BaseIdentifiable.js";

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
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-message
     */
    socketMessageListener(data, isBinary) {
        // user sent message to tha server
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
