import { Client } from "./classes/Client.js";

document.addEventListener("DOMContentLoaded", async function(event) {
    const client = new Client();
    window.client = client; // Add reference to window for debugging purposes
});
