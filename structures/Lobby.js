const Member = require("./Member");

/**
 * A lobby, which manages a group of members.
 * @class
 */
class Lobby {
    constructor(id, leader) {
        if (!id || !leader) throw new Error("Missing lobby ID or leader");
        this.id = id;
        this.members = {
            [leader.id]: leader, // cool syntax here
        };
        this.leaderID = leader.id;
        this.name = `Lobby ${this.id.toUpperCase()}`;
        this.game = null;
    }

    set name(value) {
        this.customName = value;
        this.broadcast(value); // this will need to some standard object that can be stringified
    }

    /**
     * Sends an object to every member in a lobby.
     * @param {Object} data - the data you want to send.
     */
    broadcast(data) {
        if (!data) throw new Error("Missing parameter(s).");
        for (const member in this.members) this.send(member, data);
    }

    /**
     * Sends data to a specific lobby member.
     * @param {Member} member - the Member you want to send your data to.
     * @param {Object} data - the data you want to send.
     */
    send(member, data) {
        if (!member || !data) throw new Error("Missing parameter(s)");
        if (typeof member == "string") member = this.members[member];
        if (member instanceof Member) {
            member.client.send(data);
        }
    }
}

module.exports = Lobby;
