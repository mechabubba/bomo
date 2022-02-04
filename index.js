/** @todo Move this to a docs file and update it after the 0.0.3 refactors */
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

// loaded asynchronously, order of statements matters
import "./modules/processEvents.js"; // Node.js process events script
import "./modules/env.js"; // Populates environment variables script

import { log } from "./modules/log.js";
import { brandTitle } from "./modules/constants.js";
import { Service } from "./structures/Backend.js";

const initialize = async function() {
    log.info("Starting bomo...");
    // const { rateLimit } = await import("@tinyhttp/rate-limit");

    // Instantiate service
    // Setting engine, parsing cookies, http logging middleware, 404 route, and serving the public folder are handled by Service's constructor
    const service = new Service();

    // Register api routes with tinyhttp

    /**
     * Gets room information.
     * @todo https://github.com/mechabubba/bomo/projects/1#card-77107543
     */
    service.app.get("/api/rooms",
        async (req, res, next) => {
            const rooms = service.rooms.getRooms();
            res.status(200).json(rooms);
        },
    );

    // Route that will always return 200 OK content: true
    service.app.get("/api/test/true", (req, res, next) => res.status(200).json({ content: true }));

    // Route to test stateless sessions
    service.app.get("/api/test/session",
        // Session validation middleware
        (req, res, next) => res.status(200).json({ content: true }),
    );

    // Register page routes with tinyhttp
    service.app.get("/", (req, res, next) => res.render("index.ejs", {
        title: brandTitle,
        icon: "/favicon.ico",
        node_version: process.version,
    }));

    // Start
    service.start();
};

initialize();
