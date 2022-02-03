import { Room } from "./Room.js";

/**
 * RoomManager
 */
class RoomManager {
    constructor(bomo) {
        if (!bomo) throw new TypeError("RoomManager instantiated without reference to bomo");
        Object.defineProperty(this, "bomo", { value: bomo }); // feel free to just extend this to the base class, didn't feel like it needed such properties other than the "bomo" property but its probably just easier

        /**
         * All currently created rooms.
         * @type {Map<string, Room>}
         */
        this.rooms = new Map();
    }

    /**
     * Creates a room.
     * @param {User} creator - Who created the room.
     * @param {?string} name - The rooms name.
     * @param {?RoomOptions} options - Room options.
     * @returns {Room?}
     */
    create(creator, name = null, options = {}) {
        const room = new Room(this.bomo, creator, name, options);
        this.rooms.set(room.id, room);
        return room;
    }

    /**
     * Checks if a Room exists.
     * @returns {bool} - Whether the room exists or not.
     */
    exists(id) {
        for (const _id in this.rooms) {
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
        return this.rooms.get(room_id);
    }

    /**
     * Gets a list of rooms.
     * @param {bool} includePrivate - Include private rooms in this list?
     * @returns {Room[]} - An array of rooms.
     */
    getRooms(includePrivate = false) {
        const arr = [];
        for (const room of this.rooms) {
            if (room.options.isPrivate) arr.push(room);
        }
        return arr;
    }
}

export { RoomManager };
