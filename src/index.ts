import type http from "http";

/** Object that can be used to persist data throughout a request. */
export interface Context {}

/** Function that handles a request.*/
export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

/** Returns a function that can be called within a {@link http.RequestListener} to lookup handlers. */
export function Router(
  routes: Map<string, Handler>,
  fallback: Handler
): Handler {
  return async function router(req, res, ctx) {
    await (routes.get(req.url!.split("?", 1)[0]!) || fallback)(req, res, ctx);
  };
}

/** Read request body into a utf-8 string. */
export async function readString(
  req: AsyncIterable<Buffer>
): Promise<{ body: string; err: unknown }> {
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    return { body: Buffer.concat(chunks).toString("utf-8"), err: null };
  } catch (error) {
    return { body: "", err: error };
  }
}
