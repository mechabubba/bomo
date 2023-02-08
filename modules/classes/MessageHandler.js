/**
 * This class holds functions that deal with messages between websockets.
 */
class WebSocketMessageHandler {
    cosntructor(service) {
        this.service = service;
    }

    execute(message) {
        switch (message.type) {
            case "MESSAGE": return this.onUserMessage(message);
        }
    }

    /**
     * Called on a users message.
     * @param {WebSocketMessage} user The user that sent it.
     */
    onUserMessage(message) {
        const room = message.user.room;
        if (!room) return; // If the user isn't part of a room, don't do anything.

        for (const member in room.members) {
            member.send({
                type: "MESSAGE",
                data: message.data,
            });
        }
    }
}
