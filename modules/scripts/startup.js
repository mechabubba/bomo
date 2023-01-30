/**
 * Startup script
 * @module startup
 */

import { versions, platform, env } from "node:process";
import { log } from "../log.js";
import { version, minimumNodeVersion } from "../constants.js";
import { stringToBoolean } from "../utility.js";
import { presentVariables, parsedVariables } from "./env.js";

console.log(Number(versions.node.split(".")[0]), "<", minimumNodeVersion);
if (Number(versions.node.split(".")[0]) < minimumNodeVersion) {
    log.fatal(`node.js v${minimumNodeVersion}+ is required, currently v${versions.node}`);
    process.exit(1);
}

log.info(`Starting bomo v${version}, nodejs v${versions.node}, on ${platform}`);

if (stringToBoolean(env.dev)) log.info("Running in a development environment");

if (presentVariables.length) log.debug({ "variables": presentVariables }, "Environment variables");
if (parsedVariables.length) log.debug({ "variables": parsedVariables.filter(variable => !presentVariables.includes(variable)) }, "Environment variables from file");
