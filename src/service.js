import { Service } from "./classes/Service.js";
import { port } from "./environment.js";
import { log } from "./log.js";

export const service = new Service({
    port: port,
});

log.debug("Created service");
