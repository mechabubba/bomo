/**
 * General purpose miscellaneous utilities for the project
 * @module misc
 */

/**
 * String to boolean, where "true" is true and anything else is false
 *
 * Mainly useful for environment variables
 *
 * For handling number environment variables, use `Number()`
 * @param {?string|undefined} value
 * @returns {boolean}
 */
export const stringToBoolean = (value) => value && value?.toLowerCase() === "true";

/**
 * Determines logging level based on the first digit of http codes
 * @param {string} firstDigit first digit of the http code
 */
export const httpCodeSeverity = function(firstDigit) {
    if (firstDigit == "5") return "error";
    if (firstDigit == "4") return "debug";
    return "trace";
};
