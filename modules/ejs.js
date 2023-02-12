import { renderFile } from "ejs";
import { minify } from "html-minifier-terser";

/**
 * Trap for renderFile calls by tinyhttp so we can minify html output
 * @see https://github.com/tinyhttp/tinyhttp/blob/efd8d92fbd5e752fd9675df54aec8da4b69fce23/packages/app/src/response.ts#L7-L20
 * @see https://github.com/tinyhttp/tinyhttp/blob/0beb5fe6367a7bffdc989121af7b5e1629bd0f3a/packages/app/src/app.ts#L172
 */
export const renderMinifiedFile = function(path, locals, options, callback) {
    renderFile(path, locals, options, async function(err, html) {
        if (err) return callback(err, html);
        const minified = await minify(html, {
            collapseWhitespace: true,
            conservativeCollapse: true,
        });
        callback(err, minified);
    });
};
