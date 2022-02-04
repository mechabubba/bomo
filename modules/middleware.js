import { log } from "./log.js";
import { brandTitle, httpLoggingStyles } from "./constants.js";

/**
 * @see https://tinyhttp.v1rtl.site/docs#nomatchhandlerreq-res
 */
const noMatchHandler = (req, res) => {
    res.status(404);
    // respond with html page
    if (req.accepts("html")) {
        res.render("404.ejs", {
            title: `${brandTitle} - 404`,
            icon: "/error.ico",
            url: req.url,
        });
        return;
    }
    // respond with json
    if (req.accepts("json")) {
        res.json({
            "code": 404,
            "status": "404 Not Found",
            "message": `The requested resource "${req.url}" was not found`,
        });
        return;
    }
    // default to plain text
    res.type("txt").send("404 Not Found");
};

/**
 * @see https://tinyhttp.v1rtl.site/docs#onerrorerr-req-res
 */
const onError = (err, req, res) => {
    log.error(req.ip || req.socket.remoteAddress, req.method, req.originalUrl || req.url, err);
    res.status(500).json({
        "code": 500,
        "status": "500 Internal Server Error",
        "message": err.message,
    });
};

/**
 * Middleware used for logging http requests
 */
const httpLogger = (req, res, next) => {
    res.on("finish", () => {
        const code = res.statusCode.toString();
        const url = req.originalUrl || req.url;
        const args = [req.ip || req.socket.remoteAddress, req.method, httpLoggingStyles[code[0]](code), res.statusMessage, url];
        /** @todo Some homework would be figuring out how to args.push() the JSON body of requests and responses if present on either */
        // Not currently using cookies anywhere
        // if (url === "/") args.push("Cookies:", JSON.stringify(req.cookies));
        const message = args.join(" ").trim();
        if (code[0] === "4" || code[0] === "5") {
            log.debug(message);
        } else {
            log.trace(message);
        }
    });
    next();
};

export {
    noMatchHandler,
    onError,
    httpLogger,
};
