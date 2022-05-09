/**
 * The starting message by itself, so it gets logged first
 * @module start
 */
import process from "node:process";
import { log } from "./modules/log.js";
import { version } from "./modules/constants.js";

log.info(`Starting bomo v${version}, nodejs ${process.versions.node}, on ${process.platform}`);
if (process.env.dev?.toLowerCase() === "true") log.info("Running in a development environment");
