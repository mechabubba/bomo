import { Methods } from "./Methods.js";

/**
 * Client which manages the websocket connection and events
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 * @extends {EventTarget}
 */
export class Client extends EventTarget {
    constructor() {
        super();
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Location
         */
        this.ws = null;

        /**
         * The server side user id
         * @type {?string}
         */
        this.id = null;

        /**
         * Authorization string encoded in base64
         * @type {?string}
         */
        this.authorization = null;

        /**
         * Whether or not we've initiated our websocket request.
         * @type {boolean}
         */
        this.authorized = false;
    }

    /**
     * Registers a User with the server
     * @param {boolean} cache Whether cached data may used
     */
    async register(cache = true) {
        const response = await Methods.post("/auth/generate");
        if (response.parsed && response.parsed.content) {
            console.log(response.parsed);
            this.id = response.parsed.content.id;
            this.authorization = response.parsed.content.authorization;
        }
        if (!this.id || !this.authorization) {
            console.error("Failed registration");
            return;
        }
        // localStorage.setItem("authorization", this.authorization);
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            this.send("auth", this.authorization);
        }
    }

    handleWSMessage(msg) {
        switch (msg.type) {
            case "auth_ok":
                console.log("Authorized with token " + this.authorization + "!");
                this.authorized = true;
                break;
            default:
                // ???
        }
    }

    socketMessageListener(event) {
        let json;
        try {
            json = JSON.parse(event.data);
        } catch (e) {
            console.error("Error parsing server WS message;", e);
        }
        console.log("Message from server ", json);
        this.handleWSMessage(event.data);
    }

    /**
     * Establishes stuff websocket connection
     */
    async connect() {
        this.ws = new WebSocket(`ws://${document.location.host}/ws`);
        this.ws.addEventListener("message", this.socketMessageListener.bind(this));
    }

    send(type, content) {
        console.debug({ type, content });
        this.ws.send(JSON.stringify({ type, content }));
    }

    heartbeat() {
        this.send("heartbeat", true);
    }
}
