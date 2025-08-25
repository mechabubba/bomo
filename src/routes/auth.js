import { service } from "../service.js";
import { contentResponse } from "../responses.js";

/**
 * Generates an auth token if necessary and returns it.
 */
service.app.post("/auth/generate", (req, res, next) => {
    if (req.headers.authorization) {
        // auth header present. check if it corresponds to a user in-memory
        if (service.users.findByToken(req.headers.authorization)) {
            return res.status(401).send("already authenticated");
        }
        // else, pass through and do token generation
    }
    const user = service.users.create();
    res.send(contentResponse({ authorization: user.token, id: user.id }));
    next();
});
