/**
 * @todo this should be a class thats referenced on the client and the server, for maximum efficiency
 *
 * the ideal usage for this class is just a websocket message that can be (de)serialized to a message that cna be read or transmitted  
 */
class WebSocketMessage {
    static Type = {
        /** @todo ecmascript should really have a way to make enums... */
        ACK: 0,
        USER_CREATE: 1,
    };

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    serialize() {
        return JSON.stringify({
            type: this.type,
            data: this.data,
        });
    }
}

export { WebSocketMessage };
