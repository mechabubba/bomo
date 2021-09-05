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
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Location
         */
        this.ws = new WebSocket(`ws://${document.location.host}/ws`);

        // Handle websocket messages
        this.ws.addEventListener("message", function(event) {
            console.log("Message from server ", event.data);
        });

        this.chat = new Chat();
    }
}

export default Client;
