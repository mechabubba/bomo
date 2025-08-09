// Intermediary module exporting environment variables for extra functionality, intellisense, and consistent cross-platform use.

// The primary conflict is that on windows, accessing environment variables is case insensitive, while other platforms are case sensitive.
// https://nodejs.org/api/process.html#processenv

// When providing node.js with environment variables, including via the .env file, they should follow google's naming standard and use SCREAMING_SNAKE_CASE for names.
// https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names
// https://web.archive.org/web/20220415192041id_/https://google.github.io/styleguide/shellguide.html#s7.3-constants-and-environment-variable-names

import { env } from "node:process";
import { defaultPort } from "./constants.js";
import { stringToBoolean } from "./misc.js";

export const development = stringToBoolean(env["BOMO_DEV"]);
export const production = !development;

/** Pino logging level */
export const logLevel = env["BOMO_LOG_LEVEL"] || "debug";

/** Port for the web service, defaults to 3000 */
export const port = Number(env["BOMO_PORT"]) || defaultPort;
