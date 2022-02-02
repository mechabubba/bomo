/** @todo This is gradually going to become outdated, right? Maybe we aught to get rid of it */
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

// ES modules are loaded asynchronously, the order of these statements
// matters to all code loaded later that uses process and process.env
import "./modules/processEvents.js"; // Node.js process events
import "./modules/env.js"; // Populates environment variables

import { log } from "./modules/log.js";
import { rateLimit } from "@tinyhttp/rate-limit";
import { User } from "./structures/User.js";
import { Bomo } from "./structures/Bomo.js";

const initialize = async function() {
    log.info("Starting bomo...");
    // const { rateLimit } = await import("@tinyhttp/rate-limit");

    // Instantiate bomo
    // Setting engine, parsing cookie headers, logging middleware, 404 route, and serving the public folder are handled by Bomo's constructor
    const bomo = new Bomo();

    /**
     * Authorization header validation
     * @param {*} req - Request
     * @param {*} res - Response
     * @param {function} next - Next function
     * @todo not sure where this should go, simplest would be right here
     * @todo Check bomo.auth.has() with the authorization header
     * @todo Return 403 forbidden for requests with invalid authorization headers
     * @todo Would be nice to handle 401 unauthorized and send it with the proper WWW-Authenticate header https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
     */
    const validate = async function(req, res, next) {
        // if (!req.get("Authorization")) {}
        // const authorization = Buffer.from(req.get("Authorization"), "base64").toString("utf8");
        log.trace("Validating authorization header from", req.ip || req.socket.remoteAddress);
        next();
    };

    // Register api routes with tinyhttp
    // bomo.app.get("/time", (req, res, next) => res.json({ content: DateTime.now().toFormat("HH:mm:ss.SSS") }));
    // bomo.app.post("/time", (req, res, next) => res.json({
    //     message: "yes i can here u are",
    //     content: DateTime.now().toFormat("HH:mm:ss.SSS"),
    // }));

    /**
     * Creates a new user with authorization details
     */
    bomo.app.post("/api/users",
        /** @todo Couldn't decide on a good rate limit */
        // rateLimit({ max: 8, windowMs: 10000 /* 10 seconds */ }),
        (req, res, next) => {
            const user = new User(bomo, req.ip || req.socket.remoteAddress);
            res.status(201).json({
                content: user.toObject(),
            });
        },
    );

    /**
     * Retrieves user info
     */
    bomo.app.get("/api/users/:id",
        /** @todo Couldn't decide on a good rate limit */
        /** @todo Needs to use the authorization middleware */
        /** @todo Are the returns after Response.json() nesscary? */
        /** @todo Returning 404 is arguably dumb, and different stack overflow questions have completely different answers debating it, but 204 No Content can't have a body (?) */
        async (req, res, next) => {
            if (!req.params.id || !bomo.users.has(req.params.id)) {
                res.status(404).json({
                    "code": 404,
                    "status": "404 Not Found",
                    "message": `User "${req.params.id}" not found`,
                });
                return;
            }
            const user = bomo.users.get(req.params.id);
            const data = user.toObject();
            // Important to strip certain details from the object if the user shouldn't have them
            if (user.auth.encoded !== req.get("Authorization")) delete data.authorization;
            res.status(200).json({
                content: data,
            });
        },
    );

    /**
     * Route that will always return 200 OK content: true
     */
    bomo.app.get("/api/test/true", (req, res, next) => res.status(200).json({ content: true }));

    /**
     * Route to test rate limiting
     */
    bomo.app.get("/api/test/limit",
        rateLimit({ max: 10, windowMs: 60000 /* 1 minute */ }),
        (req, res, next) => res.status(200).json({ content: true }),
    );

    /**
     * Route to test authentication
     * @todo No validation middleware yet
     */
    bomo.app.get("/api/test/auth",
        // Validation middleware
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
