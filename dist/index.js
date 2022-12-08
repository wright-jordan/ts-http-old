export function Router(routes, defaultHandler) {
    return async function router(req, res, ctx) {
        await (routes.get(req.url.split("?", 1)[0]) || defaultHandler)(req, res, ctx);
    };
}
export async function readString(req) {
    try {
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        return [Buffer.concat(chunks).toString("utf8"), null];
    }
    catch (error) {
        return ["", error];
    }
}
