import { Service } from "../structures/Service.js";
import { log } from "./log.js";

const service = new Service({
    port: process.env.port ? Number(process.env.port) : null,
});

log.info("Created service");

export { service };
