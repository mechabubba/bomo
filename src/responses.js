/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} apiError
 * @property {number} code HTTP error code
 * @property {string} status HTTP error message
 * @property {string} message Custom error message
 * @property {number} time Unix timestamp in milliseconds
 */

/**
 * Arbitrary content returned by the api
 * @typedef {Object} arbitraryContent
 * @property {*} content Arbitrary content returned by the api
 */

/**
 * JSON response for HTTP errors (4XX and 5XX)
 * @param {number} code HTTP error code
 * @param {string} status HTTP error message
 * @param {string} message Custom error message
 * @returns {apiError}
 */
export const errorResponse = function(code, status, message) {
    if (!code || !status || !message) throw new TypeError("invalid parameters to jsonError");
    return {
        code: code,
        status: status,
        message: message,
        time: Date.now(),
    };
};

/**
 * JSON response for arbitrary content returned by the api
 * @param {*} content Arbitrary content returned by the api
 * @returns {arbitraryContent}
 */
export const contentResponse = function(content) {
    return {
        "content": content,
    };
};
