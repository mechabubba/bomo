/**
 * Modified logging module from sandplate. [Original source code](https://github.com/06000208/sandplate/blob/main/modules/log.js)
 * @module logger
 * @example
 * const log = require("./util/logger");
 */

const chalk = require("chalk");
const { DateTime } = require("luxon");
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
const timestamp = "HH:mm:ss.SSS";

/**
 * Logger's timestamp format
 * @readonly
 * @todo If it was possible to store this in `.env` that would be nice
 */
module.exports.timestamp = timestamp;

/**
 * Internal function used for logging
 * @param {*} level
 * @param  {...any} args
 * @private
 */
const print = function(level, ...args) {
    const prefix = `${chalk.gray(DateTime.now().toFormat(timestamp))} ${color[level](level.padEnd(Math.max(...(Object.keys(color).map(el => el.length))), " ").toUpperCase())}`; // https://stackoverflow.com/a/43304999
    return errors.includes(level) ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

/**
 * Default exported logging function, alias to `log.info()`
 * @param  {...any} args
 * @function log
 */
module.exports = (...args) => print("info", ...args);
/**
 * Logs a fatal error to the console
 * @param  {...any} args
 * @alias log.fatal
 */
module.exports.fatal = (...args) => print("fatal", ...args);
/**
 * Logs an error to the console
 * @param  {...any} args
 * @alias log.error
 */
module.exports.error = (...args) => print("error", ...args);
/**
 * Logs a warning to the console
 * @param  {...any} args
 * @alias log.warn
 */
module.exports.warn = (...args) => print("warn", ...args);
/**
 * Logs an info message to the console
 * @param  {...any} args
 * @alias log.info
 */
module.exports.info = (...args) => print("info", ...args);
/**
 * Logs debug information to the console
 * @param  {...any} args
 * @alias log.debug
 */
module.exports.debug = (...args) => print("debug", ...args);
/**
 * Logs fine-grained information to the console
 * @param  {...any} args
 * @alias log.trace
 */
module.exports.trace = (...args) => print("trace", ...args);
