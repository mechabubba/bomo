/**
 * A quaint logging module with timestamps and aesthetic logging level
 *
 * This doesn't support:
 * - Control over the logging level
 * - Logging to file, though you may pipe your console output to a file
 * - The value substitution feature of console.log
 * @module log
 */

import { DateTime } from "luxon";
import chalk from "chalk";

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

/**
 * Internal function used for logging
 * @param {*} level
 * @param  {...any} args
 * @private
 * @todo Update this to use luxon's intended method for constructing abstract date formats instead of toFormat
 */
const print = function(level, ...args) {
    const prefix = timestampStyle(DateTime.now().toFormat(timestampFormat)) + " " + loggingStyles[level](level);
    return level == "error" || level == "fatal" ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

/**
 * Exported logging functions, only supports the following functions:
 *
 * log.trace(), log.debug(), log.info(), log.warn(), log.error(), log.fatal()
 * @example
 * log.fatal("example");
 * log.error("example");
 * log.warn("example");
 * log.info("example");
 * log.debug("example");
 * log.trace("example");
 */
const log = {
    fatal: print.bind(null, "fatal"),
    error: print.bind(null, "error"),
    warn: print.bind(null, "warn"),
    info: print.bind(null, "info"),
    http: print.bind(null, "http"),
    debug: print.bind(null, "debug"),
    trace: print.bind(null, "trace"),
};

export { log, httpLoggingStyles };
