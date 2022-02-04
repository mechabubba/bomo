import { WebSocketServer } from "ws";
import chalk from "chalk";

import { log } from "../modules/log.js";
import { Base } from "./Base.js";

class WebSocketManager extends Base {
    constructor(service) {
        super(service, "webSocketManager");

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
            log.info(`${chalk.green("[READY]")} Websocket server ready to upgrade connections`);
        });
        this.server.on("connection", this.serverConnectionListener);
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-connection
     * @todo this has to add listeners to new websockets and handle stateless sessions
     */
    serverConnectionListener(websocket, request) {
        //
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
