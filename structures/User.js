const Base = require("./Base");
const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");
const { createHash } = require("crypto");
// const generateRandomHex = require("../util/generateRandomHex");

/**
 * @todo Needs jsdoc documentation
 */
class User extends Base {
    /**
     * @param {Bomo} bomo - Reference to the Bomo instantiating this User
     * @param {?ip} ip - Hashed ip address, middleware in the Bomo class adds the addressHash property to requests
     */
    constructor(bomo = null, ip = null) {
        super();
        if (!bomo) throw new TypeError("Class instantiated without reference to bomo");

        /**
         * Reference to the instance of Bomo which instantiated this User
         * @type {Bomo}
         * @name Room#bomo
         * @readonly
         */
        Object.defineProperty(this, "bomo", { value: bomo });

        this.username = null;
        this.ip = ip;
        this.ws = null;
        this.leading = [];
        this.rooms = [];

        /**
         * @type {object}
         * @property {string} username - sha256 hash of the user's ip address + user's id separated by a colon
         * @property {string} password - A uuid v4 id. Note that passwords in authorization strings aren't salted
         * @property {string} encoded - Base64 encoded authorization string, username + password separated by a colon
         */
        this.auth = {
            username: createHash("sha256").update(`${this.ip}:${this.id}`).digest("hex"),
            password: uuidv4(),
        };
        this.auth.encoded = Buffer.from(`${this.auth.username}:${this.auth.password}`).toString("base64");
        this.bomo.auth.set(this.auth.encoded, this.id);
    }

    get leader() {
        return Boolean(this.leading.length);
    }

    get online() {
        return Boolean(this.ws);
    }
}

module.exports = User;
