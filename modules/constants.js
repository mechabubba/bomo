/**
 * If desired you may modify this file to change constants used throughout the project
 * @module constants
 */

import chalk from "chalk";

/**
 * Title used in page titles, branding, etc.
 * @type {string}
 */
const brandTitle = "bomo";

/**
 * Array of valid environment variables
 * @type {string[]}
 */
const environmentVariables = ["title", "dev", "port"];

/**
 * Chalk function used for the timestamp, otherwise null for no styling
 * @type {import("chalk").ChalkInstance}
 */
const timestampStyle = chalk.gray;

/**
 * Timestamp format string
 *
 * Used with [DateTime#toFormat](https://moment.github.io/luxon/api-docs/index.html#datetimetoformat), so you may use [luxon's formatting tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
 *
 * Escape characters by encasing them inside brackets
 * @type {string}
 * @todo Update this to use luxon's intended method for constructing abstract date formats instead
 */
const timestampFormat = "HH:mm:ss.SSS";

/**
 * Chalk functions used for styling logging level labels
 * @type {Object.<string, import("chalk").ChalkInstance>}
 */
const loggingStyles = {
    fatal: chalk.bgRed.black,
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.white.bold,
    http: chalk.blue,
    debug: chalk.green,
    trace: chalk.gray,
};

/**
 * Chalk functions used for styling http logging level labels
 * @type {Object.<string, import("chalk").ChalkInstance>}
 */
const httpLoggingStyles = {
    "1": chalk.gray, // Informational responses
    "2": chalk.cyan, // Successful responses
    "3": chalk.gray, // Redirects
    "4": chalk.yellow, // Client errors
    "5": chalk.magenta, // Server errors
};

export {
    brandTitle,
    environmentVariables,
    timestampStyle,
    timestampFormat,
    loggingStyles,
    httpLoggingStyles,
};
