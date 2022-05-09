// order of import statements matters, loaded asynchronously
import "./modules/processEvents.js"; // Node.js process events script
import "./modules/start.js"; // Starting message
import "./modules/env.js"; // Populates environment variables script
import { log } from "./modules/log.js";
import { service } from "./modules/service.js";
import { version } from "./modules/constants.js";

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

// Register page routes with tinyhttp
service.app.get("/", (req, res, next) => res.render("index.ejs", {
    title: "bomo",
    version: version,
    ...res.locals,
}));

// Start
service.start();
