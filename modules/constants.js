/**
 * If desired you may modify this file to change constants used throughout the
 * project
 * @module constants
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";


/**
 * Root directory
 * @type {string}
 */
const directory = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json
 * @type {Object}
 */
const packageData = JSON.parse(readFileSync(join(directory, "package.json")));

/**
 * Title used in page titles, branding, etc.
 * @type {string}
 */
const title = "bomo";

/**
 * Description used in page titles, branding, etc.
 * @type {string}
 */
const description = packageData.description;

/**
 * Current version, retrieved from package.json
 * @type {string}
 */
const version = packageData.version;

/**
 * Array of lowercase valid environment variable names
 *
 * Environment variables provided via the .env file should follow google's
 * naming standard and use uppercase names
 * @see https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @see https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
 * @type {string[]}
 */
const environmentVariables = ["dev", "port"];

/**
 * Default port
 * @type {number}
 */
const defaultPort = 3000;

export {
    directory,
    packageData,
    title,
    description,
    version,
    environmentVariables,
};
