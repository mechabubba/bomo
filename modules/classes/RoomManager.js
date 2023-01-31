import { BaseManager } from "./BaseManager.js";
import { Room } from "./Room.js";

/**
 * RoomManager
 */
class RoomManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Cache of current rooms mapped by their id
         * @type {Collection<string, Room>}
         * @name RoomManager#cache
         */
    }

    /**
     * Creates a room.
     * @param {User} creator - Who created the room.
     * @param {?string} name - The rooms name.
     * @param {?RoomOptions} options - Room options.
     * @returns {Room?}
     */
    create(creator, name = null, options = {}) {
        const id = this.generateIdentifier();
        const room = new Room(id, this.service, creator, name, options);
        this.cache.set(room.id, room);
        return room;
    }

    /**
     * Gets an array of rooms
     * @param {bool} includePrivate - Include private rooms in this list
     * @returns {Room[]} - An array of rooms
     * @todo This function is mainly useful for the public list of rooms, but we need to account for private rooms, ie. password protected, vses rooms which are "public", ie. on the public room list
     */
    getRooms(includePrivate = false) {
        const rooms = Array.from(this.cache.values());
        return includePrivate ? rooms : rooms.filter(room => !room.options.isPrivate);
    }
}

export { RoomManager };
