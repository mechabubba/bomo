import { service } from "../service.js";
import { contentResponse } from "../responses.js";

service.app.get("/api/true", (req, res, next) => res.status(200).json(contentResponse(true)));
