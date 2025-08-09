import { Collection } from "@discordjs/collection";
import { BaseManager } from "./BaseManager.js";
import { Room } from "./Room.js";

/**
 * Manager class for instances of Room
 */
class RoomManager extends BaseManager {
    constructor(service) {
        super(service);

        /**
         * Cache of current rooms mapped by their id
         * @type {Collection<string, Room>}
         */
        this.cache;
    }

    /**
     * Creates a room.
     * @param {User} creator The user which created the room
     * @param {RoomData} data Room data
     * @param {?RoomSettings} settings Room settings
     * @returns {Room}
     * @todo Unfinished
     */
    create(creator, data, settings) {
        const room = new Room(this.service, this.generateIdentifier(), data, settings);
        this.cache.set(room.id, room);
        return room;
    }

    /**
     * Gets all public rooms
     * @returns {Collection<string, Room>} A collection of rooms
     */
    getPublicRooms() {
        return this.cache.filter((room) => room.public);
    }
}

export { RoomManager };
