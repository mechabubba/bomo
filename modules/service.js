import { env } from "node:process";
import { Service } from "./classes/Service.js";
import { envFlags } from "./constants.js";
import { log } from "./log.js";

export const service = new Service({
    port: Number(env[envFlags.port]),
});

log.debug("Created service");
