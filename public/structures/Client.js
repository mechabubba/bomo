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
         * The server side User's id
         * @type {?string}
         */
        this.id = null;

        /**
         * Authorization string encoded in base64
         * @type {?string}
         */
        this.authorization = null;

        /**
         * Latest expiration timestamp for the server side User's credentials
         * @type {?number}
         */
        this.expires = null;
    }

    /**
     * Registers a User with the server
     * @param {boolean} cache Whether cached data may be reused
     * @todo Save/retrieve data using window.localStorage
     */
    async register(cache = true) {
        const response = await Methods.post("/api/users");
        if (response.parsed && response.parsed.content) {
            console.log(response.parsed);
            this.id = response.parsed.content.id;
            this.authorization = response.parsed.content.authorization;
        }
        if (!this.id || !this.authorization) {
            console.error("Failed registration");
        } else {
            console.log(this);
        }
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
