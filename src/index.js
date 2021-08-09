// lets get the ball rolling baby
/*
# Tentative Structure
src/
    public/
        assets/
        css/
        js/
            main.js - the client code
    structures/
        Game.js   - game logic
        Lobby.js  - lobby class
        Player.js - a "player"
    views/
        _header_, _footer_.ejs - header and footer, visible on every page
        index.ejs - home thing
        ???.js - moar????
    index.js - the start of the universe
*/
const { App } = require("@tinyhttp/app");
const ejs = require("ejs");
const sirv = require("sirv");
const path = require("path");
const log = require("./util/logger");

const PORT = 3000;

log("Starting bomo...");

const app = new App({
    onError: (e, req, res) => {
        res.status(500);
        res.send(e.message);
    },
});
app.engine("ejs", ejs.renderFile);

// use() is a stack based operation; we need to define our "middleware" one route at a time.
app.use("/", sirv(path.join(__dirname, "public"))); // Static webserver.

app.get("/", (req, res, next) => res.render("index.ejs", { node_version: process.version })); // Index page; just set this to something generic for now.
app.get("/cards/", (req, res, next) => res.render("cards.ejs", {})); // Cards page.

app.use((req, res, next) => next(new Error(`404 Not Found :)`))); // 404 route.
app.use((e, req, res, next) => {
    res.status(404).send(e.message);
});

app.listen(PORT);
log(`Express started on port ${PORT}`);
