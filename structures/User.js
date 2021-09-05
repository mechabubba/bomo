const Base = require("./Base");

class User extends Base {
    constructor(ws = null, id = null) {
        super(id);
        this.ws = ws;
        this.online = Boolean(ws);
        this.leader = false;
        this.leading = [];
        this.rooms = [];
    }
}

module.exports = User;
