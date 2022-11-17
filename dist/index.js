export function Router(routes, defaultRoute) {
    return async function router(req, res, ctx) {
        await (routes[req.url.split("?", 1)[0]] || defaultRoute)(req, res, ctx);
    };
}
class PayloadTooLargeError extends Error {
    constructor() {
        super();
    }
}
/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
async function read(req, options = { maxBytes: 16384 }) {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
        bytes += chunk.byteLength;
        if (bytes > options.maxBytes) {
            throw new PayloadTooLargeError();
        }
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}
export const errors = { PayloadTooLargeError };
export const util = { read };
