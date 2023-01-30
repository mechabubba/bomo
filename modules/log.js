import pino from "pino";
import { startTime } from "./constants.js";

const level = "trace";

const log = pino({
    level: level,
    transport: {
        targets: [
            {
                target: "pino/file",
                level: level,
                options: { destination: `logs/${startTime.toISODate()}_${startTime.toMillis()}.log` },
            },
            {
                target: "pino-pretty",
                level: level,
                options: {
                    ignore: "pid,hostname",
                },
            },
        ],
    },
});

export { log };
