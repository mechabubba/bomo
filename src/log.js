import { existsSync, mkdirSync } from "node:fs";
import pino from "pino";
import { startTime } from "./constants.js";
import { logLevel } from "./environment.js";

if (!existsSync("logs")) {
    mkdirSync("logs");
}

const log = pino({
    level: logLevel,
    transport: {
        targets: [
            {
                target: "pino/file",
                level: logLevel,
                options: { destination: `logs/${startTime.toISODate()}_${startTime.toMillis()}.log` },
            },
            {
                target: "pino-pretty",
                level: logLevel,
                options: {
                    ignore: "pid,hostname",
                },
            },
        ],
    },
});

export { log };
