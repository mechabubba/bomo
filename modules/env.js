/**
 * Populates environment variables
 *
 * The design and use of this module works around how dotenv
 * and ecmascript modules work internally
 *
 * Note that it isn't possible to use environment variables loaded this way
 * in modules prior to this code running, such as the log module and processEvents
 * @module scripts/env
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, copyFileSync } from "node:fs";
import { env } from "node:process";
import dotenv from "dotenv";
import { log } from "./log.js";
import { environmentVariables } from "./constants.js";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const envPath = join(moduleDirectory, "..", ".env");
const envTemplate = join(moduleDirectory, "..", "template.env");

const variablesPresentExternally = environmentVariables.filter(variable => Object.prototype.hasOwnProperty.call(env, variable));

log.info("Environment variables present externally:", variablesPresentExternally);

if (variablesPresentExternally.length < environmentVariables.length) {
    if (!existsSync(envPath)) {
        log.info("No .env file present, copying template...");
        copyFileSync(envTemplate, envPath);
    }

    const result = dotenv.config({
        override: false, // Will not override environment variables from the machine
        path: envPath,
    });

    if (result.parsed) log.info("Loaded remaining environment variables from file:", Object.keys(result.parsed).map(variable => variable.toLowerCase()).filter(variable => !variablesPresentExternally.includes(variable)));
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
