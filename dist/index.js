export class Router {
    #routes = {};
    #defaultHandler;
    constructor() {
        this.#defaultHandler = new (class DefaultHandler {
            async handle(_req, res, _ctx) {
                res.statusCode = 404;
                res.end();
            }
        })();
    }
    add(path, handler) {
        if (!path) {
            this.#defaultHandler = handler;
            return;
        }
        this.#routes = {
            ...this.#routes,
            [path]: handler,
        };
    }
    async handle(req, res, ctx) {
        await (this.#routes[req.url.split("?", 1)[0]] || this.#defaultHandler).handle(req, res, ctx);
    }
}
import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };
import { read } from "./lib/read/read.js";
export const util = { read };
