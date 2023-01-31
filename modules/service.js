import { Service } from "./classes/Service.js";
import { log } from "./log.js";

export const service = new Service({
    port: process.env.port ? Number(process.env.port) : null,
});

log.info("Created service");
