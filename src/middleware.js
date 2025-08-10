import { log } from "./log.js";
import { httpCodeSeverity } from "./misc.js";
import { errorResponse } from "./responses.js";
import { sendRender } from "./templating.js";

/**
 * @see https://tinyhttp.v1rtl.site/docs#nomatchhandlerreq-res
 * @param {import("@tinyhttp/app").Request} req
 * @param {import("@tinyhttp/app").Response} res
 * @param {import("@tinyhttp/app").NextFunction} next
 * @param {?boolean} [logError]
 */
export const noMatchHandler = function(req, res, next, logError = true) {
    if (logError) {
        log.debug({
            "ip": req.ip || req.socket.remoteAddress || null,
            "method": req.method,
            "code": 404,
            "url": req.originalUrl || req.url || null,
        }, "A requested resource was not found");
    }
    res.status(404);
    if (req.accepts("html")) {
        // respond with html page
        return sendRender(res, "template", {
            title: "404 Not Found",
            body: "./pages/404",
            url: req.url,
        });
    } else if (req.accepts("json")) {
        // respond with json
        return res.json(errorResponse(404, "404 Not Found", `The requested resource "${req.url}" was not found`));
    } else {
        // fallback to plain text
        return res.type("txt").send("404 Not Found");
    }
};

/**
 * @see https://tinyhttp.v1rtl.site/docs#onerrorerr-req-res
 * @param {*} error
 * @param {import("@tinyhttp/app").Request} req
 * @param {import("@tinyhttp/app").Response} res
 */
export const onError = function(error, req, res) {
    log.error({
        "ip": req.ip || req.socket.remoteAddress || null,
        "method": req.method,
        "code": res.statusCode,
        "url": req.originalUrl || req.url || null,
        "error": error.name || null,
        "stack": error.stack || null,
    }, error.message);
    console.error("onError", error);
    res.status(500).json(errorResponse(500, "500 Internal Server Error", "An internal server error occurred, see logs for more information"));
};

/**
 * Middleware used for partial http logging
 * @param {import("@tinyhttp/app").Request} req
 * @param {import("@tinyhttp/app").Response} res
 * @param {import("@tinyhttp/app").NextFunction} next
 */
export const requestLogger = function(req, res, next) {
    const time = Date.now();
    res.on("finish", function() {
        const ms = Date.now() - time;
        const level = httpCodeSeverity(res.statusCode.toString().charAt(0));
        const data = {
            ip: req.ip || req.socket.remoteAddress || null,
            method: req.method,
            url: req.originalUrl || req.url || null,
            code: res.statusCode,
            status: res.statusMessage,
            // ping: `${ms}ms`,
        };
        log[level](data, `${req.method} ${data.url} in ${ms}ms`);
    });
    next();
};
