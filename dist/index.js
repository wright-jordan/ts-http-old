/** Returns a function that can be called within a {@link http.RequestListener} to lookup handlers. */
export function Router(routes, fallback) {
    return async function router(req, res, ctx) {
        await (routes.get(req.url.split("?", 1)[0]) || fallback)(req, res, ctx);
    };
}
/** Read request body into a utf-8 string. */
export async function readString(req) {
    try {
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        return { body: Buffer.concat(chunks).toString("utf-8"), err: null };
    }
    catch (error) {
        return { body: "", err: error };
    }
}
