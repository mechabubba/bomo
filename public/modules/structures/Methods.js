/**
 * A container for http method functions using the fetch api
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
class Methods extends null {
    // ["Content-Type", "application/json"]
    static async send(method, route = null, options = {}, headers = [], json = true) {
        if (!route) throw new TypeError("Valid route required");
        const init = {
            method: method,
            headers: new Headers(),
            mode: "cors",
            cache: "default",
            ...options,
        };
        for (const header of headers) init.headers.append(...header);
        const response = await fetch(new Request("/api/key", init));
        return json ? await response.json() : response;
    }
    static async get(route = null, options = {}, headers = [], json = true) {
        return await Methods.send("GET", route, options, headers, json);
    }
    static async post(route = null, options = {}, headers = [], json = true) {
        return await Methods.send("POST", route, options, headers, json);
    }
    static async put(route = null, options = {}, headers = [], json = true) {
        return await Methods.send("PUT", route, options, headers, json);
    }
    static async delete(route = null, options = {}, headers = [], json = true) {
        return await Methods.send("DELETE", route, options, headers, json);
    }
    static async patch(route = null, options = {}, headers = [], json = true) {
        return await Methods.send("PATCH", route, options, headers, json);
    }
}

export default Methods;
