/** @todo This is gradually going to become outdated, right? Maybe we aught get rid of it */
/*
# Tentative Structure
    /public/ (Files served static accessible to browsers/client)
        /assets/
        /css/
        /js/ (Client side javascript not using ES6 modules)
            main.js (unused code, mainly chat stuff, color was moved to modules/structures/)
        /modules/ (Used for client side ES6 modules)
            /structures/ (Used for classes)
                Chat.js
                Client.js (Client side app)
                Color.js (unused & unfinished code)
            index.js (Client side code)
    /structures/ (Used for classes)
        Base.js (Reusable abstract class)
        Bomo.js (Server side app)
        Game.js (Game logic, completely unfinished)
        Player.js (Dunno what this is)
        Room.js (Class representing rooms)
        User.js (Class representing users)
    /views/ (Rendered ejs templates)
        /partials/ (ejs files injected other templates)
        404.ejs
        browser.ejs (Unused code, don't touch)
        index.ejs (Central application, intending on using single page application design)
        old-index.ejs (Not in the repo, unused old code, don't touch)
        standard.ejs (Template using the standard partials, may be copy pasted for new pages)
        test.ejs (Testing page)
    index.js
*/

const fs = require("fs");
const path = require("path");
const Bomo = require("./structures/Bomo");
const User = require("./structures/User");
const API = require("./structures/API");
const log = require("./util/log");
const dotenv = require("dotenv");
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");

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
 * Information and control over the current Node.js process
 * @external process
 * @see https://nodejs.org/docs/latest/api/process.html
 */

/**
 * Environment variables
 * @see https://nodejs.org/docs/latest/api/process.html#process_process_env
 * @see https://www.npmjs.com/package/dotenv
 * @name env
 * @type {Object}
 * @readonly
 * @memberof external:process
 */

const result = dotenv.config();
if (result.error) {
    log.error(result.error);
    throw result.error;
}

const initialize = async function() {
    // ES Modules in CommonJS via dynamic import
    const { rateLimit } = await import("@tinyhttp/rate-limit");

    // Instantiate bomo
    const bomo = new Bomo();

    // Setting engine, parsing cookie headers, logging middleware, 404 route, and serving the public folder are handled by Bomo's constructor

    // Register api routes with tinyhttp
    // bomo.app.get("/time", (req, res, next) => res.json({ content: DateTime.now().toFormat("HH:mm:ss.SSS") }));
    // bomo.app.post("/time", (req, res, next) => res.json({
    //     message: "yes i can here u are",
    //     content: DateTime.now().toFormat("HH:mm:ss.SSS"),
    // }));

    console.debug(bomo.auth.generate);

    /**
     * Creates a new session for authentication
     */
    bomo.app.post("/api/sessions",
        rateLimit({ max: 16, windowMs: 86400000 /* 24 hours */ }),
        /** @todo For whatever reason, using the generate method as a handler directly causes a 500 internal server error, with nothing apparently wrong. ive spent the past several hours debugging it to no avail, so you have the solution you see before you, which just works? why?? have i ever?? */
        // bomo.auth.generate,
        // bomo.auth.generate.bind(bomo.auth),
        async (req, res, next) => {
            try {
                const session = await bomo.auth.generate(req, res);
                console.log(session);
                res.status(201).json({ content: session });
            } catch (error) {
                log.error(error);
                throw error;
            }
        },
    );

    /**
     * Route to return the validity of a particular session
     *
     * Username and password refers to the v4 uuids used as the first and second portion of the Basic authentication header
     * @see https://tinyhttp.v1rtl.site/docs#reqparams
     * @todo This would likely make bomo.auth.db.has() calls and return content: true or content: false
     */
    bomo.app.get("/api/sessions/:username/:password", (req, res, next) => {
        // req.params.id
        // req.params.key
    });

    /**
     * Route that provides the caller with self identifying information
     */
    bomo.app.get("/api/test/identify",
        rateLimit({ max: 3, windowMs: 300000 /* 5 minutes */ }),
        (req, res, next) => res.status(200).json({
            content: {
                ip: createHash("sha256").update(req.ip || req.socket.remoteAddress).digest("hex"),
                userAgent: req.get("User-Agent"),
            },
        }),
    );

    /**
     * Route that will always return 200 OK content: true
     */
    bomo.app.get("/api/test/true",
        (req, res, next) => res.status(200).json({ content: true }),
    );

    /**
     * Route to test rate limiting
     */
    bomo.app.get("/api/test/limit",
        rateLimit({ max: 10, windowMs: 300000 /* 5 minutes */ }),
        (req, res, next) => res.status(200).json({ content: true }),
    );

    /**
     * Route to test authentication
     */
    bomo.app.get("/api/test/auth",
        rateLimit({ max: 3, windowMs: 300000 /* 5 minutes */ }),
        bomo.auth.validate,
        (req, res, next) => res.status(200).json({ content: true }),
    );

    // // Lobby API Endpoints
    // bomo.app.post("/api/lobby/create", (req, res, next) => {
    //     // params: name, some sort of browser/session id
    //     // returns: success, lobby code
    // });

    // bomo.app.post("/api/lobby/join", (req, res, next) => {
    //     // params: name, some sort of browser/session id, lobby code
    //     // returns: success
    // });

    // Register page routes with tinyhttp
    bomo.app.get("/", (req, res, next) => res.render("index.ejs", {
        title: process.env.title,
        icon: "/favicon.ico",
        node_version: process.version,
    }));
    // bomo.app.get("/test", (req, res, next) => res.render("test.ejs", {
    //     title: `${process.env.title} - api test`,
    //     icon: "/favicon.ico",
    // }));

    // Start
    bomo.start();
};

initialize();
