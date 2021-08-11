// lets get the ball rolling baby
/*
# Tentative Structure
    public/
        assets/
        css/
        js/
            main.js - the client code
    structures/
        Game.js   - game logic
        Lobby.js  - lobby class
        Player.js - a "player"
    views/
        _header_, _footer_.ejs - header and footer, visible on every page
        index.ejs - home thing
        ???.js - moar????
    index.js - the start of the universe
*/
const path = require("path");
const log = require("./util/logger");
log.info("Starting bomo...");

// node.js process event listeners
// See https://nodejs.org/api/process.html for more information
process.on("uncaughtException", (error, origin) => {
    log.fatal(`${origin},`, error);
    return process.exit(1); // Always let code exit on uncaught exceptions
});
process.on("unhandledRejection", (reason, promise) => log.error(`unhandledRejection\n`, promise));
process.on("rejectionHandled", (promise) => log.debug("rejectionHandled\n", promise));
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? log.info("Exiting peacefully") : log.warn("Exiting abnormally with code:", code));

// Environment
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
    log.error(result.error);
    throw result.error;
}

// Tinyhttp
// https://tinyhttp.v1rtl.site/docs
const { App } = require("@tinyhttp/app");
const app = new App({
    noMatchHandler: (req, res) => {
        res.status(404).send({
            message: "404 Not Found",
        });
    },
    onError: (err, req, res) => {
        res.status(500).send({
            message: err.message,
        });
    },
});

// Engine
// https://ejs.co/#docs
const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);

// Logging
const chalk = require("chalk");
const loggingColors = {
    "1": chalk.gray, // Informational responses
    "2": chalk.cyan, // Successful responses
    "3": chalk.gray, // Redirects
    "4": chalk.yellow, // Client errors
    "5": chalk.magenta, // Server errors
};
app.use((req, res, next) => {
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
        } else {
            log.trace(message);
        }
    });
    next();
});

// Static web server
const sirv = require("sirv");
app.use("/", sirv(path.join(__dirname, "public")));

// API


// Webpages
app.get("/", (req, res, next) => res.render("index.ejs", {
    title: "bomo",
    node_version: process.version,
}));
// app.get("/cards/", (req, res, next) => res.render("cards.ejs", {}));

// Ground control to major tom
app.listen(process.env.port);
log(`tinyhttp started on port ${process.env.port}`);
