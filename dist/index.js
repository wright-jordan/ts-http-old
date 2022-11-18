export function Router(routes, defaultRoute) {
    return async function router(req, res, ctx) {
        await (routes[req.url.split("?", 1)[0]] || defaultRoute)(req, res, ctx);
    };
}
import { PayloadTooLargeError } from "./errors.js";
export const errors = { PayloadTooLargeError };
import { read } from "./util.js";
export const util = { read };
