const EventEmitter = require("events");

const log = require("../util/logger");
const path = require("path");
const Keyv = require("keyv");
const { App } = require("@tinyhttp/app");
const ejs = require("ejs");
const sirv = require("sirv");
const chalk = require("chalk");
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
                    res.json({ error: "Not found" });
                    return;
                }
                // default to plain text
                res.type("txt").send("Not found");
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
                const url = req.originalUrl || req.url;
                const code = res.statusCode.toString();
                const args = [];
                args.push(req.ip);
                args.push(req.method);
                args.push(loggingColors[code[0]](code));
                args.push(res.statusMessage);
                args.push(url);
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
            maxAge: 86400, // Cached for 24 hours
        }));
    }

    /**
     * Starts bomo (just `this.app.listen()` for now)
     */
    start() {
        // Ground control to major tom
        this.app.listen(process.env.port);
        log.info(`${chalk.green("[READY]")} tinyhttp started on port ${process.env.port}`);
    }

    /**
     * Stops bomo
     */
    stop() {
        process.exit(0);
    }
}

module.exports = Bomo;