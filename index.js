// loaded asynchronously, order of statements matters
import "./modules/processEvents.js"; // Node.js process events script
import "./modules/env.js"; // Populates environment variables script

import { log } from "./modules/log.js";
import { brandTitle } from "./modules/constants.js";
import { Service } from "./structures/Service.js";

const initialize = async function() {
    log.info(`Starting ${brandTitle}...`);
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
