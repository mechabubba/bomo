// lets get the ball rolling baby
/*
# tentative structure
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
const express = require("express");
const path = require("path");
const log = require("./util/logger");

const PORT = 3000;

log("Starting bomo...");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.render("index", {
        node_version: process.version,
    });
});

app.listen(PORT);
log(`Express started on port ${PORT}`);
