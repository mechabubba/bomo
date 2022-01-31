import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { createHash } from "node:crypto";
import { Base } from "./Base.js";

// const generateRandomHex = require("../util/generateRandomHex");

/**
 * @todo Needs jsdoc documentation
 */
class User extends Base {
    /**
     * @param {Bomo} bomo - Reference to the Bomo instantiating this User
     * @param {?ip} ip - Ip address
     */
    constructor(bomo = null, ip = null) {
        super(bomo);

        this.username = null;
        this.ip = ip;
        this.ws = null;
        this.leading = [];
        this.rooms = [];

        /**
         * The last moment the User was considered online
         * @type {?DateTime}
         */
        this.lastOnline = null; // DateTime.now();

        /**
         * @type {object}
         * @property {string} username - sha256 hash of the user's ip address + user's id separated by a colon
         * @property {string} password - A uuid v4 id. Note that passwords in authorization strings aren't salted
         * @property {string} encoded - Base64 encoded authorization string, username + password separated by a colon
         */
        this.auth = {
            username: createHash("sha256").update(`${this.ip}:${this.id}`).digest("hex"),
            password: uuidv4(),
            encoded: null,
            // For some reason I thought you could do this, but it throws an error
            // encoded: Buffer.from(`${this.auth.username}:${this.auth.password}`).toString("base64"),
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

    /**
     * Creates a (usually plain) object using id, createdTimestamp, and manually supplied custom properties (in the form of objects)
     * @param  {...object} objects
     */
    toObject(...objects) {
        return super.toObject({
            "username": this.username,
            "online": this.online,
            "leader": this.leader,
            "leading": this.leading,
            "rooms": this.rooms,
            "authorization": this.auth.encoded,
        }, ...objects);
    }
}

export { User };
