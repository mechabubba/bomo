// Startup script

import { versions, platform } from "node:process";
import { log } from "../log.js";
import { version, minimumNodeVersion } from "../constants.js";
import { presentVariables, parsedVariables } from "./env.js";
import { development, production } from "../environment.js";

// Version check
if (Number(versions.node.split(".")[0]) < minimumNodeVersion) {
    log.fatal(`node.js v${minimumNodeVersion}+ is required, currently v${versions.node}`);
    process.exit(1);
}

// Startup messages
log.info(`Starting bomo v${version}, nodejs v${versions.node}, on ${platform}`);
if (development) log.info("Running in a development environment");
if (production) log.info("Running in a production environment");
if (presentVariables.length) log.debug({ "variables": presentVariables }, "Environment variables");
if (parsedVariables.length) log.debug({ "variables": parsedVariables.filter(variable => !presentVariables.includes(variable)) }, "Environment variables from file");
