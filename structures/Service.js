import EventEmitter from "node:events";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import chalk from "chalk";
import ejs from "ejs";
import sirv from "sirv";
import { cookieParser } from "@tinyhttp/cookie-parser";
import { App } from "@tinyhttp/app";

import { log } from "../modules/log.js";
import { WebSocketManager } from "./WebSocketManager.js";
import { noMatchHandler, onError, httpLogger } from "../modules/middleware.js";
import { RoomManager } from "./RoomManager.js";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));

/**
 * Main class for backend/server side code
 * @note Named Service rather than App or Server to differentiate from tinyhttp's App and http server
 */
class Service extends EventEmitter {
    /**
     * Setting engine, parsing cookie headers, logging middleware, 404 route, and serving the public folder are handled by this constructor
     */
    constructor() {
        super();

        /**
         * Path of the publicly served folder. Used with sirv.
         */
        this.public = join(moduleDirectory, "..", "public");

        /**
         * @type {RoomManager}
         */
        this.rooms = new RoomManager(this);

        /**
         * @type {WebSocketManager}
         */
        this.sockets = new WebSocketManager(this);

        // Check if the port environment variable is valid
        /** @todo Not checking number validity yet, just falsy, which works because empty strings are falsy */
        if (!process.env.port) throw new Error("PORT environment variable must be a valid number");

        /**
         * Tinyhttp App w/ ejs templating engine
         * @see https://tinyhttp.v1rtl.site/docs#application
         * @see https://ejs.co/#docs
         * @type {App}
         */
        this.app = new App({
            noMatchHandler: noMatchHandler,
            onError: onError,
        });

        // Engine
        this.app.engine("ejs", ejs.renderFile);

        // Parse cookie headers via cookie-parser
        this.app.use(cookieParser());

        // Logging middleware
        this.app.use(httpLogger);

        // Static webserver using sirv serving the public folder
        // https://www.npmjs.com/package/sirv
        this.app.use("/", sirv(this.public, {
            dev: process.env.dev === "true",
            maxAge: 86400, // Cached for 24 hours
        }));

        /**
         * The http.Server returned by tinyhttp's App.listen()
         *
         * This will be null until Service.start() is called
         * @see https://github.com/tinyhttp/tinyhttp/blob/a9e00dcaa93f2e38f7a68e3301f7cd97dea69270/packages/app/src/app.ts#L354
         * @see https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
         * @type {?http.Server}
         */
        this.server = null;
    }

    /**
     * Starts the service
     */
    start() {
        // Create http server & make tinyhttp listen
        this.server = this.app.listen(Number(process.env.port), () => {
            // callback after server starts listening
            log.info(`${chalk.green("[READY]")} tinyhttp listening on port ${process.env.port}`);
        });

        // Creates the websocket server and adding event listeners
        this.sockets.start();
    }

    /**
     * Stops the service
     */
    stop(socketsClosed = false) {
        if (!this.server || !this.sockets.server) return;
        if (socketsClosed) {
            // process.exit(0);
            log.debug("Process would have exited");
        } else {
            this.sockets.server.close((error) => {
                log.info("Websocket server closed");
                this.stop(true);
            });
        }
    }
}

export { Service };
