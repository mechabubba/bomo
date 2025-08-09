import { Edge } from "edge.js";
import { join } from "node:path";
import { directory } from "./constants.js";
import { production } from "./environment.js";
import { pathToFileURL } from "node:url";
import { minify } from "html-minifier-terser";

/**
 * edge.js template engine instance
 * @see https://edgejs.dev/
 */
export const views = Edge.create({
    cache: production,
});

const viewsDirectory = pathToFileURL(join(directory, "src", "views"));
views.mount(viewsDirectory);

/**
 * Will throw if err is truthy
 * @callback engineCallback
 * @param {*} err Error object, if an error occurred
 * @param {string} html HTML content to send in the response
 * @throws Will throw if err is truthy
 */

/**
 * @param {string} path
 * @param {Record<string, any>} locals
 * @param {Record<string, any>} state
 * @param {engineCallback} callback
 * @see https://github.com/tinyhttp/tinyhttp/blob/efd8d92fbd5e752fd9675df54aec8da4b69fce23/packages/app/src/response.ts#L7-L20
 * @see https://github.com/tinyhttp/tinyhttp/blob/0beb5fe6367a7bffdc989121af7b5e1629bd0f3a/packages/app/src/app.ts#L172
*/
export const renderMinified = async function(path, locals = {}, state = {}) {
    const scoped = views.createRenderer();
    scoped.share(locals);
    const html = await scoped.render(path, state);
    const minified = await minify(html, {
        collapseWhitespace: true,
        conservativeCollapse: true,
    });
    return minified;
};

/**
 * Send rendered html with state
 * @param {import("@tinyhttp/app").Response} res
 * @param {string} templatePath
 * @param {Record<string, any>} locals
 * @param {Record<string, any>} state
 */
export const sendRender = async function(res, templatePath, locals, state) {
    const html = await renderMinified(templatePath, {
        ...res.locals,
        ...locals,
    }, state);
    return res.send(html);
};
