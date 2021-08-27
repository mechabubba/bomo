const EventEmitter = require("events");
const { randomBytes } = require("crypto");
const path = require("path");
const log = require("../util/logger");
const Lobby = require("./Lobby");
const Keyv = require("keyv");
const { App } = require("@tinyhttp/app");
const chalk = require("chalk");
const ejs = require("ejs");
const sirv = require("sirv");
const { WebSocketServer } = require("ws");

const loggingColors = {
    "1": chalk.gray, // Informational responses
    "2": chalk.cyan, // Successful responses
    "3": chalk.gray, // Redirects
    "4": chalk.yellow, // Client errors
    "5": chalk.magenta, // Server errors
};

/**
 * Bomo's core class. Named Bomo rather than app to differentiate from tinyhttp's App
 * @extends {EventEmitter}
 */
class Bomo extends EventEmitter {
    /**
     * Setting engine, logging middleware, 404 route, and serving the public folder are handled by Bomo's constructor
     */
    constructor() {
        super();

        /**
         * A map of keys to Lobby's.
         */
        this.lobbies = {};

        /**
         * Path of the publicly served folder. Used with sirv.
         */
        this.public = path.join(__dirname, "../public");

        // Database
        if (!process.env.db) log.info("No database present, using memory. Data will not be persisted");
        /**
         * Keyv Database
         * @see {@link https://www.npmjs.com/package/keyv#usage}
         * @type {Keyv}
         */
        this.db = process.env.db ? new Keyv(process.env.db) : new Keyv();
        this.db.on("error", err => {
            // Don't allow connection errors with database while starting
            log.fatal("Keyv Connection Error", err);
            return process.exit(1);
        });

        /**
         * Tinyhttp App w/ ejs templating engine
         * @see {@link https://tinyhttp.v1rtl.site/docs#application}
         * @see {@link https://ejs.co/#docs}
         * @type {App}
         */
        this.app = new App({
            noMatchHandler: (req, res) => {
                res.status(404);
                // respond with html page
                if (req.accepts("html")) {
                    res.render("404.ejs", {
                        title: `${process.env.title} - 404`,
                        icon: "error.ico",
                        url: req.url,
                    });
                    return;
                }
                // respond with json
                if (req.accepts("json")) {
                    res.json({ error: "404 Not Found" });
                    return;
                }
                // default to plain text
                res.type("txt").send("404 Not Found");
            },
            onError: (err, req, res) => {
                res.status(500).send({
                    message: err.message,
                });
            },
        });

        // Engine
        this.app.engine("ejs", ejs.renderFile);

        // Logging middleware via ./util/logger
        this.app.use((req, res, next) => {
            res.on("finish", () => {
                const code = res.statusCode.toString();
                const args = [req.ip, req.method, loggingColors[code[0]](code), res.statusMessage, req.originalUrl || req.url];
                const message = args.join(" ").trim();
                if (code[0] === "4" || code[0] === "5") {
                    log.debug(message);
                    log.trace(req);
                    log.trace(res);
                } else {
                    log.trace(message);
                }
            });
            next();
        });

        // Static webserver using sirv serving the public folder
        // https://www.npmjs.com/package/sirv
        this.app.use("/", sirv(this.public, {
            dev: process.env.dev,
            maxAge: 86400, // Cached for 24 hours
        }));
    }

    /**
     * Starts bomo (just `this.app.listen()` for now)
     */
    start() {
        this.wss = new WebSocketServer({ port: process.env.wssport });
        this.wss.on("connection", (ws) => {
            ws.on("message", (message) => {
                /*
                we should anticipate all messages (encryption/https aside) will be in json formatting as the following;
                {
                    "type": "some_type_thing",
                    "data": {} // anything
                }
                */
                let data;
                try {
                    data = JSON.parse(message);
                } catch (e) {
                    // should probably do something if we get garbage but rn i've got nothin so bad programming practices ahoy
                }

                switch (data.type) {
                    case "":
                    default:
                        break; // ¯\_(ツ)_/¯ :yea:
                }
            });
        });
        log.info(`${chalk.green("[READY]")} WebSocket server started on port ${process.env.wssport}`);

        this.app.listen(process.env.port); // Ground control to major tom
        log.info(`${chalk.green("[READY]")} tinyhttp started on port ${process.env.port}`);
    }

    /**
     * Stops bomo
     */
    stop() {
        process.exit(0);
    }

    /**
     * Generates a small, random id for lobbies. Due to its tiny nature (2 bytes == 65536 possible ids), it is prone to collisions. Therefore, we must make sure its unique.
     * @returns {(string|boolean)} - the ID for the lobby, passed into the Lobby constructor; false if it could not generate a unique ID.
     */
    _generateRandomID() {
        if (Object.keys(this.lobbies).length >= 65536) return false;
        const id = randomBytes(2).toString("hex");
        for (const key in this.lobbies) {
            if (key === id) return this._generateRandomID();
        }
        return id;
    }

    /**
     * Creates a lobby.
     */
    createLobby() {
        const id = this._generateRandomID();
        if (id !== false) {
            this.lobbies[id] = new Lobby(this._generateRandomID());
        }
    }
}

module.exports = Bomo;
