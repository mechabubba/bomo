import { service } from "../service.js";
import { version } from "../constants.js";

service.app.get("/", (req, res, next) => res.render("template.ejs", {
    title: "bomo",
    // icon: "/assets/example.ico",
    style: "/css/index.css",
    partial: "./pages/index.ejs",
    version: version,
}));
