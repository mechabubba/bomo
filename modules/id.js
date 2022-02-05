/**
 * Small module for generating unique/collision proof ids inspired by [twitter](https://developer.twitter.com/en/docs/twitter-ids) and [discord](https://discord.com/developers/docs/reference#snowflakes)'s snowflakes.
 *
 * This doesn't make any attempt to be random or cryptographically secure.
 * @module id
 */

import { DateTime } from "luxon";

let increment = 0;

/**
 * Generates an id
 * @param {DateTime} date
 * @param {number} radix
 * @returns {string}
 */
const generate = function(date = DateTime.now(), radix = 36) {
    if (increment > 65535) increment = 0;
    return date.toMillis().toString(radix) + (increment++).toString(radix);
};

export { generate };
