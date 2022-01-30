/**
 * Modified logging module from [sandplate](https://github.com/06000208/sandplate)
 * @module log
 */

import chalk from "chalk";
import { DateTime } from "luxon";

const color = {
    "fatal": chalk.bgRed.black,
    "error": chalk.red,
    "warn": chalk.yellow,
    "info": chalk.white.bold,
    "http": chalk.blue,
    "debug": chalk.green,
    "trace": chalk.gray,
};
const errors = ["fatal", "error"];

/**
 * Logging timestamp format
 * @readonly
 * @todo If it was possible to store this via environment variable that would be nice
 */
const timestamp = "HH:mm:ss.SSS";

/**
 * Internal function used for logging
 * @param {*} level
 * @param  {...any} args
 * @private
 */
const print = function(level, ...args) {
    const prefix = `${chalk.gray(DateTime.now().toFormat(timestamp))} ${color[level](level)}`;
    return errors.includes(level) ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

/**
 * Default exported logging function
 *
 * Using `log()` by itself is an alias to `log.info()`
 * @param  {...any} args
 * @function log
 * @example
 * log("example")
 * log.fatal("example");
 * log.error("example");
 * log.warn("example");
 * log.info("example");
 * log.debug("example");
 * log.trace("example");
 */
const log = (...args) => print(" info", ...args);
log.fatal = (...args) => print("fatal", ...args);
log.error = (...args) => print("error", ...args);
log.warn = (...args) => print("warn", ...args);
log.info = (...args) => print("info", ...args);
log.debug = (...args) => print("debug", ...args);
log.trace = (...args) => print("trace", ...args);

export { log };

