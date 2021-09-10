const User = require("./User");
const Base = require("./Base");
const generateRandomHex = require("../util/generateRandomHex");

/**
 * A room, which manages a group of members, game settings, and the games themselves
 */
class Room extends Base {
    /**
     * @param {Bomo} bomo - Reference to the Bomo instantiating this Room
     * @param {User} creator - The initial user who created of a room, assigned ownership over it
     * @param {?string} [name] - The room's name, will fallback to the room's id if not supplied
     */
    constructor(bomo = null, creator = null, name = null) {
        if (!bomo) throw new TypeError("Class instantiated without reference to bomo");
        if (!creator) throw new TypeError("Room instantiated without creator");
        super(generateRandomHex(bomo.rooms));

        /**
         * Reference to the instance of Bomo which instantiated this Room
         * @type {Bomo}
         * @name Room#bomo
         * @readonly
         */
        Object.defineProperty(this, "bomo", { value: bomo });

        /**
         * The room's name, will fallback to the room's id if not supplied
         */
        this.name = name || this.id;

        /**
         * The room's current members (P.S. is there a reason to use objects instead of arrays?)
         */
        this.members = [creator];
        // this.members = {
        //     [creator.id]: creator, // cool syntax here
        // };

        /**
         * The room's current leaders
         */
        this.leaders = [creator];

        // this.name = `Room ${this.id.toUpperCase()}`;
        // this.game = null;
    }

    // set name(value) {
    //     this.customName = value;
    //     this.broadcast(value); // this will need to some standard object that can be stringified
    // }

    // /**
    //  * Sends an object to every member in a lobby.
    //  * @param {Object} data - the data you want to send.
    //  */
    // broadcast(data) {
    //     if (!data) throw new Error("Missing parameter(s).");
    //     for (const member in this.members) this.send(member, data);
    // }

    // /**
    //  * Sends data to a specific lobby member.
    //  * @param {Member} member - the Member you want to send your data to.
    //  * @param {Object} data - the data you want to send.
    //  */
    // send(member, data) {
    //     if (!member || !data) throw new Error("Missing parameter(s)");
    //     if (typeof member == "string") member = this.members[member];
    //     if (member instanceof Member) {
    //         member.client.send(data);
    //     }
    // }
}

module.exports = Room;
