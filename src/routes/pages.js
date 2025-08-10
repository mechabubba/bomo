import { service } from "../service.js";
import { version } from "../constants.js";
import { sendRender } from "../templating.js";

service.app.get("/", (req, res, next) => sendRender(res, "template", {
    title: "bomo homepage",
    style: "/css/index.css",
    body: "./pages/index",
    version: version,
}));

service.app.get(["/test", "/test.html"], (req, res, next) => sendRender(res, "template", {
    title: "test",
    body: "./pages/test",
}));
