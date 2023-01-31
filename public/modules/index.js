import { Client } from "./classes/Client.js";

document.addEventListener("DOMContentLoaded", async function(event) {
    const client = new Client();
    // Add reference to window for debugging purposes
    window.client = client;
});
