/**
 * Small module for generating unique/collision proof ids inspired by [twitter](https://developer.twitter.com/en/docs/twitter-ids)
 * and [discord](https://discord.com/developers/docs/reference#snowflakes)'s
 * snowflakes.
 *
 * This doesn't make any attempt to be random or cryptographically secure,
 * rather the opposite. Don't use it for that.
 * @module id
 */

/**
 * Internal number incremented per id generation. Resets to 0 above 65535.
 * @private
 */
let increment = 0;

/**
 * Generates an id
 * @param {number} radix An integer in the range `2` through `36` to use with
 * [toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
 * @returns {string}
 */
const generateIdentifier = function(radix = 36) {
    if (increment > 65535) increment = 0;
    return Date.now().toString(radix) + (increment++).toString(radix);
};

export { generateIdentifier };
