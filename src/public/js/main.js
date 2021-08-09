/**
 * # BOMO CLIENT CODE
 * The clientside JavaScript code for bomo.
 * 
 * https://github.com/mechabubba/bomo
 */
const bomo = {}; // bomo is born.

/**
 * A simple color class.
 */
class Color {
    constructor(r = 255, g = 255, b = 255, a = 255) {
        if (typeof r == "string") {
            const res = h2rgb(r);
            this.r = res[0]; this.g = res[1]; this.b = res[2]; this.a = res[3];
        } else {
            this.r = r; this.g = g; this.b = b; this.a = a;
        }
    }

    get hex() { return rgb2h(this.rgb()); }
    get rgb() { return [this.r, this.b, this.g, this.a]; }
    get css() { return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; }

    equals(col) {
        if(!col instanceof Color) return false;
        return (this.r == col.r) && (this.g == col.g) && (this.b == col.b) && (this.a == col.a);
    }

    static RED = new this(255, 0, 0);
    static YELLOW = new this(255, 255, 0);
    static GREEN = new this(0, 255, 0);
    static BLUE = new this(0, 0, 255);
    static WHITE  = new this();
    static BLACK = new this(0, 0, 0);
    static NONE = new this(0, 0, 0, 0);
}

/**
 * The following two functions are modified from https://stackoverflow.com/a/39077686.
 * 
 * They shouldn't be used by themselves; use the Color class instead.
 */
const h2rgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        typeof result[4] == "undefined" ? 255 : parseInt(result[4], 16),
    ] : null;
};
const rgb2h = (rgb) => [rgb[0], rgb[1], rgb[2], rgb[3]].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();

bomo.chat = {
    log: document.getElementById("chat-log"),
    input: document.getElementById("chat-input"),
};

/**
 * The master logging function. This shouldn't be used directly; use `bomo.log`, or the helper `bomo.info` or `bomo.error` functions instead.
 * 
 * Acts similarly to MsgC() in the Garry's Mod API; takes an array of strings and Colors, and styles the text accordingly.
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
