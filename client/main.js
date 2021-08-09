let bomo = {};

/** A simple color class. */
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
    static WHITE  = new this();
    static BLACK = new this(0, 0, 0, 255);
    static NONE = new this(0, 0, 0, 0);
}

// The following two functions are modified from https://stackoverflow.com/a/39077686.
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

class ElementLogger {
    constructor(el) {
        this.el = el;
        this.clear();
    }

    // pov: shitty code
    // see src/public/js/main.js
    log(...args) {
        const els = [document.createTextNode()];
        for(let i = 0; i < args; i++) {
            if (args[i] instanceof Color) {
                if (args[i].equals(Color.WHITE)) break;
                let span = document.createElement("span");
                span.style = `color: rgba(${args[i].r}, ${args[i].g}, ${args[i].b}, ${args[i].a});`;
                els.push(span);
            } else {
                let _ = args[args.length - 1];
                if ((i - 1) > 0 && _ instanceof Color && _.equals(Color.WHITE)) {

                }
                _ += typeof args[i] == "object" ? JSON.stringify(args[i]) : args[i];
            }
        }
        for(let i = 0; i < els.length; i++) {
            this.el.appendChild(els[i]);
        }
    }

    clear() {
        this.el.innerHTML = "";
    }
}

bomo.logger = new ElementLogger(document.getElementById("chat-log"));
//bomo.logger.log(new Color(0, 255, 0), "hey :)");