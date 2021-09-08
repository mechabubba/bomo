const Keyv = require("keyv");
const { v4: uuidv4 } = require("uuid");
const log = require("../util/log");
const { DateTime } = require("luxon");
const { createHash } = require("crypto");

/**
 * Functions related to authentication
 * @todo This only supports anonymous sessions, and sessions are intrinsically linked to IP. This won't be the case for people who're using an account
 */
class Auth {
    /**
     * @param {Bomo} bomo - Reference to the Bomo instantiating this Room
     */
    constructor(bomo = null) {
        if (!bomo) throw new TypeError("Room instantiated without reference to parent");

        /**
         * Reference to the instance of Bomo which instantiated this class
         * @type {Bomo}
         * @name Room#bomo
         * @readonly
         */
        Object.defineProperty(this, "bomo", { value: bomo });

        /**
         * Database for storing api keys, caching ip address hashes, etc. via Keyv, uses the "auth" namespace
         * @type {Keyv}
         */
        this.db = new Keyv(process.env.db ? process.env.db : null, { namespace: "auth" });
        this.db.on("error", err => {
            // Don't allow connection errors with database while starting
            log.fatal("Keyv Connection Error", err);
            return process.exit(1);
        });

        /**
         * TTL applied to database values, in milliseconds
         * @type {number}
         */
        this.ttl = 43200000;
    }

    /**
     * Authentication middleware
     * @param {*} req - Request
     * @param {*} res - Response
     * @param {function} next - Next function
     */
    validate(req, res, next) {
        log.trace("Validating authorization header", req.get("Authorization"));
        // console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString("utf8"))
        next();
    }

    /**
     * Middleware for an api route, refreshes session expiration so clients have to recreate sessions less often
     * @todo Could be handler, too, but im not sure how to distinguish the usage, middlewares call next() and handlers dont
     * @todo This middleware would update the TTL of a session by redoing the two db operations in generation
     * @param {*} req - Request
     * @param {*} res - Response
     * @param {function} next - Next function
     */
    async updateExpiration(req, res, next) {
        //
    }

    /**
     * Generates a session
     * @param {*} req - Request
     * @param {*} res - Response
     * @returns {object}
     */
    async generate(req, res) {
        /** @todo Should support X-Forwarded-For header but only while actually behind a proxy, as otherwise its vulnerable to spoofing */
        const session = {};
        const ip = createHash("sha256").update(req.ip || req.socket.remoteAddress).digest("hex");
        session.username = uuidv4();
        session.password = uuidv4();
        session.expires = DateTime.now().plus(this.ttl).toMillis();
        const authorization = `${session.username}:${session.password}`;
        await this.db.delete(await this.db.get(ip));
        await this.db.set(ip, authorization, this.ttl);
        await this.db.set(authorization, ip, this.ttl);
        session.encoded = Buffer.from(authorization).toString("base64");
        // res.status(201).json({ content: session });
        return session;
    }
}

module.exports = Auth;
