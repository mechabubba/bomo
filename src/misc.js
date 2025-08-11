/**
 * General purpose miscellaneous utilities for the project
 * @module misc
 */
import { randomBytes } from "node:crypto";
import { token_alphabet, token_length } from "./constants.js";

/**
 * String to boolean, where "true" is true and anything else is false
 *
 * Mainly useful when dealing with environment variables
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

/**
 * Generates a token.
 */
export const generateToken = function(len = token_length, alpha = token_alphabet) {
    const token = Array.from(randomBytes(len));
    for (let i = 0; i < token.length; i++) {
        token[i] = alpha[token[i] % alpha.length];
    }
    return token.join("");
};
