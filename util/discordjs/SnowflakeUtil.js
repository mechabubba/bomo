// Code originally from discord.js
// SnowflakeUtil.js Source Code: https://github.com/discordjs/discord.js/blob/stable/src/util/SnowflakeUtil.js
// Util.js Source Code: https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js
// Licensed under https://raw.githubusercontent.com/discordjs/discord.js/stable/LICENSE
// Full credit to original authors
// Modified to suit bomo's needs

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;
let INCREMENT = 0;

/**
 * Discord's epoch value (2015-01-01T00:00:00.000Z).
 * @type {number}
 * @readonly
 */
module.exports.epoch = EPOCH;

/**
 * A [Twitter snowflake](https://developer.twitter.com/en/docs/twitter-ids),
 * except the epoch is 2015-01-01T00:00:00.000Z.
 *
 * If we have a snowflake '266241948824764416' we can represent it as binary:
 * ```
 * 64                                          22     17     12          0
 *  000000111011000111100001101001000101000000  00001  00000  000000000000
 *       number of ms since Discord epoch       worker  pid    increment
 * ```
 * @typedef {string} Snowflake
 */

/**
 * Transforms a snowflake from a decimal string to a bit string. [Source Code](https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L523-L542)
 * @param  {Snowflake} num Snowflake to be transformed
 * @returns {string}
 * @private
 */
const idToBinary = function(num) {
    let bin = "";
    let high = parseInt(num.slice(0, -10)) || 0;
    let low = parseInt(num.slice(-10));
    while (low > 0 || high > 0) {
        bin = String(low & 1) + bin;
        low = Math.floor(low / 2);
        if (high > 0) {
            low += 5000000000 * (high % 2);
            high = Math.floor(high / 2);
        }
    }
    return bin;
};

/**
 * Transforms a snowflake from a bit string to a decimal string. [Source Code](https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L544-L572)
 * @param  {string} num Bit string to be transformed
 * @returns {Snowflake}
 * @private
 */
const binaryToId = function(num) {
    let dec = "";
    while (num.length > 50) {
        const high = parseInt(num.slice(0, -32), 2);
        const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);
        dec = (low % 10).toString() + dec;
        num =
        Math.floor(high / 10).toString(2) +
        Math.floor(low / 10)
            .toString(2)
            .padStart(32, "0");
    }
    num = parseInt(num, 2);
    while (num > 0) {
        dec = (num % 10).toString() + dec;
        num = Math.floor(num / 10);
    }
    return dec;
};

/**
 * Generates a Discord snowflake. [Source Code](https://github.com/discordjs/discord.js/blob/stable/src/util/SnowflakeUtil.js#L26-L44)
 * <info>This hardcodes the worker's id as 1 and the process's id as 0.</info>
 * @param {number|Date} [timestamp=Date.now()] Timestamp or date of the snowflake to generate
 * @returns {Snowflake} The generated snowflake
 */
module.exports.generateSnowflake = function(timestamp = Date.now()) {
    if (timestamp instanceof Date) timestamp = timestamp.getTime();
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
        throw new TypeError(
            `"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp})`,
        );
    }
    if (INCREMENT >= 4095) INCREMENT = 0;
    const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, "0")}0000100000${(INCREMENT++)
        .toString(2)
        .padStart(12, "0")}`;
    return binaryToId(BINARY);
};

/**
 * A deconstructed snowflake. [Source Code](https://github.com/discordjs/discord.js/blob/stable/src/util/SnowflakeUtil.js#L57-L74)
 * @typedef {Object} DeconstructedSnowflake
 * @property {number} timestamp Timestamp the snowflake was created
 * @property {Date} date Date the snowflake was created
 * @property {number} workerId The worker's id in the snowflake
 * @property {number} processId The process's id in the snowflake
 * @property {number} increment Increment in the snowflake
 * @property {string} binary Binary representation of the snowflake
 */

/**
 * Deconstructs a Discord snowflake.
 * @param {Snowflake} snowflake Snowflake to deconstruct
 * @returns {DeconstructedSnowflake}
 */
module.exports.deconstructSnowflake = function(snowflake) {
    const BINARY = idToBinary(snowflake).toString(2).padStart(64, "0");
    return {
        timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
        get date() {
            return new Date(this.timestamp);
        },
        workerId: parseInt(BINARY.substring(42, 47), 2),
        processId: parseInt(BINARY.substring(47, 52), 2),
        increment: parseInt(BINARY.substring(52, 64), 2),
        binary: BINARY,
    };
};
