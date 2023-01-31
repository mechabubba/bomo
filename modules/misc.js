/**
 * Basic miscellaneous utilities that are oft reused throughout the project
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
