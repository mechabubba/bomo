import { Base } from "./Base.js";
import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { Service } from "./Service.js";
import { User } from "./User.js";

/**
 * Room settings controlling the room and games started within it
 * @typedef {Object} RoomSettings
 * @property {bool} isPrivate - Whether the specific room is private or not.
 */

/**
 * Room
 */
export class Room extends BaseIdentifiable {
    /**
     * @param {string} id
     * @param {Service} service - Reference to the service instantiating this Room
     * @param {Player} creator - Player who created the room and will be assigned initial leadership over it
     * @param {?string} [name] - The room's name, will fallback to the room's id if not supplied
     * @param {?RoomSettings} settings - Room settings
     */
    constructor(id, service, creator, name = null, settings = {}) {
        super(id, service);
        if (!creator || !(creator instanceof User)) throw new TypeError("Room instantiated without creator");

        /**
         * The room's name, will fallback to the room's id if not supplied
         */
        this.name = name || `Room ${this.id}`;

        /**
         * The room's current players, does not include spectators
         * @type {User[]}
         */
        this.players = [creator];

        /**
         * The room's current leaders
         * @type {User[]}
         */
        this.leaders = [creator];

        /**
         * The room's current spectators
         * @type {User[]}
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
