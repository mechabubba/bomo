/**
 * Event listeners used for the node.js process
 * @see https://nodejs.org/api/process.html
 * @module scripts/processEvents
 */

import process from "node:process";
import { log } from "./log.js";

process.on("uncaughtException", (error, origin) => {
    log.fatal(`${origin},`, error);
    return process.exit(1); // Always let code exit on uncaught exceptions
});
process.on("unhandledRejection", (reason, promise) => log.error(`unhandledRejection\n`, promise));
process.on("rejectionHandled", (promise) => log.debug("rejectionHandled\n", promise));
process.on("warning", (warning) => log.warn(warning));
process.on("exit", (code) => code === 0 ? log.info("Exiting peacefully") : log.warn("Exiting abnormally with code:", code));
