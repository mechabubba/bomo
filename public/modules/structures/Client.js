import Methods from "./Methods.js";
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
        this.ws = null;

        /**
         * Unfinished
         */
        this.chat = new Chat();

        /**
         * Session object used with authentication
         * @property {string} username
         * @property {string} password
         * @property {string} encoded
         * @property {number} expires
         */
        this.session = {};
    }

    /**
     * Registers a unique session with the server
     * @param {boolean} cache Whether cached data may be reused
     */
    async register(cache = true) {
        const response = await Methods.post("/api/sessions");
        if (response.parsed && response.ok) this.session = response.parsed.content;s
    }

    /**
     * Establishes stuff websocket connection
     */
    async connect() {
        this.ws = new WebSocket(`ws://${document.location.host}/ws`);
        this.ws.addEventListener("message", function(event) {
            console.log("Message from server ", event.data);
        });
    }
}

export default Client;
