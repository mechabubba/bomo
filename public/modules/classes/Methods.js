/**
 * A container for http method functions using the fetch api
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
export class Methods extends null {
    static async send(method, route = null, options = {}, headers = [], provideParsed = true) {
        if (!route) throw new TypeError("Valid route required");
        const init = {
            method: method,
            headers: new Headers(),
            mode: "cors",
            cache: "default",
            ...options,
        };
        for (const header of headers) init.headers.append(...header);
        const response = await fetch(new Request(route, init));
        // ["Content-Type", "application/json"]
        if (provideParsed) response.parsed = response.headers.get("Content-Type") === "application/json" ? await response.json() || null : null;
        return response;
    }
    static async get(route = null, options = {}, headers = [], provideParsed = true) {
        return await Methods.send("GET", route, options, headers, provideParsed);
    }
    static async post(route = null, options = {}, headers = [], provideParsed = true) {
        return await Methods.send("POST", route, options, headers, provideParsed);
    }
    static async put(route = null, options = {}, headers = [], provideParsed = true) {
        return await Methods.send("PUT", route, options, headers, provideParsed);
    }
    static async delete(route = null, options = {}, headers = [], provideParsed = true) {
        return await Methods.send("DELETE", route, options, headers, provideParsed);
    }
    static async patch(route = null, options = {}, headers = [], provideParsed = true) {
        return await Methods.send("PATCH", route, options, headers, provideParsed);
    }
}

// Useful snippet for browser console
// const { default: Methods } = await import("./modules/structures/Methods.js")
