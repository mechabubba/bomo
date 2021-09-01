const { randomBytes } = require("crypto");

/**
 * Lobby
 */
class Lobby {
    constructor() {
        this.id = randomBytes(2).toString("hex");
        this.players = [];
    }

    get id() { return this.id; }
}

module.exports = Lobby;
