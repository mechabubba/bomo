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
        const room = new Room(this.service, creator, name, options);
        this.cache.set(room.id, room);
        return room;
    }

    /**
     * Checks if a Room exists.
     * @returns {bool} - Whether the room exists or not.
     */
    exists(id) {
        for (const _id in this.cache) {
            if (_id === id) return true;
        }
        return false;
    }

    /**
     * Gets a room by its ID.
     * @returns {?Room} - Returns a room if it exists; otherwise, returns `null`.
     * @todo https://github.com/mechabubba/bomo/projects/1#card-77107543
     */
    getRoom(room_id) {
        if (!this.exists(room_id)) return null;
        return this.cache.get(room_id);
    }

    /**
     * Gets an array of rooms
     * @param {bool} includePrivate - Include private rooms in this list?
     * @returns {Room[]} - An array of rooms.
     * @todo Just use map's methods for this rather than a for loop
     */
    getRooms(includePrivate = false) {
        const rooms = Array.from(this.cache.values());
        return includePrivate ? rooms : rooms.filter(room => !room.options.isPrivate);
    }
}

export { RoomManager };
