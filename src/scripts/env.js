// Populates environment variables using dotenv
// The design and use of this module is due to how dotenv and ecmascript modules work internally
// Note that it isn't possible to use environment variables loaded from file this way prior to this module running
// See https://www.npmjs.com/package/dotenv for more info

import { env } from "node:process";
import { join } from "node:path";
import dotenv from "dotenv";
import { environmentVariables, directory } from "../constants.js";

/**
 * List of environment variables present in the environment rather than having been loaded from file using dotenv
 * @type {string[]}
 */
export const presentVariables = environmentVariables.filter((variable) => Object.prototype.hasOwnProperty.call(env, variable));

/**
 * @type {string[]}
 */
export const parsedVariables = [];

// Don't need to load from file if all environment variables are present
if (presentVariables.length < environmentVariables.length) {
    const result = dotenv.config({
        quiet: true, // Don't pollute my stdout
        override: false, // Prefer pre-existing and manually passed environment variables
        path: join(directory, ".env"),
    });
    if (result.parsed) parsedVariables.push(...Object.keys(result.parsed).map(variable => variable.toLowerCase()));
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
