import { BaseIdentifiable } from "./BaseIdentifiable.js";

/**
 * User
 */
class User extends BaseIdentifiable {
    constructor(service, id, socket) {
        super(service, id);
        this.socket = socket;
        this.socket.on("message", userMessage);
    }

    userMessage(data, isBinary) {
        // user sent message to tha server
    }
}

export { User };
