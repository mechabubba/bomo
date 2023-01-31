import { Service } from "./classes/Service.js";
import { log } from "./log.js";

export const service = new Service({
    port: process.env.port,
});

log.debug("Created service");
