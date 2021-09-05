import Chat from "./Chat.js";

/**
 * Central clientside object responsible for websocket connection, user identification, etc
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 * @extends {EventTarget}
 */
class Client extends EventTarget {
    constructor() {
        super();
        this.ws = new WebSocket();
        this.chat = new Chat();
    }
}

export default Client;
