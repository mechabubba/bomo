/**
 * A quaint logging module with timestamps and aesthetic logging level
 *
 * You may modify the constants in /modules/constants.js to change the styling or timestamp format
 *
 * This module doesn't support:
 * - Control over the logging level
 * - Logging to file, though you may pipe your console output to a file
 * - The value substitution feature of console.log
 */

import { DateTime } from "luxon";
import { timestampStyle, timestampFormat, loggingStyles } from "./constants.js";

/**
 * Internal function used for logging
 * @param {*} level
 * @param  {...any} args
 * @private
 */
const print = function(level, ...args) {
    const prefix = timestampStyle(DateTime.now().toFormat(timestampFormat)) + "" + loggingStyles[level](level);
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

export { log };
