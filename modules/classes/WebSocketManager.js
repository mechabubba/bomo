import { WebSocketServer } from "ws";
import { log } from "../log.js";
import { BaseManager } from "./BaseManager.js";
import { UserManager } from "./UserManager.js";

class WebSocketManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Websocket server using ws
         * @note This will be null until created by Service.start() in order to use the same internal http server as tinyhttp
         * @note This is an implementation of a real websocket library, so the preferred equivalent client side is the browser's own WebSocket implementation
         * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md
         * @see https://www.npmjs.com/package/ws
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
         * @type {?WebSocketServer}
         */
        this.server = null;

        /**
         * Cache of current websockets mapped by their id
         * @type {Collection<string, null>}
         * @name WebSocketManager#cache
         * @todo Unfinished
         */
    }

    /**
     *
     */
    start() {
        // Create websocket server using pre-existing http server
        this.server = new WebSocketServer({
            clientTracking: true,
            path: "/ws",
            server: this.service.server,
        });

        // Add websocket server event listeners
        this.server.on("listening", () => {
            log.info(`[READY] Websocket server ready to upgrade connections`);
        });
        this.server.on("connection", this.serverConnectionListener);
        this.server.on("error", this.serverErrorListener);
        this.server.on("close", () => {
            // something terrible has happened
        })
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-connection
     * @todo this has to add listeners to new websockets and handle stateless sessions
     */
    serverConnectionListener(websocket, request) {
        // Connection occured, create user. There will/should be some auth/verification here to see if we're getting garbage...
        this.service.users.create(websocket);
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-error
     */
    serverErrorListener(error) {
        //
    }

    serverHeadersListener() {
        //
    }

    // Websocket functions

    socketCloseListener() {
        //
    }

    socketErrorListener() {
        //
    }

    socketMessageListener() {
        //
    }

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
}

export { WebSocketManager };
