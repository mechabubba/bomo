const Base = require("./Base");

/**
 * @todo Needs jsdoc documentation
 */
class User extends Base {
    constructor(key = null) {
        super();
        this.key = key;
        this.ws = null;
        this.leading = [];
        this.rooms = [];
    }

    get leader() {
        return Boolean(this.leading.length);
    }

    get online() {
        return Boolean(this.ws);
    }
}

module.exports = User;
