import { log } from "./log.js";
import { httpCodeSeverity } from "./misc.js";
import { errorResponse } from "./responses.js";

/**
 * @see https://tinyhttp.v1rtl.site/docs#nomatchhandlerreq-res
 */
export const noMatchHandler = function(req, res) {
    res.status(404);
    log.debug({
        "ip": req.ip || req.socket.remoteAddress || null,
        "method": req.method,
        "code": 404,
        "url": req.originalUrl || req.url || null,
    }, "The requested resource was not found");
    if (req.accepts("html")) {
        // respond with html page
        return res.render("template.ejs", {
            title: "404 Not Found",
            // icon: "",
            // style: "/css/404.css",
            partial: "./pages/404.ejs",
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
    res.status(500).json(errorResponse(500, "500 Internal Server Error", "An internal server error occurred, see logs for more information"));
};

/**
 * Middleware used for logging http requests and responses
 */
export const requestLogger = function(req, res, next) {
    const time = Date.now();
    res.on("finish", function() {
        /** @todo Figure out how to log the JSON body of requests and responses if present on either */
        const ms = Date.now() - time;
        const level = httpCodeSeverity(res.statusCode.toString().charAt(0));
        log[level]({
            "ip": req.ip || req.socket.remoteAddress || null,
            "method": req.method,
            "code": res.statusCode,
            "url": req.originalUrl || req.url || null,
            "cookies": req.cookies,
            "responseTime": `${ms}ms`,
        }, res.statusMessage);
    });
    next();
};
