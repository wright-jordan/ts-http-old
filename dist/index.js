export function Router(routes, defaultHandler) {
    return async function router(req, res, ctx) {
        await (routes[req.url.split("?", 1)[0]] || defaultHandler)(req, res, ctx);
    };
}
import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };
import { read } from "./lib/read/read.js";
export const util = { read };
