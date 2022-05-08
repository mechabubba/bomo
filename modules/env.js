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

import { join } from "node:path";
import { env } from "node:process";
import dotenv from "dotenv";
import { log } from "./log.js";
import { environmentVariables, directory } from "./constants.js";

const externalVariables = environmentVariables.filter((variable) => Object.prototype.hasOwnProperty.call(env, variable));
if (externalVariables.length) log.info("External environment variables", externalVariables);

// Don't need to load from file if all environment variables are present
if (externalVariables.length < environmentVariables.length) {
    const result = dotenv.config({
        override: false, // Will not override external environment variables
        path: join(directory, ".env"),
    });
    if (result.parsed) log.info("Loaded environment variables from file", Object.keys(result.parsed).map(variable => variable.toLowerCase()).filter(variable => !externalVariables.includes(variable)));
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
