import { Base } from "./Base.js";
import { Player } from "./Player.js";

/**
 * Room settings controlling the room and games started within it
 * @typedef {Object} RoomSettings
 * @property {bool} isPrivate - Whether the specific room is private or not.
 */

/**
 * A room, which manages a group of members, game settings, and the games themselves
 */
class Room extends Base {
    /**
     * @param {Service} service - Reference to the service instantiating this Room
     * @param {Player} creator - Player who created the room and will be assigned initial leadership over it
     * @param {?string} [name] - The room's name, will fallback to the room's id if not supplied
     * @param {?RoomSettings} settings - Room settings
     */
    constructor(service, creator, name = null, settings = {}) {
        super(service);
        if (!creator) throw new TypeError("Room instantiated without creator");
        if (creator instanceof Player === false) throw new TypeError("Room instantiated without creator");

        /**
         * The room's name, will fallback to the room's id if not supplied
         */
        this.name = name || this.id;

        /**
         * The room's current players, does not include spectators
         * @type {Player[]}
         */
        this.players = [creator];

        /**
         * The room's current leaders
         * @type {Player[]}
         */
        this.leaders = [creator];

        /**
         * The room's current spectators
         * @type {Player[]}
         */
        this.spectators = [];

        /**
         * Room settings
         * @type {RoomSettings}
         * @todo in the future, all non-null room data (id, members, etc) should be properties of `this`; all optional/variable data (privacy, any custom room name, etc) should be in this object
         */
        this.settings = settings || {};
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

export { Room };
