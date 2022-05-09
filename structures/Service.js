import { join } from "node:path";
import { Server } from "node:http";

import { App } from "@tinyhttp/app";
import { cookieParser } from "@tinyhttp/cookie-parser";
import { json, urlencoded } from "milliparsec";
import ejs from "ejs";
import sirv from "sirv";
import chalk from "chalk";

import { directory, defaultPort } from "../modules/constants.js";
import { log } from "../modules/log.js";
import { WebSocketManager } from "./WebSocketManager.js";
import { noMatchHandler, onError, requestLogger } from "../modules/middleware.js";
import { RoomManager } from "./RoomManager.js";

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
     * @param {?ServiceOptions} [input]
     */
    constructor(input) {
        const options = input || {};

        /**
         * Port used with the http server
         *
         * Defaults to defaultPort from constants.js
         *
         * Keep in mind that environment variables are strings, so if you're
         * using one for input you can do it like this:
         *
         * `process.env.port ? Number(process.env.port) : null`
         *
         * And null will fallback to defaultPort here
         * @type {number}
         */
        this.port = options.port || defaultPort;

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
         * @type {RoomManager}
         */
        this.rooms = new RoomManager(this);

        /**
         * @type {WebSocketManager}
         */
        this.sockets = new WebSocketManager(this);

        /**
         * Tinyhttp App w/ ejs templating engine
         * @see https://tinyhttp.v1rtl.site/docs#application
         * @see https://ejs.co/#docs
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
        this.app.engine("ejs", ejs.renderFile);

        // Logging middleware
        this.app.use(requestLogger);

        // Parse cookie headers via cookie-parser
        this.app.use(cookieParser());

        // Body parsing via milliparsec
        this.app.use(json());
        this.app.use(urlencoded());

        // Static webserver using sirv serving the public folder
        // https://www.npmjs.com/package/sirv
        this.app.use("/", sirv(join(directory, "public"), {
            dev: process.env.dev === "true",
            maxAge: 86400, // Cached for 24 hours
        }));
    }

    /**
     * Starts the service
     */
    start() {
        // Create http server and start listening
        this.server = this.app.listen(this.port, () => {
            log.info(`${chalk.green("[READY]")} Web server listening on port ${this.port}`);
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
