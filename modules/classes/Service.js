import { env } from "node:process";
import { join } from "node:path";
import { Server } from "node:http";

import { App } from "@tinyhttp/app";
// If we need cookies server side, use this
// import { cookieParser } from "@tinyhttp/cookie-parser";
import { json, urlencoded } from "milliparsec";
import sirv from "sirv";

import { log } from "../log.js";
import { directory, defaultPort, envFlags } from "../constants.js";
import { noMatchHandler, onError, requestLogger } from "../middleware.js";
import { WebSocketManager } from "./WebSocketManager.js";
import { RoomManager } from "./RoomManager.js";
import { UserManager } from "./UserManager.js";
import { GameManager } from "./GameManager.js";
import { PlayerManager } from "./PlayerManager.js";
import { stringToBoolean } from "../misc.js";
import { renderMinifiedFile } from "../ejs.js";

/**
 * @typedef {Object} ServiceOptions
 * @property {?number} [port]
 */

/**
 * Main class for the backend/server side code
 *
 * Named Service rather than App or Server to differentiate from tinyhttp's App and http server
 */
class Service {
    /**
     * @param {?ServiceOptions} [options]
     */
    constructor(options) {
        /**
         * Port used with the http server
         *
         * Defaults to defaultPort from constants.js
         * @type {number}
         */
        this.port = options?.port || defaultPort;

        /**
         * The http.Server used by the service
         *
         * This will be null until Service.start() is called
         * @see https://github.com/tinyhttp/tinyhttp/blob/a9e00dcaa93f2e38f7a68e3301f7cd97dea69270/packages/app/src/app.ts#L354
         * @see https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
         * @type {Server|null}
         */
        this.server = null;

        /**
         * @type {WebSocketManager}
         */
        this.sockets = new WebSocketManager(this);

        /**
         * @type {RoomManager}
         */
        this.rooms = new RoomManager(this);

        /**
         * @type {UserManager}
         */
        this.users = new UserManager(this);

        /**
         * @type {GameManager}
         */
        this.games = new GameManager(this);

        /**
         * @type {PlayerManager}
         */
        this.players = new PlayerManager(this);

        /**
         * Tinyhttp App w/ eta templating engine
         * @see https://tinyhttp.v1rtl.site/docs#application
         * @see https://eta.js.org/
         * @type {App}
         */
        this.app = new App({
            settings: {
                networkExtensions: true,
                xPoweredBy: true,
            },
            noMatchHandler: noMatchHandler,
            onError: onError,
        });

        // Engine
        this.app.engine("ejs", renderMinifiedFile);

        // Logging middleware
        this.app.use(requestLogger);

        // Parse cookie headers via cookie-parser
        // this.app.use(cookieParser());

        // Body parsing via milliparsec
        this.app.use(json());
        this.app.use(urlencoded());

        // Static webserver using sirv serving the public folder
        // https://www.npmjs.com/package/sirv
        this.app.use("/", sirv(join(directory, "public"), {
            dev: stringToBoolean(env[envFlags.dev]),
            maxAge: 86400, // Cached for 24 hours
        }));
    }

    /**
     * Shorthand for setting multiple routes at once with the same callback
     * @param {string} method
     * @param {string[]} paths
     * @param {function} callback
     */
    route(method, paths, callback) {
        if (!method) throw new TypeError("method cannot be falsy");
        if (!paths || !Array.isArray(paths)) throw new TypeError("paths must be an array");
        if (!callback) throw new TypeError("callback cannot be falsy");
        if (!paths.length) return;
        for (const path of paths) {
            this.app[method](path, callback);
        }
        return;
    }

    /**
     * Starts the service
     */
    start() {
        // Create http server and start listening
        this.server = this.app.listen(this.port, () => {
            log.info(`[READY] Web server listening on port ${this.port}`);
        });

        // Create websocket server and add events
        this.sockets.start();
    }

    /**
     * Stops the service
     */
    stop(socketsClosed = false) {
        if (!socketsClosed) {
            this.sockets.server.close((error) => {
                log.info("Websocket server closed");
                this.stop(true);
            });
        } else {
            this.server.close(() => {
                process.exit(0);
            });
        }
    }
}

export { Service };
