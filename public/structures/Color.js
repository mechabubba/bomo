/** @todo Not exporting anything from Color.js yet */

/*
The following two functions are modified from https://stackoverflow.com/a/39077686.
They shouldn't be used by themselves; use the Color class instead.
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

/**
 * A simple color class.
 */
class Color {
    constructor(r = 255, g = 255, b = 255, a = 255) {
        if (typeof r == "string") {
            const res = h2rgb(r);
            this.r = res[0];
            this.g = res[1];
            this.b = res[2];
            this.a = res[3];
        } else {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
    }

    get hex() { return rgb2h(this.rgb()); }
    get rgb() { return [this.r, this.b, this.g, this.a]; }
    get css() { return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; }

    equals(col) {
        if (col instanceof Color === false) return false;
        return (this.r == col.r) && (this.g == col.g) && (this.b == col.b) && (this.a == col.a);
    }
}

// Told you I'd change it
const colors = {
    RED: new Color(255, 0, 0),
    YELLOW: new Color(255, 255, 0),
    GREEN: new Color(0, 255, 0),
    BLUE: new Color(0, 0, 255),
    WHITE: new Color(),
    BLACK: new Color(0, 0, 0),
    NONE: new Color(0, 0, 0, 0),
};
