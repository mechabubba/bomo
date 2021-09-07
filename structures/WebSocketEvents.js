const log = require("../util/log");

const print = function(websocket, request, ...messages) {
    const args = [request.ip || request.socket.remoteAddress, ...messages];
    const message = args.join(" ").trim();
    log.trace(message);
};

/**
 * A container for websocket listeners
 */
class WebSocketEvents extends null {
    // Websocket server functions
    /** @todo this has to add listeners to new websockets and handle authentication */
    static serverOnConnection(bomo, websocket, request) {
        //
    }
    static serverOnClose(bomo) {
        //
    }
    static serverOnError(bomo) {
        //
    }
    static serverOnHeaders(bomo) {
        //
    }
    static serverOnListening(bomo) {
        //
    }
    // Websocket functions
    static onClose() {
        //
    }
    static onError() {
        //
    }
    static onMessage() {
        //
    }
    static onOpen() {
        //
    }
    static onPing() {
        //
    }
    static onPong() {
        //
    }
    static onUnexpectedResponse() {
        //
    }
    static onUpgrade() {
        //
    }
}

module.exports = WebSocketEvents;
