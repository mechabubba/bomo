const { v4 } = require("uuid");

class Member {
    constructor(ws) {
        this.id = v4();
        this.client = ws;
    }
}

module.exports = Member;
