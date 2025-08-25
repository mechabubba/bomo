import { Client } from "./classes/Client.js";

window.mainnn = async function() {
    const client = new Client();
    window.client = client; // Add reference to window for debugging purposes
    client.connect();
    client.register();

    setInterval(() => {
        client.heartbeat();
    }, 5000);
}

// document.addEventListener("DOMContentLoaded", main);
