import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DateTime } from "luxon";

/**
 * Used in various places, must be filename friendly on both windows and linux
 * @type {string}
 */
export const name = "bomo";

/**
 * Root directory
 * @type {string}
 */
export const directory = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Start time for the app
 * @type {DateTime}
 */
export const startTime = DateTime.now();

/**
 * Object containing lowerCamelCase keyed properties set to their corrosponding
 * but distinctly different snake_case environment variable names, in a manner
 * inspired by enum flags
 *
 * Note that when providing node.js with environment variables, including via
 * the .env file, they should follow google's naming standard and use
 * SCREAMING_SNAKE_CASE.
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 */
export const envFlags = {
    "dev": "dev",
    "name": "name",
    "port": "port",
};

/* Plain text list of environment variables:
DEV=
NAME=
PORT=
*/

/**
 * Array of valid environment variables in snake_case
 *
 * Note that when providing node.js with environment variables, including via
 * the .env file, they should follow google's naming standard and use
 * SCREAMING_SNAKE_CASE.
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @type {string[]}
 */
export const environmentVariables = Array.from(Object.values(envFlags));

/**
 * Connection string used for the keyv database
 * @type {string}
 */
export const keyvConnection = `sqlite://data/${name}.sqlite`;
