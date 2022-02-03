import EventEmitter from "node:events";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import chalk from "chalk";
import ejs from "ejs";
import sirv from "sirv";
import { cookieParser } from "@tinyhttp/cookie-parser";
import { App } from "@tinyhttp/app";
import { WebSocketServer } from "ws";
import { log } from "../modules/log.js";
import { httpLoggingStyles } from "../modules/constants.js";
import { WebSocketEvents } from "./WebSocketEvents.js";
import { Room } from "./Room.js";
import { RoomManager } from "./RoomManager.js";

/**
 * Bomo's core class. Named Bomo rather than app to differentiate from tinyhttp's App
 * @extends {EventEmitter}
 */
class Bomo extends EventEmitter {
    /**
     * Setting engine, parsing cookie headers, logging middleware, 404 route, and serving the public folder are handled by Bomo's constructor
     */
    constructor() {
        super();

        /**
         * Path of the publicly served folder. Used with sirv.
         */
        this.public = join(dirname(fileURLToPath(import.meta.url)), "../public");

        /**
         * Currently available rooms mapped to their ids
         * @type {Map<string, Room>}
         */
        this.rooms = new RoomManager();

        /**
         * Users mapped to their ids
         * @type {Map<string, Room>}
         */
        this.users = new Map();

        /**
         * Valid base64 encoded authorization strings mapped to user ids
         * @type {Map<string, string>}
         */
        this.auth = new Map();

        // Check if the port environment variable is valid
        /** @todo Not checking number validity yet, just falsy, which works because empty strings are falsy */
        if (!process.env.port) throw new TypeError("PORT environment variable must be a valid number");

        /**
         * Tinyhttp App w/ ejs templating engine
         * @see https://tinyhttp.v1rtl.site/docs#application
         * @see https://ejs.co/#docs
         * @type {App}
         */
        this.app = new App({
            noMatchHandler: (req, res) => {
                res.status(404);
                // respond with html page
                if (req.accepts("html")) {
                    res.render("404.ejs", {
                        title: `${process.env.title} - 404`,
                        icon: "/error.ico",
                        url: req.url,
                    });
                    return;
                }
                // respond with json
                if (req.accepts("json")) {
                    res.json({
                        "code": 404,
                        "status": "404 Not Found",
                        "message": `The requested resource "${req.url}" was not found`,
                    });
                    return;
                }
                // default to plain text
                res.type("txt").send("404 Not Found");
            },
            onError: (err, req, res) => {
                log.error(req.ip || req.socket.remoteAddress, req.method, req.originalUrl || req.url, err);
                res.status(500).json({
                    "code": 500,
                    "status": "500 Internal Server Error",
                    "message": err.message,
                });
            },
        });

        // Engine
        this.app.engine("ejs", ejs.renderFile);

        // Parse cookie headers via cookie-parser
        this.app.use(cookieParser());

        // Provide hashed ip address on all requests
        // this.app.use((req, res, next) => {
        //     /** @todo Should support X-Forwarded-For header but only while actually behind a proxy, as otherwise its vulnerable to spoofing */
        //     req.addressHash = createHash("sha256").update(req.ip || req.socket.remoteAddress).digest("hex");
        //     next();
        // });

        // Logging middleware via /modules/log
        this.app.use((req, res, next) => {
            res.on("finish", () => {
                const code = res.statusCode.toString();
                const url = req.originalUrl || req.url;
                const args = [req.ip || req.socket.remoteAddress, req.method, httpLoggingStyles[code[0]](code), res.statusMessage, url];
                /** @todo Some homework would be figuring out how to args.push() the JSON body of requests and responses if present on either */
                // Not currently using cookies anywhere
                // if (url === "/") args.push("Cookies:", JSON.stringify(req.cookies));
                const message = args.join(" ").trim();
                if (code[0] === "4" || code[0] === "5") {
                    log.debug(message);
                } else {
                    log.trace(message);
                }
            });
            next();
        });

        // Static webserver using sirv serving the public folder
        // https://www.npmjs.com/package/sirv
        this.app.use("/", sirv(this.public, {
            dev: process.env.dev === "true",
            maxAge: 86400, // Cached for 24 hours
        }));

        /**
         * The http.Server returned by tinyhttp's App.listen()
         *
         * This will be null until Bomo.start() is called
         * @see https://github.com/tinyhttp/tinyhttp/blob/a9e00dcaa93f2e38f7a68e3301f7cd97dea69270/packages/app/src/app.ts#L354
         * @see https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
         * @type {?http.Server}
         */
        this.server = null;

        /**
         * Websocket server using ws
         *
         * Notes:
         *
         * - This is an implementation of a real websocket library, so the preferred equivalent client side is the browser's own WebSocket implementation
         * - I couldn't find documentation for CommonJS usage of ws, but destructuring Server as WebSocketServer works fine
         * - This will be null until created by Bomo.start() in order to use the same internal http server as tinyhttp
         * @see https://github.com/websockets/ws/blob/HEAD/doc/ws.md
         * @see https://www.npmjs.com/package/ws
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
         * @type {?WebSocketServer}
         */
        this.wss = null;
    }

    /**
     * Starts bomo
     */
    start() {
        // Create http server & make tinyhttp listen
        this.server = this.app.listen(Number(process.env.port), () => {
            // callback after server starts listening
            log.info(`${chalk.green("[READY]")} tinyhttp listening on port ${process.env.port}`);
        });

        // Create websocket server using pre-existing http server
        this.wss = new WebSocketServer({
            clientTracking: true,
            path: "/ws",
            server: this.server,
        });

        // Add websocket server events
        this.wss.on("connection", WebSocketEvents.serverOnConnection.bind(null, this));

        /** @todo Possibly move this to the wss listening event? */
        log.info(`${chalk.green("[READY]")} Websocket server ready to upgrade connections`);
    }

    /**
     * Stops bomo
     * @todo Reading the ws documentation, it doesn't look like this could easily await wss.close()
     */
    stop() {
        // this.wss.close();
        process.exit(0);
    }

    // /**
    //  * Creates a room
    //  * @returns {Room} - Returns the room created
    //  */
    // createRoom() {
    //     return new Room(this);
    // }
}

export { Bomo };
