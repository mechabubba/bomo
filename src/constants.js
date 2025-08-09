// Constants used throughout the project
// This file cannot use logging or environment variables in order to implement configurable log levels

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DateTime } from "luxon";

/**
 * Current version
 * @type {string}
 */
export const version = "0.0.4";

/**
 * The minimum nodejs version
 * @type {number}
 */
export const minimumNodeVersion = 20;

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
 * Default port used for web services
 * @type {number}
 */
export const defaultPort = 3000;

/**
 * Array of lowercase valid environment variable names
 *
 * Environment variables provided via the .env file should follow google's
 * naming standard and use uppercase names
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @type {string[]}
 */
export const environmentVariables = [
    "BOMO_DEV",
    "BOMO_LOG_LEVEL",
    "BOMO_PORT",
];

/**
 * Connection string used for the keyv database
 * @type {string}
 */
export const keyvConnection = "sqlite://data/db.sqlite";
