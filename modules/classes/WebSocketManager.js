import { WebSocketServer } from "ws";
import { log } from "../log.js";
import { BaseManager } from "./BaseManager.js";

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
        this.server.on("headers", this.serverHeaderListener);
        this.server.on("close", this.serverCloseListener);
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-connection
     * @todo this has to add listeners to new websockets and handle stateless sessions
     */
    serverConnectionListener(websocket, request) {
        // Connection occured, create user. There will/should be some auth/verification here to see if we're getting garbage...
        log.info("User connected to socket.");
        if (!request.headers.authorization) {
            return;
        }
        this.service.users.create(websocket, request);

        // @todo detect if websocket request is valid somehow
        // if auth key present, auth w/ player
        // if not, create new player on server side
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-error
     */
    serverErrorListener(error) {
        log.error("WebSocketServer encountered an error;");
        log.error(error);
        process.exit(1);
    }

    /**
     * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-headers
     * @todo unsure completely what this event provides and if its useful
     */
    serverHeaderListener(headers, request) {
        //
    }

    serverCloseListener() {
        //
    }
}

export { WebSocketManager };
