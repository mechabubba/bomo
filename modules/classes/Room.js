import { Base } from "./Base.js";
import { BaseIdentifiable } from "./BaseIdentifiable.js";
import { Service } from "./Service.js";
import { User } from "./User.js";

/**
 * Room data
 * @typedef {Object} RoomData
 * @property {string} name Room name
 * @property {User} creator Creator of the room
 * @property {?User[]} [leaders] Leaders of the room
 * @property {?string} [password] Room password
 * @property {?boolean} [public] Whether or not this room is shown in the public room list
 */

/**
 * Room settings controlling the room and games descended from it
 * @typedef {Object} RoomSettings
 * @property {number} maxPlayers Maximum players allowed in a game
 * @property {boolean} spectators Whether or not people may join the room as spectators
 */

/**
 * Room
 * @todo Unfinished; need to write more properties derived from room data
 */
export class Room extends BaseIdentifiable {
    /**
     * @param {Service} service Reference to the service instantiating this Room
     * @param {string} id
     * @param {RoomData} data
     * @param {?RoomSettings} [settings]
     */
    constructor(service, id, data, settings) {
        if (!data) throw new TypeError("Rooms must be instantiated with room data");
        if (!data?.creator || !(data?.creator instanceof User)) throw new TypeError("Room instantiated without creator");
        super(service, id);


        /**
         * The room's name, will fallback to the room's id if not supplied
         */
        this.name = data.name || "Unknown Room";

        /**
         * The user who created the room
         * @type {User}
         */
        this.creator = data.creator;

        /**
         * The room's current members, does not include spectators
         * @type {User[]}
         */
        this.members = [];

        /**
         * The room's current leaders
         * @type {User[]}
         */
        this.leaders = [this.creator];

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


}
