/**
 * Modified logging module from sandplate
 * https://github.com/06000208/sandplate/blob/main/modules/log.js
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

const print = function(level, ...args) {
    const prefix = `${chalk.gray(DateTime.now().toFormat(timestamp))} ${color[level](level.padEnd(Math.max(...(Object.keys(color).map(el => el.length))), " ").toUpperCase())}`; // https://stackoverflow.com/a/43304999
    return errors.includes(level) ? console.error(prefix, ...args) : console.log(prefix, ...args);
};

module.exports = (...args) => print("info", ...args);
module.exports.fatal = (...args) => print("fatal", ...args);
module.exports.error = (...args) => print("error", ...args);
module.exports.warn = (...args) => print("warn", ...args);
module.exports.info = (...args) => print("info", ...args);
module.exports.debug = (...args) => print("debug", ...args);
module.exports.trace = (...args) => print("trace", ...args);
