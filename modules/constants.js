/**
 * If desired you may modify this file to change constants used throughout the
 * project
 *
 * Environment variables loaded from file cannot be accessed in this module as
 * some constants here are used by the env script
 * @module constants
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DateTime } from "luxon";

/**
 * Root directory
 * @type {string}
 */
export const directory = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Start time for the app
 * @type {DateTime}
 */
export const startTime = DateTime.now();

/**
 * Version number
 * @type {string}
 */
export const version = "0.0.1";

/**
 * The minimum nodejs version
 * @type {number}
 */
export const minimumNodeVersion = 18;

/**
 * Default port used for web services
 * @type {number}
 */
export const defaultPort = 3000;

/**
 * Object containing lowerCamelCase keyed properties set to their corrosponding
 * snake_case environment variable names, in a manner inspired by enum flags,
 * allowing for environment variables to be documented and cleanly accessed
 *
 * Note that when providing node.js with environment variables, including via
 * .env file, they should follow google's naming standard and use SCREAMING_SNAKE_CASE
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 */
export const envFlags = {
    /** Whether bomo is running in a development environment */
    "dev": "dev",
    /** The port used for the http server, defaults to 3000 */
    "port": "port",
    /**
     * Pino Logging level (trace, debug, info, warn, error, fatal, or silent)
     * @see https://getpino.io/#/docs/api?id=loggerlevel-string-gettersetter
     */
    "logLevel": "log_level",
};

/**
 * Array of lowercase valid environment variable names
 *
 * Environment variables provided via the .env file should follow google's
 * naming standard and use uppercase names
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @type {string[]}
 */
export const environmentVariables = Array.from(Object.values(envFlags));

/**
 * Connection string used for the keyv database
 * @type {string}
 */
export const keyvConnection = "sqlite://data/db.sqlite";
