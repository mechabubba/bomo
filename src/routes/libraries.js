import { join } from "node:path";
import { service } from "../service.js";
import { directory } from "../constants.js";

/**
 * Array containing file name/absolute path pairs for libraries used on the frontend
 */
const libraries = [
    {
        name: "luxon.min.js",
        path: join(directory, "node_modules", "luxon", "build", "global", "luxon.min.js"),
    },
];

// Serve third party libraries on the frontend
libraries.forEach(({ name, path }) => service.app.get("/lib/" + name, (req, res, next) => res.sendFile(path)));

// Send visitors to /lib to the credits and attributions section of the readme
service.app.get("/lib", (req, res, next) => res.redirect("https://github.com/mechabubba/bomo?tab=readme-ov-file#credits--attributions"));
