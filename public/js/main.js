/** @todo This old & unused code needs to be rewritten as part of /modules/structures/Chat.js */
// If you're looking for the client side code, see /modules/index.js and /modules/structures/Client.js

const bomo = {}; // unused object

bomo.ws = new WebSocket();
bomo.chat = {
    log: document.getElementById("chat-log"),
    input: document.getElementById("chat-input"),
};

/*
The master logging function. This shouldn't be used directly; use `bomo.log`, or the helper `bomo.info` or `bomo.error` functions instead.
Acts similarly to MsgC() in the Garry's Mod API; takes an array of strings and Colors, and styles the text accordingly.
*/
bomo._log = (content, type = "") => {
    if (!content) return;

    // Create the element that holds our log.
    const chat_message = document.createElement("div");
    chat_message.id = "chat-message";
    if (type) chat_message.setAttribute("data-type", type);

    // Coloring the text.
    let nodes = [document.createElement("span")];
    for(let i = 0; i < content.length; i++) {
        if (typeof content[i] == "string") {
            nodes[nodes.length - 1].append(content[i]);
        } else if (content[i] instanceof Color) {
            let el = document.createElement("span");
            el.style = `color: ${content[i].css}`;
            nodes.push(el);
        }
    }

    // Appending it to our chat-message element.
    for(let i = 0; i < nodes.length; i++) {
        chat_message.append(nodes[i]);
    }

    bomo.chat.log.appendChild(chat_message);
    bomo.chat.input.innerHTML = "";
};

bomo.log = (...content)   => bomo._log(content);
bomo.error = (...content) => bomo._log(content, "error");
bomo.warn = (...content)  => bomo._log(content, "warn");

bomo.chat.input.onkeyup = (e) => {
    if (e.key == "Enter") bomo.log(bomo.chat.input.textContent);
};
