/*
# Tentative Structure
    public/
        assets/
        css/
        js/
            main.js - the client code
    structures/
        Bomo.js    - internal logic
        Game.js   - game logic
        Lobby.js  - lobby class
        Player.js - a "player"
    views/
        _header_, _footer_.ejs - header and footer, visible on every page
        index.ejs - home thing
        ???.js - more????
    index.js - the start of the universe
*/

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Bomo = require("./structures/Bomo");
const log = require("./util/logger");
const { DateTime } = require("luxon");
log.info("Starting bomo...");

// node.js process event listeners
// See https://nodejs.org/api/process.html for more information
process.on("uncaughtException", (err, origin) => {
    log.fatal(`${origin},`, err);
    return process.exit(1); // Always let code exit on uncaught exceptions
});
process.on("unhandledRejection", (reason, promise) => log.error(`unhandledRejection\n`, promise));
process.on("rejectionHandled", (promise) => log.debug("rejectionHandled\n", promise));
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? log.info("Exiting peacefully") : log.warn("Exiting abnormally with code:", code));

// Environment file setup
const envPath = path.join(__dirname, ".env");
const envTemplate = path.join(__dirname, "template.env");
if (!fs.existsSync(envPath)) {
    log.info("No .env file present, copying template...");
    fs.copyFileSync(envTemplate, envPath);
}

/**
 * Environment variables
 * @see https://nodejs.org/docs/latest/api/process.html#process_process_env
 * @see https://www.npmjs.com/package/dotenv
 * @type {Object}
 * @name process.env
 * @global
 */
const result = dotenv.config();
if (result.error) {
    log.error(result.error);
    throw result.error;
}

// Instantiate bomo
const bomo = new Bomo();

// Setting engine, logging middleware, 404 route, and serving the public folder are handled by Bomo's constructor

// Register api routes with tinyhttp
bomo.app.get("/time", (req, res, next) => res.json({ content: DateTime.now().toFormat("HH:mm:ss.SSS") }));
bomo.app.post("/time", (req, res, next) => res.json({
    message: "yes i can here u are",
    content: DateTime.now().toFormat("HH:mm:ss.SSS"),
}));

// Register page routes with tinyhttp
this.app.get("/", (req, res, next) => res.render("index.ejs", {
    title: process.env.title,
    icon: "favicon.ico",
    node_version: process.version,
}));
this.app.get("/test", (req, res, next) => res.render("test.ejs", {
    title: `${process.env.title} - api test`,
    icon: "favicon.ico",
}));
// app.get("/cards/", (req, res, next) => res.render("cards.ejs", {}));

// Start
bomo.start();
