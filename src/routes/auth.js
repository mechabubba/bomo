import { service } from "../service.js";
import { contentResponse } from "../responses.js";
import { generateToken } from "../misc.js";

/**
 * Generates an auth token if necessary and returns it.
 */
service.app.get("/auth/generate", (req, res, next) => {
    if (req.headers.authorization) {
        // auth header present, @todo only do nothing if its matched to an in-memory user
        return res.status(401).send("auth code present");
    }
    const token = generateToken();
    const user = service.users.create(token);
    res.send(contentResponse({ token: user.token, id: user.id }));
    next();
});
