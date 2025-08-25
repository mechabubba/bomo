import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { log } from "../log.js";
import { generateSecret } from "../auth.js";
import { WebSocketMessage as WSMessage, WebSocketMessageType as WSType } from "./WebSocketMessage.js";

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
        this._socket = null;
        this.name = `User ${this.id}`;
        this.token = generateSecret();
        this.room = null;
    }

    /**
     * @param {WebSocket} socket
     */
    set socket(socket) {
        this._socket = socket;
        this._socket.on("message", this.socketMessageListener.bind(this));
        this._socket.on("close", this.socketCloseListener.bind(this));
        this._socket.on("error", this.socketErrorListener.bind(this));
    }

    /**
     * Sends a message to the User this class represents.
     * @param {Object} data The message to send, to be stringified.
     * @returns {void}
     */
    send(type, content) {
        const message = JSON.stringify({ type, content });
        this._socket.send(message);
    }

    /**
     * Handles a sent WebSocketMessage.
     * @param {WSMessage} msg
     */
    handleWSMessage(msg) {
        switch (msg.type) {
            case WSType.HEARTBEAT:
                log.debug("recieved heartbeat from ", this.id);
                break;
            default:
                // ???
        }
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-message
     */
    socketMessageListener(data, isBinary) {
        const msg = WSMessage.parse(this, data);
        if (!msg) {
            log.debug(`[${this.name}] Invalid WS message:`, data);
            return;
        }
        this.handleWSMessage(msg);
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
